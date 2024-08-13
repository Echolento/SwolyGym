import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from './components/Hero' 
import Generator from './components/Generator'
import Workout from './components/Workout'
import Potion from './components/Potion'
import { generateWorkout } from './utils/functions'

function App() {
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState('individual')
  const [muscles, setMuscles] = useState([])
  const [goals, setGoals] = useState('strength_power')
  const [activityLevel, setActivityLevel] = useState('')

  function updateWorkout() {
    if (muscles.length < 1) {
      return
    }
    let newWorkout = generateWorkout({poison, muscles, goals})
    console.log(newWorkout)
    setWorkout(newWorkout)
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator 
      poison={poison} 
      setPoison={setPoison} 
      muscles={muscles} 
      setMuscles={setMuscles} 
      goals={goals} 
      setGoals={setGoals}
      updateWorkout={updateWorkout}/>
      {workout && (<Workout workout={workout}/>) }
      <Potion />
    </main>
  )
}

export default App
