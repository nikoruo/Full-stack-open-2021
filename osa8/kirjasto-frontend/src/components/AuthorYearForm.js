import React, { useState } from 'react'
import Select from 'react-select'

import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorYearForm = (props) => {

  const [nameInOption, setNameInOption] = useState('')
  const [setBornTo, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors.length > 0 ? error.graphQLErrors[0].message : 'set birthyear!')
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (nameInOption !== '') {
      const name = nameInOption.value

      console.log('changing the birthyear...')
      editAuthor({ variables: { name, setBornTo } })
    } else {
      props.setError('choose an author!')
    }

    setNameInOption('')
    setBorn('')
  }

  const options = []
  props.authors.map(a => options.push({ value: a.name, label: a.name }))

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={nameInOption}
            onChange={setNameInOption}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={setBornTo}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorYearForm