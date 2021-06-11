const notificationReducer = (state = '', action) => {
  switch (action.type) {
  //1: lis�� notificationin n�kyviin
  //2: poistaa sen n�kyvist�
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

//action creator, jolla notificaatio n�kyviin
export const setNotification = (anecdote) => {
  console.log('set notification', anecdote)
  return {
    type: 'SET_NOTIFICATION',
    data: { anecdote }
  }
}

//action creator, jolla notificaatio pois n�kyvist�
export const removeNotification = () => {
  console.log('remove notification')
  return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer