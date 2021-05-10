import React, { useState } from 'react'

//nappulat
const Button = ({ handleClick, name }) => (
    <button onClick={handleClick}>{name}</button>
)

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
    //annetaan ääniä ja ylläpidetään taulukkoa annetuista äänistä
    const handleVoteClick = () => {
        let tmp = [...voted]
        tmp[selected] += 1
        setVoted(tmp)
    }
    
    return (
        <div>
            <p>{anecdotes[selected]}</p>
            <p>has {voted[selected]} votes</p>
            <Button handleClick={handleVoteClick} name={"vote"}></Button>
            <Button handleClick={handleNextClick} name={"next anecdote"}></Button>
        </div>
    )
}

export default App