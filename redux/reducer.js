/**
 * Reducer. Changing states in redux store.
 */
import {combineReducers} from 'redux'

import {
    UPDATE_TOKEN,
    UPDATE_IS_DRIVER,
    USER_LOCATION,
    DEVICE_ID,
    UPDATE_IS_LOADING,
    MOBILE_NUMBER,
    PERMISSION,
    ORDER_DATA,
    ORDER_LIST_DATA,
    COMPANY_NAME,
    TAXI_NUMBER,
    PRIORITY,
    ORDER_ID,
} from './actionTypes'

/**
 * Reduces user type action.
 * @type {string}
 */
const initial_userType = 'false'
const userType = (state = initial_userType, action) => {
    switch (action.type) {
        case UPDATE_IS_DRIVER:
            return action.isDriver
        default:
            return state
    }
}

/**
 * Reduces mobile number action.
 * @type {string}
 */
const initial_mobileNumber = '-1'
const mobileNumber = (state = initial_mobileNumber, action) => {
    switch (action.type) {
        case MOBILE_NUMBER:
            return action.mobileNumber
        default:
            return state
    }
}

/**
 * Reduces location action.
 * @type {{latitude: number, longitude: number}} Location object.
 * Contains latitude and longitude values of number type.
 */
const initial_user_location = {latitude: 63.430487, longitude: 10.394978}
const user_location = (state = initial_user_location, action) => {
    switch (action.type) {
        case USER_LOCATION:
            return action.user_location
        default:
            return state
    }
}

/**
 * Reduces order action.
 * @type {{orderId: number, companyName: string, taxiNumber: string}} Order object.
 * Contains orderId of number type, companyName and taxiNumber of String type.
 */
const initial_order = {
    companyName: 'COMPANY_NAME',
    taxiNumber: 'TAXI_NUMBER',
    orderId: -1,
}
const order = (state = initial_order, action) => {
    switch (action.type) {
        case ORDER_ID:
            return Object.assign({}, state, {orderId: action.orderId})
        case ORDER_DATA:
            return action.order_data
        default:
            return state
    }
}

/**
 * Reduces order priority action.
 * @type {number}
 */
const initial_updatePriority = 0
const updatePriority = (state = initial_updatePriority, action) => {
    switch (action.type) {
        case PRIORITY:
            return action.priority
        default:
            return state
    }
}

/**
 * Reduces order list action.
 * @type {*[]}
 */
const initial_updateOrderList = []
const orderList = (state = initial_updateOrderList, action) => {
    switch (action.type) {
        case ORDER_LIST_DATA:
            return action.orderListData
        default:
            return state
    }
}

/**
 * Reduces deviceId action.
 * @type {string}
 */
const initial_device_id = 'tlf321'
const device_id = (state = initial_device_id, action) => {
    switch (action.type) {
        case DEVICE_ID:
            return action.deviceId
        default:
            return state
    }
}

/**
 * Reduces loading action.
 * @type {string}
 */
const initial_loading = 'true'
const loading = (state = initial_loading, action) => {
    switch (action.type) {
        case UPDATE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

/**
 * Reduces token action.
 * @type {string}
 */
const initial_token = ''
const token = (state = initial_token, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return action.token
        default:
            return state
    }
}

/**
 * Reduces location action.
 * @type {{location: string}} Location object.
 */
const initial_permission = {location: 'none'}
const permission = (state = initial_permission, action) => {
    switch (action.type) {
        case PERMISSION:
            return action.permission
        default:
            return state
    }
}

/**
 * Combines all reducer into one.
 */
const reducer = combineReducers({
    userType,
    user_location,
    order,
    device_id,
    loading,
    token,
    mobileNumber,
    permission,
    updatePriority,
    orderList,
})

export default reducer
