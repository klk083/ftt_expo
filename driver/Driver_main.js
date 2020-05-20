import React from 'react'
import { View, Text, StyleSheet, Switch, SafeAreaView, Platform } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import {driver_available, driver_not_available, priority_orders, orders, serverIp} from '../common_files/Texts'
import Orders, { compareDistKm } from './Orders'
import SectionListCustomers from './SectionListCustomers'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import {getPreciseDistance} from 'geolib'
import {getToken} from "../common_files/ourFunctions";
import store from "../redux/store";

export default class Driver_main extends React.Component {
    state = {
        isAvailable: false,
        orders: Orders,
    }

    toggleSwitch = (value) => {
        this.setState({isAvailable: value})
        this.sort()
    }

    sort = () => {
        this.setState(prevState => ({orders: prevState.orders.sort(compareDistKm)}))
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
            accuracy: Location.Accuracy.High
        })

        await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            },
            newLocation => {
                this.setState({
                    accuracy: newLocation.coords.accuracy,
                    altitude: newLocation.coords.altitude,
                    heading: newLocation.coords.heading,
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    speed: newLocation.coords.speed,
                    timestamp: newLocation.timestamp
                })
            })

        const {latitude, longitude} = location.coords
        await this.getGeocodeAsync({latitude, longitude})
        this.setState({location: {latitude, longitude}})
    }

    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({geocode})
    }

    getDistanceBetweenCustomerAndDriver = () => {
        const distanceBetween = (getPreciseDistance(
            {latitude: this.state.latitude, longitude: this.state.longitude},
            this.state.secondLocation
        ) / 1000).toFixed(2)
        this.setState({distanceBetween: distanceBetween})
    }

    /* Fungerer bare i bare react native mode

    getDeviceId = () => {
        let uid = DeviceInfo.getDeviceId()
        this.setState({ deviceId: uid })
    }

     */

    getOrders = async  () => {
        const tokenGotten = await getToken();
        await fetch(serverIp+ '/getorders', {
            method: 'GET',
            headers: {'content-type': 'application/json'},
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)

                if (json.length) {
                    console.log(json[0].taxiNumber) // these should be stored
                    console.log(json[0].companyName) // these should be stored
                    clearInterval(this.interval);
                    console.log('try to navigate to booking confimataion')
                    this.props.navigation.navigate('Booking confirmation')
                    console.log(store.getState())
                }else{
                    console.log('did try to get taxinumber but failed')

                }
            })
            .catch(error => {
                console.error(error);
            });
    }




    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.availabilityContainer}>
                        <Text
                            style={styles.availability}>{this.state.isAvailable ? driver_available : driver_not_available}</Text>
                        <Switch
                            trackColor={{false: 'darkgray', true: 'green'}}
                            thumbColor={this.state.isAvailable ? '#8fbc8f' : 'white'}
                            onValueChange={this.toggleSwitch}
                            value={this.state.isAvailable}
                            style={Platform.OS === 'ios' ? styles.switch_ios : styles.switch_android}
                        />
                    </View>
                    {this.state.isAvailable && (
                        <View style={styles.orderContainer}>
                            <View style={styles.priorityOrdersContainer}>
                                <View style={styles.priorityTitleContainer}>
                                    <Text style={styles.priority_order_list}
                                          onPress={() => this.props.navigation.navigate('Driver Order')}
                                    >{priority_orders}</Text>
                                </View>
                                <View style={styles.prioritySectionListContainer}>
                                    <SectionListCustomers contacts={this.state.orders}/>
                                </View>
                            </View>
                            <View style={styles.basicOrdersContainer}>
                                <View style={styles.basicTitleContainer}>
                                    <Text style={styles.basic_order_list}>{orders}</Text>
                                </View>
                                <View style={styles.basicSectionListContainer}>
                                    <SectionListCustomers contacts={this.state.orders}/>
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
