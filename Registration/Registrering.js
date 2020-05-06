import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Modal, TouchableHighlight } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

import {write_your_num, fft_info, reason_for_the_cancellation} from "../Common_files/Texts";

export default class App extends Component {
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

  render() {
    const {modalVisible} = this.state
    return (
        <View style={styles.container}>
          <Text style={styles.topInfo}>{write_your_num}</Text>
          <Text style={styles.fft_info}>{fft_info}</Text>
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
          <TouchableOpacity>
            <Text
                style={styles.button}
                disabled={this.state.isDisabled}
                onPress={() => this.verificationTlf(this.state.tlf)}>Neste</Text>
          </TouchableOpacity>
          <View style={styles.centeredView}>{}</View>
          {this.state.isModalVisible &&
              <Modal
                  animationType="none"
                  transparent={true}
                  style={styles.mainModalContainer}
                  presentationStyle={'overFullScreen'}
                  onRequestClose={() => {this.setState({isModalVisible: false})}}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <View style={styles.textContainer}>
                    <Text style={styles.modalText}>Vi skal verifisere mobilnummeret ditt:</Text>
                    <Text style={styles.modalText}>+47 {this.state.tlf} {'\n\n'}Er det OK, eller vil du endre numeret?</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                      <View style={styles.changeButtonContainer}>
                        <TouchableOpacity>
                          <Text style={styles.changeButton}>Endre</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.okButtonContainer}>
                        <TouchableOpacity>
                          <Text style={styles.okButton} >OK</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },

  // Containers
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // rowContainer contents
  mobnum: {
    //marginTop: 30,
    color: '#3467eb',
    marginBottom: 5,
    fontSize: RFPercentage(5),
    //justifyContent: 'flex-start'
    flexDirection: 'row'
  },

  //container contents
  topInfo: {
    textAlign: 'center',
    fontSize: RFPercentage(6),
    color: 'dodgerblue',
  },
  fft_info:{
    textAlign: 'center',
    fontSize: RFPercentage(3.5),
    marginHorizontal: 25,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    fontSize: RFPercentage(6),
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: 'darkseagreen',
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 5
  },




  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    padding: 35,
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    alignItems: 'flex-start',
    fontSize: RFPercentage(3),
  },



  mainModalContainer: {
    flex: 0.4
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  textContainer: {
    //flex: 0.7
  },
  buttonsContainer:  {
    //flex: 0.3,
    flexDirection: 'row',
    paddingTop: 30,
    alignContent: 'space-between'
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  changeButtonContainer: {

  },
  okButtonContainer: {

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
