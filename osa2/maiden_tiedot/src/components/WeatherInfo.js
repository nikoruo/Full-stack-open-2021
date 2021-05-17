import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({ country }) => {

    //https://weatherstack.com/ palvelun api-avain
    const [weather, setWeather] = useState([])

    useEffect(() => {
        console.log('weather, effect')
        const api_key = process.env.REACT_APP_API_KEY
        const weatherstack = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}&units=m`

        axios
            .get(weatherstack)
            .then(response => {
                console.log('weather, promise fulfilled')
                const weather = response.data
                setWeather(
                    <div>
                        <h2>Weather in {country.name}</h2>
                        <p style={{ fontWeight: "bold" }}>temperature: {weather.current.temperature} Celsius</p>
                        <img src={weather.current.weather_icons} alt="" style={{ height: 100, width: 100 }} />
                        <p style={{ fontWeight: "bold" }}>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir }</p>
                    </div>
                )
            })
    }, [])

    return (
        <div>
            {weather}
        </div>
    )
}

export default WeatherInfo