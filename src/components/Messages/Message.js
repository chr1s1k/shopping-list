import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ type, text }) => (
	<div className={'alert alert-' + type} role="alert">
		<p className={this.props.type === 'danger' ? 'text-center' : ''}>
			{text}
		</p>
	</div>
)

Message.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
}

export default Message
