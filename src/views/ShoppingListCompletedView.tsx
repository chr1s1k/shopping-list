import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as ShoppingListActions from '../actions/ShoppingListActions'
import { ShoppingListState, Item } from '../interfaces/types'

interface DispatchProps {
	resetList: () => void
}

interface ComponentProps extends DispatchProps {
	items: Array<Item>
}

// props from redux state
interface StateProps {
	items: Array<Item>
}

function ShoppingListCompletedView(props: ComponentProps): JSX.Element {
	const { items, resetList } = props

	useEffect(() => {
		resetList()
	}, [items.length, resetList])

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

function mapStateToProps(state: ShoppingListState): StateProps {
	return {
		items: state.items
	}
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
	return bindActionCreators(ShoppingListActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShoppingListCompletedView)
