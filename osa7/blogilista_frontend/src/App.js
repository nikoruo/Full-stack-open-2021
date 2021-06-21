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
    <div>
      <NavBar />
      { notification.text !== '' && < Notification />}
      <h3>blog app</h3>

      <Switch>
        <Route path="/blogs/:id">
          <BlogInfo />
        </Route>
        <Route path="/blogs">
          <Redirect to='/' />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <LoginForm id='loginForm'/>
        </Route>
        <Route path="/">
          <BlogPage />
        </Route>


        {loggedUser === null ?
          <LoginForm id='loginForm' />
          : <BlogPage />}
      </Switch>
    </div>
  )

}

export default App