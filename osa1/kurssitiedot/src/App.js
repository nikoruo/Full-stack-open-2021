import React from 'react'

//Komponentti, jolla renderöidään kurssin otsikko
const Header = (props) => {
    console.log(props)
    return (
        <h1>
            {props.title}
        </h1>
    )
}

//Komponentti, jolla renderöidään kurssin yksittäisten osien tiedot
//saa propsinaan taulukon, jossa 0: osan nimi, 1: tehtävien määrä
const Part = (props) => {
    console.log(props)
    return (
        <p>
            {props.table.name} {props.table.exercises}
        </p>
    )
}

//Komponentti, jolla renderöidään kurssin osat
//saa propsinaan 3x taulukkoa, jossa 0: osan nimi, 1: tehtävien määrä
const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part table={props.table[0]} />
            <Part table={props.table[1]} />
            <Part table={props.table[2]} />
        </div>
    )
}


//Komponentti, jolla renderöidään kurssin nimi
const Total = (props) => {
    console.log(props)
    return (
        <p>
            Number of exercises {props.sum}
        </p>
    )
}


//pääkomponentti, joka sisältää datan ja palautettavan div:n
const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header title={course} />
            <Content table={[part1, part2, part3]}/>
            <Total sum={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

export default App