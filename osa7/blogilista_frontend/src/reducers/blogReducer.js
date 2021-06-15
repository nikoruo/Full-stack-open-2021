import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {

  //1: lisätään annettu ääni blogille
  //2: luodaan uusi blogi
  case 'VOTE': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange, votes: blogToChange.votes + 1
    }

    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    ).sort((b, a) => a.votes - b.votes)
  }
  case 'NEW': {
    return [...state, action.data].sort((b, a) => a.votes - b.votes)
  }
  case 'INIT_BLOGS': {
    return action.data
  }
  default:
    return state.sort((b, a) => a.votes - b.votes)
  }
}

//action creator, jolla haetaan blogit
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

//action creator, jolla hoidetaan äänen antaminen
export const voteAnecdote = (anecdote) => {
  console.log('vote', anecdote.id)
  return async dispatch => {
    const votedBlog = await blogService.vote(anecdote)
    const id = votedBlog.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

//action creator, jolla hoidetaan uuden blogin luominen
export const createBlog = (content) => {
  console.log('create', content)
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

export default blogReducer