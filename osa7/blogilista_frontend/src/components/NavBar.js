import React from 'react'
import {
  Link, useHistory
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
  const loggedUser = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const padding = { padding: 5 }

  //uloskirjautuminen
  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${loggedUser.name}`)
    history.push('/login')
    dispatch(logoutUser())
  }

  //mikäli käyttäjä on kirjautunut
  if (loggedUser) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <span style={{ marginRight: 15 }} className="navbar-text">
          Logged in: {loggedUser.name}
        </span>
        <Button onClick={() => handleLogout()}>logout</Button>
      </Navbar>
    )
  }

  //muutoin
  return (
    <div>Welcome to the BlogApp</div>
  )
}

export default NavBar