import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Provider } from 'react-redux'


import SplashScreen from './common_files/SplashScreen'
import Customer_main from './customer/Customer_main'
import Driver_main from './driver/Driver_main'
import Registrering from './registration/Registrering'
import LogoTitle from './common_files/LogoTitle'
import Customer_MenuButton from './customer/Customer_MenuButton'
import { RFPercentage } from 'react-native-responsive-fontsize'
import store from "./redux/store";
import Customer_booking from "./customer/Customer_booking";
import Customer_booking_priority from "./customer/Customer_booking_priority";
import Customer_booked_priority from "./customer/Customer_booked_priority";
import Customer_taxi_confirmation from "./customer/Customer_taxi_confirmation";
import DriverHasOrder from "./driver/DriverHasOrder";



const AppStack = createStackNavigator()
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

class AppStackScreen extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <AppStack.Navigator
                        initialRouteName='Customer Stack'
                        screenOptions={{
                            headerLeft: props => <LogoTitle {...props} />,
                            headerStyle: {
                                backgroundColor: 'darkseagreen',
                            },
                            headerRight:
                                props => <Customer_MenuButton {...props}/>,
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                color: 'black',
                            },
                        }}

                    >
                        <AppStack.Screen
                            name='SplashScreen'
                            component={SplashScreen}
                            options={{headerShown: false}}
                        />
                        <AppStack.Screen name='Registration' component={Registrering} options={{headerShown: false}}/>
                        {console.log('er på stacken')}
                        <AppStack.Screen name='Customer Stack' component={CustomerStack}/>
                        <AppStack.Screen name='Driver Stack' component={DriverStack}/>
                    </AppStack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}

export default AppStackScreen

