import React from 'react'

import ShoppingListItem from './ShoppingListItem'
import { Item } from '../../interfaces/types'

interface IProps {
	/**
	 * Array of shopping list items.
	 */
	items: Array<Item>
	/**
	 * Define whether the items of the list can be removed/changed or not.
	 */
	listReadOnly: boolean
	/**
	 * Define whether the state of items can be changed or not.
	 */
	listEditable?: boolean
	/**
	 * Function that will be run when item is about to be removed from the list.
	 * @param index - a number which identifies a particular item.
	 */
	handleRemoveItem?: (index: number) => void
	/**
	 * Function that will be run when the state of an item is about to be changed.
	 * @param index - a number which identifies a particular item.
	 */
	toggleActive?: (index: number) => void
}

const ShoppingList: React.FC<IProps> = (props: IProps) => {
	const {
		items,
		handleRemoveItem,
		listReadOnly,
		listEditable,
		toggleActive
	} = props

	return (
		<>
			{items && items.length > 0 && (
				<div className="list-group list-items">
					{items.map((item: Item, index: number) => (
						<ShoppingListItem
							key={index}
							index={index}
							item={item}
							handleOnClick={handleRemoveItem}
							readOnly={listReadOnly}
							editable={listEditable}
							toggleActive={toggleActive}
						/>
					))}
				</div>
			)}
		</>
	)
}

export default ShoppingList
