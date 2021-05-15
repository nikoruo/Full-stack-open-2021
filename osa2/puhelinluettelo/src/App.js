import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { id:1, name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        console.log('Adding new name')
        const newContact = {
            id: persons.length + 1,
            name: newName
        }

        persons.map(person => person.name).includes(newContact.name) ?
                window.alert(`${newContact.name} is already added to phonebook`) : setPersons(persons.concat(newContact))

        setNewName('')
    }

    const handleNameChange = (event) => {
        
        setNewName(event.target.value)
    }

    
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <p key={person.id}>{person.name}</p>)}
        </div>
    )

}

export default App