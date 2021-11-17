import React, { MouseEvent } from 'react'

interface Props {
  /**
   * URL of the shopping list.
   */
  listUrl: string
  /**
   * Function that will be run when a new shopping list is requested to be created.
   */
  handleCreateNewList: () => void
  /**
   * Function that will be an existing shopping list is requested to be changed.
   */
  handleModifyList: () => void
}

const CopyForm: React.FC<Props> = ({ listUrl, handleCreateNewList, handleModifyList }) => (
  <div>
    <div className="alert alert-success" role="alert">
      <p>
        <i className="glyphicon glyphicon-ok"></i> Výborně! Nyní už stačí jen zkopírovat adresu
        nákupu a někomu poslat!
      </p>
    </div>
    <div className="action-zone form-group">
      <div className="input-group">
        <input
          type="text"
          name="shoppingListUrl"
          id="shoppingListUrl"
          className="form-control"
          value={listUrl}
          readOnly
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            id="copyListUrlBtn"
            data-clipboard-target="#shoppingListUrl"
            type="button"
          >
            Zkopírovat
          </button>
        </span>
      </div>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-link"
          onClick={(event: MouseEvent) => {
            event.preventDefault()
            handleModifyList()
          }}
        >
          Opravit nákup
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={(event: MouseEvent) => {
            event.preventDefault()
            handleCreateNewList()
          }}
        >
          Napsat nový nákup
        </button>
      </div>
    </div>
  </div>
)

export default CopyForm
