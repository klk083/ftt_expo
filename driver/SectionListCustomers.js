import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

import Order from './Order'

const renderItem = ({item}) => <Order {...item} />

const SectionListCustomers = (props) => (
    <FlatList
        renderItem={renderItem}
        data={props.orders}
        keyExtractor={(renderItem) => renderItem.orderId.toString()}
        style={styles.flatList}
    />
)

SectionListCustomers.propTypes = {
    orders: PropTypes.array,
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: 300,
    },
})

export default SectionListCustomers
