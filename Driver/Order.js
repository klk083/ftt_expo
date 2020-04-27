import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import call from 'react-native-phone-call'

class Order extends React.Component {
    state = {
        norwegian_number: '+4741617861'
    }

    call = () => {
        //handler to make a call
        const args = {
            number: this.state.norwegian_number,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    render() {
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.call()}
                >
                    <Text style={styles.clientData}>Aksepter</Text>
                    <Text style={styles.clientData}>{this.props.distKm} km</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        padding: 5,
    },
    clientData: {
        fontSize: 25,
        textAlign: 'center',
    }
})

export default Order
