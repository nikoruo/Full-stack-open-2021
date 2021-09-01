import React from 'react'
import { ListGroup } from 'react-bootstrap'
import {
  useSelector
} from 'react-redux'
import {
  useRouteMatch
} from 'react-router-dom'

const UserInfo = () => {

  const users = useSelector(state => state.users)


  const match = useRouteMatch('/users/:id')
  console.log('info', match.params.id)
  const userInfo = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!userInfo) {
    return null
  }

  return (
    <div>
      <h2>Blogs added by user { userInfo.name }</h2>
      <ListGroup>
        {userInfo.blogs.map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default UserInfo