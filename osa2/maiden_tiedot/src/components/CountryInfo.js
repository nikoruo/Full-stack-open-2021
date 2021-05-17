import React from 'react'
import WeatherInfo from './WeatherInfo'

//komponentti, jolla palautetaan yksittäisen maan tiedot
const CountryInfo = ({ country }) => {

    const info = country.map(country =>
        <div key={country.name}>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt="" style={{ height: 100, width: 100 }} />
            <WeatherInfo country={country} />
        </div>
    )

    return (
        <div>
            {info}
        </div>
    )
}


export default CountryInfo