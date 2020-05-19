import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import * as Location from 'expo-location'
import { getPreciseDistance } from 'geolib'
import { RFPercentage } from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {book_taxi, basic_price, turn_on_location, turn_on_location_explanation} from '../common_files/Texts'
import {updateCustomerLocation, updateDeviceId, updateOrderId, updateToken} from '../redux/actions'
import store from '../redux/store'



class Customer_main extends React.Component {
    state = {
        accuracy: '',
        altitude: '',
        heading: '',
        longitude: '',
        latitude: '',
        speed: '',
        timestamp: '',
        location: '',
        geocode: '',
        errorMessage: '',
        isGranted: true,
        distanceBetween: 0,
        customerPhone: '+4712345678',
        secondLocation: {latitude: 63.430487, longitude: 10.394978},
        deviceId: 'tlf321', //'Funker bare på bare react native',
    }

    componentDidMount() {
        //this.getDeviceId()            KAN FJERNES ETTERHVERT
        this.getLocationAsync().catch()
        this.props.updateCustomerLocation(`${this.state.latitude}, ${this.state.longitude}`)
        this.props.updateDeviceId(`${this.state.deviceId}`)
        this.props.updateOrderId(98372489)
    }

    getLocationAsync = async () => {
        let {status} = await Location.requestPermissionsAsync()
        if (status === 'granted'){
            this.setState({errorMessage: 'granted', isGranted: true})
        }
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

    submitBookingButton = () => {
        this.props.updateCustomerLocation({latitude: this.state.latitude, longitude: this.state.longitude})
        this.props.navigation.navigate('Booking')
        console.log(store.getState())
    }

    render() {
        const {geocode} = this.state

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    {this.state.isGranted && (
                        <View style={styles.grantedMainContainer}>
                            <View style={styles.spaceBetweenViews}>
                                <Text style={styles.locationAddress}>
                                    {geocode ? `${geocode[0].street} ${geocode[0].name}` : ''}
                                </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.textBookingButtonContainer}>
                                    <View style={styles.textBooking}>
                                        <Text style={styles.button}
                                              onPress={() => this.submitBookingButton()}
                                        >{book_taxi}</Text>
                                        <Text style={styles.button_price}>({basic_price})</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {!this.state.isGranted && (
                        <View style={styles.locationContainer}>
                            <View style={styles.locationInfoContainer}>
                                <Text style={styles.locationInfo}>{turn_on_location_explanation}</Text>
                            </View>
                            <View style={styles.buttonLocationContainer}>
                                <TouchableOpacity style={styles.touchableLocationContainer}
                                                  onPress={this.getLocationAsync}>
                                    <Text style={styles.buttonLocation}>{turn_on_location}</Text>
                                </TouchableOpacity>
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
        alignItems: 'center',
    },
    grantedMainContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end'
    },
    spaceBetweenViews: {
        flex: 0.7,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 0.4,
    },
    textBookingButtonContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 40,
        borderRadius: 25,
        backgroundColor: 'darkseagreen',
    },
    textBooking: {
        flex: 1,
        paddingHorizontal: 20,
    },
    button: {
        flex: 0.9,
        textAlign: 'center',
        fontSize: RFPercentage(9),
    },
    button_price: {
        flex: 0.2,
        textAlign: 'center',
        color: 'gray',
        textAlignVertical: 'center',
        fontSize: RFPercentage(3),
    },


    locationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    locationInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLocationContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        padding: 50,
    },
    touchableLocationContainer: {
        flex: 0.4,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'firebrick',
    },
    buttonLocation: {
        flex: 1,
        justifyContent: 'flex-start',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(6),
        padding: 15,
    },

    locationAddress: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: RFPercentage(3.5),
        textAlign: 'center',
    },
    locationInfo: {
        color: 'gray',
        alignItems: 'center',
        fontSize: RFPercentage(5),
        textAlign: 'center',
    },
})

const mapStateToProps = (state) => ({
    customerLocation: `${state.latitude},${state.longitude}`,
    orderId: state.customerPhone,
    deviceId: state.deviceId,
    user: state.isGranted,
    token: state.token,
})

const mapDispatchToProps = {
    updateCustomerLocation,
    updateToken,
    updateOrderId,
    updateDeviceId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer_main)
