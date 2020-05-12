import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import {cancel_taxi, looking_for_taxi} from '../common_files/Texts'

export default class Customer_main extends React.Component {
    render() {
        const { customerLocation, customerPhone } = this.props.route.params;

        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text>CustomerPhone: {customerPhone}</Text>
                    <Text>CustomerLocation: {customerLocation.latitude}, {customerLocation.longitude}</Text>
                    <Text
                        style={styles.looking_for_taxi}
                        onPress={() => this.props.navigation.navigate('Booking priority')}>{looking_for_taxi}</Text>
                    <ActivityIndicator size={RFPercentage(10)} color='black' />
                </View>
                <View style={styles.cancel_buttonContainer}>
                    <TouchableOpacity >
                        <Text
                            style={styles.cancel_button}
                            onPress={() => Alert.alert(
                                'Avbestilling',
                                'Vil du avbestille taxi likevel?',
                                [
                                    {
                                        text: 'Ja',
                                        onPress: () => this.props.navigation.navigate('Home')//reset({index: 0, routes: [{name: 'Home'}]}),
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
        flex: 0.9,
        alignItems: 'center',
        paddingTop: 50,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
        alignItems: 'center',
    },
    looking_for_taxi: {
        fontSize: RFPercentage(7),
        paddingHorizontal: 15,
        paddingVertical: 15,
        textAlign: 'center',
    },
    cancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(4),
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    }
});
