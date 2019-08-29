import React from 'react'
import PropTypes from 'prop-types'

class ShoppingListItem extends React.Component {
	constructor(props) {
		super(props)

		this.handleOnClick = this.handleOnClick.bind(this)
		this.changeItemState = this.changeItemState.bind(this)
	}

	handleOnClick(event) {
		event.preventDefault()
		const { index } = this.props

		this.props.handleOnClick(index)
	}

	changeItemState(event) {
		event.preventDefault()
		const { index } = this.props

		this.props.toggleActive(index)
	}

	render() {
		const { item, readOnly, editable } = this.props

		if (!readOnly) {
			return (
				<a
					href="/"
					className="list-group-item"
					title="Odstranit položku"
					onClick={this.handleOnClick}
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
					onClick={this.changeItemState}
					role="button"
				>
					<span>{item.value}</span>
					<i
						className="glyphicon glyphicon-ok icon-done"
						aria-hidden="true"
					></i>
				</a>
			)
		} else {
			return <div className="list-group-item">{item.value}</div>
		}
	}
}

ShoppingListItem.propTypes = {
	item: PropTypes.object,
	handleOnClick: PropTypes.func,
	index: PropTypes.number,
	readOnly: PropTypes.bool,
	editable: PropTypes.bool,
	toggleActive: PropTypes.func,
}

export default ShoppingListItem
