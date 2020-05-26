import React from 'react'
import Privacy from '../../../common_files/Privacy'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<Privacy />).toJSON()
    expect(tree).toMatchSnapshot()
})
