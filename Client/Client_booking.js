import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import {cancel_taxi, looking_for_taxi} from '../Common_files/Texts'
import {getToken} from '../Common_files/ourFunctions'

export default class Client_main extends React.Component {

    state = {
        serverIp: 'http://192.168.1.22:8080',
        secretKey: '4ecf096c08b97a3b3ba79deae1d3bd865623da9e09b549f50da3eb7f93ac5c15',
        tokenGotten: '',
        orderId: '',
        errorMessage: "",

    }


    cancellationConfirmed = async (orderId) => {
        const {secretKey, tokenGotten, serverIp} = this.state;
        await fetch('http://192.168.1.22:8080/token', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                secretGotten: secretKey,
            }),
        })
            .then((response) => response.text())
            .then((responseData) => {
                this.setState({
                        tokenGotten: responseData,
                    }
                )
            })
            .catch(error => {
                console.error(error);

            });
        this.makeCancelation(orderId);
    }

    makeCancelation = async (orderId) => {
        let {tokenGotten,serverIp} = this.state;
        await fetch('http://192.168.1.22:8080/deleteorder', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                orderId: orderId,
                token: tokenGotten,
            }),
        })
            .then((response) => response.text())
            .then((responseData) => {
                this.props.navigation.reset({index: 0, routes: [{name: 'Client Home'}]})
            })
            .catch(error => {
                console.error(error);
            });
    }


    render() {
        const { clientLocation, clientPhone, orderId } = this.props.route.params;

        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text>ClientPhone: {clientPhone}</Text>
                    <Text>orderId: {orderId}</Text>
                    <Text>ClientLocation: {clientLocation.latitude}, {clientLocation.longitude}</Text>
                    <Text
                        style={styles.looking_for_taxi}
                        onPress={() => this.props.navigation.navigate('Client_taxi_confirmation')}>{looking_for_taxi}</Text>
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
                                        onPress: () => this.cancellationConfirmed(orderId),
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
        fontSize: RFPercentage(4),
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
    looking_for_taxi: {
        fontSize: RFPercentage(6),
        marginTop: 50,
        marginBottom: 50,
    }
});


