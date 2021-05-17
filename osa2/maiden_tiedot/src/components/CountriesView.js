import React from 'react'
import CountryInfo from './CountryInfo'

//komponentti, jolla palautetaan näytettävien maiden lista,
//tai yksityiskohtaiset tiedot yhdestä maasta
const CountriesView = ({ countries, setNewFilter, newFilter }) => {
    //näkyviin tulevat maat
    const CountriesToShow = newFilter.length > 0 ?
        countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase())) : countries

    const buttonClick = country => {
        setNewFilter(country.name)
    }


    if (CountriesToShow.length === 1) {
        return (
            <CountryInfo country={CountriesToShow} />
        )
    } else if (CountriesToShow.length === 250) {
        return (
            <div />
        )
    } else if (CountriesToShow.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (CountriesToShow.length > 1) {
        return (
            <div>
                {CountriesToShow.map(country =>
                    <div key={country.name}>
                        {country.name}
                        <button onClick={() => buttonClick(country)}>show</button>
                    </div>)}
            </div>
        )
    } else {
        return (
            <div>
                No results
            </div>
        )
    }
}


export default CountriesView