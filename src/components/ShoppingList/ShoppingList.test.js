// eslint-disable-next-line no-unused-vars
import React from 'react'
import { shallow } from 'enzyme'

import ShoppingList from './ShoppingList'
// import ShoppingListItem from './ShoppingListItem'

describe('Shopping list test', () => {
	it('should render some items', () => {
		const items = [
			{
				value: 'apple',
			},
			{
				value: 'carrot',
			},
			{
				value: 'onion',
			}
		]
		const component = shallow(<ShoppingList items={items} />)

		// console.log(component.debug())

		// expect(component).toMatchSnapshot()
		expect(component.find('.list-items')).toBeDefined()
		// expect(component.find('.list-group-item')).toHaveLength(items.length)
		expect(component.find('ShoppingListItem').length).toBe(items.length)
	})
})