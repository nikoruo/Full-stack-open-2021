const initialState = 'etsetteste'

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

  case 'SET_NOTIFICATION': {
    const notification = action.data.notification

    return notification
  }
  default:
    return state
  }
}

/*export const voteAnecdote = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    data: { id }
  }
}*/

export default notificationReducer