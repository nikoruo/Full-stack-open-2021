import React from 'react'

//komponentti, jolla palautetaan virheilmoitus
const Notification = ({ info }) => {

    const colour = info===null ? 'grey' : info.colour 

    const notificationStyle = {
        color: colour,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
}

    if (info === null) {
        return null
    }

    return (
        <div className="error" style={notificationStyle}>
            {info.text}
        </div>
    )
}

export default Notification;