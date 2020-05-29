import React from 'react'
import {getToken} from '../common_files/ourFunctions'
import {serverIp} from '../common_files/Texts'

export const getOrders = async () => {
    console.log("Called getOrders");
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
            if (json.length) {
                console.log('got to orders')
                return json[0].object;
            } else {
                console.log('Array was empty')
                return false;
            }

        })
        .catch((error) => {
            console.error(error)
        })
}


export default getOrders
