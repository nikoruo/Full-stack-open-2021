import React from 'react'

//Alikomponentti, jolla render�id��n kurssin otsikko
const Header = (props) => {
    console.log("Header", props)
    return (
        <h1>
            {props.title.name}
        </h1>
    )
}

//Alikomponentti, jolla render�id��n kurssin yksitt�isten osien tiedot
//saa propsinaan tiedot yksitt�isest� osasta
const Part = (props) => {
    console.log("Part", props)
    return (
        <p>
            {props.obj.name} {props.obj.exercises}
        </p>
    )
}

//Alikomponentti, jolla render�id��n kurssin osat
const Content = ({table}) => {
    console.log("Content", table)

    return (
        <div>
            {table.parts.map(part => <Part key={part.id} obj={part} />)}
        </div>
    )
}


//Alikomponentti, jolla render�id��n kurssin teht�vien m��r�
const Total = ({sum}) => {
    console.log("Total", sum)
    const exercises = (sum.parts.map(x => x.exercises)).reduce((accumulator, currentValue) => accumulator + currentValue)
    console.log("exercises", exercises)

    return (
        <p>
            Number of exercises {exercises}
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