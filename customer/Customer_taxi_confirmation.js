import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    BackHandler,
    Alert,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {connect} from 'react-redux'

import {
    confirmation_msg,
    taxi_num,
    taxi_corporation,
} from '../common_files/Texts'
import Rating from './Rating'

class Customer_taxi_confirmation extends React.Component {
    state = {
        isReviewed: false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({isReviewed: true}), 10000)
        BackHandler.addEventListener('hardwareBackPress', this.backAction)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction)
    }

    backAction = () => {
        if (this.state.isReviewed) {
            Alert.alert(
                'Vil du avbryte og gå til startskjerm?',
                '',
                [
                    {
                        text: 'Til startskjerm',
                        onPress: () =>
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Home'}],
                            }),
                        style: 'cancel',
                    },
                    {},
                    {
                        text: 'Gi vurering',
                        onPress: () => {},
                    },
                ],
                {cancelable: true}
            )
            return true
        } else {
            Alert.alert(
                'Avbestilling ikke mulig',
                'Du kan ikke avbestille taxi nå.',
                [
                    {
                        text: 'OK',
                        onPress: () => null,
                        style: 'cancel',
                    },
                ],
                {cancelable: true}
            )
            return true
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.info_container}>
                        <Text style={styles.text}>{confirmation_msg}</Text>
                        <Text style={styles.text}>
                            {taxi_num}
                            {this.props.taxiNumber}
                        </Text>
                        <Text style={styles.text}>
                            {taxi_corporation}
                            {this.props.companyName}
                        </Text>
                    </View>
                    {this.state.isReviewed && (
                        <View style={styles.ratingContainer}>
                            <Rating {...this.props} />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    info_container: {
        flex: 0.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ratingContainer: {
        flex: 0.6,
    },
    text: {
        textAlign: 'center',
        fontSize: RFPercentage(5),
    },
})

const mapStateToProps = (state) => ({
    companyName: state.order.companyName,
    taxiNumber: state.order.taxiNumber,
})

export default connect(mapStateToProps)(Customer_taxi_confirmation)
