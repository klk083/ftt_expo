import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import {cancel_taxi, looking_for_taxi_priority, priority_price, buy_yourself_out_of_queue} from '../common_files/Texts'

export default class Customer_main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text
                        style={styles.looking_for_taxi_priority}
                        onPress={() => this.props.navigation.navigate('Booking confirmation')}
                    >{looking_for_taxi_priority}</Text>
                </View>
                <View style={styles.activity_spinner}>
                    <ActivityIndicator
                        style={{flex: 1}}
                        size={RFPercentage(10)}
                        color='black' />
                </View>
                <View style={styles.priority_buttonContainer}>
                    <TouchableOpacity style={styles.touchablePriorityContainer}
                        onPress={() => this.props.navigation.navigate('Booking priority booked')}>
                        <Text
                            style={styles.priority_button}
                        >{buy_yourself_out_of_queue}</Text>
                        <Text
                            style={styles.priority_button}
                        >({priority_price})</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cancel_buttonContainer}>
                    <TouchableOpacity style={{flex: 1}}>
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
    },
    info_container: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    activity_spinner: {
        flex: 0.2,
    },
    priority_buttonContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    touchablePriorityContainer: {
        flex: 0.5,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    looking_for_taxi_priority: {
        flex: 1,
        fontSize: RFPercentage(6),
        textAlign: 'center',
        paddingVertical: 10,
    },
    priority_button: {
        flex: 1,
        textAlign: 'center',
        fontSize: RFPercentage(6),
    },
    cancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(4),
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
});
