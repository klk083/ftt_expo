import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";

import {secretKey, serverIp} from '../Common_files/Texts'

 let tokenGotten ='';

export const getToken = async () => {
    await fetch(serverIp+'/token', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            secretGotten: secretKey,
        }),
    })
        .then((response) => response.text())
        .then((responseData) => {

            tokenGotten= responseData;
        })
        .catch(error => {
            console.error(error);

        });
    return tokenGotten
}



const styles = StyleSheet.create({
    /*
    container: {
        flex:1,
    },
    */

})
