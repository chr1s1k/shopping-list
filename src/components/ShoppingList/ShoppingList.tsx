import React from 'react'

import ShoppingListItem from './ShoppingListItem'
import { Item } from '../../interfaces/types'

interface IProps {
	items: Array<Item>
	listReadOnly: boolean
	listEditable?: boolean
	handleRemoveItem?: (index: number) => void
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
