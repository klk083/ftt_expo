import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {updateIsLoading} from '../redux/actions'
import {connect} from 'react-redux'

/**
 * SplashScreen screen
 */
export class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve('result')
            }, 2000)
        )
    }

    async componentDidMount() {
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
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
        )
    }
}

/**
 * A variable that stores style objects.
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

/**
 * Mapping data from redux store.
 * @param state State stored in redux store.
 * @returns {{isLoading: boolean}} Returns boolean value.
 */
const mapStateToProps = (state) => ({
    isLoading: state.loading,
})

/**
 * Dispatching actions using action creators.
 * @type {{updateIsLoading: updateIsLoading}}
 */
const mapDispatchToProps = {
    updateIsLoading,
}

/**
 * Connecting component with the redux store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
