import userService from '../services/users'

const userReducer = (state = [], action) => {

  switch (action.type) {
  //1: haetaan k�ytt�j�t kannasta

  case 'INIT_USERS': {
    return action.data
  }
  default:
    return state.sort((b, a) => a.name - b.name)
  }
}

//action creator, jolla haetaan k�ytt�j�t
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