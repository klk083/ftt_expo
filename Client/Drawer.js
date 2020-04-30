import * as React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { RFPercentage } from "react-native-responsive-fontsize";

import LogoTitle from "../Common_files/LogoTitle";
import Client_MenuButton from "./Client_MenuButton";
import Prices from "../Common_files/Prices";
import Privacy from "../Common_files/Privacy";
import Terms_of_service from "../Common_files/Terms_of_service";
import Client_main from "./Client_main";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Client Home"
                drawerPosition='left'
                drawerType='slide'
                drawerStyle={{
                    backgroundColor: 'darkseagreen',
                    width: 175,
                }}
            >
                <Drawer.Screen
                    name='Client Home'
                    component={Client_main}
                    options={{
                        title: 'Home',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight:
                            props => <Client_MenuButton {...props}/>,
                        onPress: () => this.props.navigation.navigate('Client Menu')
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
                            props => <Client_MenuButton {...props}/>,
                        onPress: () => this.props.navigation.navigate('Client Menu')
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
                        headerRight: props => <Client_MenuButton {...props}/>,
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
                        headerRight: props => <Client_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: RFPercentage(4),
                            color: 'black',
                        }
                    }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
