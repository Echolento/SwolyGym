import React, { useState } from 'react';

export default function MOrF(props) {
    
    const {gender, setGender} = props
    const F = "Female"
    const M = "Male"

    return (
        <div className='grid grid-cols-2 gap-5'>
        <button 
            onClick={() => setGender('Male')} 
            className={'bg-slate-950 py-4 rounded-lg border-[2px] border-solid border-blue-400 duration-200 ' 
                + (gender == M ? 'green-shadow border-green-400' : 'blue-shadow border-blue-400')}>
            Male
        </button>
        <button 
            onClick={() => setGender('Female')} 
            className={'bg-slate-950 py-4 rounded-lg border-[2px] border-blue-400 border-solid duration-200 ' 
            + (gender == F ? 'green-shadow border-green-400' : 'blue-shadow border-blue-400')}>
            Female
        </button>
        </div>
    );
    }
