import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

import { privacyTitle, terms_of_serviceTitle} from "./Texts";

export default class WelcomeScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.welcome}>Velkommen til</Text>
          </View>
          <Image
              source={require('../assets/fast_track_taxi_logo_ferdig.png')}
              style={{width: 380, height: 380}}
          />
          <Text style={styles.instructions}>
            Les vår <Text style={styles.linked} onPress={() => this.props.navigation.navigate('Privacy')}>{privacyTitle}</Text>. Trykk
            "Bekreft og fortsett" for å akseptere{' '}
            <Text style={styles.linked} onPress={() => this.props.navigation.navigate('Terms_of_service')}>{terms_of_serviceTitle}</Text>.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={styles.confirmButton} onPress={() => {this.props.navigation.navigate('Number_registration')}}>BEKREFT OG FORTSETT</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: RFPercentage(8),
    textAlign: 'center',
    color: '#000000',
  },
  instructions: {
    marginHorizontal: 30,
    lineHeight: 30,
    textAlign: 'center',
    color: '#000000',
    fontSize: RFPercentage(3),
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'darkseagreen',
    margin: 20,
    padding: 15,
  },
  linked: {
    marginTop: 10,
    textAlign: 'center',
    margin: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  confirmButton: {
    alignItems: 'center',
    fontSize: RFPercentage(5),
  },
});
