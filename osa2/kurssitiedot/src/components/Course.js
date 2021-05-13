import React from 'react'

//Alikomponentti, jolla render�id��n kurssin otsikko
const Header = (props) => {
    console.log("Header")
    console.log(props)
    return (
        <h1>
            {props.title.name}
        </h1>
    )
}

//Alikomponentti, jolla render�id��n kurssin yksitt�isten osien tiedot
//saa propsinaan tiedot yksitt�isest� osasta
const Part = (props) => {
    console.log("Part")
    console.log(props)
    return (
        <p>
            {props.obj.name} {props.obj.exercises}
        </p>
    )
}

//Alikomponentti, jolla render�id��n kurssin osat
const Content = (props) => {
    console.log("Content")
    console.log(props)
    return (
        <div>
            <Part obj={props.table.parts[0]} />
            <Part obj={props.table.parts[1]} />
            <Part obj={props.table.parts[2]} />
        </div>
    )
}


//Alikomponentti, jolla render�id��n kurssin teht�vien m��r�
const Total = (props) => {
    console.log("Total")
    console.log(props)
    return (
        <p>
            Number of exercises {props.sum.parts[0].exercises + props.sum.parts[1].exercises + props.sum.parts[2].exercises}
        </p>
    )
}

const Course = ({ course }) => {
    console.log("Course -component")
    return (
        <div>
            <Header title={course} />
            <Content table={course} />
            <Total sum={course} />
        </div>
        )
}


export default Course