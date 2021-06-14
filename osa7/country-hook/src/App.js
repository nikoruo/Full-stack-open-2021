import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)

  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

  useEffect(async () => {
    if (name === '') {
      setFound(false)
      setCountry(null)
      return null
    }
    console.log('effect')
    await axios
      .get(url)
      .then(response => {
        console.log('promise fulfilled', response.data)
        setCountry(...response.data)
        setFound(true)
      })
      .catch(err => {
        console.log(err)
        setFound(false)
        setCountry(null)
      })
  }, [name])
  if (name === '') { return null }
  return { data: country, found }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
