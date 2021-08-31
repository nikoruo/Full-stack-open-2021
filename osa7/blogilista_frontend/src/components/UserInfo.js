import React from 'react'
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
      <h2>{ userInfo.name }</h2>
      <h3>added blogs</h3>
      <ul>
        {userInfo.blogs.map(blog => <li key={ blog.id }>{ blog.title }</li> )}
      </ul>
    </div>
  )
}

export default UserInfo