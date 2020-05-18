import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, NavigationAction } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Provider } from 'react-redux'
import {Text, TextInput} from 'react-native'


import SplashScreen from './common_files/SplashScreen'
import SplashScreenNew from './common_files/SplashScreenNew'
import Customer_main from './customer/Customer_main'
import Driver_main from './driver/Driver_main'
import SignUp from './registration/SignUp'
import LogoTitle from './common_files/LogoTitle'
import MenuButton from './common_files/MenuButton'
import { RFPercentage } from 'react-native-responsive-fontsize'
import store from "./redux/store";
import Customer_booking from "./customer/Customer_booking";
import Customer_booking_priority from "./customer/Customer_booking_priority";
import Customer_booked_priority from "./customer/Customer_booked_priority";
import Customer_taxi_confirmation from "./customer/Customer_taxi_confirmation";
import DriverHasOrder from "./driver/DriverHasOrder";
import WelcomeScreen from "./common_files/WelcomeScreen";
import Privacy from "./common_files/Privacy";
import Terms_of_service from "./common_files/Terms_of_service";
import Verifying_mob_num from "./registration/Verifying_mob_num";
import View from "react-native-web/src/exports/View";
import {updateToken} from "./redux/actions";



const AppStack = createStackNavigator()
//const SignInStack = createStackNavigator()
const CustomerDrawerStack = createDrawerNavigator()
const DriverDrawerStack = createDrawerNavigator()

class CustomerStack extends React.Component {
    render() {
        return (
            <CustomerDrawerStack.Navigator drawerPosition='right' drawerStyle={{width: 200}}>
                <CustomerDrawerStack.Screen name='Home' component={Customer_main} options={{drawerLabel: 'Hjem'}}/>
                <CustomerDrawerStack.Screen name='Booking' component={Customer_booking} options={{drawerLabel: 'Bestilling'}}/>
                <CustomerDrawerStack.Screen name='Booking priority' component={Customer_booking_priority} options={{drawerLabel: 'Prioritert bestilling'}}/>
                <CustomerDrawerStack.Screen name='Booking priority booked' component={Customer_booked_priority} options={{drawerLabel: 'Prioritert bestilling bestilt'}}/>
                <CustomerDrawerStack.Screen name='Booking confirmation' component={Customer_taxi_confirmation} options={{drawerLabel: 'Bekreftelse'}}/>
            </CustomerDrawerStack.Navigator>
        )
    }
}

class DriverStack extends React.Component {
    render() {
        return (
            <DriverDrawerStack.Navigator drawerPosition='right' drawerStyle={{width: 200}}>
                <DriverDrawerStack.Screen name='Driver Home' component={Driver_main} />
                <DriverDrawerStack.Screen name='Driver Order' component={DriverHasOrder} />
            </DriverDrawerStack.Navigator>
        )
    }
}

/*class SingInStackScreen extends React.Component {
    render() {
        return (
            <SignInStack.Navigator>
                <SignInStack.Screen name='SignIn' component={WelcomeScreen} options={{headerShown: false}} />
                <SignInStack.Screen name='Privacy' component={Privacy} />
                <SignInStack.Screen name='TermsOfService' component={Terms_of_service} />
                <SignInStack.Screen name='Number_registration' component={Verifying_mob_num} />
            </SignInStack.Navigator>
        )
    }
}*/

class AppStackScreen extends React.Component {
    state = {
        isLoading: true,
        isToken: 'a',
        isDriver: true,
    }

    constructor() {
        super();
        Text.defaultProps = Text.defaultProps || {};
        // Ignore dynamic type scaling on iOS
        Text.defaultProps.allowFontScaling = false;
        TextInput.defaultProps = TextInput.defaultProps || {};
        // Ignore dynamic type scaling on iOS
        TextInput.defaultProps.allowFontScaling = false;
    }

    componentDidMount() {
        store.getState()
        setTimeout(() => SplashScreenNew, 1000)
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    {this.state.isToken === '' ? (
                        <AppStack.Navigator screenOptions={{
                            headerTitleAlign: 'center',
                        }}>
                            <AppStack.Screen name='SignIn' component={WelcomeScreen}
                                             options={{headerShown: false, headerTitle: ''}}/>
                            <AppStack.Screen name='Privacy' component={Privacy}
                                             options={{headerTitle: 'Personvern'}}/>
                            <AppStack.Screen name='TermsOfService' component={Terms_of_service}
                                             options={{headerTitle: 'Servicevilkår'}}/>
                            <AppStack.Screen name='Number_registration' component={SignUp}
                                             options={{headerTitle: 'Registrer mobilnummer'}}/>
                            <AppStack.Screen name='Number_verification' component={Verifying_mob_num}
                                             options={{headerTitle: 'Verifisering'}}/>
                        </AppStack.Navigator>
                    ) : (
                        <AppStack.Navigator
                            screenOptions={{
                                headerLeft: props => <LogoTitle {...props} />,
                                headerStyle: {
                                    backgroundColor: 'darkseagreen',
                                },
                                headerRight:
                                    props => <MenuButton {...props} />,
                                headerTitle: false,
                            }}
                        >
                            {this.state.isDriver ? (
                                <AppStack.Screen name='Driver Stack' component={DriverStack}/>
                            ) : (
                                <AppStack.Screen name='Customer Stack' component={CustomerStack}/>
                            )}
                        </AppStack.Navigator>
                    )}
                </NavigationContainer>
            </Provider>
        )
    }
}

export default AppStackScreen

/*
    <AppStack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}} />
    <AppStack.Screen name='Registration' component={SignUp} options={{headerShown: false}}/>
 */
