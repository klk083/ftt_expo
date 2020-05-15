import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native'
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
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.row}>
                    <TouchableOpacity
                        key={this.props.distKm}
                        style={styles.row}
                        onPress={() => this.call(this.props.phoneNumber)}
                    >
                        <Text style={styles.customerData}>Aksepter</Text>
                        <Text style={styles.customerData}>{this.props.distKm} km</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    row: {
        flex: 1,
        margin: 3,
        backgroundColor: '#e9e9e9',
        borderRadius: 15
    },
    customerData: {
        flex: 1,
        fontSize: RFPercentage(3),
        textAlign: 'center',
    }
})

export default Order
