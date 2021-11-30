import React from 'react';
import { CoursePart } from "../types"
import Part from './Part';

const Content = (props: {courseParts: CoursePart[]}) => {
  console.log("Content")

  return (
    <div>
      {props.courseParts.map((part, i: number) => <Part key={i} CoursePart={part}/>)}    
    </div>
  )
}

export default Content;