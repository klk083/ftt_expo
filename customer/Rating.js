import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { give_review, is_trip_done } from "../common_files/Texts"

export default class Rating extends React.Component {
    state = {
        stars: 0
    }

    star = 'star'
    star_o = 'star-o'

    updateStars(key) {
        this.setState({stars: key})
        Alert.alert(
            'Vurdering',
            'Du har gitt ' + key + ((key) <= 1 ? ' stjerne.' : ' stjerner.'),
            [
                {
                    text: 'Endre vurdering',
                    onPress: () => {},
                    style: 'cancel',
                },
                {},
                {
                    text: 'Gi vurdering',
                    onPress: () => this.props.navigation.navigate('Home')
                },
            ]
        )
    }

    render() {
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
                        name={
                            i <= this.state.stars ? this.star : this.star_o
                        }
                        size={RFPercentage(7)}
                        color='gold'
                    />
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.reviewContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.trip_done}>{is_trip_done}</Text>
                        <Text style={styles.review}>{give_review}</Text>
                    </View>
                    <View style={styles.starsContainer}>
                        <View style={styles.rating_bar}>{rating_bar}</View>
                        <View>
                            <Text style={styles.starsRate}>{this.state.stars} / 5 stjerner</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.touchableNoThanksContainer}>
                        <Text
                            style={styles.no_thanks}
                            onPress={() => this.props.navigation.navigate('Home')}
                        >Nei, takk</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
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
        flexDirection: 'row'
    },
    star: {
        padding: 5
    },
    starsRate: {
        fontSize: RFPercentage(2)
    },
    no_thanks: {
        textAlign: 'center',
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
        fontSize: RFPercentage(3),
        padding: 10,
    }
})
