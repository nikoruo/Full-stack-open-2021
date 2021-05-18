import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        contactService
            .getAll()
            .then(initialContacts => {
                console.log('promise fulfilled')
                setPersons(initialContacts)
            })
            .catch(error => {
                console.log('fail')
            })
    }, [])

    //käyttäjän lisäys
    const addContact = (event) => {
        event.preventDefault()
        console.log('Adding new contact')
        const newContact = {
            name: newName,
            number: newNumber,
            id: persons.length + 1            
        }

        //testataan, löytyykö käyttäjä jo vai ei
        if (persons.map(person => person.name).includes(newContact.name)) {
            if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number with a new one?`)) {
                const oldUser = persons.find(c => c.name === newContact.name)

                contactService
                    .update(oldUser.id, newContact)
                    .then(returnedContact => {
                        console.log(returnedContact)
                        setPersons(persons.map(c => c.id !== oldUser.id ? c : returnedContact))

                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.log('fail')
                    })
            }
        } else {
            contactService
                .create(newContact)
                .then(returnedContact => {
                    console.log(returnedContact)
                    setPersons(persons.concat(returnedContact))

                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    console.log('fail')
                })
        }
    }   

    const deleteContact = (person) => {

        if (window.confirm(`Delete ${person.name}?`)) {
            contactService
                .delContact(person.id)
                .then(deletedContact => {
                    console.log("Delete succeeded")
                    setPersons(persons.filter(c => c.id !== person.id))
                })
                .catch(error => {
                    console.log('fail')
                })
        }
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
            <Persons contacts={ContactsToShow} deleteContact={deleteContact} />
        </div>
    )

}

export default App