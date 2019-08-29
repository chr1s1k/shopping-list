import React from 'react'
import PropTypes from 'prop-types'

import ShoppingListItem from './ShoppingListItem'

const ShoppingList = ({
	items,
	handleRemoveItem,
	listReadOnly,
	listEditable,
	toggleActive
}) => {
	if (!items || !items.length) {
		return null // v pripade prazdneho pole se tato komponenta ShoppingList vubec nevykresli
	}

	return (
		<div className="list-group list-items">
			{items.map((item, index) => (
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
	)
}

// prop.items se ocekava jako pole
// prop.handleRemoveItem se ocekava jako funkce
ShoppingList.propTypes = {
	items: PropTypes.array,
	handleRemoveItem: PropTypes.func,
	listReadOnly: PropTypes.bool,
	listEditable: PropTypes.bool,
	toggleActive: PropTypes.func,
}

export default ShoppingList
