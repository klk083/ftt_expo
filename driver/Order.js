/**
 * Order
 */
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

/**
 * Creates order.
 */
class Order extends React.Component {
    /**
     * A function that sends number to the dialer.
     * @param phoneNumber
     */
    call = (phoneNumber) => {
        const args = {
            number: phoneNumber,
            prompt: false,
        }
        call(args).catch(console.error)
    }

    /**
     * An async function that sends order data and gets phone number.
     * @returns {Promise<void>} Returns customer's mobile number.
     */
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
                this.props.updateMobNum(json[1][0].phoneNumber)
                this.call(this.props.customerMobNum.toString())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.row}>
                    <TouchableOpacity
                        key={this.props.orderId}
                        style={styles.row}
                        onPress={() => this.getOrderPhoneNumber()}
                    >
                        <Text style={styles.customerData}>{accept}</Text>
                        <Text style={styles.customerData}>
                            {this.props.km}
                            {km}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

/**
 * A variable that stores style objects.
 */
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

/**
 * Mapping data from redux store.
 * @param state State stored in redux store.
 * @returns {{customerMobNum: mobileNumber, deviceId: device_id}} Returns object with customer's mobile number and
 * device id.
 */
const mapStateToProps = (state) => ({
    deviceId: state.device_id,
    customerMobNum: state.mobileNumber,
})

/**
 * Dispatching actions using action creators.
 * @type {{updateMobNum: (function(*): {mobileNumber: *, type: string})}}
 */
const mapDispatchToProps = {
    updateMobNum,
}

/**
 * Connecting component with the redux store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Order)
