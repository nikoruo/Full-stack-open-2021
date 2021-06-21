import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { checkStorage } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogPage from './components/BlogPage'

const App = () => {

  const notification = useSelector(state => state.notification)
  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  //haetaan blogit
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //tarkastetaan localstorage
  useEffect(() => {
    dispatch(checkStorage())
  }, [])

  //app
  return (
    <div>
      { notification.text !== '' && < Notification />}
      { loggedUser === null ? <LoginForm id='loginForm' /> : <BlogPage /> }
    </div>
  )

}

export default App