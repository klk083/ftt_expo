import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native'

import {driver_available, driver_not_available, priority_orders, orders } from '../Common_files/Texts'
import Orders, { compareDistKm } from './Orders'
import SectionListContacts from "./SectionListClients";

export default class Client_main extends React.Component {
    state = {
        isAvailable: false,
        orders: Orders,
    }

    toggleSwitch = (value) => {
        this.setState({isAvailable: value})
        this.sort()
    }

    sort = () => {
        this.setState(prevState => ({orders: prevState.orders.sort(compareDistKm)}))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.availabilityContainer}>
                    <Text style={styles.availability}>{this.state.isAvailable ? driver_available : driver_not_available}</Text>
                    <Switch
                        trackColor={{ false: 'darkgray', true: 'green'}}
                        thumbColor={this.state.isAvailable ? '#8fbc8f' : 'white'}
                        //ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.isAvailable}
                        style={styles.switch}
                    />
                </View>
                {this.state.isAvailable && (
                    <View style={styles.orderContainer}>
                        <Text style={styles.priority_order_list} onPress={() => this.props.navigation.navigate("DriverHasOrder")}>{priority_orders}</Text>
                        <SectionListContacts contacts={this.state.orders} />
                        <Text style={styles.basic_order_list}>{orders}</Text>
                        <SectionListContacts contacts={this.state.orders}/>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    availabilityContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    availability: {
        fontSize: 30,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    same_line: {
        alignItems: 'stretch'
    },
    orderContainer: {
        flex: 0.9,
        alignItems: 'center',
    },
    priority_order_list: {
        fontSize: 40,
        color: 'dodgerblue',
    },
    basic_order_list: {
        fontSize: 35,
        color: 'darkseagreen',
        marginTop: 10,
    },
});
