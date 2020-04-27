import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Constants from 'expo-constants/src/Constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "./WelcomeScreen";
import Privacy from "./Privacy";
import Terms_of_service from "./Terms_of_service";
import Registrering from "../Registration/Registrering";
import Verifying_mob_num from "../Registration/Verifying_mob_num";
import Client_taxi_confirmation from "../Client/Client_taxi_confirmation";

const RegistrationStack = createStackNavigator();

class NewRegistrationStack extends React.Component {
  render() {
    return (
        <RegistrationStack.Navigator>
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
                  fontSize: 30,
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
                  fontSize: 30,
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
                  fontSize: 30,
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
                  fontSize: 30,
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
      )
    } else {
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
        <NavigationContainer>
          <NewRegistrationStack />
        </NavigationContainer>
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
    //backgroundColor: '#84b07f',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    color: '#000000',
  },
  instructions: {
    margin: 5,
    textAlign: 'center',
    color: '#000000',
    fontSize: 25,
    marginBottom: 5,
  },
  button: {
    margin: 20,
    padding: 15,
    minWidth: '70%',
    minHeight: '15%',
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
    //backgroundColor: '#009933',
    paddingVertical: 60,
  },
});

export default Registration_mode;
