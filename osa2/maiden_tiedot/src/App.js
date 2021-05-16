import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'

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

    //näkyviin tulevat maat
    let CountriesToShow = newFilter.length > 0 ?
        countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase())) : countries

    //testataan, onko näytettävien maiden listaa filtteröity,
    //jos on, niin monta tulosta: 0, 1, 1-10 vai >10
    if (CountriesToShow.length === 250) {
        CountriesToShow = []
    } else if (CountriesToShow.length > 10) {
        CountriesToShow = ["Too many matches, specify another filter"]
    } else if (CountriesToShow.length > 1) {
        CountriesToShow = CountriesToShow.map(country => <p key={country.name}>{country.name}</p>)
    } else if (CountriesToShow.length === 1) {
        //mikäli maita on jäljellä 1, koostetaan sen tiedot alikomponentissa
        CountriesToShow = <CountryInfo country={CountriesToShow} />        
    } else {
        CountriesToShow = ["No matches"]
    }

  return (
    <div>
          <Filter onChange={handleFilterChange} value={newFilter} />
          {CountriesToShow}
    </div>
  );
}

export default App;
