import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage } from "react-native-responsive-fontsize";

import Customer_main from "./Customer_main";
import Customer_booking from "./Customer_booking";
import Customer_booking_priority from "./Customer_booking_priority";
import Customer_booked_priority from "./Customer_booked_priority";
import LogoTitle from "../common_files/LogoTitle";
import Customer_MenuButton from "../common_files/MenuButton";
import Customer_taxi_confirmation from "./Customer_taxi_confirmation";
import Customer_MenuDrawerNavigator from "./Customer_MenuDrawerNavigator";


const CustomerStack = createStackNavigator();

class NewCustomerStack extends React.Component {
    render() {
        return (
            <CustomerStack.Navigator
                screenOptions={{
                    headerLeft: props => <LogoTitle {...props} />,
                    headerStyle: {
                        backgroundColor: 'darkseagreen',
                    },
                    headerRight:
                        props => <Customer_MenuButton {...props}/>,
                        onPress: () => this.props.navigation.navigate('customer Menu'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: RFPercentage(5),
                        color: 'black',
                    },
                }}
            >
                <CustomerStack.Screen
                    name='Customer Home'
                    component={Customer_main}
                    options={{
                        title: '',
                    }}
                />
                <CustomerStack.Screen
                    name='Customer Menu'
                    component={Customer_MenuDrawerNavigator}
                />
                <CustomerStack.Screen
                    name='Booking'
                    component={Customer_booking}
                    options={{
                        title: 'Bestilling',
                    }}/>
                <CustomerStack.Screen
                    name='Booking_priority'
                    component={Customer_booking_priority}
                    options={{
                        title: 'Bestilling',
                    }}/>
                <CustomerStack.Screen
                    name='Booked_priority'
                    component={Customer_booked_priority}
                    options={{
                        title: 'Prioritert bestilling',
                    }}/>
                <CustomerStack.Screen
                    name='Customer_taxi_confirmation'
                    component={Customer_taxi_confirmation}
                    options={{
                        title: 'Bekreftelse',
                    }}
                />
            </CustomerStack.Navigator>
        );
    }
}

class Customer_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewCustomerStack />
            </NavigationContainer>
        );
    }
}

export default NewCustomerStack;
