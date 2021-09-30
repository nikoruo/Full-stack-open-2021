import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {

  const [fGenre, setFGenre] = useState(null)
  const [getRBooks, result] = useLazyQuery(ALL_BOOKS)

  const [fBooks, setFBooks] = useState([])

  let user = useQuery(ME)

  useEffect(() => {
    if (user.data && user.data.me) {
      setFGenre(user.data.me.favoriteGenre)
    }
  }, [user])

  useEffect(() => {
    if (!user.loading) {
      getRBooks({ variables: { genre: fGenre } })
    }
  }, [fGenre])

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setFBooks(result.data.allBooks || [])
    }
  }, [result])


  if (!props.show) {
    return null
  }

  if (user.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{fGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {fBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend