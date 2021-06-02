import React from 'react'

//komponentti, jolla palautetaan virheilmoitus
const Notification = ({ message }) => {

  //const colour = info === null ? 'grey' : info.colour

  const notificationStyle = {
    color: 'grey',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification