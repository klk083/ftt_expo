import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';

import { verifisering_info, send_ny_sms } from '../Common_files/Texts'

export default class Verifying_mob_num extends React.Component {
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
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.info}>{verifisering_info}{this.props.route.params.tlf}</Text>
          <Text style={styles.wrongNum} onPress={() => this.props.navigation.navigate('Number_registration')}>Feil nummer?</Text>
        </View>
        <View style={styles.row}>
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
            ref={input => { this.textInput = input }}
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text
                style={styles.button}
                onPress={() => this.sendNewCode()}
                >{send_ny_sms}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text
                style={styles.button}
                onPress={() => {}}>Ring meg for verifisering</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  row: {
    alignItems: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: 100,
  },
  info: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  code: {
    marginTop: 30,
    color: '#3467eb',
    marginBottom: 5,
    fontSize: 35,
  },
  button: {
    alignItems: 'center',
    fontSize: 30,
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: 'darkseagreen',
    padding: 10,
    marginTop: 20,
  },
  wrongNum: {
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
