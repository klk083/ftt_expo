import React from 'react'
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import { Provider } from 'react-redux'


import store from "../redux/store";
import SplashScreen from '../common_files/SplashScreen';
import Customer_main from "../customer/Customer_main";
import Customer_booking from "../customer/Customer_booking";
import Customer_booking_priority from "../customer/Customer_booking_priority";
import Customer_booked_priority from "../customer/Customer_booked_priority";
import Customer_taxi_confirmation from "../customer/Customer_taxi_confirmation";
import Driver_main from "../driver/Driver_main";
import DriverHasOrder from "../driver/DriverHasOrder";
import {NavigationContainer} from "@react-navigation/native";
import LogoTitle from "../common_files/LogoTitle";
import Customer_MenuButton from "../common_files/MenuButton";


const AppStack = createStackNavigator()
const CustomerDrawerStack = createDrawerNavigator()
const DriverDrawerStack = createDrawerNavigator()

class CustomerStack extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer
                    options={{
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
                }}>
                    <CustomerDrawerStack.Navigator
                        initialRouteName='Home'
                        drawerPosition='right'
                        drawerStyle={{
                            width: 200,
                        }}
                    >
                        <CustomerDrawerStack.Screen
                            name='Home'
                            component={Customer_main}
                            options={{drawerLabel: 'Hjem'}}
                        />
                        <CustomerDrawerStack.Screen
                            name='Booking'
                            component={Customer_booking}
                            options={{drawerLabel: 'Bestilling'}}
                        />
                        <CustomerDrawerStack.Screen
                            name='Booking priority'
                            component={Customer_booking_priority}
                            options={{drawerLabel: 'Prioritert bestilling'}}
                        />
                        <CustomerDrawerStack.Screen
                            name='Booking priority booked'
                            component={Customer_booked_priority}
                            options={{drawerLabel: 'Prioritert bestilling bestilt'}}
                        />
                        <CustomerDrawerStack.Screen
                            name='Booking confirmation'
                            component={Customer_taxi_confirmation}
                            options={{drawerLabel: 'Bekreftelse'}}
                        />
                    </CustomerDrawerStack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}
class DriverStack extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer
                    options={{
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
                }}>
                    <DriverDrawerStack.Navigator
                        initialRouteName='Driver Home'
                        drawerPosition='right'
                        drawerStyle={{
                            width: 200,
                        }}
                    >
                        <DriverDrawerStack.Screen
                            name='Driver Home'
                            component={Driver_main}
                        />
                        <DriverDrawerStack.Screen
                            name='Driver Order'
                            component={DriverHasOrder}
                        />
                    </DriverDrawerStack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}



const initialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Customer: CustomerStack,
    Driver: DriverStack,
})

export default createAppContainer(initialNavigator)
