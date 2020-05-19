import React from 'react'
import {Text, TextInput} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
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
import Customer_main from './customer/Customer_main'
import Customer_booking from './customer/Customer_booking'
import Customer_booking_priority from './customer/Customer_booking_priority'
import Customer_booked_priority from './customer/Customer_booked_priority'
import Customer_taxi_confirmation from './customer/Customer_taxi_confirmation'
import Driver_main from './driver/Driver_main'
import DriverHasOrder from './driver/DriverHasOrder'
import store from './redux/store'

const AppStack = createStackNavigator()
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

class AppStackScreen extends React.Component {
    constructor() {
        super();
        Text.defaultProps = Text.defaultProps || {};
        // Ignore dynamic type scaling
        Text.defaultProps.allowFontScaling = false;
        TextInput.defaultProps = TextInput.defaultProps || {};
        // Ignore dynamic type scaling
        TextInput.defaultProps.allowFontScaling = false;
    }

    componentDidMount() {
        store.getState() // kan fjernes etterhvert
        setTimeout(() => SplashScreen, 1000)
    }

    render() {
        if (this.props.isLoading) return <SplashScreen/>
        return (
            <NavigationContainer>
                {this.props.token === '' ? (
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
                        {this.props.driver ? (
                            <AppStack.Screen name='Driver Stack' component={DriverStack}/>
                        ) : (
                            <AppStack.Screen name='Customer Stack' component={CustomerStack}/>
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
