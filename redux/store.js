import {createStore} from 'redux'

import {addContact, toggleIsDriver, toggleIsToken} from './actions'
import reducer from './reducer'

const store = createStore(reducer)

//console.log(store.getState())
/*
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))


store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'david m', phone: '5050505050'}))

store.dispatch(toggleIsToken('enNyToken2'))
console.log(store.getState())
store.dispatch(toggleIsDriver(false))
console.log(store.getState())
store.dispatch(toggleIsToken('heltNytoken'))
console.log(store.getState())
store.dispatch(toggleIsDriver(true))
*/
console.log(store.getState())
export default store
