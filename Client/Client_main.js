import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getPreciseDistance } from 'geolib'

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
        secondLocation: {latitude: 63.430487, longitude: 10.394978}
    }

    componentDidMount() {
        this.getLocationAsync().catch()
    }

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({errorMessage: 'granted', isGranted: true})
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
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

    render() {
        const {location, geocode, errorMessage, accuracy, altitude, heading, latitude, longitude, speed, distanceBetween} = this.state

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
                            <TouchableOpacity onPress={() => this.getDistanceBetweenClientAndDriver()}>
                                <Text style={styles.heading5}>{
                                    (this.state.distanceBetween === 0) ? 'Trykk for å måle avstand' : `Du er ${distanceBetween} km unna i luftlinje.`
                                }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity>
                                <Text style={styles.button}
                                      onPress={() => this.props.navigation.navigate('Booking')}>{book_taxi}</Text>
                                <Text style={styles.button_price}
                                      onPress={() => this.props.navigation.navigate('Booking_priority')}>({basic_price})</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
                {!this.state.isGranted && (
                    <View style={styles.locationContainer}>
                        <View style={styles.spaceBetweenViews}>
                            <Text style={styles.heading4}>{errorMessage}</Text>
                            <View style={styles.buttonContainerLocation}>
                                <TouchableOpacity onPress={this.getLocationAsync}>
                                    <Text style={styles.buttonLocation}>Slå på lokasjonen</Text>
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
        fontSize: 90,
        paddingHorizontal: 90,
    },
    button_price: {
        textAlign: 'center',
        fontSize: 20,
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
        fontSize: 50,
        paddingHorizontal: 20,
    },


    heading1:{
        color:"gray",
        fontWeight:"bold",
        fontSize:30,
        margin:20
    },
    heading2:{
        color:"gray",
        margin:5,
        fontWeight:"bold",
        fontSize:15
    },
    heading3:{
        color:"gray",
        margin:5
    },
    heading4:{
        color:"gray",
        marginVertical:45,
        fontSize:25,
    },
    heading5: {
        fontSize: 30,
        justifyContent: 'center',
        marginVertical: 30,
        color: 'red'
    }
});
