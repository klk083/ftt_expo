import {
    UPDATE_IS_DRIVER,
    UPDATE_TOKEN,
    UPDATE_CONTACT,
    UPDATE_USER,
    USER_LOCATION,
    ORDER_ID,
    DEVICE_ID, UPDATE_IS_LOADING,
    MOB_NUM, PERMISSION,
} from './actionTypes'

// action creators
export const updateUser = update => ({
    type: UPDATE_USER,
    update,
})

export const addContact = newContact => ({
    type: UPDATE_CONTACT,
    payload: newContact,
})

export const updateToken = token => ({
    type: UPDATE_TOKEN,
    token,
})

export const updateUserType = isDriver => ({
    type: UPDATE_IS_DRIVER,
    isDriver,
})

export const updateCustomerLocation = user_location => ({
    type: USER_LOCATION,
    user_location: {latitude: user_location.latitude, longitude: user_location.longitude},
})

export const updateOrderId = orderId => ({
    type: ORDER_ID,
    orderId,
})

export const updateDeviceId = deviceId => ({
    type: DEVICE_ID,
    deviceId,
})

export const updateIsLoading = isLoading => ({
    type: UPDATE_IS_LOADING,
    isLoading,
})

export const updateMobNum = mob_num => ({
    type: MOB_NUM,
    mob_num,
})

export const updatePermission = permission => ({
    type: PERMISSION,
    permission: {errorMessage: permission.errorMessage}
})

