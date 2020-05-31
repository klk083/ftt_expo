/**
 * Customer_main screen
 */
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    BackHandler,
    Alert,
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {getToken} from '../common_files/ourFunctions'
import {
    book_taxi,
    basic_price,
    turn_on_location,
    turn_on_location_explanation,
    serverIp,
    change_user_to_driver,
    current_address_location,
} from '../common_files/Texts'
import {
    updateCustomerLocation,
    updateDeviceId,
    updateOrderId,
    updateToken,
    updatePermission,
    updateOrder,
    updatePriority,
    updateUserType,
    updateMobNum,
} from '../redux/actions'

/**
 * The customer's main screen where the order can be made.
 * If the user did not grant location permission, the screen with
 * the location request button is displayed.
 */
class Customer_main extends React.Component {
    state = {
        mounted_Customer_main: false,
        accuracy: '',
        altitude: '',
        heading: '',
        longitude: '',
        latitude: '',
        speed: '',
        timestamp: '',
        location: '',
        geocode: '',
        errorMessage: '',
        isGranted: true,
        distanceBetween: 0,
        customerPhone: '+4712345678',
        secondLocation: {latitude: 63.430487, longitude: 10.394978},
        //deviceId: 'tlf321', //'Funker bare på bare react native',
        orderId: '',
    }

    /**
     * An anonymous function that opens an alert when the customer clicked
     * android's hardware back button.
     * @returns {boolean} Returns true.
     */
    backAction = () => {
        Alert.alert(
            'Vil du lukke appen?',
            '',
            [
                {
                    text: 'Nei',
                    onPress: () => null,
                    style: 'cancel',
                },
                {},
                {text: 'Lukk appen', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: true}
        )
        return true
    }

    componentDidMount() {
        this.mounted_Customer_main = true
        this.getLocationAsync().catch()
        BackHandler.addEventListener('hardwareBackPress', this.backAction)
    }

    componentWillUnmount() {
        this.mounted_Customer_main = false
        BackHandler.removeEventListener('hardwareBackPress', this.backAction)
    }

    /**
     * An anonymous function used to get user's location permission and to get
     * user's location.
     * @returns {Promise<void>}
     */
    getLocationAsync = async () => {
        if (this.props.user_permission.location !== 'granted') {
            let {status} = await Permissions.askAsync(Permissions.LOCATION)
            if (status === 'granted') {
                this.props.updatePermission({location: 'granted'})
            }
        }

        /**
         * A variable that stores user's current location.
         */
        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        })

