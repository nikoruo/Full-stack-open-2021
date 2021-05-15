import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
        { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
        { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    //käyttäjän lisäys
    const addContact = (event) => {
        event.preventDefault()
        console.log('Adding new contact')
        const newContact = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        }

        //testataan, löytyykö käyttäjä jo vai ei
        persons.map(person => person.name).includes(newContact.name) ?
                window.alert(`${newContact.name} is already added to phonebook`) : setPersons(persons.concat(newContact))

        setNewName('')
        setNewNumber('')
    }

    //nimi -kentän handleri
    const handleNameChange = (event) => {        
        setNewName(event.target.value)
    }

    //numero -kentän handleri
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    //filtteri -kentän handleri
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    //näkyviin tulevat kontaktit
    const ContactsToShow = newFilter.length > 0 ?
        persons.filter(contact => contact.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} value={newFilter} />
            <h2>add a new</h2>
            <PersonForm onSubmit={addContact} contact={{
                name: newName, nameChange: handleNameChange,
                number: newNumber, numberChange: handleNumberChange
            }} />
            <h2>Numbers</h2>
            <Persons contacts={ContactsToShow} />
        </div>
    )

}

export default App