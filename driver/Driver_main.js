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
import store from '../redux/store'

import {
    driver_available,
    driver_not_available,
    priority_orders,
    orders,
    change_user_to_customer, serverIp,
} from '../common_files/Texts'
import Orders, {compareDistKm} from './Orders'
import SectionListCustomers from './SectionListCustomers'
import {getToken} from '../common_files/ourFunctions'
import {getOrders} from './OrdersFromServer'
import {updateOrderList, updateUserType,updateOrderList} from '../redux/actions'

class Driver_main extends React.Component {
    state = {
        isAvailable: false,
        orders: Orders,
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        this.props.updateOrderList([
            {
                latitude: this.props.customerLocation.latitude,
                longitude: this.props.customerLocation.longitude,
                orderId: 94875,
                priority: 0,
            },
            {
                latitude: this.props.customerLocation.latitude,
                longitude: this.props.customerLocation.longitude,
                orderId: 2324,
                priority: 1,
            },
        ])
    }

    toggleSwitch = (value) => {
        this.setState({isAvailable: value})
        if(value) {
            console.log('is in Order interval')
            this.getOrderlistServer()
            this.interval = setInterval(() => this.getOrderlistServer(), 30000)
        } else {
            clearInterval(this.interval)
        }
        this.sort()
    }

    sort = () => {
        this.setState((prevState) => ({
            orders: prevState.orders.sort(compareDistKm),
        }))
    }

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION)
        this.setState({errorMessage: 'granted', isGranted: true})
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Du må slå på lokasjonen for å bruke appen',
                isGranted: false,
            })
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
        this.setState({location: {latitude, longitude}})
    }

    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({geocode})
    }

    getDistanceBetweenCustomerAndDriver = () => {
        const distanceBetween = (
            getPreciseDistance(
                {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                },
                this.state.secondLocation
            ) / 1000
        ).toFixed(2)
        this.setState({distanceBetween: distanceBetween})
    }

    /* Fungerer bare i bare react native mode

    getDeviceId = () => {
        let uid = DeviceInfo.getDeviceId()
        this.setState({ deviceId: uid })
    }

     */

    getOrderlistServer = async () => {
        const orders = await getOrders();
        console.log('this is what i get of orders: ' +orders);
        this.props.updateOrderList(orders[0]);
    }

    render() {
        console.log(store.getState())
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View>
                        <Text
                            style={{color: 'lightgray'}}
                            onPress={() => this.props.updateUserType('false')}
                        >
                            {change_user_to_customer}
                        </Text>
                    </View>
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

                    {!this.state.isAvailable && (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 5,
                                borderColor: 'red',
                            }}
                        >
                            <Text>
                                HER ER LISTA HENTET FRA MOBILEN{`\n`}
                                {`\n`}
                            </Text>
                            <Text>Det første objektet{`\n`}</Text>
                            <Text>
                                Latitude: {this.props.orderList[0].latitude}
                            </Text>
                            <Text>
                                Longitude: {this.props.orderList[0].longitude}
                            </Text>
                            <Text>
                                OrderId: {this.props.orderList[0].orderId}
                            </Text>
                            <Text>
                                Priority: {this.props.orderList[0].priority}
                                {`\n`}
                                {`\n`}
                            </Text>
                            <Text>Det andre objektet{`\n`}</Text>
                            <Text>
                                Latitude: {this.props.orderList[1].latitude}
                            </Text>
                            <Text>
                                Longitude: {this.props.orderList[1].longitude}
                            </Text>
                            <Text>
                                OrderId: {this.props.orderList[1].orderId}
                            </Text>
                            <Text>
                                Priority: {this.props.orderList[1].priority}
                            </Text>
                        </View>
                    )}

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
                                        contacts={this.state.orders}
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
                                        contacts={this.state.orders}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
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
