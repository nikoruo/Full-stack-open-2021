import React from 'react'

//Alikomponentti, jolla renderöidään kurssin otsikko
const Header = (props) => {
    console.log("Header", props)
    return (
        <h1>
            {props.title.name}
        </h1>
    )
}

//Alikomponentti, jolla renderöidään kurssin yksittäisten osien tiedot
//saa propsinaan tiedot yksittäisestä osasta
const Part = ({obj}) => {
    console.log("Part", obj)
    return (
        <p>
            {obj.name} {obj.exercises}
        </p>
    )
}

//Alikomponentti, jolla renderöidään kurssin osat
const Content = ({table}) => {
    console.log("Content", table)

    return (
        <div>
            {table.parts.map(part => <Part key={part.id} obj={part} />)}
        </div>
    )
}


//Alikomponentti, jolla renderöidään kurssin tehtävien määrä
const Total = ({sum}) => {
    console.log("Total", sum)

    //luo mapin avulla taulukon, johon kerätään vain harjoitusten määrä
    //sen jälkeen .reduce() avulla lasketaan tehtävien yhteismäärä
    const exercises = (sum.parts.map(x => x.exercises)).reduce((accumulator, currentValue) => accumulator + currentValue)
    console.log("exercises", exercises)

    return (
        <p style={{ fontWeight: "bold" }}>
            total of {exercises} exercises
        </p>
    )
}

const Course = ({ course }) => {
    console.log("Course -component", course)

    return (
        <div>
            <Header title={course} />
            <Content table={course} />
            <Total sum={course} />
        </div>
        )
}


export default Course