import React, { MouseEvent } from 'react'
import { Item } from '../../interfaces/types'

interface Props {
	/**
	 * Shopping list item.
	 */
	item: Item
	/**
	 * Define whether the item can be removed/changed or is just read only.
	 */
	readOnly?: boolean
	/**
	 * Define whether the state of the item can be changed or not.
	 */
	editable?: boolean
	/**
	 * A number which identifies the item.
	 */
	index: number
	/**
	 * Function that will be run when item is about to be removed from the list.
	 * @param index - a number which identifies a particular item.
	 */
	handleOnClick?: (index: number) => void
	/**
	 * Function that will be run when the state of an item is about to be changed.
	 * @param index - a number which identifies a particular item.
	 */
	toggleActive?: (index: number) => void
}

const ShoppingListItem: React.FC<Props> = ({
	item,
	index,
	readOnly,
	editable,
	handleOnClick,
	toggleActive
}) => {
	const removeItem = (event: MouseEvent): void => {
		event.preventDefault()

		if (handleOnClick) {
			handleOnClick(index)
		}
	}

	const changeItemState = (event: MouseEvent): void => {
		event.preventDefault()

		if (toggleActive) {
			toggleActive(index)
		}
	}

	if (!readOnly) {
		return (
			<a
				href="/"
				className="list-group-item"
				title="Odstranit položku"
				onClick={removeItem}
				role="button"
			>
				{item.value}{' '}
				<i
					className="glyphicon glyphicon-remove icon-remove"
					aria-hidden="true"
				></i>
			</a>
		)
	} else if (editable) {
		return (
			<a
				href="/"
				className={
					'list-group-item item-' + (item.active ? 'active' : 'inactive')
				}
				onClick={changeItemState}
				role="button"
			>
				<span>{item.value}</span>
				<i className="glyphicon glyphicon-ok icon-done" aria-hidden="true"></i>
			</a>
		)
	} else {
		return <div className="list-group-item">{item.value}</div>
	}
}

export default ShoppingListItem
