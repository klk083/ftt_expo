import React from 'react'
import {getToken} from '../common_files/ourFunctions'
import {serverIp} from '../common_files/Texts'
// import {driverOrders} from "../redux/actions"; //
import store from '../redux/store'

export const getOrders = async () => {
    const tokenGotten = await getToken()
    await fetch(serverIp + '/getOrders', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            token: tokenGotten,
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('got to orders')
            console.log(json)
            return json
        })
        .catch((error) => {
            console.error(error)
        })
}

export default getOrders
