import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage } from "react-native-responsive-fontsize";

import Client_main from "./Client_main";
import Client_booking from "./Client_booking";
import Client_booking_priority from "./Client_booking_priority";
import Client_booked_priority from "./Client_booked_priority";
import LogoTitle from "../Common_files/LogoTitle";
import Client_MenuButton from "./Client_MenuButton";
import Client_taxi_confirmation from "./Client_taxi_confirmation";
import Client_MenuDrawerNavigator from "./Client_MenuDrawerNavigator";


const ClientStack = createStackNavigator();

class NewClientStack extends React.Component {
    render() {
        return (
            <ClientStack.Navigator
                screenOptions={{
                    headerLeft: props => <LogoTitle {...props} />,
                    headerStyle: {
                        backgroundColor: 'darkseagreen',
                    },
                    headerRight:
                        props => <Client_MenuButton {...props}/>,
                        onPress: () => this.props.navigation.navigate('Client Menu'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: RFPercentage(5),
                        color: 'black',
                    },
                }}
            >
                <ClientStack.Screen
                    name='Client Home'
                    component={Client_main}
                    options={{
                        title: '',
                    }}
                />
                <ClientStack.Screen
                    name='Client Menu'
                    component={Client_MenuDrawerNavigator}
                />
                <ClientStack.Screen
                    name='Booking'
                    component={Client_booking}
                    options={{
                        title: 'Bestilling',
                    }}/>
                <ClientStack.Screen
                    name='Booking_priority'
                    component={Client_booking_priority}
                    options={{
                        title: 'Bestilling',
                    }}/>
                <ClientStack.Screen
                    name='Booked_priority'
                    component={Client_booked_priority}
                    options={{
                        title: 'Prioritert bestilling',
                    }}/>
                <ClientStack.Screen
                    name='Client_taxi_confirmation'
                    component={Client_taxi_confirmation}
                    options={{
                        title: 'Bekreftelse',
                    }}
                />
            </ClientStack.Navigator>
        );
    }
}

class Client_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewClientStack />
            </NavigationContainer>
        );
    }
}

export default NewClientStack;
