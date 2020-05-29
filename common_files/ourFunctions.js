import React from 'react'

import {secretKey, serverIp} from './Texts'

let tokenGotten = ''

export const getToken = async () => {
    await fetch(serverIp + '/token', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            secretGotten: secretKey,
        }),
    })
        .then((response) => response.text())
        .then((responseData) => {
            tokenGotten = responseData
        })
        .catch((error) => {
            console.error(error)
        })
    return tokenGotten
}
