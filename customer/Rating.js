/**
 * Rating
 */
import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    SafeAreaView,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {RFPercentage} from 'react-native-responsive-fontsize'

import {
    give_review,
    is_trip_done,
    divide_by_5_stars,
    no_thanks,
} from '../common_files/Texts'

/**
 * Renders evaluation component for customer.
 */
export default class Rating extends React.Component {
    state = {
        stars: 0,
    }

    star = 'star'
    star_o = 'star-o'

    /**
     * A function that opens alert that shows number of stars given and ask about action.
     * @param key Which star was clicked.
     */
    updateStars(key) {
        this.setState({stars: key})
        Alert.alert(
            'Vurdering',
            'Du har gitt ' + key + (key <= 1 ? ' stjerne.' : ' stjerner.'),
            [
                {
                    text: 'Endre vurdering',
                    onPress: () => {},
                    style: 'cancel',
                },
                {},
                {
                    text: 'Gi vurdering',
                    onPress: () =>
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{name: 'Home'}],
                        }),
                },
            ],
            {cancelable: true}
        )
    }

    render() {
        /**
         * Makes the evaluation component ready.
         * @type {any[]} Table with touchable star icons.
         */
        let rating_bar = []
        for (let i = 1; i < 6; i++) {
            rating_bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => {
                        this.updateStars(i)
                    }}
                >
                    <Icon
                        style={styles.star}
                        name={i <= this.state.stars ? this.star : this.star_o}
                        size={RFPercentage(7)}
                        color="gold"
                    />
                </TouchableOpacity>
            )
        }

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.reviewContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.trip_done}>{is_trip_done}</Text>
                            <Text style={styles.review}>{give_review}</Text>
                        </View>
                        <View style={styles.starsContainer}>
                            <View style={styles.rating_bar}>{rating_bar}</View>
                            <View style={styles.starsRateContainer}>
                                <Text style={styles.starsRate}>
                                    {this.state.stars}
                                    {divide_by_5_stars}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchableNoThanksContainer}
                        >
                            <Text
                                style={styles.no_thanks}
                                onPress={() =>
                                    this.props.navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Home'}],
                                    })
                                }
                            >
                                {no_thanks}
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewContainer: {
        flex: 0.85,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    textContainer: {
        flex: 0.5,
        justifyContent: 'center',
    },
    starsContainer: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    touchableNoThanksContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    trip_done: {
        flex: 0.5,
        color: 'teal',
        textAlignVertical: 'center',
        fontSize: RFPercentage(7),
    },
    review: {
        flex: 0.5,
        textAlign: 'center',
        textAlignVertical: 'top',
        fontSize: RFPercentage(4),
    },
    rating_bar: {
        flex: 1,
        flexDirection: 'row',
    },
    star: {
        padding: 5,
    },
    starsRateContainer: {
        flex: 1,
    },
    starsRate: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'top',
        fontSize: RFPercentage(2),
    },
    no_thanks: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: RFPercentage(3),
    },
})
