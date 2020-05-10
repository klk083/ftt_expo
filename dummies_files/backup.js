import React from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import SplashScreen from "../common_files/SplashScreen";
import Privacy from "../common_files/Privacy";
import Terms_of_service from "../common_files/Terms_of_service";
import Verifying_mob_num from "../registration/Verifying_mob_num";
import Registrering from "../registration/Registrering";
//import Customer_main from "./Customer_main";
import {book_taxi} from "../common_files/Texts";
import ScreenComponentOne from './ScreenComponentOne'
import ScreenComponentTwo from './ScreenComponentTwo'

const AppNavigator = createSwitchNavigator({
    RouteNameOne: ScreenComponentOne,
    RouteNameTwo: ScreenComponentTwo,
});

const App = createAppContainer(AppNavigator);

export default App;
