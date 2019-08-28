import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ showLoader }) => {
	if (!showLoader) {
		return null
	}

	return (
		<div>
			<div className="loader"></div>
			<div className="overlay"></div>
		</div>
	)
}

Loader.propTypes = {
	showLoader: PropTypes.bool,
}

export default Loader