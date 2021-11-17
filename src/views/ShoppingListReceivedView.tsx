import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import ShoppingList from '../components/ShoppingList/ShoppingList'
import DoneForm from '../components/Forms/DoneForm'
import Message from '../components/Messages/Message'
import { api } from '../config/api'

import * as ShoppingListActions from '../actions/ShoppingListActions'
import { ShoppingListState, Item } from '../interfaces/types'
import { RouteComponentProps } from 'react-router'

interface DispatchProps {
  setLoading: (loading: boolean) => void
  getItems: (url: string) => void
  setItems: (items: Array<Item>) => void
  errored: (hasError: boolean) => void
  toggleActive: (index: number) => void
}

interface ComponentProps extends RouteComponentProps, ShoppingListState, DispatchProps {}

const ShoppingListReceivedView: React.FC<ComponentProps> = (props: ComponentProps) => {
  const { items, isLoading, hasErrored } = props

  useEffect(() => {
    const requestedSlid = (props.match.params as ShoppingListState).slid

    if (requestedSlid) {
      const { slid } = props

      // pokud je parametr slid dostupný z localstorage a odpovídá tomu, který přišel v URL a máme dostupné nějaké položky, tak se není potřeba dotazovat API a načti položky z localstorage
      if (slid !== undefined && slid === requestedSlid && items.length) {
        props.setLoading(false)
      } else {
        props.getItems(api.getUrl + requestedSlid)
      }
    } else {
      props.setItems([]) // pokud chybi SLID, nastav prazdne pole items
      props.errored(true)
    }
  }, [items.length, props])

  if (hasErrored) {
    return <Message type="danger" text="Nákupní seznam se nepodařilo načíst nebo neexistuje." />
  }

  if (isLoading) {
    return (
      <div className="loader">
        <span className="sr-only">Načítám...</span>
      </div>
    )
  } else if (!items.length) {
    return <Message type="danger" text="Nákupní seznam se nepodařilo načíst nebo neexistuje." />
  } else {
    return (
      <div>
        <ShoppingList
          items={items}
          listReadOnly={true}
          listEditable={true}
          toggleActive={props.toggleActive}
        />
        <DoneForm items={items} />
      </div>
    )
  }
}

function mapStateToProps(state: ShoppingListState): ShoppingListState {
  return {
    slid: state.slid,
    items: state.items,
    isLoading: state.isLoading,
    hasErrored: state.hasErrored,
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators(ShoppingListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListReceivedView)
