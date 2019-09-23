import axios from 'axios'
import { Dispatch } from 'redux'

import {
	Item,
	ShoppingListActionType,
	ADD_ITEM,
	REMOVE_ITEM,
	REMOVE_ALL_ITEMS,
	SET_ITEMS,
	TOGGLE_ACTIVE,
	IS_LOADING,
	HAS_ERRORED,
	SET_LIST,
	RESET_LIST
} from '../interfaces/types'

// typescript infers that this function is returning addItemAction
export function addItem(item: Item): ShoppingListActionType {
	return {
		type: ADD_ITEM,
		item
	}
}

export function removeItem(index: number): ShoppingListActionType {
	return {
		type: REMOVE_ITEM,
		index
	}
}

export function removeAllItems(): ShoppingListActionType {
	return {
		type: REMOVE_ALL_ITEMS
	}
}

export function setItems(items: Array<Item>): ShoppingListActionType {
	return {
		type: SET_ITEMS,
		items
	}
}

export function toggleActive(index: number): ShoppingListActionType {
	return {
		type: TOGGLE_ACTIVE,
		index
	}
}

export function setLoading(bool: boolean): ShoppingListActionType {
	return {
		type: IS_LOADING,
		isLoading: bool
	}
}

export function errored(bool: boolean): ShoppingListActionType {
	return {
		type: HAS_ERRORED,
		hasErrored: bool
	}
}

export function setList(items: Array<Item>, slid: string): ShoppingListActionType {
	return {
		type: SET_LIST,
		items,
		slid
	}
}

export function resetList(): ShoppingListActionType {
	return {
		type: RESET_LIST
	}
}

export function getItems(url: string) {
	return (dispatch: Dispatch) => {
		dispatch(setLoading(true)) // set loading

		// perform request to get shopping list by SLID
		axios
			.get(url)
			.then(response => {
				const items: Array<Item> = []

				response.data.items.map((item: string) => {
					return items.push({
						value: item,
						active: true
					})
				})

				dispatch(setList(items, response.data.slid))
				dispatch(setLoading(false))
			})
			.catch(() => {
				dispatch(errored(true))
			})
	}
}
