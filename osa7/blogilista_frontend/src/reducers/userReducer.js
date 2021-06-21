import userService from '../services/users'

const userReducer = (state = [], action) => {

  switch (action.type) {
  //1: haetaan käyttäjät kannasta

  case 'INIT_USERS': {
    return action.data
  }
  default:
    return state.sort((b, a) => a.name - b.name)
  }
}

//action creator, jolla haetaan käyttäjät
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('users',users)
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default userReducer