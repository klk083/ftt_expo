import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Provider } from 'react-redux'


import SplashScreen from './common_files/SplashScreen'
import Customer_main from './customer/Customer_main'
import Driver_main from './driver/Driver_main'
import Registrering from './registration/Registrering'
import LogoTitle from './common_files/LogoTitle'
import Customer_MenuButton from './customer/Customer_MenuButton'
import { RFPercentage } from 'react-native-responsive-fontsize'
import store from "./redux/store";



const AppStack = createStackNavigator()
const CustomerDrawerStack = createDrawerNavigator()
const DriverDrawerStack = createDrawerNavigator()

class CustomerStack extends React.Component {
    render() {
        return (
            <CustomerDrawerStack.Navigator initialRouteName='Customer Home'>
                <CustomerDrawerStack.Screen name='Customer Home' component={Customer_main} />
            </CustomerDrawerStack.Navigator>
        )
    }
}

class DriverStack extends React.Component {
    render() {
        return (
            <DriverDrawerStack.Navigator initialRouteName='Customer Home'>
                <DriverDrawerStack.Screen name='Driver Home' component={Driver_main} />
            </DriverDrawerStack.Navigator>
        )
    }
}

class AppStackScreen extends React.Component {
    state = {
        isLoading: true,
        isToken: '',
        isDriver: false,
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <AppStack.Navigator
                        initialRouteName='Customer Stack'
                        screenOptions={{
                            headerLeft: props => <LogoTitle {...props} />,
                            headerStyle: {
                                backgroundColor: 'darkseagreen',
                            },
                            headerRight:
                                props => <Customer_MenuButton {...props}/>,
                            onPress: () => this.props.navigation.navigate('customer Menu'),
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                color: 'black',
                            },
                        }}

                    >
                        <AppStack.Screen
                            name='SplashScreen'
                            component={SplashScreen}
                            options={{headerShown: false}}
                        />
                        <AppStack.Screen name='Registrering' component={Registrering} options={{headerShown: false}}/>
                        {console.log('er på stacken')}
                        <AppStack.Screen name='Customer Stack' component={CustomerStack}/>
                        <AppStack.Screen name='Driver Stack' component={DriverStack}/>
                    </AppStack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}
export default AppStackScreen


