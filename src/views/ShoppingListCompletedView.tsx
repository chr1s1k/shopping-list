import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import * as ShoppingListActions from '../actions/ShoppingListActions'
import { ShoppingListState } from '../interfaces/types'
import ShoppingListItem from '../components/ShoppingList/ShoppingListItem'

interface Props {
	items: Array<ShoppingListItem>
	resetList: () => void,
}

function ShoppingListCompletedView(props: Props) {
	const { items, resetList } = props

	useEffect(() => {
		resetList()
	}, [items.length, resetList]) // only re-run the effect if items.length or resetList changes

	return (
		<div>
			<div className="alert alert-success" role="alert">
				<p>
					Díky, že používáš tuhle aplikaci!{' '}
					<i className="glyphicon glyphicon-heart"></i>
				</p>
				<p>Jestli nevíš co dál, můžeš si napsat vlastní nákup ;)</p>
			</div>
			<div className="action-zone form-group">
				<Link to="/" className="btn btn-primary btn-lg btn-block-xxs">
					Napsat vlastní nákup
				</Link>
			</div>
		</div>
	)
}

function mapStateToProps(state: ShoppingListState) {
	return {
		items: state.items
	}
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators(ShoppingListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListCompletedView as any)
