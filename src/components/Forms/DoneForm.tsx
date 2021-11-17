import React, { MouseEvent, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Item } from '../../interfaces/types'

interface Props {
  /**
   * Array of shopping list items.
   */
  items: Array<Item>
}

const DoneForm: React.FC<Props> = ({ items }) => {
  const [redirect, setRedirect] = useState(false)
  const landingPageUrl = '/diky'

  const handleOnClick = (event: MouseEvent): void => {
    event.preventDefault()
    let allItemsChecked = true

    // zkontroluj, zda vsechny polozky uz byly odskrtnute
    for (let i = 0; i < items.length; i += 1) {
      allItemsChecked = !items[i].active
      if (!allItemsChecked) {
        break
      }
    }

    // pokud ne, tak zobraz potvrzeni
    if (!allItemsChecked) {
      const proceed = window.confirm(
        'Některé položky ještě nebyly označeny, opravdu už máš všechno?',
      )

      if (proceed) {
        setRedirect(true)
      }
    } else {
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Redirect to={landingPageUrl} push={true} />
  }

  return (
    <div className="action-zone form-group">
      <Link
        to={landingPageUrl}
        className="btn btn-primary btn-lg btn-block-xxs"
        onClick={handleOnClick}
      >
        Mám nakoupeno
      </Link>
    </div>
  )
}

export default DoneForm
