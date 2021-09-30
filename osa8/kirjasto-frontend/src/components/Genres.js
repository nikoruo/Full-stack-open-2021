import React from 'react'

const Genres = ({ genres, setGenre }) => {
  console.log(genres)
  const buttons = genres.map((g, i) => <button key={i} onClick={() => setGenre(g)}>{g}</button>)

  return (
    <div>
      {buttons}
      <button key={'reset'} onClick={() => setGenre(null)}>{'Show all'}</button>
    </div>
  )
}

export default Genres