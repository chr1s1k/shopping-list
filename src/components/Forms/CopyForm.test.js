import React from 'react'
import { shallow } from 'enzyme'

import CopyForm from './CopyForm'

describe('CopyForm', () => {
	it('should render correctly without props', () => {
		const component = shallow(<CopyForm />)

		expect(component).toMatchSnapshot()
	})

	it('should render correctly with listURL prop', () => {
		const component = shallow(<CopyForm listUrl="/test/url" />)

		expect(component).toMatchSnapshot()
	})
})
