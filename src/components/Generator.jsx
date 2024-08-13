import React, { useState } from 'react'
import Sectionwrapper from './Sectionwrapper'
import  {SCHEMES, WORKOUTS} from '../utils/swoldier.js'
import { split } from 'postcss/lib/list'

function Header(props) {
  const {index, title, desc} = props

  return (
    <div className='flex flex-col gap-4 justify-center text-center'>
      <div className='flex justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <div>
      <p className='text-sm sm:text-base mx-auto justify-center'>{desc}</p>
      </div>
    </div>
  )
}

export default function Generator(props) {

  const [showModal, setShowModal] = useState(false)
  const {muscles, setMuscles, poison, setPoison, goals, setGoals, updateWorkout} = props

    function toggleModal() {
      setShowModal(!showModal)
    }

  function updateMuscles(muscleGroup) {

    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== 'individual') {
      setMuscles([muscleGroup]);
      setShowModal(false)
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false)
    }
  }

  return (
    <Sectionwrapper header={"generate your workout"} title={["it's", "Huge", "o'clock"]} id={"WorkoutGen"}>

    {/* Header 1 */}
    <Header index={'01'} title={"pick your poison"} desc={"Select the type of workout you wish to endure"} />
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
    {Object.keys(WORKOUTS).map((type, typeindex) => {
      return (
        <button onClick={() => {
          setPoison(type) 
          setMuscles([])}}  
        key={typeindex} className={'bg-slate-950 py-4 rounded-lg border-[2px] border-solid border-blue-400 blue-shadow duration-200 ' + 
          (poison == type ? 'border-green-400 green-shadow' : 'border-blue-400 blue-shadow')} >
          <p className='capitalize'>{type.replaceAll('_', " ")}</p>
        </button>
      )
    })}
    </div>  

    {/* Header 2 */}
    <Header index={'02'} title={"Lock on targets"} desc={"Choose the muscles that shall be annihlated"} />
    <div className='bg-slate-950 p-3 blue-shadow-no-hover rounded-lg flex flex-col'>
      <button className='relative flex items-center justify-center' onClick={toggleModal}>
      <p className="capitalize">
      {muscles && muscles.length > 0 ? muscles.join(', ') : 'Select Muscles'}
      </p>
        <i className='fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2'></i>
      </button>
      {showModal && (
        <div className='flex flex-col p-3'>{(poison === 'individual' ? WORKOUTS[poison] : 
        Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
          return (
            <button key={muscleGroupIndex} className='hover:text-blue-400 duration-200' 
            onClick={() => {updateMuscles(muscleGroup) 
            console.log(muscleGroup)}}>
              <p className='capitalize'>{muscleGroup.replaceAll("_", " ")}</p>
            </button>
          )
        })}
        </div>
      )}
    </div>

      {/* Header 3 */}
    <Header index={'03'} title={"Become juggernaut"} desc={"Select your ultimate objective"} />
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      {Object.keys(SCHEMES).map((scheme, schemeindex) => {
          return (
            <button onClick={() => {
              setGoals(scheme)}}  
            key={schemeindex} className={'bg-slate-950 py-4 rounded-lg border-[2px] border-solid border-blue-400 blue-shadow duration-200 ' + 
              (goals == scheme ? 'border-green-400 green-shadow' : 'border-blue-400 blue-shadow')} >
              <p className='capitalize'>{scheme.replaceAll('_', " ")}</p>
            </button>
          )
        })}
    </div>  

    <button onClick={updateWorkout }
    className='px-8 py-4 border-[2px] border-blue-400 bg-slate-950 border-solid blue-shadow duration-200 rounded-lg'>
      Formulate
    </button>

    </Sectionwrapper>

  )
}
