import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import {cancel_taxi, looking_for_taxi_booked_priority} from '../common_files/Texts'

export default class Customer_main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text
                        style={styles.looking_for_taxi}
                        onPress={() => this.props.navigation.navigate('Booking confirmation')}>{looking_for_taxi_booked_priority}</Text>
                </View>
                <View style={styles.activityContainer}>
                    <ActivityIndicator style={styles.activityIndicator} size={RFPercentage(10)} color='black' />
                </View>
                <View style={styles.cancel_buttonContainer}>
                    <TouchableOpacity style={styles.touchableCancelButton}>
                        <Text
                            style={styles.cancel_button}
                            onPress={() => Alert.alert(
                                'Avbestilling',
                                'Vil du avbestille taxi likevel?',
                                [
                                    {
                                        text: 'Ja',
                                        onPress: () => this.props.navigation.navigate('Home'),
                                    },
                                    {},
                                    {
                                        text: 'Nei',
                                        onPress: () => {},
                                        style: 'cancel',
                                    },
                                ],
                                {
                                    cancelable: false
                                },
                            )}
                            >{cancel_taxi}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    info_container: {
        flex: 0.2,
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    activityContainer: {
        flex: 0.6,
    },
    activityIndicator: {
        flex:1,
        justifyContent: 'flex-start'
    },
    cancel_buttonContainer: {
        flex: 0.1,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    touchableCancelButton: {
        flex: 0.8,
        backgroundColor: 'firebrick',
        borderRadius: 15,
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
    },
    cancel_button: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: RFPercentage(4),
    },
    looking_for_taxi: {
        flex: 1,
        textAlignVertical: 'center',
        fontSize: RFPercentage(6),
        textAlign: 'center',
    }
});
