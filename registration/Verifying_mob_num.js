import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

import { verifisering_info, send_ny_sms } from '../common_files/Texts'
import {updateCustomerLocation, updateToken} from "../redux/actions";
import {connect} from "react-redux";
import store from "../redux/store";

class Verifying_mob_num extends React.Component {
  state = {
    code: '',
    textInput: '',
    isModalVisible: false
  }

  handleCode = text => {
    this.setState({code: text})
  }

  enableKeyPress = (event) => {
    {
      (event.nativeEvent.text)
      //(this.state.code.length === 6) ? this.verificationCode(event.nativeEvent.text) : null
    }
  }

  sendNewCode = () => {
    this.textInput.clear();
    //      SEND      NY      KODE
  }

  verificationCode = (code) => {
    Alert.alert(
        'Vi sjekker om koden (' + code + ') er riktig.',
        '',
        [
          {},
          {},
          {
            text: 'OK',
            onPress: () => console.log('OK ble valgt')
          },
        ],
        {cancelable: false},
    );
  }

  submitSignIn = () => {
    store.dispatch(updateToken('userConfirmed'))
    console.log(store.getState())
  }

  render() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.info}>{verifisering_info}{this.props.route.params.tlf}</Text>
              <Text style={styles.wrongNum} onPress={() => this.props.navigation.navigate('Number_registration')}>Feil
                nummer?</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.code}
                  placeholder="--- ---"
                  keyboardAppearance="default"
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus={true}
                  blurOnSubmit={false}
                  onSubmitEditing={this.enableKeyPress}
                  onChangeText={this.handleCode}
                  ref={input => {
                    this.textInput = input
                  }}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.confirmButtonContainer}>
                <TouchableOpacity style={styles.touchableButtonContainer} onPress={() => this.submitSignIn()}>
                  <Text
                      style={styles.button}>BEKREFT</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sendNewCodeButtonContainer}>
                <TouchableOpacity style={styles.touchableButtonContainer} onPress={() => this.sendNewCode()}>
                  <Text
                      style={styles.button}
                  >{send_ny_sms}</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:2}} />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  confirmButtonContainer: {
    flex: 1,
  },
  sendNewCodeButtonContainer: {
    flex: 1,
    paddingTop: 50
  },
  touchableButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'darkseagreen',
  },
  info: {
    fontSize: RFPercentage(4),
    textAlign: 'center',
    color: 'black',
  },
  code: {
    flex: 1,
    color: '#3467eb',
    fontSize: RFPercentage(5),
    padding: 5
  },
  button: {
    alignItems: 'center',
    fontSize: RFPercentage(4),
    textAlign: 'center',
  },
  wrongNum: {
    fontSize: RFPercentage(4),
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

const mapStateToProps = (state) => ({
  customerLocation: `${state.latitude},${state.longitude}`,
  orderId: state.customerPhone,
  deviceId: state.deviceId,
  user: state.isGranted,
})

const mapDispatchToProps = {
  updateCustomerLocation,
  updateToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Verifying_mob_num)
