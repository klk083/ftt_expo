import React from 'react'
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import {privacyText} from './Texts'

export default class Privacy extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.text}>{privacyText}</Text>
                    </ScrollView>
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
})
