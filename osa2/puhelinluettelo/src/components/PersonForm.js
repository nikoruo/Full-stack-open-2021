import React from 'react'

//komponentti, jolla palautetaan käyttäjien lisäykseen tarkoitettu form
const PersonForm = ({ onSubmit, contact }) => {

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={contact.name} onChange={contact.nameChange} />
                </div>
                <div>
                    number: <input value={contact.number} onChange={contact.numberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm