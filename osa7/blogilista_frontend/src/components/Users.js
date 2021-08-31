import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  //haetaan blogit
  useEffect(() => {
    dispatch(initializeUsers())
  }, [blogs])

  return (
    <table>
      <thead><tr><th></th><th>blogs created</th></tr></thead>
      <tbody>{users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}</tbody>
    </table>
  )
}

export default Users