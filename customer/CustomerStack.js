import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Customer_main from './Customer_main'
import Customer_booking from './Customer_booking'
import Customer_booking_priority from './Customer_booking_priority'
import Customer_booked_priority from './Customer_booked_priority'
import Customer_taxi_confirmation from './Customer_taxi_confirmation'

const CustomerDrawerStack = createDrawerNavigator()

class CustomerStack extends React.Component {
    render() {
        return (
            <CustomerDrawerStack.Navigator drawerPosition='right' drawerStyle={{width: 200}}>
                <CustomerDrawerStack.Screen name='Home' component={Customer_main} options={{drawerLabel: 'Hjem'}}/>
                <CustomerDrawerStack.Screen name='Booking' component={Customer_booking} options={{drawerLabel: 'Bestilling'}}/>
                <CustomerDrawerStack.Screen name='Booking priority' component={Customer_booking_priority} options={{drawerLabel: 'Prioritert bestilling'}}/>
                <CustomerDrawerStack.Screen name='Booking priority booked' component={Customer_booked_priority} options={{drawerLabel: 'Prioritert bestilling bestilt'}}/>
                <CustomerDrawerStack.Screen name='Booking confirmation' component={Customer_taxi_confirmation} options={{drawerLabel: 'Bekreftelse'}}/>
            </CustomerDrawerStack.Navigator>
        )
    }
}

export default CustomerStack
