import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RFPercentage } from "react-native-responsive-fontsize";

import Driver_main from './Driver_main'
import LogoTitle from "../common_files/LogoTitle";
import Customer_MenuButton from "../customer/Customer_MenuButton";
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
                    headerRight: props => <Customer_MenuButton {...props}/>,
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


class Customer_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewDrawerStack />
            </NavigationContainer>
        );
    }
}

export default Customer_mode;
