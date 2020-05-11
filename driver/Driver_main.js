import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import {driver_available, driver_not_available, priority_orders, orders } from '../common_files/Texts'
import Orders, { compareDistKm } from './Orders'
import SectionListCustomers from "./SectionListCustomers";

export default class Driver_main extends React.Component {
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
                        <View style={styles.priorityOrdersContainer}>
                            <View style={styles.priorityTitleContainer}>
                                <Text style={styles.priority_order_list}
                                      onPress={() => this.props.navigation.navigate("Driver Order")}
                                >{priority_orders}</Text>
                            </View>
                            <View style={styles.prioritySectionListContainer}>
                                <SectionListCustomers contacts={this.state.orders} />
                            </View>
                        </View>
                        <View style={styles.basicOrdersContainer}>
                            <View style={styles.basicTitleContainer}>
                                <Text style={styles.basic_order_list}>{orders}</Text>
                            </View>
                            <View style={styles.basicSectionListContainer}>
                                <SectionListCustomers contacts={this.state.orders}/>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    availabilityContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priorityOrdersContainer: {
        flex: 1,
    },
    basicOrdersContainer: {
        flex: 1,
    },
    priorityTitleContainer: {
        flex: 0.2,
        backgroundColor: '#e9e9e9'
    },
    basicTitleContainer: {
        flex: 0.2,
        backgroundColor: '#e9e9e9',
    },
    prioritySectionListContainer: {
        flex: 0.8,
        alignItems: 'center',
    },
    basicSectionListContainer: {
        flex: 0.8,
        alignItems: 'center',
    },
    availability: {
        flex: 0.8,
        fontSize: RFPercentage(4),
    },
    switch: {
        flex: 0.2,
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    priority_order_list: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(5),
        color: 'dodgerblue',
    },
    basic_order_list: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(5),
        color: 'darkseagreen',
    },
});
