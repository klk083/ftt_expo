import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'


import SplashScreen from './Common_files/SplashScreen'
import Client_main from './Client/Client_main'
import Driver_main from './Driver/Driver_main'
import Registrering from './Registration/Registrering'


const AppStack = createStackNavigator()
const ClientDrawerStack = createDrawerNavigator()
const DriverDrawerStack = createDrawerNavigator()

class ClientStack extends React.Component {
    render() {
        return (
            <ClientDrawerStack.Navigator initialRouteName='Client Home'>
                <ClientDrawerStack.Screen name='Client Home' component={Client_main} />
            </ClientDrawerStack.Navigator>
        )
    }
}

class DriverStack extends React.Component {
    render() {
        return (
            <DriverDrawerStack.Navigator initialRouteName='Client Home'>
                <DriverDrawerStack.Screen name='Driver Home' component={Driver_main} />
            </DriverDrawerStack.Navigator>
        )
    }
}

class AppStackScreen extends React.Component {
    state = {
        isLoading: false,
        isToken: '',
        isDriver: true,
    }

    render() {
        return (
            <NavigationContainer>
                <AppStack.Navigator initialRouteName='Client Stack'>
                    <AppStack.Screen
                        name='SplashScreen'
                        component={SplashScreen}
                        options={{headerShown: false}}
                    />
                    <AppStack.Screen name='Registrering' component={Registrering} options={{headerShown: false}}/>
                    <AppStack.Screen name='Client Stack' component={ClientStack} />
                    <AppStack.Screen name='Driver Stack' component={DriverStack} />
                </AppStack.Navigator>
            </NavigationContainer>
        )
    }
}
export default AppStackScreen

