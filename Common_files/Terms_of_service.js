import React from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList } from 'react-native'
import Constants from "expo-constants";

import {terms_of_service} from './Texts'
import { RFPercentage } from "react-native-responsive-fontsize";


export default class Privacy extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>{terms_of_service}</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    text: {
        marginTop: 20,
        fontSize: RFPercentage(3)
    }
});

