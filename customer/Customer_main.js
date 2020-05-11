import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getPreciseDistance } from 'geolib'
import { RFPercentage } from "react-native-responsive-fontsize";
import {connect} from 'react-redux'

import {book_taxi, basic_price} from '../common_files/Texts'
import {updateCustomerLocation} from "../redux/actions";
import store from "../redux/store";

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
        errorMessage: "",
        isGranted: true,
        distanceBetween: 0,
        customerPhone: '+4712345678',
        secondLocation: {latitude: 63.430487, longitude: 10.394978},
        deviceId: 'Funker bare på bare react native',
    }

    componentDidMount() {
        //this.getDeviceId()
        this.getLocationAsync().catch()
    }

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({errorMessage: 'granted', isGranted: true})
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Du må slå på lokasjonen for å bruke appen',
                isGranted: false,
            });
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        });

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
            });

        const {latitude, longitude} = location.coords
        await this.getGeocodeAsync({latitude, longitude})
        this.setState({location: {latitude, longitude}});

    };

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
        store.dispatch(updateCustomerLocation(`${this.state.latitude}, ${this.state.longitude}`))
        console.log(store.getState())
    }

    /* Fungerer bare i bare react native mode

    getDeviceId = () => {
        let uid = DeviceInfo.getDeviceId()
        this.setState({ deviceId: uid })
    }

     */

    render() {
        const {location, geocode, accuracy, altitude, heading, latitude, longitude, speed, distanceBetween, customerPhone} = this.state

        return (
            <View style={styles.container}>
                {this.state.isGranted && (
                    <View>
                        <View style={styles.spaceBetweenViews}>
                            <Text style={styles.heading1}>
                                {geocode ? `${geocode[0].street} ${geocode[0].name}` : ""}
                            </Text>
                            <Text style={styles.heading2}>
                                {geocode ? `${geocode[0].postalCode} ${geocode[0].city}` : ""}
                            </Text>
                            <Text style={styles.heading2}>
                                {geocode ? `${geocode[0].region}, ${geocode[0].country}, ${geocode[0].isoCountryCode}` : ""}
                            </Text>
                            <Text style={styles.heading2}>
                                {location ?
                                `Accuracy (m): ${accuracy} 
                                \nAltitude (m): ${altitude} 
                                \nHeading (degrees): ${heading} 
                                \nLatitude (degrees): ${latitude} 
                                \nLongitude (degrees): ${longitude} 
                                \nSpeed (m/s): ${speed}`
                                : ""}
                            </Text>
                            <Text style={styles.heading2}>DeviceId: {this.state.deviceId}</Text>
                            {console.log('er på klient skjermen')}
                            <TouchableOpacity onPress={() => this.getDistanceBetweenCustomerAndDriver()}>
                                <Text style={styles.heading5}>{
                                    (location ? ((this.state.distanceBetween === 0) ? 'Trykk for å måle avstand' : `Du er ${distanceBetween} km unna i luftlinje.`) : null)
                                }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Driver Stack')}>
                                <Text style={styles.heading1}>Gå til driver main</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.textBookingButtonContainer}>
                                <View style={styles.textBooking}>
                                    <Text style={styles.button}
                                          onPress={() => this.props.navigation.navigate('Booking',
                                              {customerPhone: customerPhone, customerLocation: location})}
                                    >{book_taxi}</Text>
                                    <Text style={styles.button_price}
                                          /*
                                                    SKAL SLETTES NÅR SERVEREN KLARER
                                                    Å SENDE KLIENTEN TIL
                                                    PRIORITERT BESTILLING

                                          onPress={() => this.props.navigation.navigate('Booking priority',
                                              {customerLocation: this.state.location}
                                          )}*/>({basic_price})</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>)
                }
                {!this.state.isGranted && (
                    <View style={styles.locationContainer}>
                        <View style={styles.locationInfoContainer}>
                            <Text style={styles.locationInfo}>Du må slå på lokasjonen</Text>
                            <Text style={styles.locationInfo}>for å bruke appen</Text>
                        </View>
                        <View style={styles.buttonLocationContainer}>
                            <TouchableOpacity style={styles.touchableLocation} onPress={this.getLocationAsync}>
                                <Text style={styles.buttonLocation}>Slå på {'\n'}lokasjonen</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceBelowButtonLocation}></View>
                    </View>
                )}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    spaceBetweenViews: {
        flex: 0.68,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 0.3,
        borderRadius: 25,
        backgroundColor: 'darkseagreen',
    },
    textBookingButtonContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    textBooking: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        flex: 0.8,
        textAlign: 'center',
        fontSize: RFPercentage(10),//12
        paddingHorizontal: 50
    },
    button_price: {
        flex: 0.1,
        textAlign: 'center',
        fontSize: RFPercentage(3),//3
    },


    locationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationInfoContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLocationContainer: {
        flex: 0.2,
        borderRadius: 25,
        backgroundColor: 'firebrick',
        justifyContent: 'center',
    },
    buttonLocation: {
        textAlign: 'center',
        fontSize: RFPercentage(6),
        padding: 15
    },
    spaceBelowButtonLocation: {
        flex: 0.3,
    },

    heading1: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: RFPercentage(4),
        margin: 10
    },
    heading2: {
        color: 'gray',
        margin: 5,
        fontWeight: 'bold',
        fontSize: RFPercentage(2)
    },
    locationInfo: {
        color: 'gray',
        alignItems: 'center',
        fontSize: RFPercentage(5),
    },
    heading5: {
        fontSize: RFPercentage(4),
        marginVertical: 10,
        color: 'red'
    }
});

const mapStateToProps = (state) => ({
    customerLocation: `${state.latitude},${state.longitude}`,
})

export default connect(mapStateToProps)(Customer_main)
