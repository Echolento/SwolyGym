import React from 'react'
import Sectionwrapper from './Sectionwrapper'
import ExerciseCard from './ExerciseCard'

export default function Workout(props) {
  const {workout} = props
  return (
    <Sectionwrapper header={"Welcome to"} title={["The", "DANGER", "zone"]} id={"Workout"}>
      <div className="flex flex-col gap-4">
        {workout.map((exercise, i) => {
          return (
            <ExerciseCard exercise={exercise} key={i} index={i}/>
          )
        })}
        </div>
    </Sectionwrapper>
  )
}
