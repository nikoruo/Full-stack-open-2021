import React from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import {
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import {
  voteBlog,
  deleteBlog,
  addComment
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import Comments from './Comments'

const BlogInfo = () => {

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/blogs/:id')
  console.log('info', match.params.id)
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  //lisätään blogille tykkäys
  const addLike = async (blogObject) => {
    console.log(`giving like to ${blogObject.title} by ${blogObject.author}`)
    try {
      dispatch(voteBlog(blogObject))
      dispatch(setNotification(`you just liked ${blogObject.title} by ${blogObject.author}`, 'green', 3))
    } catch (exception) {
      dispatch(setNotification(`error while liking a blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  //poista blogi
  const removeBlog = async (blogObject) => {
    console.log(`removing blog ${blogObject.title} by ${blogObject.author}`)
    try {
      dispatch(deleteBlog(blogObject.id))
      history.push('/blogs')
      dispatch(setNotification(`you just removed ${blogObject.title} by ${blogObject.author}`, 'green', 3))
    } catch (exception) {
      dispatch(setNotification(`error while removing a blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  //lisää kommentti
  const addComments = async (blogObject) => {
    console.log(`adding comment ${blogObject.comments}`)
    try {
      dispatch(addComment(blogObject))
      dispatch(setNotification(`you just posted a comment ${blogObject.comments}`, 'green', 3))
    } catch (exception) {
      dispatch(setNotification(`error while adding a comment ${blogObject.comments}, please try again`, 'red', 5))
    }
  }

  return (
    <div>
      <Blog blog={blog} likeBlog={addLike} removeBlog={removeBlog} user={loggedUser} action={true} />
      <Comments blog={blog} addComments={addComments} />
    </div>
  )
}

export default BlogInfo