export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS'
export const SET_ITEMS = 'SET_ITEMS'
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE'
export const IS_LOADING = 'IS_LOADING'
export const HAS_ERRORED = 'HAS_ERRORED'
export const SET_LIST = 'SET_LIST'
export const RESET_LIST = 'RESET_LIST'

export interface Item {
	/**
	 * Value of the item itself.
	 */
	value: string
	/**
	 * Define whether the item is still active it means is not marked as "checked".
	 */
	active: boolean
}

export interface ShoppingListState {
	/**
	 * Unique ID of the particular shopping list.
	 */
	slid: string | null
	/**
	 * List of shopping list items.
	 */
	items: Array<Item>
	/**
	 * Define whether there is a running ajax request.
	 */
	isLoading: boolean
	/**
	 * True if an error has occurred during creating/fetching shopping list.
	 */
	hasErrored: boolean
}

interface AddItemAction {
	type: typeof ADD_ITEM
	item: Item
}

interface RemoveItemAction {
	type: typeof REMOVE_ITEM
	index: number
}

interface RemoveAllItemsAction {
	type: typeof REMOVE_ALL_ITEMS
}

interface SetItemsAction {
	type: typeof SET_ITEMS
	items: Array<Item>
}

interface ToggleActiveAction {
	type: typeof TOGGLE_ACTIVE
	index: number
}

interface SetLoadingAction {
	type: typeof IS_LOADING
	isLoading: boolean
}

interface ErroredAction {
	type: typeof HAS_ERRORED
	hasErrored: boolean
}

interface SetListAction {
	type: typeof SET_LIST
	items: Array<Item>
	slid: string
}

interface ResetListAction {
	type: typeof RESET_LIST
}

export type ShoppingListActionType =
	| AddItemAction
	| RemoveItemAction
	| RemoveAllItemsAction
	| SetItemsAction
	| ToggleActiveAction
	| SetLoadingAction
	| ErroredAction
	| SetListAction
	| ResetListAction
