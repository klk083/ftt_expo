/**
 * Action creators.
 */
import {
    UPDATE_IS_DRIVER,
    UPDATE_TOKEN,
    USER_LOCATION,
    ORDER_ID,
    DEVICE_ID,
    UPDATE_IS_LOADING,
    MOBILE_NUMBER,
    PERMISSION,
    ORDER_DATA,
    PRIORITY,
    ORDER_LIST_DATA,
} from './actionTypes'

/**
 * Updates token.
 * @param token Token
 * @returns {{type: string, token: *}} Returns object.
 */
export const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    token,
})

/**
 * Updates user type.
 * @param isDriver True or false - To know whether it is a driver or a customer.
 * @returns {{isDriver: *, type: string}} Returns object.
 */
export const updateUserType = (isDriver) => ({
    type: UPDATE_IS_DRIVER,
    isDriver,
})

/**
 * Updates user location.
 * @param user_location Current user location. Coordinates
 * @returns {{user_location: {latitude: *, longitude: *}, type: string}} Returns object with user's location.
 */
export const updateCustomerLocation = (user_location) => ({
    type: USER_LOCATION,
    user_location: {
        latitude: user_location.latitude,
        longitude: user_location.longitude,
    },
})

/**
 * Updates order id.
 * @param orderId Order id number
 * @returns {{orderId: *, type: string}} Returns object.
 */
export const updateOrderId = (orderId) => ({
    type: ORDER_ID,
    orderId,
})

/**
 * Updates order.
 * @param order_data The order data.
 * @returns {{order_data: *, type: string}} Returns object.
 */
export const updateOrder = (order_data) => ({
    type: ORDER_DATA,
    order_data,
})

/**
 * Updates order list.
 * @param orderListData The order list data.
 * @returns {{orderListData: *, type: string}} Returns object.
 */
export const updateOrderList = (orderListData) => ({
    type: ORDER_LIST_DATA,
    orderListData,
})

/**
 * Updates order priority.
 * @param priority Priority value.
 * @returns {{type: string, priority: *}} Returns object.
 */
export const updatePriority = (priority) => ({
    type: PRIORITY,
    priority,
})

/**
 * Updates device id.
 * @param deviceId Device id value.
 * @returns {{type: string, deviceId: *}} Returns object.
 */
export const updateDeviceId = (deviceId) => ({
    type: DEVICE_ID,
    deviceId,
})

/**
 * Updates loading value.
 * @param isLoading isLoading value.
 * @returns {{isLoading: *, type: string}} Returns object.
 */
export const updateIsLoading = (isLoading) => ({
    type: UPDATE_IS_LOADING,
    isLoading,
})

/**
 * Updates user mobile number.
 * @param mobileNumber The mobile number.
 * @returns {{mobileNumber: *, type: string}} Returns object.
 */
export const updateMobNum = (mobileNumber) => ({
    type: MOBILE_NUMBER,
    mobileNumber,
})

/**
 * Updates location permission.
 * @param permission Permission - granted or not.
 * @returns {{permission: {location: *}, type: string}} Returns object with location permission.
 */
export const updatePermission = (permission) => ({
    type: PERMISSION,
    permission: {location: permission.location},
})
