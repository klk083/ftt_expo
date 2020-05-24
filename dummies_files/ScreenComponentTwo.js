import React from 'react'
import {Button, View} from 'react-native'

export default class ScreenComponentTwo extends React.Component {
    static navigationOptions = {
        headerTitle: 'Second Screen',
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 55,
                    borderColor: 'orange',
                }}
            >
                <Button
                    title="Go to screen one"
                    onPress={() => {
                        this.props.navigation.navigate('RouteNameOne')
                    }}
                />
            </View>
        )
    }
}
