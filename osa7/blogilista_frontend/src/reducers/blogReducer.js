import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
  //1: lisätään annettu ääni blogille
  //2: luodaan uusi blogi
  //3: poistetaan blogi
  //4: haetaan blogit kannasta

  case 'VOTE': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange, likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'NEW': {
    return [...state, { ...action.data.newBlog, user: action.data.user }]
  }
  case 'REMOVE': {
    const id = action.data.id
    return state.filter(b =>
      b.id !== id)
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
export const voteBlog = (blog) => {
  console.log('vote', blog.id)
  return async dispatch => {
    const votedBlog = await blogService.addLike(blog)
    const id = votedBlog.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

//action creator, jolla hoidetaan uuden blogin luominen
export const createBlog = (content, user) => {
  console.log('create', content)
  return async dispatch => {
    const newBlog = await blogService.postNew(content)
    dispatch({
      type: 'NEW',
      data: { newBlog, user }
    })
  }
}

//action creator, jolla poistetaan blogi
export const deleteBlog = (id) => {
  console.log('remove', id)
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type: 'REMOVE',
      data: { id }
    })
  }
}

export default blogReducer