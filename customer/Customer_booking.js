import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {cancel_taxi, looking_for_taxi, serverIp} from '../common_files/Texts'
import {getToken} from "../common_files/ourFunctions";
import store from "../redux/store";

class Customer_booking extends React.Component {

    componentDidMount() {
        this.interval = setInterval(() => this.searchForDriver(), 10000);
    }

    componentDidUpdate() {
        clearInterval(this.interval);

    }

    searchForDriver = async  () => {
        const tokenGotten = await getToken();
        await fetch(serverIp+ '/getOrderTaxiNum', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                orderId: this.props.orderId,
                token: tokenGotten,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.length) {
                    console.log(json[0].taxiNumber) // these should be stored
                    console.log(json[0].companyName) // these should be stored
                    clearInterval(this.interval);
                    console.log('try to navigate to booking confimataion')
                    this.props.navigation.navigate('Booking confirmation')
                    console.log(store.getState())
                }else{
                    console.log('did try to get taxinumber but failed')

                }
                })
            .catch(error => {
                console.error(error);
            });
    }

    submitCancelationButton = async () => {
        const tokenGotten = await getToken();
        await fetch(serverIp+ '/cancelOrder', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                orderId: this.props.orderId,
                token: tokenGotten,
            }),
        })
            .then((response) => response.text())
            .then((responseData) => {
                clearInterval(this.interval);
                this.props.navigation.navigate('Home')
                console.log(store.getState())
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text
                            style={styles.looking_for_taxi}
                            onPress={() => this.props.navigation.navigate('Booking priority')}>{looking_for_taxi}</Text>
                        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : RFPercentage(12)}
                                           style={styles.activityIndicator}/>
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
                                            onPress: () => this.submitCancelationButton(),
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
        padding: 20,
    },
    info_container: {
        flex: 0.9,
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 50,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    touchableCancelButtonContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
    looking_for_taxi: {
        fontSize: RFPercentage(7),
        textAlign: 'center',
    },
    cancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(4),
    },
})

const mapStateToProps = state => ({
    token: state.token,
    orderId: state.order_id.orderId,
})

export default connect(mapStateToProps)(Customer_booking)
