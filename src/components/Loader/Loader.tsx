import React from 'react'

type Props = {
  /**
   * If true, the loader will be rendered.
   */
  showLoader: boolean
}

const Loader: React.FC<Props> = ({ showLoader }) => (
  <>
    {showLoader && (
      <>
        <div className="loader"></div>
        <div className="overlay"></div>
      </>
    )}
  </>
)

export default Loader
