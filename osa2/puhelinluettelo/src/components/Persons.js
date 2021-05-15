import React from 'react'

//komponentti, jolla palautetaan listä kontakteista
const Persons = ({ contacts }) => {
    return (
        <div>
            {contacts.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons