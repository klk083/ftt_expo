import {combineReducers} from 'redux'

import {
    UPDATE_CONTACT,
    UPDATE_TOKEN,
    UPDATE_IS_DRIVER,
    USER_LOCATION,
    ORDER_ID,
    DEVICE_ID,
    UPDATE_IS_LOADING,
    MOB_NUM,
    PERMISSION,
} from './actionTypes'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
    if (action.type === UPDATE_CONTACT) return [...state, action.payload]
    return state
}

const userType = (state = false, action) => {
    switch (action.type) {
        case UPDATE_IS_DRIVER:
            return action.isDriver
        default:
            return state
    }
}
const mobileNumber = (state = '', action) => {
    switch (action.type) {
        case MOB_NUM:
            return action.mob_num
        default:
            return state
    }
}

const user_location = (state = '', action) => {
    switch (action.type) {
        case USER_LOCATION:
            return action.user_location
        default:
            return state
    }
}

const order_id = (state = -1, action) => {
    switch (action.type) {
        case ORDER_ID:
            return Object.assign({}, state, {orderId: action.orderId})
        default:
            return state
    }
}

const device_id = (state = '', action) => {
    switch (action.type) {
        case DEVICE_ID:
            return Object.assign({}, state, {deviceId: action.deviceId})
        default:
            return state
    }
}

const loading = (state = true, action) => {
    switch (action.type) {
        case UPDATE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

const token = (state = '', action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return action.token
        default:
            return state
    }
}

const permission = (state = {errorMessage: 'Du må slå på lokasjonen for å bruke appen'}, action) => {
    switch (action.type) {
        case PERMISSION:
            return action.permission
        default:
            return state
    }
}

const reducer = combineReducers({
    userType,
    user_location,
    order_id,
    device_id,
    loading,
    token,
    mobileNumber,
    permission,
})

export default reducer
