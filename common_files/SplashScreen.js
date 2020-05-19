import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import {updateIsLoading} from '../redux/actions'
import {connect} from 'react-redux'

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
        const data = await this.performTimeConsumingTask()

        if (data !== null) {
            this.props.updateIsLoading(false)
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image
                    source={require('../assets/fast_track_taxi_logo_ferdig.png')}
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const mapStateToProps = (state) => ({
    isLoading: state.loading,
})

const mapDispatchToProps = {
    updateIsLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
