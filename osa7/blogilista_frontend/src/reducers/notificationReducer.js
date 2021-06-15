const notificationReducer = (state = { notification: { text:'', color: 'grey' } , timerId: null }, action) => {
  switch (action.type) {
  //1: lis�� notificationin n�kyviin
  //2: poistaa sen n�kyvist�
  case 'SET_NOTIFICATION': {

    //tarkistetaan, onko notification jo n�kyviss�, mik�li on, nollataan sen timer
    if (state.timerId !== null) {
      clearTimeout(state.timerId)
    }
    return {
      notification: { text: action.data.text, color: action.data.color }, timerId: action.data.timerId }
  }
  case 'REMOVE_NOTIFICATION': {
    return {
      notification: { text: '', color: 'grey' }, timer: null }
  }
  default:
    return state
  }
}

//action creator, jolla notificaatio n�kyviin
export const setNotification = (text, color, time) => {
  console.log('set notification', text)
  return async dispatch => {
    const timerId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { text, color, timerId }
    })
  }
}

//action creator, jolla notificaatio pois n�kyvist�
export const removeNotification = () => {
  console.log('remove notification')
  return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer