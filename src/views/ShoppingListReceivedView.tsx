import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import ShoppingList from '../components/ShoppingList/ShoppingList'
import DoneForm from '../components/Forms/DoneForm'
import Message from '../components/Messages/Message'
import { api } from '../config/api'

import * as shoppingListActions from '../actions/ShoppingListActions'
import { ShoppingListState, Item } from '../interfaces/types'
import { RouteComponentProps } from 'react-router'

interface IProps extends RouteComponentProps {
	items: Array<Item>,
	slid: string,
	isLoading: boolean,
	hasErrored: boolean,
	setLoading: (loading: boolean) => void,
	getItems: (url: string) => void,
	setItems: (items: Array<Item>) => void,
	errored: (hasError: boolean) => void,
	toggleActive: () => void
}

class ShoppingListReceivedView extends React.Component<IProps> {
	componentDidMount() {
		const requestedSlid = (this.props.match.params as any).slid

		if (requestedSlid) {
			const { items, slid } = this.props

			// pokud je parametr slid dostupný z localstorage a odpovídá tomu, který přišel v URL a máme dostupné nějaké položky, tak se není potřeba dotazovat API a načti položky z localstorage
			if (slid !== undefined && slid === requestedSlid && items.length) {
				this.props.setLoading(false)
			} else {
				this.props.getItems(api.getUrl + requestedSlid)
			}
		} else {
			this.props.setItems([]) // pokud chybi SLID, nastav prazdne pole items
			this.props.errored(true)
		}
	}

	render() {
		const { items, isLoading, hasErrored } = this.props

		if (hasErrored) {
			return (
				<Message
					type='danger'
					text='Nákupní seznam se nepodařilo načíst nebo neexistuje.'
				/>
			)
		}

		if (isLoading) {
			return (
				<div className='loader'>
					<span className='sr-only'>Načítám...</span>
				</div>
			)
		} else {
			if (!items.length) {
				return (
					<Message
						type='danger'
						text='Nákupní seznam se nepodařilo načíst nebo neexistuje.'
					/>
				)
			}

			return (
				<div>
					<ShoppingList
						items={items}
						listReadOnly={true}
						listEditable={true}
						toggleActive={this.props.toggleActive}
					/>
					<DoneForm items={items} />
				</div>
			)
		}
	}
}

function mapStateToProps(state: ShoppingListState) {
	return {
		slid: state.slid,
		items: state.items,
		isLoading: state.isLoading,
		hasErrored: state.hasErrored
	}
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators(shoppingListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListReceivedView as any)
