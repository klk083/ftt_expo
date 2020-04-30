import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Modal, TouchableHighlight } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

import { write_your_num, fft_info } from "../Common_files/Texts";

export default class App extends Component {
  state = {
    tlf: '',
    isDisabled: true,
    modalVisible: false,
  };

  handleTlf = text => {
    this.setState({tlf: text})
    {(this.state.tlf.length === 7) ? this.setState({isDisabled: false}) : this.setState({isDisabled: true})}
  }

  enableKeyPress = (event) => {
    {
      (this.state.tlf.length === 8) ? this.verificationTlf(event.nativeEvent.text) : null
    }
  }

  verificationTlf = (tlfnr) => {
    this.setModalVisible(true)
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
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state
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
        <View style={styles.centeredView}>


        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Vi skal verifisere mobilnummeret ditt:</Text>

              <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        </View>
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    textAlign: "center"
  }

});
