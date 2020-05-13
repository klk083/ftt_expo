import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Constants from 'expo-constants/src/Constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage } from "react-native-responsive-fontsize";


import WelcomeScreen from "./WelcomeScreen";
import Privacy from "./Privacy";
import Terms_of_service from "./Terms_of_service";
import Registrering from "../registration/Registrering";
import Verifying_mob_num from "../registration/Verifying_mob_num";

const RegistrationStack = createStackNavigator();

class NewRegistrationStack extends React.Component {
  render() {
    return (
        <RegistrationStack.Navigator initial='WelcomeScreen'>
          <RegistrationStack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false
              }}
          />
            <RegistrationStack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false
                }}
            />
          <RegistrationStack.Screen
              name='Privacy'
              component={Privacy}
              options={{
                title: 'Personvern',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: RFPercentage(4),
                }
              }}
          />
          <RegistrationStack.Screen
              name='Terms_of_service'
              component={Terms_of_service}
              options={{
                title: 'Servicevilkår',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: RFPercentage(4),
                }
              }}
          />
          <RegistrationStack.Screen
              name='Number_registration'
              component={Registrering}
              options={{
                title: 'Registrer mobilnummer',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: RFPercentage(4),
                }
              }}
          />
          <RegistrationStack.Screen
              name='Number_verification'
              component={Verifying_mob_num}
              options={{
                headerTitle: 'Verifisering',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: RFPercentage(4),
                }
              }}
          />
        </RegistrationStack.Navigator>
    )
  }
}

class SplashScreen extends React.Component {
  state = {
      isVisible: true,
      isRegistered: false
  };

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 5000);
  }

  render() {
    if (this.state.isVisible === true) {
      return (
          <View style={styles.SplashScreen_RootView}>
            <View style={styles.SplashScreen_ChildView}>
              <Image
                  source={require('../assets/fast_track_taxi_logo_ferdig.png')}
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              />
            </View>
          </View>
      )}
      else {
        return (
            <View style={styles.MainContainer}>
                {!this.state.isRegistered && this.props.navigation.navigate('WelcomeScreen')}
            </View>
        );
    }
  }
}

class Registration_mode extends React.Component {
  render() {
    return (
        //<NavigationContainer>
          <NewRegistrationStack />
        //</NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Registration_mode;
