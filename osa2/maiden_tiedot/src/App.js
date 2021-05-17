import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import CountriesView from './components/CountriesView'



function App() {
    const [newFilter, setNewFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    //filtteri -kentän handleri
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
           
  return (
    <div>
          <Filter onChange={handleFilterChange} value={newFilter} />
          <CountriesView countries={countries} setNewFilter={setNewFilter} newFilter={newFilter} />
    </div>
  );
}

export default App;
