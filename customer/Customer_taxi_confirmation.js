/*
    Må lastes ned info om taxien og korporasjonen fra serveren.
    Må finne en løsning til å vise vurderingen.
*/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import { confirmation_msg, taxi_num, taxi_corporation, is_trip_done, give_review } from '../common_files/Texts'
import Rating from "./Rating";

export default class Customer_main extends React.Component {
    state = {
        isReviewed: false,
    }

    componentDidMount() {
        setInterval(() => this.setState({isReviewed: true}), 1000)
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text style={styles.text}>{confirmation_msg}</Text>
                        <Text style={styles.text}>{taxi_num}{'U-746'}</Text>
                        <Text style={styles.text}>{taxi_corporation}{'Green Cab'}</Text>
                    </View>
                    {this.state.isReviewed && (
                        <View style={styles.ratingContainer}>
                            <Rating />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    info_container: {
        flex: 0.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ratingContainer: {
        flex: 0.6,
    },
    text: {
        textAlign: 'center',
        fontSize: RFPercentage(7),
    }
});
