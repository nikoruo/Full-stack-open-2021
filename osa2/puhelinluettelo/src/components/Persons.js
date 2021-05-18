import React from 'react'

//komponentti, jolla palautetaan listä kontakteista
const Persons = ({ contacts, deleteContact }) => {
    return (
        <div>
            {contacts.map(person =>
                <div key={person.id}>
                    {person.name}
                    {person.number}
                    <button onClick={()=>deleteContact(person.id)}>delete</button>
                </div>)}
        </div>
    )
}

export default Persons