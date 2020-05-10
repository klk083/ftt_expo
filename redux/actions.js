import {TOGGLE_IS_DRIVER, TOGGLE_IS_TOKEN, UPDATE_CONTACT, UPDATE_USER, USER_LOCATION} from "./actionTypes";

// action creators
export const updateUser = update => ({
    type: UPDATE_USER,
    payload: update,
})

export const addContact = newContact => ({
    type: UPDATE_CONTACT,
    payload: newContact,
})

export const toggleIsToken= newIsTokenState => ({
    type: TOGGLE_IS_TOKEN,
    token: newIsTokenState,
})

export const toggleIsDriver = newIsDriverState => ({
    type: TOGGLE_IS_DRIVER,
    driver: newIsDriverState,
})

export const updateCustomerLocation = newLocation => ({
    type: USER_LOCATION,
    user_location: newLocation,
})
