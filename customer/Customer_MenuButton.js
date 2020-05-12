import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { RFPercentage } from "react-native-responsive-fontsize";

import Customer_MenuDrawerNavigator from "./Customer_MenuDrawerNavigator";

export default class LogoTitle extends React.Component {
    render() {
        return (
            <Icon.Button
                name='menu'
                size={RFPercentage(4)}
                color='black'
                style={{
                    backgroundColor: 'darkseagreen',
                }}
                onPress={() => this.props.navigation.toggleDrawer()}/>
        );
    }
}
