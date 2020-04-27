import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Client_MenuDrawerNavigator from "./Client_MenuDrawerNavigator";

export default class LogoTitle extends React.Component {
    render() {
        return (
            <Icon.Button
                name='menu'
                size={30}
                color='black'
                style={{backgroundColor: 'darkseagreen'}}
                onPress={() => this.props.navigation.navigate('')}/>
        );
    }
}
