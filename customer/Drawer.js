import React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import LogoTitle from '../common_files/LogoTitle'
import Customer_MenuButton from '../common_files/MenuButton'
import Prices from '../common_files/Prices'
import Privacy from '../common_files/Privacy'
import Terms_of_service from '../common_files/Terms_of_service'
import Customer_main from './Customer_main'


const Drawer = createDrawerNavigator()

export default function Drawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Customer Home'
                drawerPosition='left'
                drawerType='slide'
                drawerStyle={{
                    backgroundColor: 'darkseagreen',
                    width: 175,
                }}
            >
                <Drawer.Screen
                    name='Customer Home'
                    component={Customer_main}
                    options={{
                        title: 'Home',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight:
                            props => <Customer_MenuButton {...props}/>,
                        onPress: () => this.props.navigation.navigate('customer Menu')
                    }}
                />
                <Drawer.Screen
                    name='Priser'
                    component={Prices}
                    options={{
                        title: 'Priser',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight:
                            props => <Customer_MenuButton {...props}/>,
                        onPress: () => this.props.navigation.navigate('customer Menu')
                    }}
                />
                <Drawer.Screen
                    name='Personvern'
                    component={Privacy}
                    options={{
                        title: 'Personvern',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Customer_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: RFPercentage(5),
                            color: 'black',
                        }
                    }}/>
                <Drawer.Screen
                    name='Servicevilkår'
                    component={Terms_of_service}
                    options={{
                        title: 'Servicevilkår',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Customer_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: RFPercentage(4),
                            color: 'black',
                        }
                    }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
