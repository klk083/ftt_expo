import React from 'react'
import Terms_of_service from '../../../common_files/Terms_of_service'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<Terms_of_service />).toJSON()
    expect(tree).toMatchSnapshot()
})
