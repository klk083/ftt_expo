import React from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import SplashScreen from "../Common_files/SplashScreen";
import Privacy from "../Common_files/Privacy";
import Terms_of_service from "../Common_files/Terms_of_service";
import Verifying_mob_num from "../Registration/Verifying_mob_num";
import Registrering from "../Registration/Registrering";
//import Client_main from "./Client_main";
import {book_taxi} from "../Common_files/Texts";
import ScreenComponentOne from './ScreenComponentOne'
import ScreenComponentTwo from './ScreenComponentTwo'

const AppNavigator = createSwitchNavigator({
    RouteNameOne: ScreenComponentOne,
    RouteNameTwo: ScreenComponentTwo,
});

const App = createAppContainer(AppNavigator);

export default App;
