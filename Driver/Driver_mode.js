import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RFPercentage } from "react-native-responsive-fontsize";

import Driver_main from './Driver_main'
import LogoTitle from "../Common_files/LogoTitle";
import Client_MenuButton from "../Client/Client_MenuButton";
import DriverHasOrder from "./DriverHasOrder";

const DrawerStack = createDrawerNavigator();

class NewDrawerStack extends React.Component {
    render() {
        return (
            <DrawerStack.Navigator
                screenOptions={{
                    headerLeft: props => <LogoTitle {...props} />,
                    headerStyle: {
                        backgroundColor: 'darkseagreen',
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: RFPercentage(5),
                    },
                    headerRight: props => <Client_MenuButton {...props}/>,
                }}>
                <DrawerStack.Screen
                    name='Driver Home'
                    component={Driver_main}
                    options={{
                        title: '',
                    }}
                />
                <DrawerStack.Screen
                    name='DriverHasOrder'
                    component={DriverHasOrder}
                    options={{
                        title: 'Oppdrag',
                    }}
                />
            </DrawerStack.Navigator>
        )
    }
}


class Client_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewDrawerStack />
            </NavigationContainer>
        );
    }
}

export default Client_mode;
