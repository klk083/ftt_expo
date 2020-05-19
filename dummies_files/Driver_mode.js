import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RFPercentage } from 'react-native-responsive-fontsize'

import Driver_main from '../driver/Driver_main'
import LogoTitle from '../common_files/LogoTitle'
import Customer_MenuButton from '../common_files/MenuButton'
import DriverHasOrder from '../driver/DriverHasOrder'

const DrawerStack = createDrawerNavigator()

class NewDrawerStack extends React.Component {
    render() {
        return (
            <DrawerStack.Navigator
                screenOptions={{
                    headerLeft: props => <LogoTitle {...props} />,
                    headerStyle: {
                        backgroundColor: 'darkseagreen',
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: RFPercentage(5),
                    },
                    headerRight: props => <Customer_MenuButton {...props}/>,
                }}
            >
                <DrawerStack.Screen
                    name='Driver Home'
                    component={Driver_main}
                    options={{
                        title: '',
                    }}
                />
                <DrawerStack.Screen
                    name='DriverHasOrder'
                    component={DriverHasOrder}
                    options={{
                        title: 'Oppdrag',
                    }}
                />
            </DrawerStack.Navigator>
        )
    }
}


class Driver_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewDrawerStack/>
            </NavigationContainer>
        )
    }
}

export default Driver_mode
