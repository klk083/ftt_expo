import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { basic_price, priority_price } from "./Texts";

export default class Prices extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{basic_price}</Text>
                <Text style={styles.text}>{priority_price}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    text: {
        fontSize: 30,
        alignItems: 'center',
    }
})
