import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    SafeAreaView,
    Platform,
    KeyboardAvoidingView,
    BackHandler,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {CommonActions} from '@react-navigation/native'

import {
    is_order_accomplished,
    order_was_canceled,
    order_is_accomplished,
    reason_for_the_cancellation,
    send,
} from '../common_files/Texts'

export default class DriverHasOrder extends React.Component {
    state = {
        isModalVisible: false,
        isDisabled: true,
        cancellationMessage: '',
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backAction)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction)
    }

    handleMsg = (text) => {
        this.setState({cancellationMessage: text})
        {
            this.state.cancellationMessage.length >= 2
                ? this.setState({isDisabled: false})
                : this.setState({isDisabled: true})
        }
    }

    enableKeyPress = (event) => {
        {
            this.state.cancellationMessage.length >= 3
                ? this.submitCancellation(event.nativeEvent.text)
                : null
        }
    }

    submitCancellation = () => {
        this.setState({isModalVisible: false})
        this.props.navigation.navigate('Driver Home')
    }

    backAction = () => {
        Alert.alert(
            'Er oppdraget utført?',
            '',
            [
                {text: 'Nei', onPress: () => null, style: 'cancel'},
                {},
                {
                    text: 'Utført',
                    onPress: () => this.submitCancellation(),
                },
            ],
            {cancelable: true}
        )
        return true
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text style={styles.is_order_accomplished}>
                            {is_order_accomplished}
                        </Text>
                    </View>
                    <View style={styles.accomplished_buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchableAccomplishedContainer}
                            onPress={() =>
                                this.props.navigation.navigate('Driver Home')
                            }
                        >
                            <Text style={styles.accomplished_button}>
                                {order_is_accomplished}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.orderCancel_buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchableCancelButtonContainer}
                        >
                            <Text
                                style={styles.orderCancel_button}
                                onPress={() =>
                                    Alert.alert(
                                        'Hva er grunnen til kanselleringen?',
                                        '',
                                        [
                                            {
                                                text: 'Kunden møtte ikke opp',
                                                onPress: () =>
                                                    this.props.navigation.navigate(
                                                        'Driver Home'
                                                    ),
                                            },
                                            {},
                                            {
                                                text: 'Noe annet',
                                                onPress: () => {
                                                    this.setState({
                                                        isModalVisible: true,
                                                    })
                                                },
                                                style: 'cancel',
                                            },
                                        ],
                                        {
                                            cancelable: false,
                                        }
                                    )
                                }
                            >
                                {order_was_canceled}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.isModalVisible && (
                        <Modal
                            animationType="none"
                            transparent={true}
                            presentationStyle={'overFullScreen'}
                            onRequestClose={() => {
                                this.setState({isModalVisible: false})
                            }}
                        >
                            <KeyboardAvoidingView
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
                                style={styles.modalContainer}
                            >
                                <View style={styles.modalView_android}>
                                    <View style={styles.modalTextContainer}>
                                        <Text style={styles.modalText}>
                                            {reason_for_the_cancellation}
                                        </Text>
                                    </View>
                                    <View style={styles.reasonContainer}>
                                        <TextInput
                                            style={styles.reason}
                                            behavior="padding"
                                            placeholder="Skriv her"
                                            keyboardAppearance="default"
                                            multiline={true}
                                            maxLength={150}
                                            autoFocus={true}
                                            blurOnSubmit={false}
                                            onSubmitEditing={
                                                this.enableKeyPress
                                            }
                                            onChangeText={this.handleMsg}
                                        />
                                    </View>
                                    <View
                                        style={styles.sendReasonButtonContainer}
                                    >
                                        <TouchableOpacity
                                            style={
                                                styles.touchableSendReasonButtonContainer
                                            }
                                        >
                                            <Text
                                                style={styles.sendReasonButton}
                                                disabled={this.state.isDisabled}
                                                onPress={
                                                    this.submitCancellation
                                                }
                                            >
                                                {send}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </Modal>
                    )}
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
        flex: 0.2,
        padding: 10,
        justifyContent: 'center',
    },
    accomplished_buttonContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    orderCancel_buttonContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        paddingTop: 30,
        paddingHorizontal: 10,
    },

    is_order_accomplished: {
        flex: 1,
        fontSize: RFPercentage(5.5),
        textAlign: 'center',
    },
    touchableAccomplishedContainer: {
        flex: 0.4,
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    touchableCancelButtonContainer: {
        flex: 0.3,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
    accomplished_button: {
        textAlign: 'center',
        fontSize: RFPercentage(5),
    },

    orderCancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
    },

    modalView_ios: {
        flex: 0.6,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalView_android: {
        flex: 0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalTextContainer: {
        flex: 0.4,
        justifyContent: 'center',
    },
    reasonContainer: {
        flex: 0.55,
        alignSelf: 'stretch',
        padding: 20,
        textAlignVertical: 'center',
    },
    sendReasonButtonContainer: {
        flex: 0.15,
        justifyContent: 'flex-end',
        padding: 10,
    },
    modalText: {
        flex: 1,
        padding: 20,
        fontSize: RFPercentage(3.5),
        textAlign: 'center',
        textAlignVertical: 'center',
        marginHorizontal: 5,
    },
    reason: {
        flex: 1,
        justifyContent: 'flex-start',
        color: '#3467eb',
        fontSize: RFPercentage(3.5),
    },
    touchableSendReasonButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
        padding: 10,
    },
    sendReasonButton: {
        fontSize: RFPercentage(3.5),
        textAlignVertical: 'center',
    },
})
