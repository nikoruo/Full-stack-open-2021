import React from 'react';
import { HeaderProps } from "../types"

const Header = (props: HeaderProps) => {
    console.log("Header")
    
    return (
        <h1>
            {props.name}
        </h1>
    )
}

export default Header;