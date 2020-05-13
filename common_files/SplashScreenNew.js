import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {updateIsLoading} from "../redux/actions";

class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                2000
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            //store.dispatch(updateIsLoading(false))
            //store.getState()
            this.props.navigation.navigate('Customer');
        }
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Image
                    source={require('../assets/fast_track_taxi_logo_ferdig.png')}
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
