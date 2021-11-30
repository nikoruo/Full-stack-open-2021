import React from 'react';
import { CoursePart } from "../types"
import { assertNever } from '../utils';

const Part = (props: {CoursePart: CoursePart, key: number}) => {
  console.log("Content")
  
    switch (props.CoursePart.type){
        case "normal":
            return (
                <div>
                    <h4>{props.CoursePart.name} {props.CoursePart.exerciseCount}</h4>
                    <i>{props.CoursePart.description}</i>
              </div>
            )
            break;
        case "groupProject":
            return (
                <div>
                    <h4>{props.CoursePart.name} {props.CoursePart.exerciseCount}</h4>
                    project exercises: {props.CoursePart.groupProjectCount}
              </div>
            )
            break;
        case "submission":
            return (
                <div>
                    <h4>{props.CoursePart.name} {props.CoursePart.exerciseCount}</h4>
                    <i>{props.CoursePart.description}</i>
                    <p>submits to: {props.CoursePart.exerciseSubmissionLink}</p>
              </div>
            )
        case "special":
            return (
                <div>
                    <h4>{props.CoursePart.name} {props.CoursePart.exerciseCount}</h4>
                    <i>{props.CoursePart.description}</i>
                    <p>submits to: {props.CoursePart.requirements.map(r => r+', ')}</p>
                </div>
            )
        default:
            return assertNever(props.CoursePart);
            break;

    }

}

export default Part;