import React from 'react'
import {getToken} from '../common_files/ourFunctions'
import {serverIp} from '../common_files/Texts'
import {
    updateOrderList
} from '../redux/actions'

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
            console.log(json)
            if (json.length) {
                this.props.updateOrderList([json])
                console.log('got to orders')
                console.log(json)
                return true;
            } else {
                console.log('Array was empty')
                return false;
            }

        })
        .catch((error) => {
            console.error(error)
        })
}
const mapDispatchToProps = {
    updateOrderList,
}


export default getOrders
