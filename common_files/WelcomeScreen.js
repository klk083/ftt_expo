import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { privacyTitle, terms_of_serviceTitle, welcome_to, read_our, confirmPrivacyTermsOfService, acceptAndContinue} from './Texts'


export default class WelcomeScreen extends Component {
  render() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>{welcome_to}</Text>
            </View>
            <Image
                source={require('../assets/fast_track_taxi_logo_ferdig.png')}
                style={styles.logoContainer}
            />
            <View style={styles.infoContainer}>
              <View style={styles.infoTextContainer}>
                <Text style={styles.instructions}>{read_our}
                  <Text style={styles.linked} onPress={() => this.props.navigation.navigate('Privacy')}
                  >{privacyTitle}</Text>{confirmPrivacyTermsOfService}
                  <Text style={styles.linked}
                        onPress={() => this.props.navigation.navigate('TermsOfService')}
                  >{terms_of_serviceTitle}</Text>.
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.touchableButtonContainer}>
                  <Text style={styles.confirmButton} onPress={() => {
                    this.props.navigation.navigate('Number_registration')
                  }}>{acceptAndContinue}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeTextContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 2,
    width: 380,
    height: 380,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  welcomeText: {
    fontSize: RFPercentage(8),
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'stretch',
  },
  instructions: {
    flex: 1,
    textAlign: 'center',
    fontSize: RFPercentage(3),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  linked: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },


  infoTextContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  touchableButtonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'darkseagreen',
  },
  confirmButton: {
    textTransform: 'uppercase',
    alignItems: 'center',
    fontSize: RFPercentage(4),
  },
})
