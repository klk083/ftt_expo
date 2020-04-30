/*
    Må lastes ned info om taxien og korporasjonen fra serveren.
    Må finne en løsning til å vise vurderingen.
*/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import { confirmation_msg, taxi_num, taxi_corporation, is_trip_done, give_review } from '../Common_files/Texts'
import Rating from "./Rating";

export default class Client_main extends React.Component {
    state = {
        isReviewed: false,
    }

    componentDidMount() {
        setInterval(() => this.setState({isReviewed: true}), 1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text style={styles.text}>{confirmation_msg}</Text>
                    <Text style={styles.text}>{taxi_num}{'U-746'}</Text>
                    <Text style={styles.text}>{taxi_corporation}{'Green Cab'}</Text>
                </View>
                {this.state.isReviewed && (
                    <Rating />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    info_container: {
        flex: 0.4,
        marginTop: 60,
        alignItems: 'center',
    },
    text: {
        fontSize: RFPercentage(7),
    }
});
