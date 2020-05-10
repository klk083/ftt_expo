import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal  } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import { is_order_accomplished, order_was_canceled, order_is_accomplished, reason_for_the_cancellation } from '../common_files/Texts'

export default class DriverHasOrder extends React.Component {
    state = {
        isModalVisible: false
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text style={styles.is_order_accomplished}>{is_order_accomplished}</Text>
                </View>
                <View style={styles.accomplished_buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('driver Home')}>
                        <Text style={styles.accomplished_button}>{order_is_accomplished}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderCancel_buttonContainer}>
                    <TouchableOpacity>
                        <Text
                            style={styles.orderCancel_button}
                            onPress={() => Alert.alert(
                                'Hva er grunnen til kanselleringen?',
                                '',
                                [
                                    {
                                        text: 'Kunden møtte ikke opp',
                                        onPress: () => this.props.navigation.navigate('driver Home'),
                                    },
                                    {},
                                    {
                                        text: 'Noe annet',
                                        onPress: () => {this.setState({isModalVisible: true})},
                                        style: 'cancel',
                                    },
                                ],
                                {
                                    cancelable: false
                                },
                            )}
                            >{order_was_canceled}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.isModalVisible &&
                <Modal
                    animationType="none"
                    transparent={true}
                    style={{backgroundColor:'blue'}}
                    presentationStyle={'overFullScreen'}
                    onRequestClose={() => {this.setState({isModalVisible: false})}}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{reason_for_the_cancellation}</Text>
                            <TextInput
                                style={styles.reason}
                                placeholder="Skriv her"
                                keyboardAppearance="default"
                                multiline={true}
                                maxLength={200}
                                autoFocus={true}
                                onChangeText={this.handleTlf}
                            />
                            <View style={styles.sendReasonButtonContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.sendReasonButton}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                }
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
        flex: 0.1,
    },
    is_order_accomplished: {
        fontSize: RFPercentage(7),
        marginTop: 50,
        marginBottom: 50,
        textAlign: 'center',
    },
    accomplished_buttonContainer: {
        flex: 0.2,
        alignItems: 'center',
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 100,
        justifyContent: 'center',
    },
    accomplished_button: {
        textAlign: 'center',
        fontSize: RFPercentage(5),
    },
    orderCancel_buttonContainer: {
        flex: 0.7,
        paddingBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    orderCancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },


    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 100
    },
    modalText: {
        alignItems: 'flex-start',
        fontSize: RFPercentage(3.5),
        textAlign: 'center'
    },
    reason: {
        marginTop: 5,
        color: '#3467eb',
        fontSize: RFPercentage(3.5),
        marginLeft: 30,
        marginRight: 30,
    },
    sendReasonButtonContainer:  {
        paddingTop: 30,
        justifyContent: 'flex-end'
    },
    sendReasonButton: {
        fontSize: RFPercentage(3.5),
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});
