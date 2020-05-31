import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

import Order from './Order'

/**
 * Renders order.
 * @param item Order item
 * @returns {Order} Order component.
 */
const renderItem = ({item}) => <Order {...item} />

/**
 * Creates FlatList with orders.
 * @param props OrderList
 */
const SectionListCustomers = (props) => (
    <FlatList
        renderItem={renderItem}
        data={props.orders}
        keyExtractor={(renderItem) => renderItem.orderId.toString()}
        style={styles.flatList}
    />
)

/**
 * Validating type
 */
SectionListCustomers.propTypes = {
    orders: PropTypes.array,
}

/**
 * A variable that stores style objects.
 */
const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: 300,
    },
})

export default SectionListCustomers
