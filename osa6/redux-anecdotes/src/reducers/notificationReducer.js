const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'SET_NOTIFICATION': {
    return action.data.anecdote
  }
  case 'REMOVE_NOTIFICATION': {
    return ''
  }
  default:
    return state
  }
}

export const setNotification = (anecdote) => {
  console.log('set notification', anecdote)
  return {
    type: 'SET_NOTIFICATION',
    data: { anecdote }
  }
}
export const removeNotification = () => {
  console.log('remove notification')
  return { type: 'REMOVE_NOTIFICATION' }
}


export default notificationReducer