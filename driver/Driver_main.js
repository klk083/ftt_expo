import React from 'react'
import {
    Alert,
    BackHandler,
    Platform,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import {getPreciseDistance} from 'geolib'
import {connect} from 'react-redux'

import {
    change_user_to_customer,
    driver_available,
    driver_not_available,
    orders,
    priority_orders,
    serverIp,
} from '../common_files/Texts'
import SectionListCustomers from './SectionListCustomers'
import {getToken} from '../common_files/ourFunctions'
import {
    updateCustomerLocation,
    updateOrderList,
    updatePermission,
    updateUserType,
} from '../redux/actions'

class Driver_main extends React.Component {
    state = {
        isAvailable: false,
        gotJson: false,
        orders: this.props.orderList,
    }

    componentDidMount() {
        this.setState({orders: this.props.orderList})
        BackHandler.addEventListener('hardwareBackPress', this.backAction)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        BackHandler.removeEventListener('hardwareBackPress', this.backAction)
        this.setState({orders: []})
    }

    backAction = () => {
        Alert.alert(
            'Vil du logge deg ut og lukke appen?',
            '',
            [
                {
                    text: 'Nei',
                    onPress: () => null,
                    style: 'cancel',
                },
                {},
                {
                    text: 'Logg ut og lukk appen',
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            {cancelable: true}
        )
        return true
    }

    toggleSwitch = (value) => {
        if (this.props.userPermission !== 'granted') {
            this.getLocationAsync()
            return null
        }
        this.getLocationAsync()
        this.setState({isAvailable: value})
        if (value) {
            this.getOrders()
            this.interval = setInterval(() => this.getOrders(), 30000)
        } else {
            clearInterval(this.interval)
        }
    }

    sort = (json) => {
        let newOrderList = [...json]
        for (let i = 0; i < json.length; i++) {
            newOrderList[i].km = this.getDistanceBetweenCustomerAndDriver(
                json[i]
            )
        }
        const compareKm = (order1, order2) =>
            Number(order1.km) > Number(order2.km)
        newOrderList.sort(compareKm)
        return newOrderList
    }

    getLocationAsync = async () => {
        if (this.props.userPermission !== 'granted') {
            let {status} = await Permissions.askAsync(Permissions.LOCATION)
            if (status === 'granted') {
                this.props.updatePermission({location: 'granted'})
                this.toggleSwitch(true)
            }
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
        return (
            getPreciseDistance(
                {
                    latitude: customerLocation.latitude,
                    longitude: customerLocation.longitude,
                },
                this.props.customerLocation
            ) / 1000
        ).toFixed(2)
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

    priorityOrderList = () => {
        return this.props.orderList.filter((item) => item.priority === 1)
    }

    basicOrderList = () => {
        return this.props.orderList.filter((item) => item.priority === 0)
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
                                        orders={this.priorityOrderList()}
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
                                        orders={this.basicOrderList()}
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
    userPermission: state.permission.location,
})

const mapDispatchToProps = {
    updateOrderList,
    updateUserType,
    updatePermission,
    updateCustomerLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Driver_main)
