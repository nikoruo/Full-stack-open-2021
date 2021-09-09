import React from 'react'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      <h2>{errorMessage}</h2>
    </div>
  )
}

export default Notify