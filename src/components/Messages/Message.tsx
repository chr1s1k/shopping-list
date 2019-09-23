import React from 'react'

type Props = {
	type: string,
	text: string
}

const Message = (props: Props) => {
	const { type, text } = props

	return (
		<div className={`alert alert-${type}`} role="alert">
			<p>
				{type === 'danger' && (
					<>
						<i className="glyphicon glyphicon-exclamation-sign text-danger" />{' '}
					</>
				)}
				{text}
			</p>
		</div>
	)
}

export default Message
