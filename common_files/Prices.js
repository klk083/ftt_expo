import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {basic_price, priority_price} from './Texts'
import {RFPercentage} from 'react-native-responsive-fontsize'

class Prices extends React.Component {
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
        flex: 1,
    },
    text: {
        fontSize: RFPercentage(3),
        alignItems: 'center',
    },
})

export default Prices
