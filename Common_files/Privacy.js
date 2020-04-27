import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import Constants from "expo-constants";

import {privacyText} from "./Texts";

export default class Privacy extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>{privacyText}</Text>
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
    }
});
