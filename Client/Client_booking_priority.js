import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'

import {cancel_taxi, looking_for_taxi_priority, priority_price, buy_yourself_out_of_queue} from '../Common_files/Texts'

export default class Client_main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text
                        style={styles.looking_for_taxi_priority}
                        onPress={() => this.props.navigation.navigate('Client_taxi_confirmation')}
                    >{looking_for_taxi_priority}</Text>
                    <ActivityIndicator size='large' color='black' />
                </View>
                <View style={styles.priority_buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Booked_priority')}>
                        <Text
                            style={styles.priority_button}
                        >{buy_yourself_out_of_queue}</Text>
                        <Text
                            style={styles.priority_button}
                        >({priority_price})</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cancel_buttonContainer}>
                    <TouchableOpacity>
                        <Text
                            style={styles.cancel_button}
                            onPress={() => Alert.alert(
                                'Avbestilling',
                                'Vil du avbestille taxi likevel?',
                                [
                                    {
                                        text: 'Ja',
                                        onPress: () => this.props.navigation.navigate('Client Home'),
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
        flex: 0.5,
    },
    looking_for_taxi_priority: {
        fontSize: 40,
        marginTop: 50,
        marginBottom: 50,
        textAlign: 'center',
    },
    priority_buttonContainer: {
        flex: 0.35,
        alignItems: 'center',
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 100,
        justifyContent: 'center',
    },
    priority_button: {
        textAlign: 'center',
        fontSize: 40,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        paddingTop: 100,
        paddingBottom: 20,
        alignItems: 'center',
    },
    cancel_button: {
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
});
