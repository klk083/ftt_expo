import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getPreciseDistance } from 'geolib'
import { RFPercentage } from "react-native-responsive-fontsize";

import {book_taxi, basic_price} from '../Common_files/Texts'

export default class Client_main extends React.Component {
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
        clientPhone: '+4712345678',
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

    getDistanceBetweenClientAndDriver = () => {
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

    render() {
        const {location, geocode, accuracy, altitude, heading, latitude, longitude, speed, distanceBetween, clientPhone} = this.state

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
                            <TouchableOpacity onPress={() => this.getDistanceBetweenClientAndDriver()}>
                                <Text style={styles.heading5}>{
                                    (location ? ((this.state.distanceBetween === 0) ? 'Trykk for å måle avstand' : `Du er ${distanceBetween} km unna i luftlinje.`) : null)
                                }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity>
                                <Text style={styles.button}
                                      onPress={() => this.props.navigation.navigate('Booking',
                                          {clientPhone: clientPhone, clientLocation: location})}
                                >{book_taxi}</Text>
                                <Text style={styles.button_price}
                                      onPress={() => this.props.navigation.navigate('Booking_priority',
                                          {clientLocation: this.state.location}
                                          )}>({basic_price})</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
                {!this.state.isGranted && (
                    <View style={styles.locationContainer}>
                        <Text style={styles.heading4}>Du må slå på lokasjonen</Text>
                        <Text style={styles.heading4}>for å bruke appen</Text>
                        <View style={styles.spaceBetweenViews}>
                            <View style={styles.buttonContainerLocation}>
                                <TouchableOpacity onPress={this.getLocationAsync}>
                                    <Text style={styles.buttonLocation}>Slå på {'\n'}lokasjonen</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.3,
        paddingBottom: 40,
        borderRadius: 25,
        backgroundColor: 'darkseagreen',
    },
    button: {
        textAlign: 'center',
        fontSize: RFPercentage(12),
        paddingHorizontal: 90,
    },
    button_price: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
    },


    locationContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainerLocation: {
        borderRadius: 25,
        backgroundColor: 'firebrick',
        justifyContent: 'center'
    },
    buttonLocation: {
        textAlign: 'center',
        fontSize: RFPercentage(6),
        padding: 15
    },


    heading1: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: RFPercentage(4),
        margin: 20
    },
    heading2: {
        color: 'gray',
        margin: 5,
        fontWeight: 'bold',
        fontSize: RFPercentage(2)
    },
    heading4: {
        color: 'gray',
        alignItems: 'center',
        fontSize: RFPercentage(5),
    },
    heading5: {
        fontSize: RFPercentage(4),
        marginVertical: 30,
        color: 'red'
    }
});
