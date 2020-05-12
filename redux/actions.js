import {
    UPDATE_IS_DRIVER,
    UPDATE_TOKEN,
    UPDATE_CONTACT,
    UPDATE_USER,
    USER_LOCATION,
    ORDER_ID,
    DEVICE_ID,
} from "./actionTypes";

// action creators
export const updateUser = update => ({
    type: UPDATE_USER,
    update,
})

export const addContact = newContact => ({
    type: UPDATE_CONTACT,
    payload: newContact,
})

export const updateToken= token => ({
    type: UPDATE_TOKEN,
    token,
})

export const updateIsDriver = isDriver => ({
    type: UPDATE_IS_DRIVER,
    isDriver,
})

export const updateCustomerLocation = user_location => ({
    type: USER_LOCATION,
    user_location: user_location,
})

export const updateOrderId = orderId => ({
    type: ORDER_ID,
    orderId,
})

export const updateDeviceId = deviceId => ({
    type: DEVICE_ID,
    deviceId,
})


