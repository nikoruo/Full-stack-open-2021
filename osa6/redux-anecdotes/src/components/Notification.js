import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  //mik‰li notificaatio on annettu, n‰ytet‰‰n se, muutoin palautetaan null
  if (notification === '') {
    return null
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification