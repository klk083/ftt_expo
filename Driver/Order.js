import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import call from 'react-native-phone-call'
import { RFPercentage } from "react-native-responsive-fontsize";

class Order extends React.Component {
    call = (phoneNumber) => {
        //handler to make a call
        const args = {
            number: phoneNumber,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    componentDidMount() {
      console.log(this.props)
    }

    render() {
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    key={this.props.distKm}
                    style={styles.row}
                    onPress={() => this.call(this.props.phoneNumber)}
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
        fontSize: RFPercentage(3),
        textAlign: 'center',
    }
})

export default Order
