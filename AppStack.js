import React from 'react'
import {Text, TextInput} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {connect} from 'react-redux'

import SplashScreen from './common_files/SplashScreen'
import WelcomeScreen from './common_files/WelcomeScreen'
import Privacy from './common_files/Privacy'
import Terms_of_service from './common_files/Terms_of_service'
import SignUp from './signUp/SignUp'
import Verifying_mob_num from './signUp/Verifying_mob_num'
import LogoTitle from './common_files/LogoTitle'
import MenuButton from './common_files/MenuButton'
import CustomerStack from './customer/CustomerStack'
import DriverStack from './driver/DriverStack'

const AppStack = createStackNavigator()

class AppStackScreen extends React.Component {
    constructor() {
        super()
        Text.defaultProps = Text.defaultProps || {}
        // Ignore dynamic type scaling
        Text.defaultProps.allowFontScaling = false
        TextInput.defaultProps = TextInput.defaultProps || {}
        // Ignore dynamic type scaling
        TextInput.defaultProps.allowFontScaling = false
    }

    componentDidMount() {}

    render() {
        if (this.props.isLoading === 'true') return <SplashScreen />
        return (
            <NavigationContainer>
                {this.props.token === '' ? (
                    <AppStack.Navigator
                        screenOptions={{
                            headerTitleAlign: 'center',
                        }}
                    >
                        <AppStack.Screen
                            name="SignIn"
                            component={WelcomeScreen}
                            options={{headerShown: false, headerTitle: ''}}
                        />
                        <AppStack.Screen
                            name="Privacy"
                            component={Privacy}
                            options={{headerTitle: 'Personvern'}}
                        />
                        <AppStack.Screen
                            name="TermsOfService"
                            component={Terms_of_service}
                            options={{headerTitle: 'Servicevilkår'}}
                        />
                        <AppStack.Screen
                            name="Number_registration"
                            component={SignUp}
                            options={{headerTitle: 'Registrer mobilnummer'}}
                        />
                        <AppStack.Screen
                            name="Number_verification"
                            component={Verifying_mob_num}
                            options={{headerTitle: 'Verifisering'}}
                        />
                    </AppStack.Navigator>
                ) : (
                    <AppStack.Navigator
                        screenOptions={{
                            headerLeft: (props) => <LogoTitle {...props} />,
                            headerStyle: {
                                backgroundColor: 'darkseagreen',
                            },
                            headerRight: (props) => <MenuButton {...props} />,
                            headerTitle: false,
                        }}
                    >
                        {this.props.driver === 'true' ? (
                            <AppStack.Screen
                                name="Driver Stack"
                                component={DriverStack}
                            />
                        ) : (
                            <AppStack.Screen
                                name="Customer Stack"
                                component={CustomerStack}
                            />
                        )}
                    </AppStack.Navigator>
                )}
            </NavigationContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.loading,
    token: state.token,
    driver: state.userType,
})

export default connect(mapStateToProps)(AppStackScreen)
