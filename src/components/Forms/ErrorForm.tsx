import React, { MouseEvent } from 'react'
import Message from '../Messages/Message'

interface Props {
  /**
   * Function that will be run when the previous attempt of saving list failed and needs to be re-saved.
   */
  handleSaveList: () => void
  /**
   * Function that will be run when current shopping list should be discarded.
   */
  handleStartOver: () => void
}

const ErrorForm: React.FC<Props> = ({ handleSaveList, handleStartOver }) => (
  <div>
    <Message type="danger" text="Jejda! Nákup se nepodařilo uložit, zkus to prosím znova." />
    <div className="action-zone form-group">
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block-xxs"
        onClick={(event: MouseEvent) => {
          event.preventDefault()
          handleSaveList()
        }}
      >
        Znovu uložit
      </button>
      <a
        href="/"
        className="btn btn-link btn-block-xxs"
        role="button"
        onClick={(event: MouseEvent) => {
          event.preventDefault()
          handleStartOver()
        }}
      >
        Napsat nový nákup
      </a>
    </div>
  </div>
)

export default ErrorForm
