import React from 'react'
import WelcomeScreen from '../../../common_files/WelcomeScreen'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON()
    expect(tree).toMatchSnapshot()
})
