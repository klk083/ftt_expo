import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'

import {cancel_taxi, looking_for_taxi} from '../Common_files/Texts'

export default class Client_main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text
                        style={styles.looking_for_taxi}
                        onPress={() => this.props.navigation.navigate('Client_taxi_confirmation')}>{looking_for_taxi}</Text>
                    <ActivityIndicator size='large' color='black' />
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
                                        onPress: () => this.props.navigation.goBack(),
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
      flex: 0.85,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        paddingTop: 100,
        alignItems: 'center',
    },
    cancel_button: {
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
    button_price: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 10,
        backgroundColor: 'darkseagreen',
    },
    looking_for_taxi: {
        fontSize: 40,
        marginTop: 50,
        marginBottom: 50,
    }
});
