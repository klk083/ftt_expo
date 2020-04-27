import React from 'react';
import {Image} from "react-native";

export default class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                style={{width: 120, height: 120}}
                source={require('../assets/fast_track_taxi_logo_ferdig.png')}
            />
        );
    }
}
