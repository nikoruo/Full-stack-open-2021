import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [infoMessage, setInfoMessage] = useState(null)

    //ladataan kontaktit palvelimelta
    const initializeContacts = () => {
        console.log('effect')
        contactService
            .getAll()
            .then(initialContacts => {
                console.log('promise fulfilled')
                setPersons(initialContacts)
            })
            .catch(error => {
                console.log('fail')

                setInfoMessage({
                    text: `Error while loading contacts. Please try again and refresh the page.`,
                    colour: 'red'
                })

                setTimeout(() => {
                    setInfoMessage(null)
                }, 5000)
            })
    }

    useEffect(() => {
        initializeContacts()
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
            //löytyi, kysytään haluaako päivittää vanhaa vai ei
            if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number with a new one?`)) {
                //halusi, joten päivitetään vanhalle kontaktille uusi numero

                const oldUser = persons.find(c => c.name === newContact.name)
                
                contactService
                    .update(oldUser.id, newContact)
                    .then(returnedContact => {
                        console.log(returnedContact)
                        setPersons(persons.map(c => c.id !== oldUser.id ? c : returnedContact))

                        setNewName('')
                        setNewNumber('')

                        setInfoMessage({
                            text: `Updated the number of ${returnedContact.name} to ${returnedContact.number}`,
                            colour: 'green'
                        })
                        setTimeout(() => {
                            setInfoMessage(null)
                        }, 2000)
                    })
                    .catch(error => {
                        console.log('fail')
                        setInfoMessage({
                            text: `Information of ${oldUser.name} has already been removed from the server`,
                            colour: 'red'
                        })

                        setPersons(persons.filter(c => c.id !== oldUser.id))

                        setTimeout(() => {
                            setInfoMessage(null)
                        }, 5000)
                    })
            }
        } else {
            //uuden kontaktin lisääminen
            contactService
                .create(newContact)
                .then(returnedContact => {
                    console.log(returnedContact)
                    setPersons(persons.concat(returnedContact))

                    setNewName('')
                    setNewNumber('')

                    setInfoMessage({
                        text: `Added the information of ${returnedContact.name}`,
                        colour: 'green'
                    })
                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 2000)
                })
                .catch(error => {
                    console.log('fail')
                    setInfoMessage({
                        text: `Error while adding ${newContact.name}. Please try again.`,
                        colour: 'red'
                    })

                    initializeContacts()

                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 5000)
                })
        }
    }   

    //kontaktin poistaminen
    const deleteContact = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            contactService
                .delContact(person.id)
                .then(deletedContact => {
                    console.log("Delete succeeded")
                    setPersons(persons.filter(c => c.id !== person.id))

                    setInfoMessage({
                        text: `Deleted the information of ${person.name}`,
                        colour: 'green'
                    })
                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 2000)
                })
                .catch(error => {
                    console.log('fail')
                    setInfoMessage({
                        text: `Error while deleting ${person.name}. User might have been deleted already, please try again.`,
                        colour: 'red'
                    })

                    setPersons(persons.filter(c => c.id !== person.id))

                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 5000)
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
            <Notification info={infoMessage} />
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