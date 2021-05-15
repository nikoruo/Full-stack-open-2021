import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { id:1, name: 'Arto Hellas', number: "040-1231244" }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        console.log('Adding new contact')
        const newContact = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        }

        persons.map(person => person.name).includes(newContact.name) ?
                window.alert(`${newContact.name} is already added to phonebook`) : setPersons(persons.concat(newContact))

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {

        setNewNumber(event.target.value)
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )

}

export default App