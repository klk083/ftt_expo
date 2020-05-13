import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Provider } from 'react-redux'


import SplashScreen from './common_files/SplashScreen'
import SplashScreenNew from './common_files/SplashScreenNew'
import Customer_main from './customer/Customer_main'
import Driver_main from './driver/Driver_main'
import Registrering from './registration/Registrering'
import LogoTitle from './common_files/LogoTitle'
import Customer_MenuButton from './common_files/MenuButton'
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



const AppStack = createStackNavigator()
const SignInStack = createStackNavigator()
const CustomerDrawerStack = createDrawerNavigator()
const DriverDrawerStack = createDrawerNavigator()


class CustomerStack extends React.Component {
    render() {
        return (
            <CustomerDrawerStack.Navigator
                initialRouteName='Home'
                drawerPosition='right'
                drawerStyle={{
                    width: 200,
                }}
            >
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
            <DriverDrawerStack.Navigator initialRouteName='Driver Home'>
                <DriverDrawerStack.Screen name='Driver Home' component={Driver_main} />
                <DriverDrawerStack.Screen name='Driver Order' component={DriverHasOrder} />
            </DriverDrawerStack.Navigator>
        )
    }
}

class SingInStackScreen extends React.Component {
    render() {
        return (
            <SignInStack.Navigator>
                <SignInStack.Screen name='SignIn' component={WelcomeScreen} ></SignInStack.Screen>
                <SignInStack.Screen name='Privacy' component={Privacy} ></SignInStack.Screen>
                <SignInStack.Screen name='TermsOfService' component={Terms_of_service} ></SignInStack.Screen>
            </SignInStack.Navigator>
        )
    }
}

class AppStackScreen extends React.Component {
    state = {
        isLoading: true,
        isToken: 'ksd',
        isDriver: false,
    }

    componentDidMount() {
        store.getState()
        //setTimeout(() => SplashScreenNew, 1000)
    }

    render() {
        return (
            <Provider store={store}>
                {this.state.isToken === '' ? (
                    <NavigationContainer>
                        <AppStack.Navigator options={{}}>
                            <AppStack.Screen name='SignIn' component={SingInStackScreen} options={{headerShown: false}} />
                        </AppStack.Navigator>
                    </NavigationContainer>
                ) : (
                    <NavigationContainer>
                        <AppStack.Navigator
                            screenOptions={{
                                headerLeft: props => <LogoTitle {...props} />,
                                headerStyle: {
                                    backgroundColor: 'darkseagreen',
                                },
                                headerRight:
                                    props => <Customer_MenuButton {...props}/>,
                                headerTitle: false
                            }}
                        >
                            {this.state.isDriver ? (
                                <AppStack.Screen name='Driver Stack' component={DriverStack}/>
                            ) : (
                                <AppStack.Screen name='Customer Stack' component={CustomerStack}/>
                            )}
                        </AppStack.Navigator>
                    </NavigationContainer>
                )}
            </Provider>
        )
    }
}

export default AppStackScreen

/*
    <AppStack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}} />
    <AppStack.Screen name='Registration' component={Registrering} options={{headerShown: false}}/>
 */
