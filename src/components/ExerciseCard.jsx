import React, { useState } from 'react';

export default function ExerciseCard(props) {
    const { exercise, index } = props;

    const [setsCompleted, setSetsCompleted] = useState(0);

    function handleSetIncrement() {
        if (setsCompleted < 5) {
            setSetsCompleted(prev => prev + 1);
        }
    }

    const isCompleted = setsCompleted === 5;
    
    return (
        <div className='p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
                <h4 className='text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400'>
                    0{index + 1}
                </h4>
                <h2 className='capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center'>
                    {exercise.name.replaceAll("_", " ")}
                </h2>
                <p className='text-sm text-slate-400 capitalize'>{exercise.type}</p>
            </div>
            <div className="flex flex-col">
                <h3 className='text-slate-400 text-sm'>Muscle Groups</h3>
                <p className='capitalize'>{exercise.muscles.join(' & ')}</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 sm:pace-items-center gap-2'>
                {['reps', 'rest', 'tempo'].map(info => (
                    <div className="flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full" key={info}>
                        <h3 className='capitalize text-slate-40 text-sm'>{info === 'reps' ? `${exercise.unit}` : info}</h3>
                        <p className='font-medium'>{exercise[info]}</p>
                    </div>
                ))}
                <button
                    className={`flex flex-col p-2 rounded border-[1.5px] duration-200 w-full ${
                        isCompleted
                            ? 'border-green-400 bg-green-500 text-white'
                            : 'border-blue-900 hover:border-blue-600'
                    }`}
                    onClick={handleSetIncrement}
                    disabled={isCompleted}
                >
                    <h3 className='text-slate-400 text-sm capitalize'>Set Completed</h3>
                    <p className='font-medium'>{setsCompleted} / 5</p>
                </button>
            </div>
        </div>
    );
}
