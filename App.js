/**
 * App
 */
import React from 'react'
import {Provider} from 'react-redux'

import store from './redux/store'
import AppStack from './AppStack'

/**
 * Wrapping the app into the provider.
 */
class App extends React.Component {
    render() {
        console.disableYellowBox = true
        return (
            <Provider store={store}>
                <AppStack />
            </Provider>
        )
    }
}

export default App
