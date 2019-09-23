import React from 'react'

import ShoppingListItem from './ShoppingListItem'
import { Item } from '../../interfaces/types'

interface IProps {
	items: Array<Item>,
	listReadOnly: boolean,
	listEditable?: boolean,
	handleRemoveItem?: (index: number) => void,
	toggleActive?: (index: number) => void
}

const ShoppingList = (props: IProps) => {
	const {
		items,
		handleRemoveItem,
		listReadOnly,
		listEditable,
		toggleActive
	} = props

	if (!items || !items.length) {
		return null // v pripade prazdneho pole se tato komponenta ShoppingList vubec nevykresli
	}

	return (
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
	)
}

export default ShoppingList
