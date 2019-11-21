import React from 'react'

type Props = {
	showLoader: boolean
}

const Loader: React.FC<Props> = ({ showLoader }) => {
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

export default Loader
