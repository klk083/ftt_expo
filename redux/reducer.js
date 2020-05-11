import {combineReducers} from 'redux'

import {UPDATE_CONTACT, TOGGLE_IS_TOKEN, TOGGLE_IS_DRIVER, USER_LOCATION, ORDER_ID, DEVICE_ID} from "./actionTypes";

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
    if (action.type === UPDATE_CONTACT) return [...state, action.payload]
    return state
}
/*
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return merge(state, action.payload)
        case UPDATE_CONTACT:
            return merge(state, {prevContact: action.payload})
        default:
            return state
    }
}
*/

const userReducer = (state = '', action) => {
    switch (action.type) {
        case TOGGLE_IS_TOKEN:
            return Object.assign({}, state, {token: action.token});
        case TOGGLE_IS_DRIVER:
            return Object.assign({}, state, {driver: action.driver});
        default:
            return state
    }
}

const customerLocationReducer = (state = '', action) => {
    switch (action.type) {
        case USER_LOCATION:
            return Object.assign({}, state, {user_location: action.user_location})
        default:
            return state
    }
}

const orderIdReducer = (state = -1, action) => {
    switch (action.type) {
        case ORDER_ID:
            return Object.assign({}, state, {orderId: action.orderId})
        default:
            return state
    }
}

const deviceIdReducer = (state = '', action) => {
    switch (action.type) {
        case DEVICE_ID:
            return Object.assign({}, state, {deviceId: action.deviceId})
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer,
    customerLocation: customerLocationReducer,
    orderId: orderIdReducer,
    deviceId: deviceIdReducer,
    //contacts: contactReducer,
})

export default reducer
