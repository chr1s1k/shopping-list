import React from 'react'

type Props = {
  /**
   * Define type of the message.
   */
  type: string
  /**
   * String that will be rendered within the message.
   */
  text: string
}

const Message: React.FC<Props> = ({ type, text }) => {
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
