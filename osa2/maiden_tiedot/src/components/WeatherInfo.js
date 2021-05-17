import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({ country }) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        console.log('weather, effect')

        //https://weatherstack.com/ palvelun api-avain ja url
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
                        <p style={{ fontWeight: "bold", display: "block" }}>temperature: <span style={{ fontWeight: "normal" }}>{weather.current.temperature} Celsius</span></p>
                        <img src={weather.current.weather_icons} alt="" style={{ height: 50, width: 50 }} />
                        <p style={{ fontWeight: "bold", display: "block" }}>wind: <span style={{ fontWeight: "normal" }}>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</span></p>
                    </div>
                )
            })
    },[country])

    return (
        <div>
            {weather}
        </div>
    )
}

export default WeatherInfo