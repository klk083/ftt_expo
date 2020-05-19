import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Driver_main from './Driver_main'
import DriverHasOrder from './DriverHasOrder'
const DriverDrawerStack = createDrawerNavigator()

class DriverStack extends React.Component {
    render() {
        return (
            <DriverDrawerStack.Navigator drawerPosition='right' drawerStyle={{width: 200}}>
                <DriverDrawerStack.Screen name='Driver Home' component={Driver_main} />
                <DriverDrawerStack.Screen name='Driver Order' component={DriverHasOrder} />
            </DriverDrawerStack.Navigator>
        )
    }
}

export default DriverStack
