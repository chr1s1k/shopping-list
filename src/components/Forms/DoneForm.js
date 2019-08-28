import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class DoneForm extends React.Component {
	constructor() {
		super()

		this.state = {
			redirect: false
		}

		this.handleOnClick = this.handleOnClick.bind(this)
	}

	handleOnClick(event) {
		event.preventDefault()
		const items = this.props.items
		let allItemsChecked = true

		// zkontroluj, zda vsechny polozky uz byly odskrtnute
		for (var i = 0; i < items.length; i += 1) {
			allItemsChecked = !items[i].active
			if (!allItemsChecked) {
				break
			}
		}

		// pokud ne, tak zobraz potvrzeni
		if (!allItemsChecked) {
			var proceed = window.confirm(
				'Některé položky ještě nebyly označeny, opravdu už máš všechno?'
			)
			if (proceed) {
				this.setState({
					redirect: true
				})
			}
		} else {
			this.setState({
				redirect: true
			})
		}
	}

	render() {
		const redirect = this.state.redirect,
			landingPageUrl = '/diky'

		if (redirect) {
			return <Redirect to={landingPageUrl} push={true} />
		}

		return (
			<div className="action-zone form-group">
				<Link
					to={landingPageUrl}
					className="btn btn-primary btn-lg btn-block-xxs"
					onClick={this.handleOnClick}
				>
					Mám nakoupeno
				</Link>
			</div>
		)
	}
}

export default DoneForm
