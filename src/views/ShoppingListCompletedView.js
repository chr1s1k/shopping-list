import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as shoppingListActions from '../actions/ShoppingListActions'

function ShoppingListCompletedView({ resetList, items }) {
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

ShoppingListCompletedView.propTypes = {
	resetList: PropTypes.func,
	items: PropTypes.array,
}

function mapStateToProps(state) {
	return {
		items: state.items
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(shoppingListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListCompletedView)
