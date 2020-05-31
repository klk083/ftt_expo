/**
 * DriverStack
 */
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {StyleSheet} from 'react-native'

import Driver_main from './Driver_main'
import DriverHasOrder from './DriverHasOrder'

/**
 * Creates navigation drawer.
 */
const DriverDrawerStack = createDrawerNavigator()

/**
 * Stack that allows navigation between driver's screens.
 */
class DriverStack extends React.Component {
    render() {
        return (
            <DriverDrawerStack.Navigator
                drawerPosition="right"
                drawerStyle={styles.mainContainer}
            >
                <DriverDrawerStack.Screen
                    name="Driver Home"
                    component={Driver_main}
                />
                <DriverDrawerStack.Screen
                    name="Driver Order"
                    component={DriverHasOrder}
                />
            </DriverDrawerStack.Navigator>
        )
    }
}

/**
 * A variable that stores style objects.
 */
const styles = StyleSheet.create({
    mainContainer: {
        width: 200,
    },
})

export default DriverStack
