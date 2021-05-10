import React, { useState } from 'react'

//otsikot
const Header = ({ title }) => {
    return (
        <h1>
            {title}
        </h1>
    )
}

//nappulat
const Button = ({ handleClick, name }) => (
    <button onClick={handleClick}>{name}</button>
)

//suurin ‰‰nim‰‰r‰
const Topper = (props) => {

    const anecdotes = props.lines
    const votes = props.numbers

    //etsit‰‰n ensimm‰isen korkeimman arvon omaavan indexin indexi
    const top = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <p>{anecdotes[top]}</p>
            <p>has {votes[top]} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const [selected, setSelected] = useState(0)
    const [voted, setVoted] = useState(new Array(anecdotes.length).fill(0))
    
    //random integer 0-5
    const handleNextClick = () => setSelected(Math.floor(Math.random() * (anecdotes.length - 0) + 0))
    //annetaan ‰‰ni‰ ja yll‰pidet‰‰n taulukkoa annetuista ‰‰nist‰
    const handleVoteClick = () => {
        let tmp = [...voted]
        tmp[selected] += 1
        setVoted(tmp)
    }
    
    return (
        <div>
            <Header title={"Anecdote of the day"} />
            <p>{anecdotes[selected]}</p>
            <p>has {voted[selected]} votes</p>
            <Button handleClick={handleVoteClick} name={"vote"}></Button>
            <Button handleClick={handleNextClick} name={"next anecdote"}></Button>
            <Header title={"Anecdote with most votes"} />
            <Topper lines={anecdotes} numbers={voted}/>
        </div>
    )
}

export default App