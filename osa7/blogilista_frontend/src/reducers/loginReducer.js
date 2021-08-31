import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginReducer = (state = { user: null }, action) => {
  switch (action.type) {
  //1: sisäänkirjautuminen
  //2: uloskirjautuminen

  case 'LOGIN': {
    return action.data
  }
  case 'LOGOUT': {
    return null
  }
  default:
    return state
  }
}

//action creator, jolla kirjaudutaan sisään
export const loginUser = (user) => {
  console.log('loggin in user', user.username)
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(user)
      blogService.setToken(loggedUser.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      dispatch(setNotification(`logged in, welcome ${loggedUser.name}`, 'green', 3))

      dispatch({
        type: 'LOGIN',
        data: loggedUser,
      })

    } catch (exception){
      dispatch(setNotification('wrong username or password', 'red', 5))
    }
  }
}

//action creator, jolla tarkistetaan, onko käyttäjä jo kirjautunut
export const checkStorage = () => {
  console.log('checking local storage')

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON)
    blogService.setToken(loggedUser.token)
    return {
      type: 'LOGIN',
      data: loggedUser,
    }
  }

  return { type: 'LOGOUT' }
}

//action creator, jolla kirjaudutaan ulos
export const logoutUser = () => {
  return async dispatch => {console.log('logging out')
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('logged out, see you again', 'green', 3))
    dispatch({ type: 'LOGOUT' })
  }
}

export default loginReducer