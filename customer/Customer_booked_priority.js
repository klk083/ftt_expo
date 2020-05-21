import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import {cancel_taxi, looking_for_taxi_booked_priority} from '../common_files/Texts'

export default class Customer_main extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text
                            style={styles.looking_for_taxi}
                            onPress={() => this.props.navigation.navigate('Booking confirmation')}>{looking_for_taxi_booked_priority}</Text>
                    </View>
                    <View style={styles.activityContainer}>
                        <ActivityIndicator
                            size={Platform.OS === 'ios' ? 'large' : RFPercentage(12)}
                            style={styles.activityIndicator}
                        />
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
                                            onPress: () => this.props.navigation.reset({
                                                index: 0,
                                                routes: [{name: 'Home'}]
                                            }),
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
        padding: 10,
    },
    info_container: {
        flex: 0.3,
        justifyContent: 'flex-start',
    },
    activityContainer: {
        flex: 0.6,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    touchableCancelButton: {
        flex: 1,
        backgroundColor: 'firebrick',
        borderRadius: 15,
        padding: 10,
    },
    cancel_button: {
        flex: 1,
        textAlign: 'center',
        fontSize: RFPercentage(4),
    },
    looking_for_taxi: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: RFPercentage(6),
        textAlign: 'center',
    },
})
