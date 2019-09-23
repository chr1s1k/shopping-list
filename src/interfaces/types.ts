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
	value: string,
	active: boolean
}

export interface ShoppingListState {
	slid: string | null,
	items: Array<Item>,
	isLoading: boolean,
	hasErrored: boolean,
}

interface addItemAction {
	type: typeof ADD_ITEM,
	item: Item
}

interface removeItemAction {
	type: typeof REMOVE_ITEM,
	index: number
}

interface removeAllItemsAction {
	type: typeof REMOVE_ALL_ITEMS
}

interface setItemsAction {
	type: typeof SET_ITEMS,
	items: Array<Item>
}

interface toggleActiveAction {
	type: typeof TOGGLE_ACTIVE,
	index: number
}

interface setLoadingAction {
	type: typeof IS_LOADING,
	isLoading: boolean
}

interface erroredAction {
	type: typeof HAS_ERRORED,
	hasErrored: boolean
}

interface setListAction {
	type: typeof SET_LIST,
	items: Array<Item>,
	slid: string
}

interface resetListAction {
	type: typeof RESET_LIST
}

export type ShoppingListActionType = addItemAction | removeItemAction | removeAllItemsAction | setItemsAction | toggleActiveAction | setLoadingAction | erroredAction | setListAction | resetListAction