import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SplashScreen from "./Common_files/SplashScreen";
import Client_mode from "./Client/Client_mode";
import Driver_mode from "./Driver/Driver_mode"
import WelcomeScreen from "./Common_files/WelcomeScreen"
import Client_taxi_confirmation from "./Client/Client_taxi_confirmation";
import Client_MenuDrawerNavigator from "./Client/Client_MenuDrawerNavigator";
import Drawer from "./Client/Drawer";


const App = createSwitchNavigator({
    SplashScreen: SplashScreen,
    Client: Client_mode,
    Driver: Driver_mode,
    //Drawer: Client_MenuDrawerNavigator, // den er feil
    //Drawer_new: Drawer // den er feil
});

export default createAppContainer(App);
