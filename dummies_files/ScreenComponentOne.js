import React from 'react'
import {Button, View} from 'react-native'

export default class ScreenComponentOne extends React.Component {
    static navigationOptions = {
        headerTitle: 'First Screen',
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 55,
                    borderColor: 'teal',
                }}
            >
                <Button
                    title="Go to screen two"
                    onPress={() => {
                        this.props.navigation.navigate('RouteNameTwo')
                    }}
                />
            </View>
        )
    }
}
