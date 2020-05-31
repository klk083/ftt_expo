import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    Platform,
    BackHandler,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {cancel_taxi, looking_for_taxi, serverIp} from '../common_files/Texts'
import {getToken} from '../common_files/ourFunctions'
import {updateOrder} from '../redux/actions'

/**
 * Client's screen after booking a taxi that informs the customer about
 * looking for a driver.
 */
class Customer_booking extends React.Component {
    componentDidMount() {
        this.interval = setInterval(() => this.searchForDriver(), 10000)
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.cancellationAlert
        )
    }

    componentDidUpdate() {
        clearInterval(this.interval)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.cancellationAlert
        )
    }

    /**
     * An anonymous function that sends orderId and token to the server and
     * tries to find an available driver
     * @returns {Promise<void>} If success returns to booking confirmation screen.
     */
    searchForDriver = async () => {
        const tokenGotten = await getToken()
        await fetch(serverIp + '/getOrderTaxiNum', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                orderId: this.props.orderId,
                token: tokenGotten,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.length) {
                    this.props.updateOrder({
                        companyName: json[0].companyName,
                        taxiNumber: json[0].taxiNumber,
                    })
                    clearInterval(this.interval)
                    console.log('try to navigate to booking confirmation')
                    this.props.navigation.navigate('Booking confirmation')
                } else {
                    console.log('did try to get taxinumber but failed')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    /**
     * An anonymous function that opens an alert when the customer clicked
     * cancellation button in the app or android's hardware back button.
     * @returns {boolean} Returns true.
     */
    cancellationAlert = () => {
        Alert.alert(
            'Avbestilling',
            'Vil du avbestille taxi likevel?',
            [
                {
                    text: 'Nei',
                    onPress: () => null,
                    style: 'cancel',
                },
                {},
                {
                    text: 'Ja',
                    onPress: () => this.submitCancellationButton(),
                },
            ],
            {
                cancelable: true,
            }
        )
        return true
    }

    /**
     * An anonymous async function that sends user's cancellation request to
     * the server.
     * @returns {Promise<void>}
     */
    submitCancellationButton = async () => {
        const tokenGotten = await getToken()
        await fetch(serverIp + '/cancelOrder', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                orderId: this.props.orderId,
                token: tokenGotten,
            }),
        })
            .then((response) => response.text())
            .then((responseData) => {
                clearInterval(this.interval)
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text
                            style={styles.looking_for_taxi}
                            onPress={() =>
                                this.props.navigation.navigate(
                                    'Booking priority'
                                )
                            }
                        >
                            {looking_for_taxi}
                        </Text>
                        <ActivityIndicator
                            size={
                                Platform.OS === 'ios'
                                    ? 'large'
                                    : RFPercentage(12)
                            }
                            style={styles.activityIndicator}
                        />
                    </View>
                    <View style={styles.cancel_buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchableCancelButtonContainer}
                        >
                            <Text
                                style={styles.cancel_button}
                                onPress={() => this.cancellationAlert()}
                            >
                                {cancel_taxi}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    info_container: {
        flex: 0.9,
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 50,
    },
    cancel_buttonContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    touchableCancelButtonContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'firebrick',
        borderRadius: 15,
    },
    looking_for_taxi: {
        fontSize: RFPercentage(7),
        textAlign: 'center',
    },
    cancel_button: {
        textAlign: 'center',
        fontSize: RFPercentage(4),
    },
})

/**
 * Mapping data from redux store.
 * @param state State stored in redux store.
 * @returns {{orderId: (number|string), companyName: (string|string), taxiNumber: string, token: *}} Return object with states.
 */
const mapStateToProps = (state) => ({
    token: state.token,
    orderId: state.order.orderId,
    taxiNumber: state.order.taxiNumber,
    companyName: state.order.companyName,
})

/**
 * Dispatching actions using action creators.
 * @type {{updateOrder: (function(*): {order_data: *, type: string})}}
 */
const mapDispatchToProps = {
    updateOrder,
}

/**
 * Connecting component with the redux store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Customer_booking)
