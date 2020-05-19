import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Constants from 'expo-constants/src/Constants'
import { createStackNavigator } from '@react-navigation/stack'
import { RFPercentage } from 'react-native-responsive-fontsize'


import WelcomeScreen from '../common_files/WelcomeScreen'
import Privacy from '../common_files/Privacy'
import Terms_of_service from '../common_files/Terms_of_service'
import SignUp from '../signUp/SignUp'
import Verifying_mob_num from '../signUp/Verifying_mob_num'

const SignUpStack = createStackNavigator()

class NewSignUpStack extends React.Component {
    render() {
        return (
            <SignUpStack.Navigator initial='WelcomeScreen'>
                <SignUpStack.Screen
                    name='SplashScreen'
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <SignUpStack.Screen
                    name='WelcomeScreen'
                    component={WelcomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <SignUpStack.Screen
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
                <SignUpStack.Screen
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
                <SignUpStack.Screen
                    name='Number_registration'
                    component={SignUp}
                    options={{
                        title: 'Registrer mobilnummer',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: RFPercentage(4),
                        }
                    }}
                />
                <SignUpStack.Screen
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
            </SignUpStack.Navigator>
        )
    }
}

class SplashScreen extends React.Component {
  state = {
      isVisible: true,
      isRegistered: false
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    })
  }

  componentDidMount() {
    var that = this
    setTimeout(function() {
      that.Hide_Splash_Screen()
    }, 5000)
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
        )
    }
  }
}

class SignUp_mode extends React.Component {
    render() {
        return (
            <NewSignUpStack/>
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
})

export default SignUp_mode
