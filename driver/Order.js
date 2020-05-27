import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import call from 'react-native-phone-call'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {accept, km, serverIp} from '../common_files/Texts'
import {getToken} from '../common_files/ourFunctions'
import {updateMobNum} from '../redux/actions'
import store from '../redux/store'

class Order extends React.Component {
    call = (phoneNumber) => {
        //handler to make a call
        const args = {
            number: phoneNumber,
            prompt: false,
        }
        call(args).catch(console.error)
        this.getOrderPhoneNumber().catch()
    }

    getOrderPhoneNumber = async () => {
        const tokenGotten = await getToken()
        await fetch(serverIp + '/takeorder', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                orderId: this.props.orderId,
                deviceId: this.props.deviceId,
                token: tokenGotten,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('took Order, got Phone number:')
                console.log(this.props.orderId)
                console.log(this.props.deviceId)
                console.log(json)
                console.log(json[0].phoneNumber)
                this.props.updateMobNum(json[0].phoneNumber)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    componentDidMount() {}

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.row}>
                    <TouchableOpacity
                        key={this.props.orderId}
                        style={styles.row}
                        onPress={() => this.call(this.props.orderId.toString())}
                    >
                        <Text style={styles.customerData}>{accept}</Text>
                        <Text style={styles.customerData}>
                            {this.props.orderId}
                            {km}
                        </Text>
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
        borderRadius: 15,
    },
    customerData: {
        flex: 1,
        fontSize: RFPercentage(3),
        textAlign: 'center',
    },
})

const mapStateToProps = (state) => ({
    deviceId: state.device_id,
})

const mapDispatchToProps = {
    updateMobNum,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
