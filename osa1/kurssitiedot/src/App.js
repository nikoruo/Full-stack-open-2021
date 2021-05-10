import React from 'react'

//Komponentti, jolla renderöidään kurssin otsikko
const Header = (props) => {
    console.log("Header")
    console.log(props)
    return (
        <h1>
            {props.title}
        </h1>
    )
}

//Komponentti, jolla renderöidään kurssin yksittäisten osien tiedot
//saa propsinaan tiedot yksittäisestä osasta
const Part = (props) => {
    console.log("Part")
    console.log(props)
    return (
        <p>
            {props.obj.name} {props.obj.exercises}
        </p>
    )
}

//Komponentti, jolla renderöidään kurssin osat
//saa propsinaan taulukon osista
const Content = (props) => {
    console.log("Content")
    console.log(props)
    return (
        <div>
            <Part obj={props.table[0]} />
            <Part obj={props.table[1]} />
            <Part obj={props.table[2]} />
        </div>
    )
}


//Komponentti, jolla renderöidään kurssin tehtävien määrä
const Total = (props) => {
    console.log("Total")
    console.log(props)
    return (
        <p>
            Number of exercises {props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises}
        </p>
    )
}


//pääkomponentti, joka sisältää datan ja palautettavan div:n
const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header title={course} />
            <Content table={parts}/>
            <Total sum={parts} />
        </div>
    )
}

export default App