        /**
         * Watching changes in location.
         */
        await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (newLocation) => {
                this.setState({
                    accuracy: newLocation.coords.accuracy,
                    altitude: newLocation.coords.altitude,
                    heading: newLocation.coords.heading,
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    speed: newLocation.coords.speed,
                    timestamp: newLocation.timestamp,
                })
            }
        )

        const {latitude, longitude} = location.coords
        await this.getGeocodeAsync({latitude, longitude})
        this.props.updateCustomerLocation({
            latitude: latitude,
            longitude: longitude,
        })
    }

    /**
     * An async function that returns user's current postal address
.     * @param location Current user's location.
     * @returns {Promise<void>}
     */
    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({geocode})
    }

    /* Fungerer bare i bare react native mode
    * Requires: import DeviceInfo from 'react-native-device-info'
    *
    * An anonymous function that gets deviceId.
    *

    getDeviceId = () => {
        let uid = DeviceInfo.getDeviceId()
        this.setState({ deviceId: uid })
    }

    */

    /**
     * An anonymous function that sends user's data to server and creates an order.
     * @returns {Promise<void>}
     */
    submitBookingButton = async () => {
        this.props.updateCustomerLocation({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        })

        const tokenGotten = await getToken()
        await fetch(serverIp + '/makeorder', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                deviceId: this.props.deviceId,
                latitude: this.props.customerLocation.latitude,
                longitude: this.props.customerLocation.longitude,
                token: tokenGotten,
            }),
        })
            .then((response) => response.text())
            .then((responseData) => {
                this.props.updateOrderId(responseData)
                this.props.navigation.navigate('Booking')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    /**
     * An anonymous function used to switch to the driver mode
     */
    changeToDriver = () => {
        this.props.updateMobNum('123456789')
        this.props.updateDeviceId('tlf123')
        this.props.updateUserType('true')
    }

    render() {
        const {geocode} = this.state
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    {this.props.user_permission.location === 'granted' && (
                        <View style={styles.grantedMainContainer}>
                            <View style={styles.spaceBetweenViews}>
                                <Text style={styles.locationAddress}>
                                    {current_address_location}
                                    {geocode && Platform.OS === 'ios'
                                        ? `${geocode[0].name}\n${geocode[0].city}`
                                        : ''}
                                    {geocode && Platform.OS !== 'ios'
                                        ? `${geocode[0].street} ${geocode[0].name}`
                                        : ''}
                                </Text>
                                <Text
                                    style={{color: 'lightgray'}}
                                    onPress={() => this.changeToDriver()}
                                >
                                    {change_user_to_driver}
                                </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.textBookingButtonContainer}
                                >
                                    <View style={styles.textBooking}>
                                        <Text
                                            style={styles.button}
                                            onPress={() =>
                                                this.submitBookingButton()
                                            }
                                        >
                                            {book_taxi}
                                        </Text>
                                        <Text style={styles.button_price}>
                                            ({basic_price})
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {this.props.user_permission.location === 'none' && (
                        <View style={styles.locationContainer}>
                            <View style={styles.locationInfoContainer}>
                                <Text style={styles.locationInfo}>
                                    {turn_on_location_explanation}
                                </Text>
                            </View>
                            <View style={styles.buttonLocationContainer}>
                                <TouchableOpacity
                                    style={styles.touchableLocationContainer}
                                    onPress={this.getLocationAsync}
                                >
                                    <Text style={styles.buttonLocation}>
                                        {turn_on_location}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
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
    },
    grantedMainContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
    },
    spaceBetweenViews: {
        flex: 0.7,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.4,
    },
    textBookingButtonContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 40,
        borderRadius: 25,
        backgroundColor: 'darkseagreen',
    },
    textBooking: {
        flex: 1,
        paddingHorizontal: 20,
    },
    button: {
        flex: 0.9,
        textAlign: 'center',
        fontSize: RFPercentage(9),
    },
    button_price: {
        flex: 0.2,
        textAlign: 'center',
        color: 'gray',
        textAlignVertical: 'center',
        fontSize: RFPercentage(3),
    },

    locationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    locationInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLocationContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        padding: 50,
    },
    touchableLocationContainer: {
        flex: 0.4,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'firebrick',
    },
    buttonLocation: {
        flex: 1,
        justifyContent: 'flex-start',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(6),
        padding: 15,
    },

    locationAddress: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: RFPercentage(3.5),
        textAlign: 'center',
    },
    locationInfo: {
        color: 'gray',
        alignItems: 'center',
        fontSize: RFPercentage(5),
        textAlign: 'center',
    },
})

/**
 * Mapping data from redux store.
 * @param state State stored in redux store.
 * @returns {{orderId: (string|number), mobileNumber: mobileNumber,
 * customerLocation: (user_location|{latitude: *, longitude: *}),
 * user_permission: (string|number|permission|{location: *}|NotificationPermission),
 * priority: ((function(*): {type: string, priority: *})|updatePriority),
 * deviceId: device_id, user: boolean, token: *}} Returns object with states.
 */
const mapStateToProps = (state) => ({
    customerLocation: state.user_location,
    orderId: state.order.orderId,
    deviceId: state.device_id,
    user: state.isGranted,
    token: state.token,
    mobileNumber: state.mobileNumber,
    user_permission: state.permission,
    priority: state.updatePriority,
})

/**
 * Dispatching actions using action creators.
 * @type {{updateDeviceId: (function(*): {type: string, deviceId: *}),
 * updateOrderId: (function(*): {orderId: *, type: string}),
 * updateCustomerLocation: (function(*): {user_location: {latitude: *, longitude: *}, type: string}),
 * updateToken: (function(*): {type: string, token: *}),
 * updateUserType: (function(*): {isDriver: *, type: string}),
 * updateMobNum: (function(*): {mobileNumber: *, type: string}),
 * updatePermission: (function(*): {permission: {location: *}, type: string}),
 * updateOrder: (function(*): {order_data: *, type: string}),
 * updatePriority: (function(*): {type: string, priority: *})}}
 */
const mapDispatchToProps = {
    updateCustomerLocation,
    updateToken,
    updateOrderId,
    updateDeviceId,
    updatePermission,
    updateOrder,
    updatePriority,
    updateUserType,
    updateMobNum,
}

/**
 * Connecting component with the redux store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Customer_main)
