import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

import Order from './Order'

const renderItem = ({item}) => <Order {...item} />

const FlatListCustomers = (props) => (
    <FlatList
        renderItem={renderItem}
        data={props.contacts}
        keyExtractor={(renderItem) => renderItem.orderId.toString()}
        style={styles.flatList}
    />
)

FlatListCustomers.propTypes = {
    contacts: PropTypes.array,
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: 300,
    },
})

export default FlatListCustomers
