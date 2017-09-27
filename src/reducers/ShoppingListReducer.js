import { ADD_ITEM, REMOVE_ITEM, REMOVE_ALL_ITEMS, SET_ITEMS } from '../actions/ShoppingListActions';

const ShoppingListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        items: [...state.items, action.item]
      };

    case REMOVE_ITEM:
      return {
        items: [
          ...state.items.slice(0, action.index), // na konec pole state prida polozky 0 az index
          ...state.items.slice(action.index + 1) // a nasledne prida vsechno dal od index+1
        ]
      };

    case REMOVE_ALL_ITEMS:
      return {
        items: []
      };

    case SET_ITEMS:
      return {
        items: action.items
      };

    default:
      return state;
  };
};

export default ShoppingListReducer;