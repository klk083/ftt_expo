import React from 'react'
import LogoTitle from '../../../common_files/LogoTitle'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<LogoTitle />).toJSON()
    expect(tree).toMatchSnapshot()
})
