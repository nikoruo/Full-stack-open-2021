import React, { useState } from 'react'

//otsikot
const Header = ({title}) => {
    return (
        <h1>
            {title}
        </h1>
    )
}

//statistics -rivit
const Stats = ({count, name}) => {
    return (
        <p>{name} {count}</p>    
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

    //step2
    //kaikki
    const sum = good + neutral + bad
    //keskiarvo
    const average = (good * 1 + neutral * 0 + bad * -1) / sum
    //positiivisten osuus
    const positive = good/(good+neutral+bad)*100

    return (
        <div>
            <Header title={"give feedback"} />
            <Button handleClick={handleGoodClick} name={"good"}></Button>
            <Button handleClick={handleNeutralClick} name={"neutral"}></Button>
            <Button handleClick={handleBadClick} name={"bad"}></Button>
            <Header title={"statistics"} />
            <Stats count={good} name={"good"} />
            <Stats count={neutral} name={"neutral"} />
            <Stats count={bad} name={"bad"} />
            <p>all: {sum}</p>
            <p>average: {average}</p>
            <p>positive: {positive} %</p>
        </div>
    )
}

export default App