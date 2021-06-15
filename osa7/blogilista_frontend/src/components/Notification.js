import React from 'react'
import { useSelector } from 'react-redux'

//komponentti, jolla palautetaan virheilmoitus
const Notification = () => {
  const notification = useSelector(state => state.notification)

  const notificationStyle = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notification.text === '') {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {notification.text}
    </div>
  )
}

export default Notification