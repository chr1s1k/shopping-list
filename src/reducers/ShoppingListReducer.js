import { ADD_ITEM, REMOVE_ITEM } from '../actions/ShoppingListActions';

const ShoppingListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];

    case REMOVE_ITEM:
      return [
        ...state.slice(0, action.index), // na konec pole state prida polozky 0 az index
        ...state.slice(action.index + 1) // a nasledne prida vsechno dal od index+1
      ];

    default:
      return state;
  };
};

export default ShoppingListReducer;