import React from 'react'
import {Image} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                style={{width: RFPercentage(20), height: RFPercentage(8)}}
                source={require('../assets/fast_track_taxi_logo_ferdig.png')}
                resizeMode="cover"
            />
        )
    }
}

export default LogoTitle
