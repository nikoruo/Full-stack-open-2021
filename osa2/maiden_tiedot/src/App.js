import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

function App() {
    const [newFilter, setNewFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get(`https://restcountries.eu/rest/v2/name/${newFilter}`)
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    //filtteri -kent�n handleri
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }


  return (
    <div>
          <Filter onChange={handleFilterChange} value={newFilter} />
    </div>
  );
}

export default App;
