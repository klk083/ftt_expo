import React from 'react'
import {FlatList, Text} from 'react-native'
import PropTypes from 'prop-types'

import Order from './Order'

const renderItem = ({item}) => <Order {...item}/>

const FlatListCustomers = props => (
    <FlatList
        renderItem={renderItem}
        data={props.contacts}
        keyExtractor={renderItem => renderItem.key.toString()}
        style={{width: 300}}
    />
)

FlatListCustomers.propTypes = {
  contacts: PropTypes.array,
}

export default FlatListCustomers
