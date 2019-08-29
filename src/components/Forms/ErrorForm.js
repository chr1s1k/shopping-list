import React from 'react'
import PropTypes from 'prop-types'
import Message from '../Messages/Message'

class ErrorForm extends React.Component {
	constructor() {
		super()

		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleStartOver = this.handleStartOver.bind(this)
	}

	handleOnClick(event) {
		this.props.handleSaveList(event)
	}

	handleStartOver(event) {
		this.props.handleStartOver(event)
	}

	render() {
		return (
			<div>
				<Message type="danger" text="Jejda! Nákup se nepodařilo uložit, zkus to prosím znova." />
				<div className="action-zone form-group">
					<button
						type="button"
						className="btn btn-primary btn-lg btn-block-xxs"
						onClick={this.handleOnClick}
						tabIndex="1"
					>
						Znovu uložit
					</button>
					<a
						href="/"
						className="btn btn-link btn-block-xxs"
						tabIndex="2"
						role="button"
						onClick={this.handleStartOver}
					>
						Napsat nový nákup
					</a>
				</div>
			</div>
		)
	}
}

ErrorForm.propTypes = {
	handleSaveList: PropTypes.func,
	handleStartOver: PropTypes.func,
}

export default ErrorForm
