import React from 'react'
import DriverHasOrder from '../../../driver/DriverHasOrder'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<DriverHasOrder />).toJSON()
    expect(tree).toMatchSnapshot()
})
