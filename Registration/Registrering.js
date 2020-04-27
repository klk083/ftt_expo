import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';

import { write_your_num, fft_info } from "../Common_files/Texts";

export default class App extends Component {
  state = {
    tlf: '',
    isDisabled: true
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
    Alert.alert(
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
    );
  };

  render() {
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
    fontSize: 35,
    //justifyContent: 'flex-start'
    flexDirection: 'row'
  },

  //container contents
  topInfo: {
    textAlign: 'center',
    fontSize: 45,
    color: 'dodgerblue',
  },
  fft_info:{
    textAlign: 'center',
    fontSize: 25,
    marginHorizontal: 25,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    fontSize: 40,
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: 'darkseagreen',
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
});
