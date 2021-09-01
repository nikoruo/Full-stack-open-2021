import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { checkStorage } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogPage from './components/BlogPage'
import NavBar from './components/NavBar'
import BlogInfo from './components/BlogInfo'
import Users from './components/Users'
import {
  Route, Switch, Redirect
} from 'react-router-dom'
import UserInfo from './components/UserInfo'

const App = () => {

  const notification = useSelector(state => state.notification)
  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  //haetaan blogit
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  //tarkastetaan localstorage
  useEffect(() => {
    dispatch(checkStorage())
  }, [])

  //app
  return (
    <div className="container">
      <NavBar />
      { notification.text !== '' && < Notification />}

      <Switch>

        <Route path="/blogs/:id">
          <BlogInfo />
        </Route>
        <Route path="/blogs">
          <Redirect to='/' />
        </Route>
        <Route path="/users/:id">
          <UserInfo />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <LoginForm id='loginForm'/>
        </Route>
        <Route path="/">
          {loggedUser ? < BlogPage /> : <Redirect to='/login' />}
        </Route>

      </Switch>
    </div>
  )

}

export default App