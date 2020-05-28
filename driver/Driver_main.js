import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Switch,
    SafeAreaView,
    Platform,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import {getPreciseDistance} from 'geolib'
import {connect} from 'react-redux'

import {
    driver_available,
    driver_not_available,
    priority_orders,
    orders,
    change_user_to_customer,
    serverIp,
} from '../common_files/Texts'
import SectionListCustomers from './SectionListCustomers'
import {getToken} from '../common_files/ourFunctions'
import {updateOrderList, updateUserType} from '../redux/actions'

class Driver_main extends React.Component {
    state = {
        isAvailable: false,
        gotJson: false,
        orders: this.props.orderList,
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        this.setState(this.props.orderList)
    }

    toggleSwitch = (value) => {
        this.getLocationAsync()
        this.setState({isAvailable: value})
        if (value) {
            this.getOrders()
            this.interval = setInterval(() => this.getOrders(), 30000)
        } else {
            clearInterval(this.interval)
        }
        //this.sort()
    }

    sort = (json) => {
        let newOrderList = [...json]
        for (let i = 0; i < json.length; i++) {
            newOrderList[i].km = this.getDistanceBetweenCustomerAndDriver(
                json[i]
            )
        }
        return newOrderList
        /*this.setState((prevState) => ({
            orders: prevState.orders.sort(compareDistKm),
        }))*/
    }

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION)
        if (status === 'granted') {
            this.props.updatePermission({location: 'granted'})
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        })

        await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (newLocation) => {
                this.setState({
                    accuracy: newLocation.coords.accuracy,
                    altitude: newLocation.coords.altitude,
                    heading: newLocation.coords.heading,
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    speed: newLocation.coords.speed,
                    timestamp: newLocation.timestamp,
                })
            }
        )

        const {latitude, longitude} = location.coords
        await this.getGeocodeAsync({latitude, longitude})
        this.props.updateCustomerLocation({
            latitude: latitude,
            longitude: longitude,
        })
    }

    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({geocode})
    }

    getDistanceBetweenCustomerAndDriver = (customerLocation) => {
        const distanceBetween = (
            getPreciseDistance(
                {
                    latitude: customerLocation.latitude,
                    longitude: customerLocation.longitude,
                },
                this.props.customerLocation
            ) / 1000
        ).toFixed(2)
        return distanceBetween
        //this.setState({distanceBetween: distanceBetween})
    }

    getOrders = async () => {
        const tokenGotten = await getToken()
        await fetch(serverIp + '/getOrders', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                token: tokenGotten,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.length) {
                    let sortedJson = this.sort(json)
                    this.props.updateOrderList(sortedJson)
                    return json[0].object
                } else {
                    console.log('Array was empty')
                    return false
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    /* Fungerer bare i bare react native mode

    getDeviceId = () => {
        let uid = DeviceInfo.getDeviceId()
        this.setState({ deviceId: uid })
    }

     */

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.availabilityContainer}>
                        <Text style={styles.availability}>
                            {this.state.isAvailable
                                ? driver_available
                                : driver_not_available}
                        </Text>
                        <Switch
                            trackColor={{false: 'darkgray', true: 'green'}}
                            thumbColor={
                                this.state.isAvailable ? '#8fbc8f' : 'white'
                            }
                            onValueChange={this.toggleSwitch}
                            value={this.state.isAvailable}
                            style={
                                Platform.OS === 'ios'
                                    ? styles.switch_ios
                                    : styles.switch_android
                            }
                        />
                    </View>
                    {this.state.isAvailable && (
                        <View style={styles.orderContainer}>
                            <View style={styles.priorityOrdersContainer}>
                                <View style={styles.priorityTitleContainer}>
                                    <Text
                                        style={styles.priority_order_list}
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                'Driver Order'
                                            )
                                        }
                                    >
                                        {priority_orders}
                                    </Text>
                                </View>
                                <View style={styles.basicSectionListContainer}>
                                    <SectionListCustomers
                                        orders={this.props.orderList}
                                    />
                                </View>
                            </View>
                            <View style={styles.basicOrdersContainer}>
                                <View style={styles.basicTitleContainer}>
                                    <Text style={styles.basic_order_list}>
                                        {orders}
                                    </Text>
                                </View>
                                <View style={styles.basicSectionListContainer}>
                                    <SectionListCustomers
                                        orders={this.props.orderList}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    <View>
                        <Text
                            style={{color: 'lightgray'}}
                            onPress={() => this.props.updateUserType('false')}
                        >
                            {change_user_to_customer}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    availabilityContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priorityOrdersContainer: {
        flex: 1,
    },
    basicOrdersContainer: {
        flex: 1,
    },
    priorityTitleContainer: {
        flex: 0.2,
    },
    basicTitleContainer: {
        flex: 0.2,
    },
    prioritySectionListContainer: {
        flex: 0.8,
        alignItems: 'center',
    },
    basicSectionListContainer: {
        flex: 0.8,
        alignItems: 'center',
    },
    availability: {
        flex: 0.8,
        fontSize: RFPercentage(4),
    },
    switch_android: {
        flex: 0.1,
        transform: [{scaleX: 1.5}, {scaleY: 1.5}],
    },
    switch_ios: {
        flex: 0.1,
        paddingRight: 20,
    },
    priority_order_list: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(5),
        color: 'dodgerblue',
    },
    basic_order_list: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(5),
        color: 'darkseagreen',
    },
})

const mapStateToProps = (state) => ({
    orderList: state.orderList,
    customerLocation: state.user_location,
})

const mapDispatchToProps = {
    updateOrderList,
    updateUserType,
}

export default connect(mapStateToProps, mapDispatchToProps)(Driver_main)
