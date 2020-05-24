import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {StyleSheet} from 'react-native'

import Driver_main from './Driver_main'
import DriverHasOrder from './DriverHasOrder'

const DriverDrawerStack = createDrawerNavigator()

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

const styles = StyleSheet.create({
    mainContainer: {
        width: 200,
    },
})

export default DriverStack
