import { 
	ADD_ITEM,
	REMOVE_ITEM,
	REMOVE_ALL_ITEMS,
	SET_ITEMS,
	TOGGLE_ACTIVE,
	IS_LOADING,
	HAS_ERRORED,
	SET_LIST,
	RESET_LIST
} from '../actions/ShoppingListActions';

const ShoppingListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {
				items: [action.item, ...state.items] // novou položku přidej na začátek pole
			})

		case REMOVE_ITEM:
			return Object.assign({}, state, {
				items: [
					...state.items.slice(0, action.index), // na konec pole state prida polozky 0 az index
					...state.items.slice(action.index + 1) // a nasledne prida vsechno dal od index+1
				]
			})

    case REMOVE_ALL_ITEMS:
      return {
				...state,
        items: []
      };

		case SET_ITEMS:
			return Object.assign({}, state, {
				items: action.items
			})

    case TOGGLE_ACTIVE:
      const { index } = action;
      return {
				...state,
        items: [
          ...state.items.slice(0, action.index), // na konec pole state prida polozky 0 az index
          {...state.items[index], active: !state.items[index].active},
          ...state.items.slice(action.index + 1) // a nasledne prida vsechno dal od index+1
        ]
      };

    case IS_LOADING:
      // return Object.assign({}, state, {isLoading: action.isLoading});
      return { ...state, isLoading: action.isLoading }; // vrati kopii objektu state a modifikuje atribut isLoading

    case HAS_ERRORED:
      return {
				...state,
        hasErrored: action.hasErrored
			};

		case SET_LIST:
			return Object.assign(
				{},
				state,
				{
					slid: action.slid,
					items: action.items
				}
			)

		case RESET_LIST:
			return {
				...state,
				slid: null,
				items: []
			}

		default:
      return state;
  };
};

export default ShoppingListReducer;