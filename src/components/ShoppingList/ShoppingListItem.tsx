import React, { MouseEvent } from 'react'
import { Item } from '../../interfaces/types'

interface IProps {
	item: Item
	readOnly?: boolean
	editable?: boolean
	index: number
	handleOnClick?: (index: number) => void
	toggleActive?: (index: number) => void
}

class ShoppingListItem extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props)

		this.handleOnClick = this.handleOnClick.bind(this)
		this.changeItemState = this.changeItemState.bind(this)
	}

	handleOnClick(event: MouseEvent): void {
		event.preventDefault()
		const { index } = this.props

		if (this.props.handleOnClick) {
			this.props.handleOnClick(index)
		}
	}

	changeItemState(event: MouseEvent): void {
		event.preventDefault()
		const { index } = this.props

		if (this.props.toggleActive) {
			this.props.toggleActive(index)
		}
	}

	render(): JSX.Element {
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

export default ShoppingListItem
