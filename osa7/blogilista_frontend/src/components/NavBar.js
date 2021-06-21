import React from 'react'
import {
  Link, useHistory
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const NavBar = () => {
  const loggedUser = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const padding = { padding: 5 }
  const nav = {
    backgroundColor: 'lightgrey',
    padding: 5
  }

  //uloskirjautuminen
  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${loggedUser.name}`)
    dispatch(logoutUser())
    history.push('/')
  }

  //mikäli käyttäjä on kirjautunut
  if (loggedUser) {
    return (
      <div style={nav}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {loggedUser.name} logged in <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  //muutoin
  return (
    <div>Welcome to the BlogApp</div>
  )
}

export default NavBar