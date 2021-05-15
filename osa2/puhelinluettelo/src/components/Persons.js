import React from 'react'

//komponentti, jolla palautetaan list� kontakteista
const Persons = ({ contacts }) => {
    return (
        <div>
            {contacts.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons