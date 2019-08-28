import axios from 'axios'

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS'
export const SET_ITEMS = 'SET_ITEMS'
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE'
export const IS_LOADING = 'IS_LOADING'
export const HAS_ERRORED = 'HAS_ERRORED'
export const SET_LIST = 'SET_LIST'
export const RESET_LIST = 'RESET_LIST'

export function addItem(item) {
	return {
		type: ADD_ITEM,
		item: item
	}
}

export function removeItem(index) {
	return {
		type: REMOVE_ITEM,
		index: index
	}
}

export function removeAllItems() {
	return {
		type: REMOVE_ALL_ITEMS
	}
}

export function setItems(items) {
	return {
		type: SET_ITEMS,
		items: items
	}
}

export function toggleActive(index) {
	return {
		type: TOGGLE_ACTIVE,
		index: index
	}
}

export function setLoading(bool) {
	return {
		type: IS_LOADING,
		isLoading: bool
	}
}

export function errored(bool) {
	return {
		type: HAS_ERRORED,
		hasErrored: bool
	}
}

export function setList(items, slid) {
	return {
		type: SET_LIST,
		items: items,
		slid: slid
	}
}

export function resetList() {
	return {
		type: RESET_LIST
	}
}

export function getItems(url) {
	return dispatch => {
		dispatch(setLoading(true)) // set loading

		// perform request to get shopping list by SLID
		axios
			.get(url)
			.then(response => {
				let items = []

				response.data.items.map((item, index) => {
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
