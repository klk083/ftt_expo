import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {RFPercentage} from 'react-native-responsive-fontsize'

/**
 * MenuButton icon
 */
export default class MenuButton extends React.Component {
    render() {
        return (
            <Icon.Button
                name="menu"
                size={RFPercentage(4)}
                color="black"
                style={{
                    backgroundColor: 'darkseagreen',
                }}
                onPress={() => {}}
            />
        )
    }
}
