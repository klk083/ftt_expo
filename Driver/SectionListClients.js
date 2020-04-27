import React from 'react'
import {FlatList, Text} from 'react-native'
import PropTypes from 'prop-types'

import Order from './Order'

const renderItem = ({item}) => <Order {...item}/>

const FlatListClients = props => (
    <FlatList
        renderItem={renderItem}
        data={props.contacts}
        style={{width: '70%'}}
    />
)

FlatListClients.propTypes = {
  contacts: PropTypes.array,
}

export default FlatListClients
