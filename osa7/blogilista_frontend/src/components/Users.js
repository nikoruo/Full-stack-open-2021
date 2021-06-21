import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {

  const users = useSelector(state => state.users)

  return (
    <div>{users.map(user => <div key={user.id}>{user.name}</div>) }</div>
  )
}

export default Users