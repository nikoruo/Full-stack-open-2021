import React from 'react'

//Komponentti, jolla render�id��n kurssin otsikko
const Header = (props) => {
    console.log(props)
    return (
        <h1>
            {props.title}
        </h1>
    )
}

//Komponentti, jolla render�id��n kurssin yksitt�isten osien tiedot
//saa propsinaan tiedot yksitt�isest� osasta
const Part = (props) => {
    console.log(props)
    return (
        <p>
            {props.obj.name} {props.obj.exercises}
        </p>
    )
}

//Komponentti, jolla render�id��n kurssin osat
//saa propsinaan taulukon osista
const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part obj={props.table[0]} />
            <Part obj={props.table[1]} />
            <Part obj={props.table[2]} />
        </div>
    )
}


//Komponentti, jolla render�id��n kurssin nimi
const Total = (props) => {
    console.log(props)
    return (
        <p>
            Number of exercises {props.sum}
        </p>
    )
}


//p��komponentti, joka sis�lt�� datan ja palautettavan div:n
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