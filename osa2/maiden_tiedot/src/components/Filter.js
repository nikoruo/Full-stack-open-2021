import React from 'react'

//komponentti, jolla palautetaan filtter input
const Filter = ({ value, onChange }) => {
    return (
        <div>
            find countries: <input value={value} onChange={onChange} />
        </div>
    )
}


export default Filter