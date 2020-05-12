import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal  } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import { is_order_accomplished, order_was_canceled, order_is_accomplished, reason_for_the_cancellation } from '../common_files/Texts'

export default class DriverHasOrder extends React.Component {
    state = {
        isModalVisible: false,
        isDisabled: true,
        cancellationMessage: '',
    }

    handleMsg = text => {
        this.setState({cancellationMessage: text})
        {
            (this.state.cancellationMessage.length >= 2) ? this.setState({isDisabled: false}) : this.setState({isDisabled: true})
        }
    }

    enableKeyPress = (event) => {
        {
            (this.state.cancellationMessage.length >= 3) ? this.submitCancellation(event.nativeEvent.text) : null
        }
    }

    submitCancellation = () => {
        this.setState({isModalVisible: false})
        this.props.navigation.navigate('Driver Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text style={styles.is_order_accomplished}>{is_order_accomplished}</Text>
                </View>
                <View style={styles.accomplished_buttonContainer}>
                    <TouchableOpacity
                        style={styles.touchableAccomplishedContainer}
                        onPress={() => this.props.navigation.navigate('Driver Home')}>
                        <Text style={styles.accomplished_button}>{order_is_accomplished}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderCancel_buttonContainer}>
                    <TouchableOpacity style={styles.touchableCancelButtonContainer}>
                        <Text
                            style={styles.orderCancel_button}
                            onPress={() => Alert.alert(
                                'Hva er grunnen til kanselleringen?',
                                '',
                                [
                                    {
                                        text: 'Kunden møtte ikke opp',
                                        onPress: () => this.props.navigation.navigate('Driver Home'),
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
                    //style={{backgroundColor:'blue'}}
                    presentationStyle={'overFullScreen'}
                    onRequestClose={() => {this.setState({isModalVisible: false})}}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{reason_for_the_cancellation}</Text>
                            <TextInput
                                style={styles.reason}
                                behavior='padding'
                                placeholder="Skriv her"
                                keyboardAppearance="default"
                                multiline={true}
                                maxLength={200}
                                autoFocus={true}
                                blurOnSubmit={false}
                                onSubmitEditing={this.enableKeyPress}
                                onChangeText={this.handleMsg}
                            />
                            <View style={styles.sendReasonButtonContainer}>
                                <TouchableOpacity>
                                    <Text
                                        style={styles.sendReasonButton}
                                        disabled={this.state.isDisabled}
                                        onPress={this.submitCancellation}>Send</Text>
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
        justifyContent: 'space-between',
    },
    info_container: {
        flex: 0.2,
        justifyContent: 'center',
    },
    accomplished_buttonContainer: {
        flex: 0.5,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    orderCancel_buttonContainer: {
        flex: 0.2,
        paddingBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },


    is_order_accomplished: {
        fontSize: RFPercentage(6),
        textAlign: 'center',
    },
    touchableAccomplishedContainer: {
        flex: 0.4,
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    touchableCancelButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    accomplished_button: {
        textAlign: 'center',
        fontSize: RFPercentage(5),
    },


    orderCancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
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
