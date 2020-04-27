import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {give_review, is_trip_done} from "../Common_files/Texts";

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
                    onPress: () => {}//this.props.navigation.navigate('Client Home')
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
                        size={40}
                        color='gold'
                    />
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.reviewContainer}>
                    <Text style={styles.trip_done}>{is_trip_done}</Text>
                    <Text style={styles.review}>{give_review}</Text>
                    <View style={styles.starsContainer}>
                        <View style={styles.rating_bar}>{rating_bar}</View>
                        <View>
                            <Text>{this.state.stars} / 5 stjerner</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.no_thanks} onPress={() => this.props.navigation.navigate('Client Home')}>Nei,
                            takk</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rating_bar: {
        margin: 10,
        flexDirection: 'row'
    },
    reviewContainer: {
        flex: 1,
        marginTop: 80,
        alignItems: 'center',
    },
    star: {
        padding: 5
    },
    trip_done: {
        color: 'teal',
        fontSize: 50,
    },
    review: {
        fontSize: 30,
    },
    no_thanks: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        //marginTop: 20,
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
    },
    starsContainer: {
        flex: 1,
        alignItems: 'center'
    },
    no_button: {
        //flex: 0.5,
        //marginTop:60,
    },
    buttonContainer: {
        flex: 0.3,
        //paddingTop: 100,
        alignItems: 'center',
    }
})
