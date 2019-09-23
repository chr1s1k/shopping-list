import React, { FormEvent, MouseEvent, ChangeEvent } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import querystring from 'querystring'

import ShoppingList from '../ShoppingList/ShoppingList'
import CopyForm from './CopyForm'
import ErrorForm from './ErrorForm'
import Loader from '../Loader/Loader'
import { api } from '../../config/api'

import * as ShoppingListActions from '../../actions/ShoppingListActions'
import { Item, ShoppingListState } from '../../interfaces/types'

interface IProps {
	items: Array<Item>,
	addItem: (item: Item) => void,
	resetList: () => void,
	removeItem: (index: number) => void
}

interface IState {
	formValue: string,
	isFormSubmitted: boolean,
	listSaved: boolean,
	listUrl: string,
	isLoading: boolean
}

const initialState = {
	formValue: '',
	isFormSubmitted: false,
	listSaved: false,
	listUrl: '/nakup',
	isLoading: false
}

class Form extends React.Component<IProps, IState> {

	private mainInput: HTMLElement | null

	constructor(props: IProps) {
		super(props)

		this.state = initialState
		this.mainInput = null

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSaveList = this.handleSaveList.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleRemoveItem = this.handleRemoveItem.bind(this)
		this.handleStartOver = this.handleStartOver.bind(this)
		this.setFocusOnMainInput = this.setFocusOnMainInput.bind(this)
		this.resetForm = this.resetForm.bind(this)
		this.handleModifyList = this.handleModifyList.bind(this)
	}

	handleSubmit(event: FormEvent) {
		event.preventDefault()

		if (this.state.formValue !== '') {
			const item = {
				value: this.state.formValue,
				active: true
			}

			// pridej polozku do store
			this.props.addItem(item)

			this.setState(() => ({
				formValue: '' // vyresetuj uzivatelskej vstup
			}))

			this.setFocusOnMainInput()
		}
	}

	handleSaveList() {
		const that = this
		let items: string

		items = this.props.items.map((item: Item) => item.value).join('|')

		this.setState(() => ({
			isLoading: true
		}))

		// axios normalne posila data jako JSON, stringify udela transformace, aby to nasledne slo precist pres $_POST
		axios.post(api.createUrl, querystring.stringify({ items: items })).then(function (response) {
			const newListUrl = response.data.referer + that.state.listUrl + '/' + response.data.slid

			// uspesne ulozeni seznamu
			if (response.data.result === 'success') {
				that.setState(() => ({
					listSaved: true,
					listUrl: newListUrl
				}))
			}
			that.setState((prevState: IState) => ({
				isLoading: !prevState.isLoading,
				isFormSubmitted: !prevState.isFormSubmitted
			}))
		})
			.catch(function () { // neuspesne ulozeni seznamu
				that.setState(prevState => ({
					isLoading: !prevState.isLoading,
					isFormSubmitted: true
				}))
			})
	}

	handleModifyList() {
		this.setState(() => (initialState), () => {
			this.setFocusOnMainInput()
		})
	}

	handleChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState({
			formValue: event.target.value
		})
	}

	handleRemoveItem(index: number) {
		this.props.removeItem(index)
	}

	componentDidUpdate() {
		if (!this.props.items.length && this.state.formValue === '') { // pokud odeberu vsechny polozky => nastav focus na hlavni input
			this.setFocusOnMainInput()
		}
	}

	handleStartOver(event: MouseEvent) {
		event.preventDefault()
		const reset = window.confirm('Opravdu chceš smazat aktuální seznam a začít znova?')

		if (reset) {
			this.resetForm()
		}
	}

	setFocusOnMainInput() {
		if (this.mainInput) {
			this.mainInput.focus()
		}
	}

	resetForm() {
		this.props.resetList()
		this.setState(() => (initialState), () => {
			this.setFocusOnMainInput()
		})
	}

	render() {
		const { isFormSubmitted, listSaved, isLoading, formValue } = this.state
		const { items } = this.props

		if (!isFormSubmitted) { // formular pro vytvoreni seznamu
			return (
				<form action="/" method="get" onSubmit={this.handleSubmit} className={isLoading ? 'loading' : ''}>

					<Loader showLoader={isLoading} />

					<div className="form-group relative">
						<label htmlFor="item" className="sr-only">Zadej, co chceš nakoupit</label>
						<input type="text" name="item" id="item" value={formValue} className="form-control input-lg input-main" placeholder="Co chceš nakoupit?" tabIndex={2} autoFocus onChange={this.handleChange} ref={(input) => { this.mainInput = input }} />
						{formValue !== '' &&
							<button type="submit" className="btn btn-link btn-lg btn-add-item visible-xs" aria-label="Potvrdit" tabIndex={3}>
								<i className="glyphicon glyphicon-plus" aria-hidden="true"></i>
							</button>
						}
					</div>

					<ShoppingList items={items}
						handleRemoveItem={this.handleRemoveItem}
						listReadOnly={isFormSubmitted}
					/>

					{items.length > 0 &&
						<div className="action-zone form-group">
							<button type="button" className="btn btn-primary btn-lg btn-block-xxs" tabIndex={3} onClick={this.handleSaveList}>Uložit nákup</button>
							<button type="button" className="btn btn-link btn-block-xxs" tabIndex={4} onClick={this.handleStartOver}>Začít znova</button>
						</div>
					}
				</form>
			)
		} else { // hotovy seznam + pro formular pro zkopirovani URL seznamu nebo pro opetovne ulozeni
			return (
				<div className={isLoading ? 'loading' : ''}>
					<Loader showLoader={isLoading} />

					<ShoppingList
						items={items}
						handleRemoveItem={this.handleRemoveItem}
						listReadOnly={isFormSubmitted}
					/>

					{listSaved && (
						<CopyForm
							handleCreateNewList={this.resetForm}
							handleModifyList={this.handleModifyList}
							listUrl={this.state.listUrl}
						/>
					)}

					{!listSaved && (
						<ErrorForm
							handleSaveList={this.handleSaveList}
							handleStartOver={this.handleStartOver}
						/>
					)}
				</div>
			)
		}
	}
}

// mapovani hlavniho stavu na props
function mapStateToProps(state: ShoppingListState) {
	return {
		items: state.items
	}
}

// mapovani
function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators(ShoppingListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)