import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

import {write_your_num, fft_info, reason_for_the_cancellation} from "../common_files/Texts";

export default class SingUp extends React.Component {
  state = {
    tlf: '',
    isDisabled: true,
    isModalVisible: false,
  };

  handleTlf = text => {
    this.setState({tlf: text})
    {
      (this.state.tlf.length === 7) ? this.setState({isDisabled: false}) : this.setState({isDisabled: true})
    }
  }

  enableKeyPress = (event) => {
    {
      (this.state.tlf.length === 8) ? this.verificationTlf(event.nativeEvent.text) : null
    }
  }

  verificationTlf = (tlfnr) => {
    this.setState({isModalVisible: true})
    /*Alert.alert(
      'Vi skal verifisere mobilnummeret ditt:',
      '+47 ' + tlfnr + '\n\nEr det OK, eller vil du endre numeret?',
      [
        {
          text: 'Endre',
          style: 'cancel',
        },
        {},
        {text: 'OK', onPress: () => {
          this.props.navigation.navigate('Number_verification', {tlf: tlfnr})}},
      ],
      {cancelable: false, onDismiss: () => {}},
    );*/
  }
  submit = () => {
    this.setState({isModalVisible: false})
    this.props.navigation.navigate('Number_verification', {tlf: this.state.tlf})
  }

  render() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                                style={styles.container}>
            <View style={styles.topInfoContainer}>
              <Text style={styles.topInfo}>{write_your_num}</Text>
              <Text style={styles.fft_info}>{fft_info}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.mobnum}>+47 </Text>
              <TextInput
                  style={styles.mobnum}
                  behavior='padding'
                  placeholder="mobilnummer"
                  keyboardAppearance="default"
                  keyboardType="number-pad"
                  maxLength={8}
                  returnKeyType='next'
                  autoFocus={true}
                  blurOnSubmit={false}
                  onSubmitEditing={this.enableKeyPress}
                  onChangeText={this.handleTlf}
              />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.touchableButtonContainer}>
              <Text
                  style={styles.button}
                  disabled={this.state.isDisabled}
                  onPress={() => this.verificationTlf(this.state.tlf)}>Neste</Text>
            </TouchableOpacity>
            </View>
            {this.state.isModalVisible &&
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
                    <Text style={styles.modalText}>Vi skal verifisere mobilnummeret ditt:</Text>
                    <Text style={styles.modalText}>+47 {this.state.tlf} {'\n\n'}Er det OK, eller vil du endre
                      nummeret?</Text>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <View style={styles.changeButtonContainer}>
                      <TouchableOpacity>
                        <Text style={styles.changeButton} onPress={() => {
                          this.setState({isModalVisible: false})
                        }}>Endre</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.okButtonContainer}>
                      <TouchableOpacity>
                        <Text style={styles.okButton} onPress={() => this.submit()}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            }
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
    justifyContent: 'space-evenly',
  },
  topInfoContainer: {
    flex: 1,
  },
  touchableButtonContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },

  mobnum: {
    color: '#3467eb',
    fontSize: RFPercentage(4),
    flexDirection: 'row'
  },
  topInfo: {
    textAlign: 'center',
    fontSize: RFPercentage(5),
    color: 'dodgerblue',
  },
  fft_info:{
    textAlign: 'center',
    fontSize: RFPercentage(3),
    paddingHorizontal: 10,
  },

  button: {
    alignItems: 'center',
    fontSize: RFPercentage(6),
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: 'darkseagreen',
  },
  modalView: {
    flex: 0.3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'space-evenly',
    borderRadius: 20,
    padding: 15,
  },
  modalText: {
    //marginBottom: 15,
    textAlign: "center",
    alignItems: 'flex-start',
    fontSize: RFPercentage(3),
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingHorizontal: 10
  },
  textContainer: {
    flex: 0.7
  },
  buttonsContainer:  {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  changeButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  okButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  changeButton: {
    fontSize: RFPercentage(3.5),
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  okButton: {
    fontSize: RFPercentage(3.5),
    backgroundColor: 'darkseagreen',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
    textAlign: 'right'
  }

});
