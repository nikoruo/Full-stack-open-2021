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

    //k�ytt�j�n lis�ys
    const addContact = (event) => {
        event.preventDefault()
        console.log('Adding new contact')
        const newContact = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        }

        //testataan, l�ytyyk� k�ytt�j� jo vai ei
        persons.map(person => person.name).includes(newContact.name) ?
                window.alert(`${newContact.name} is already added to phonebook`) : setPersons(persons.concat(newContact))

        setNewName('')
        setNewNumber('')
    }

    //nimi -kent�n handleri
    const handleNameChange = (event) => {        
        setNewName(event.target.value)
    }

    //numero -kent�n handleri
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    //filtteri -kent�n handleri
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    //n�kyviin tulevat kontaktit
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