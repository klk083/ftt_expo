import React from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, Platform } from 'react-native'
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
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.availabilityContainer}>
                        <Text style={styles.availability}>{this.state.isAvailable ? driver_available : driver_not_available}</Text>
                        <Switch
                            trackColor={{ false: 'darkgray', true: 'green'}}
                            thumbColor={this.state.isAvailable ? '#8fbc8f' : 'white'}
                            onValueChange={this.toggleSwitch}
                            value={this.state.isAvailable}
                            style={Platform.OS == "ios" ? styles.switch_ios : styles.switch_android}
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
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    availabilityContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
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
    },
    basicTitleContainer: {
        flex: 0.2,
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
    switch_android: {
        flex: 0.1,
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    switch_ios: {
        flex: 0.1,
        paddingRight: 20,
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
