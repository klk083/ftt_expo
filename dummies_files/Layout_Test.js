import React from 'react'
import {View, Text, StatusBar} from 'react-native'

export default class Test extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    borderWidth: 5,
                    borderColor: 'yellow',
                    justifyContent: 'space-between',
                    marginTop: StatusBar.currentHeight,
                }}
            >
                <View
                    style={{
                        flex: 0.3,
                        borderWidth: 5,
                        borderColor: 'red',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 0.33,
                            borderWidth: 5,
                            borderColor: 'purple',
                        }}
                    />
                    <View
                        style={{
                            flex: 0.33,
                            borderWidth: 5,
                            borderColor: 'green',
                        }}
                    >
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'purple',
                            }}
                        />
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'green',
                            }}
                        />
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'blue',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 0.33,
                            borderWidth: 5,
                            borderColor: 'blue',
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 0.3,
                        borderWidth: 5,
                        borderColor: 'green',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 0.33,
                            borderWidth: 5,
                            borderColor: 'purple',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'yellow',
                                marginHorizontal: 10,
                                marginTop: 10,
                            }}
                        />
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'blue',
                            }}
                        />
                    </View>
                    <View
                        style={{flex: 0.33, borderWidth: 5, borderColor: 'red'}}
                    >
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'purple',
                            }}
                        />
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'green',
                            }}
                        />
                        <View
                            style={{
                                flex: 0.33,
                                borderWidth: 5,
                                backgroundColor: 'blue',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 0.33,
                            borderWidth: 5,
                            borderColor: 'blue',
                        }}
                    >
                        <View
                            style={{
                                flex: 0.5,
                                borderWidth: 5,
                                backgroundColor: 'yellow',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{alignSelf: 'center'}}>ØVERST</Text>
                        </View>
                        <View
                            style={{
                                flex: 0.3,
                                borderWidth: 5,
                                backgroundColor: 'blue',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>NEDERST</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{flex: 0.3, borderWidth: 5, borderColor: 'blue'}}
                />
            </View>
        )
    }
}
