import React, { MouseEvent } from 'react'

interface IProps {
	listUrl: string
	handleCreateNewList: () => void
	handleModifyList: () => void
}

class CopyForm extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props)

		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleModifyList = this.handleModifyList.bind(this)
	}

	handleOnClick(event: MouseEvent): void {
		event.preventDefault()
		this.props.handleCreateNewList()
	}

	handleModifyList(event: MouseEvent): void {
		event.preventDefault()
		this.props.handleModifyList()
	}

	render(): JSX.Element {
		return (
			<div>
				<div className="alert alert-success" role="alert">
					<p>
						<i className="glyphicon glyphicon-ok"></i> Výborně! Nyní už stačí
						jen zkopírovat adresu nákupu a někomu poslat!
					</p>
				</div>
				<div className="action-zone form-group">
					<div className="input-group">
						<input
							type="text"
							name="shoppingListUrl"
							id="shoppingListUrl"
							className="form-control"
							value={this.props.listUrl}
							tabIndex={2}
							readOnly
						/>
						<span className="input-group-btn">
							<button
								className="btn btn-primary"
								id="copyListUrlBtn"
								data-clipboard-target="#shoppingListUrl"
								tabIndex={1}
							>
								Zkopírovat
							</button>
						</span>
					</div>
					<div className="btn-group" role="group">
						<button
							type="button"
							className="btn btn-link"
							onClick={this.handleModifyList}
						>
							Opravit nákup
						</button>
						<button
							type="button"
							className="btn btn-link"
							onClick={this.handleOnClick}
						>
							Napsat nový nákup
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default CopyForm
