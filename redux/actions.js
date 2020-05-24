import {
    UPDATE_IS_DRIVER,
    UPDATE_TOKEN,
    UPDATE_CONTACT,
    UPDATE_USER,
    USER_LOCATION,
    ORDER_ID,
    DEVICE_ID,
    UPDATE_IS_LOADING,
    MOBILE_NUMBER,
    PERMISSION,
    ORDER_DATA,
    PRIORITY,
    ORDER_LIST_DATA,
    DRIVER_IS_AVAILABLE,
} from './actionTypes'
import {isAvailable} from 'expo/build/AR'

// action creators
export const updateUser = (update) => ({
    type: UPDATE_USER,
    update,
})

export const addContact = (newContact) => ({
    type: UPDATE_CONTACT,
    payload: newContact,
})

export const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    token,
})

export const updateUserType = (isDriver) => ({
    type: UPDATE_IS_DRIVER,
    isDriver,
})

export const updateCustomerLocation = (user_location) => ({
    type: USER_LOCATION,
    user_location: {
        latitude: user_location.latitude,
        longitude: user_location.longitude,
    },
})

export const updateOrderId = (orderId) => ({
    type: ORDER_ID,
    orderId,
})

export const updateOrder = (order_data) => ({
    type: ORDER_DATA,
    order_data,
})

export const updateOrderList = (orderListData) => ({
    type: ORDER_LIST_DATA,
    orderListData,
})

export const updatePriority = (priority) => ({
    type: PRIORITY,
    priority,
})

export const updateDeviceId = (deviceId) => ({
    type: DEVICE_ID,
    deviceId,
})

export const updateIsLoading = (isLoading) => ({
    type: UPDATE_IS_LOADING,
    isLoading,
})

export const updateMobNum = (mobileNumber) => ({
    type: MOBILE_NUMBER,
    mobileNumber,
})

export const updatePermission = (permission) => ({
    type: PERMISSION,
    permission: {location: permission.location},
})

export const driver_is_available = (driver_is_available) => ({
    type: DRIVER_IS_AVAILABLE,
    driver_is_available,
})
