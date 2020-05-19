import React from 'react'
import { Provider } from 'react-redux'


import store from './redux/store'
import AppStack from './AppStack'

class AppStackScreen extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppStack/>
            </Provider>
        )
    }
}

export default AppStackScreen
