import React from 'react';
import { PartsProps } from "../types"

const Total = (props: PartsProps) => {
    console.log("Total")
    console.log(props)
    return (
        <div>
            Number of exercises{" "}
            {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>
    )
}

export default Total;