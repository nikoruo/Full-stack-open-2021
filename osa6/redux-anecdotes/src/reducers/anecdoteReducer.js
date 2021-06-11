const anecdoteReducer = (state = [], action) => {

  switch (action.type) {

  //1: lisätään annettu ääni anekdootille
  //2: luodaan uusi anekdootti
  case 'VOTE': {
    const id = action.data.id
    const anecdoteToChange = state.find(n => n.id === id)
    const changedAnecdote = {
      ...anecdoteToChange, votes: anecdoteToChange.votes + 1
    }

    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : changedAnecdote
    ).sort((b, a) => a.votes - b.votes)
  }
  case 'NEW': {
    return [...state, action.data].sort((b, a) => a.votes - b.votes)
  }
  case 'INIT_ANECDOTES': {
    return action.data
  }
  default:
    return state.sort((b, a) => a.votes - b.votes)
  }
}

//action creator, jolla haetaan anecdootit json serveriltä
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

//action creator, jolla hoidetaan äänen antaminen
export const voteAnecdote = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    data: { id }
  }
}

//action creator, jolla hoidetaan uuden anekdootin luominen
export const createAnecdote = (content) => {
  console.log('create', content)
  return {
    type: 'NEW',
    data: content
  }
}

export default anecdoteReducer