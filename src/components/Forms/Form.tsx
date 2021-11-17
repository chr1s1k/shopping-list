import React, { FormEvent, ChangeEvent, useState, useRef, useEffect } from 'react'
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

interface StateProps {
  items: Array<Item>
}

interface DispatchProps {
  addItem: (item: Item) => void
  resetList: () => void
  removeItem: (index: number) => void
}

interface ComponentProps extends DispatchProps, StateProps {}

const Form: React.FC<ComponentProps> = ({ items, addItem, removeItem, resetList }) => {
  // initial state values
  const initialState = {
    formValue: '',
    isFormSubmitted: false,
    listSaved: false,
    listUrl: '/nakup',
    isLoading: false,
  }

  // states
  const [formValue, setFormValue] = useState(initialState.formValue)
  const [isFormSubmitted, setFormSubmitted] = useState(initialState.isFormSubmitted)
  const [listSaved, setListSaved] = useState(initialState.listSaved)
  const [listUrl, setListUrl] = useState(initialState.listUrl)
  const [isLoading, setLoading] = useState(initialState.isLoading)

  // reference
  const mainInput = useRef<HTMLInputElement>(null)

  const setFocusOnMainInput = (): void => {
    if (mainInput.current) {
      mainInput.current.focus()
    }
  }

  useEffect(() => {
    // if all items are removed => set focus on main input
    if (!items.length && formValue === '') {
      setFocusOnMainInput()
    }
  })

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()

    if (formValue !== '') {
      const item = {
        value: formValue,
        active: true,
      }

      addItem(item)

      setFormValue('')

      setFocusOnMainInput()
    }
  }

  const handleSaveList = (): void => {
    // join all items into one string
    const itemsJoined: string = items.map((item: Item) => item.value).join('|')

    setLoading(true)

    // axios normalne posila data jako JSON, stringify udela transformace, aby to nasledne slo precist pres $_POST
    axios
      .post(api.createUrl, querystring.stringify({ items: itemsJoined }))
      .then((response) => {
        const newListUrl = response.data.referer + listUrl + '/' + response.data.slid

        // uspesne ulozeni seznamu
        if (response.data.result === 'success') {
          setListSaved(true)
          setListUrl(newListUrl)
        }
        setLoading(false)
        setFormSubmitted(true)
      })
      .catch(() => {
        // neuspesne ulozeni seznamu
        setLoading(false)
        setFormSubmitted(true)
      })
  }

  const handleRemoveItem = (index: number): void => {
    removeItem(index)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormValue(event.target.value)
  }

  const resetState = (): void => {
    setFormValue(initialState.formValue)
    setFormSubmitted(initialState.isFormSubmitted)
    setListSaved(initialState.listSaved)
    setListUrl(initialState.listUrl)
    setLoading(initialState.isLoading)
  }

  const resetForm = (): void => {
    resetList()
    resetState()
  }

  const handleStartOver = (): void => {
    const reset = window.confirm('Opravdu chceš smazat aktuální seznam a začít znova?')

    if (reset) {
      resetForm()
    }
  }

  if (!isFormSubmitted) {
    // formular pro vytvoreni seznamu
    return (
      <form action="/" method="get" onSubmit={handleSubmit} className={isLoading ? 'loading' : ''}>
        <Loader showLoader={isLoading} />

        <div className="form-group relative">
          <label htmlFor="item" className="sr-only">
            Zadej, co chceš nakoupit
          </label>
          <input
            type="text"
            name="item"
            id="item"
            value={formValue}
            className="form-control input-lg input-main"
            placeholder="Co chceš nakoupit?"
            autoFocus
            onChange={handleChange}
            ref={mainInput}
          />
          {formValue !== '' && (
            <button
              type="submit"
              className="btn btn-link btn-lg btn-add-item visible-xs"
              aria-label="Potvrdit"
            >
              <i className="glyphicon glyphicon-plus" aria-hidden="true"></i>
            </button>
          )}
        </div>

        <ShoppingList
          items={items}
          handleRemoveItem={handleRemoveItem}
          listReadOnly={isFormSubmitted}
        />

        {items.length > 0 && (
          <div className="action-zone form-group">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block-xxs"
              onClick={handleSaveList}
            >
              Uložit nákup
            </button>
            <button type="button" className="btn btn-link btn-block-xxs" onClick={handleStartOver}>
              Začít znova
            </button>
          </div>
        )}
      </form>
    )
  } else {
    // hotovy seznam + pro formular pro zkopirovani URL seznamu nebo pro opetovne ulozeni
    return (
      <div className={isLoading ? 'loading' : ''}>
        <Loader showLoader={isLoading} />

        <ShoppingList
          items={items}
          handleRemoveItem={handleRemoveItem}
          listReadOnly={isFormSubmitted}
        />

        {listSaved && (
          <CopyForm
            handleCreateNewList={resetForm}
            handleModifyList={resetState}
            listUrl={listUrl}
          />
        )}

        {!listSaved && (
          <ErrorForm handleSaveList={handleSaveList} handleStartOver={handleStartOver} />
        )}
      </div>
    )
  }
}

function mapStateToProps(state: ShoppingListState): StateProps {
  return {
    items: state.items,
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators(ShoppingListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
