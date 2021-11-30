import React from 'react';
import { CoursePart } from "../types"

const Total = (props: {courseParts: CoursePart[]}) => {
    console.log("Total")
    
    return (
        <div>
            <strong>Number of exercises{" "}</strong>
            {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>
    )
}

export default Total;