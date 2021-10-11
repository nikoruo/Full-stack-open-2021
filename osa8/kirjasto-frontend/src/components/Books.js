import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Genres from './Genres'

const Books = (props) => {

  let result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)

  const [books, setBooks] = useState([])

  //tarkistetaan, onko vastaus kirjojen hakuun tullut, mik�li on, otetaan vastauksesta kirjat talteen
  //ja haetaan my�s kirjojen genret talteen
  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks || [])
      let genret = []
      result.data.allBooks.forEach(b => {
        if (b.genres) b.genres.forEach(g => {
          if (!genret.includes(g)) genret.push(g)
        })
      })
      setGenres(genret)
    }
  }, [result])

  //mik�li kirjat on ladattu, filtter�id��n n�ytett�vi� kirjoja tarpeenmukaan
  useEffect(() => {
    if (!result.loading) {
      if (genre !== null) {
        setBooks(result.data.allBooks.filter(b => b.genres.includes(genre)))
      } else {
        setBooks(result.data.allBooks || [])
      }
    }
  }, [genre])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {genres.length > 0 ? < Genres setGenre={setGenre} genres={genres} /> : null}

    </div>
  )
}

export default Books