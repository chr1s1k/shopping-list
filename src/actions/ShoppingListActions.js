export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS';
export const SET_ITEMS = 'SET_ITEMS';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item: item
  };
};

export function removeItem(index) {
  return {
    type: REMOVE_ITEM,
    index: index
  }
};

export function removeAllItems() {
  return {
    type: REMOVE_ALL_ITEMS
  };
};

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items: items
  };
};

export function toggleActive(index) {
  return {
    type: TOGGLE_ACTIVE,
    index: index
  };
};