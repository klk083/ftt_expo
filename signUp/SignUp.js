import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {
    write_your_num,
    fft_info,
    country_code,
    next,
    confirming_mob_num,
    wants_change_num,
    change,
    ok,
} from '../common_files/Texts'
import {updateMobNum} from '../redux/actions'

class SignUp extends React.Component {
    state = {
        tlf: '',
        isDisabled: true,
        isModalVisible: false,
    }

    handleTlf = (text) => {
        this.setState({tlf: text.replace(/[^0-9]/g, '')})
        {
            this.state.tlf.length === 7
                ? this.setState({isDisabled: false})
                : this.setState({isDisabled: true})
        }
    }

    enableKeyPress = (event) => {
        {
            this.state.tlf.length === 8
                ? this.verificationTlf(event.nativeEvent.text)
                : null
        }
    }

    verificationTlf = () => {
        this.setState({isModalVisible: true})
    }
    submit = () => {
        this.setState({isModalVisible: false})
        this.props.navigation.navigate('Number_verification')
        this.props.updateMobNum(this.state.tlf.toString())
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <View style={styles.topInfoContainer}>
                        <Text style={styles.topInfo}>{write_your_num}</Text>
                        <Text style={styles.fft_info}>{fft_info}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.mobnum}>{country_code}</Text>
                        <TextInput
                            style={styles.mobnum}
                            behavior="padding"
                            placeholder="mobilnummer"
                            keyboardAppearance="default"
                            keyboardType="number-pad"
                            maxLength={8}
                            returnKeyType="next"
                            autoFocus={true}
                            blurOnSubmit={false}
                            onSubmitEditing={this.enableKeyPress}
                            onChangeText={this.handleTlf}
                            value={this.state.tlf}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchableButtonContainer}
                        >
                            <Text
                                style={styles.button}
                                disabled={this.state.isDisabled}
                                onPress={() =>
                                    this.verificationTlf(this.state.tlf)
                                }
                            >
                                {next}
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
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.modalTextInfo}>
                                            {confirming_mob_num}
                                        </Text>
                                        <Text style={styles.modalTextNum}>
                                            {country_code}
                                            {this.state.tlf}
                                        </Text>
                                        <Text style={styles.modalTextQuestion}>
                                            {wants_change_num}
                                        </Text>
                                    </View>
                                    <View style={styles.buttonsContainer}>
                                        <View
                                            style={styles.changeButtonContainer}
                                        >
                                            <TouchableOpacity
                                                style={
                                                    styles.touchableChangeButtonContainer
                                                }
                                            >
                                                <Text
                                                    style={styles.changeButton}
                                                    onPress={() => {
                                                        this.setState({
                                                            isModalVisible: false,
                                                        })
                                                    }}
                                                >
                                                    {change}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.okButtonContainer}>
                                            <TouchableOpacity
                                                style={
                                                    styles.touchableOkButtonContainer
                                                }
                                            >
                                                <Text
                                                    style={styles.okButton}
                                                    onPress={() =>
                                                        this.submit()
                                                    }
                                                >
                                                    {ok}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    )}
                </KeyboardAvoidingView>
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
        justifyContent: 'flex-start',
    },
    topInfoContainer: {
        flex: 1,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    touchableButtonContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'darkseagreen',
    },

    mobnum: {
        color: '#3467eb',
        fontSize: RFPercentage(4),
        flexDirection: 'row',
    },
    topInfo: {
        textAlign: 'center',
        fontSize: RFPercentage(5),
        color: 'dodgerblue',
    },
    fft_info: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
        paddingHorizontal: 10,
    },

    button: {
        flex: 1,
        alignItems: 'center',
        fontSize: RFPercentage(5),
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    modalView: {
        flex: 0.3,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 20,
        padding: 15,
    },
    modalTextInfo: {
        flex: 0.2,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'flex-start',
        fontSize: RFPercentage(3),
    },
    modalTextNum: {
        flex: 0.2,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'flex-start',
        fontSize: RFPercentage(3),
    },
    modalTextQuestion: {
        flex: 0.4,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'flex-start',
        fontSize: RFPercentage(3),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        paddingHorizontal: 10,
    },
    textContainer: {
        flex: 0.7,
    },
    buttonsContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
    },
    changeButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    touchableChangeButtonContainer: {
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
    },
    okButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    touchableOkButtonContainer: {
        backgroundColor: 'darkseagreen',
        borderRadius: 15,
    },
    changeButton: {
        fontSize: RFPercentage(3.5),
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    okButton: {
        fontSize: RFPercentage(3.5),
        paddingVertical: 5,
        paddingHorizontal: 20,
        textAlign: 'right',
    },
})

const mapDispatchToProps = {
    updateMobNum,
}

export default connect(null, mapDispatchToProps)(SignUp)
