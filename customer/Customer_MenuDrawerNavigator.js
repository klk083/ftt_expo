import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Prices from "../common_files/Prices";
import Privacy from "../common_files/Privacy";
import Terms_of_service from "../common_files/Terms_of_service";
import Customer_main from "./Customer_main";

const Drawer = createDrawerNavigator();

class CustomerDrawer extends React.Component {
    render() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Priser" component={Prices} />
                <Drawer.Screen name="Personvern" component={Privacy} />
                <Drawer.Screen name="Servicevilkår" component={Terms_of_service} />
                <Drawer.Screen name="Customer mode" component={Customer_main} />
            </Drawer.Navigator>
        )
    }
}

export default class Customer_MenuDrawerNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <CustomerDrawer />
            </NavigationContainer>
        )
    }
}
