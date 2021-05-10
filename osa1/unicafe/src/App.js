import React, { useState } from 'react'

//otsikot
const Header = ({title}) => {
    return (
        <h1>
            {title}
        </h1>
    )
}

//statistics -komponentti
const Statistics = ({ good, neutral, bad }) => {
    //kaikki
    const sum = good + neutral + bad
    //keskiarvo
    const average = (good * 1 + neutral * 0 + bad * -1) / sum
    //positiivisten osuus
    const positive = good / (good + neutral + bad) * 100

    //tarkistus, onko vielä annettu palautteita
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticLine count={good} name={"good"} />
                <StatisticLine count={neutral} name={"neutral"} />
                <StatisticLine count={bad} name={"bad"} />
                <tr>
                    <td>all</td>
                    <td>{sum}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{positive} %</td>
                </tr>
            </tbody>
        </table>
    )
}

//statistics -rivit
const StatisticLine = ({count, name}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{count}</td>    
        </tr>
    )
}

//nappulat
const Button = ({ handleClick, name }) => (
    <button onClick={handleClick}>{name}</button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    //toiminallisuus Good -nappulalle
    const handleGoodClick = () => setGood(good + 1)
    //toiminallisuus Neutral -nappulalle
    const handleNeutralClick = () => setNeutral(neutral + 1)
    //toiminallisuus Bad -nappulalle
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Header title={"give feedback"} />
            <Button handleClick={handleGoodClick} name={"good"}></Button>
            <Button handleClick={handleNeutralClick} name={"neutral"}></Button>
            <Button handleClick={handleBadClick} name={"bad"}></Button>
            <Header title={"statistics"} />
            <Statistics good={good} neutral={neutral} bad={bad}/>            
        </div>
    )
}

export default App