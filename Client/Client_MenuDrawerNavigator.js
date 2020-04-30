import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Prices from "../Common_files/Prices";
import Privacy from "../Common_files/Privacy";
import Terms_of_service from "../Common_files/Terms_of_service";
import Client_main from "./Client_main";

const Drawer = createDrawerNavigator();

class ClientDrawer extends React.Component {
    render() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Priser" component={Prices} />
                <Drawer.Screen name="Personvern" component={Privacy} />
                <Drawer.Screen name="Servicevilkår" component={Terms_of_service} />
                <Drawer.Screen name="Client mode" component={Client_main} />
            </Drawer.Navigator>
        )
    }
}

export default class Client_MenuDrawerNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <ClientDrawer />
            </NavigationContainer>
        )
    }
}
