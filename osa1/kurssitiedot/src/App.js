import React from 'react'

//Komponentti, jolla renderöidään kurssin otsikko
const Header = (props) => {
    return (
        <div>
            <h1>
                {props.title}
            </h1>
        </div>
    )
}

//Komponentti, jolla renderöidään kurssin yksittäisten osien tiedot
//saa propsinaan taulukon, jossa 0: osan nimi, 1: tehtävien määrä
const Part = (props) => {
    return (
        <div>
            <p>
                {props.table[0]} {props.table[1]}
            </p>
        </div>
    )
}

//Komponentti, jolla renderöidään kurssin osat
//saa propsinaan 3x taulukkoa, jossa 0: osan nimi, 1: tehtävien määrä
const Content = (props) => {
    return (
        <div>
            <Part table={[props.p1[0], props.p1[1]]} />
            <Part table={[props.p2[0], props.p2[1]]} />
            <Part table={[props.p3[0], props.p3[1]]} />
        </div>
    )
}


//Komponentti, jolla renderöidään kurssin nimi
const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.sum}
            </p>
        </div>
    )
}


//pääkomponentti, joka sisältää datan ja palautettavan div:n
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header title={course} />
            <Content p1={[part1, exercises1]} p2={[part2, exercises2]} p3={[part3, exercises3]}/>
            <Total sum={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

export default App