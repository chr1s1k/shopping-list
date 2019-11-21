import React, { MouseEvent } from 'react'
import Message from '../Messages/Message'

interface IProps {
	handleSaveList: () => void
	handleStartOver: (event: MouseEvent) => void
}

class ErrorForm extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props)

		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleStartOver = this.handleStartOver.bind(this)
	}

	handleOnClick(event: MouseEvent): void {
		event.preventDefault()
		this.props.handleSaveList()
	}

	handleStartOver(event: MouseEvent): void {
		this.props.handleStartOver(event)
	}

	render(): JSX.Element {
		return (
			<div>
				<Message
					type="danger"
					text="Jejda! Nákup se nepodařilo uložit, zkus to prosím znova."
				/>
				<div className="action-zone form-group">
					<button
						type="button"
						className="btn btn-primary btn-lg btn-block-xxs"
						onClick={this.handleOnClick}
						tabIndex={1}
					>
						Znovu uložit
					</button>
					<a
						href="/"
						className="btn btn-link btn-block-xxs"
						tabIndex={2}
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

export default ErrorForm
