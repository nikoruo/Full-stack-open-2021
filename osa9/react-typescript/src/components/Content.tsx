import React from 'react';
import { PartsProps } from "../types"

const Content = (props: PartsProps) => {
  console.log("Content")
  console.log(props)
  return (
      <div>
          Number of exercises{" "}
          {props.parts.map((c: { name: string; exerciseCount: number; }, i: number) => <p key={i}>{c.name} {c.exerciseCount}</p>)}
    </div>
  )
}

export default Content;