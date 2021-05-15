import React from 'react'

//komponentti, jolla palautetaan filtter input
const Filter = ({ value, onChange }) => {
    return (
        <div>
            filter shown with: <input value={value} onChange={onChange} />
        </div>
    )
}


export default Filter