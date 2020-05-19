import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import {cancel_taxi, looking_for_taxi_priority, priority_price, buy_yourself_out_of_queue} from '../common_files/Texts'

export default class Customer_main extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text
                            style={styles.looking_for_taxi_priority}
                            onPress={() => this.props.navigation.navigate('Booking confirmation')}
                        >{looking_for_taxi_priority}</Text>
                    </View>
                    <View style={styles.activity_spinner}>
                        <ActivityIndicator
                            size={Platform.OS === 'ios' ? 'large' : RFPercentage(12)}
                            style={styles.activityIndicator}/>
                    </View>
                    <View style={styles.priority_buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchablePriorityContainer}
                            onPress={() => this.props.navigation.navigate('Booking priority booked')}>
                            <Text style={styles.priority_button}>{buy_yourself_out_of_queue}</Text>
                            <Text style={styles.priority_button_price}>({priority_price})</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cancel_buttonContainer}>
                        <TouchableOpacity style={styles.touchableCancelButtonContainer}>
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
                                            onPress: () => {
                                            },
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
        justifyContent: 'space-between',
        padding: 5,
    },
    info_container: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    activity_spinner: {
        flex: 0.2,
        justifyContent: 'flex-start',
    },
    priority_buttonContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cancel_buttonContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    touchablePriorityContainer: {
        flex: 0.55,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
    },
    looking_for_taxi_priority: {
        flex: 1,
        fontSize: RFPercentage(6),
        textAlign: 'center',
    },
    priority_button: {
        flex: 0.6,
        textAlign: 'center',
        padding: 10,
        fontSize: RFPercentage(5),
    },
    priority_button_price: {
        flex: 0.4,
        textAlign: 'center',
        color: 'gray',
        fontSize: RFPercentage(4),
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    touchableCancelButtonContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
    cancel_button: {
        flex: 1,
        textAlign: 'center',
        fontSize: RFPercentage(4),
    },
})
