import React from 'react'
import {getToken} from '../common_files/ourFunctions'
import {serverIp} from '../common_files/Texts'
import {updateMobNum} from '../redux/actions'
import store from '../redux/store'

export const getOrderPhoneNumber = async () => {
    const tokenGotten = await getToken()
    await fetch(serverIp + '/takeorder', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            orderId: this.props.orderId,
            deviceId: this.props.deviceId,
            token: tokenGotten,
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('took Order, got Phone number:')
            console.log(json[0].phoneNumber)
            this.props.updateMobNum(json[0].phoneNumber)
        })
        .catch((error) => {
            console.error(error)
        })
}
const mapStateToProps = (state) => ({
    orderId: state.order_id,
    deviceId: state.deviceId,
    mobileNumber: state.mobileNumber,
})

export default getOrderPhoneNumber
