import React from 'react'

export default function Input( props ) {
    const { hint, type, setVar} = props

    return (
        <input className='text-white bg-slate-950 px-4 py-10 blue-shadow-no-hover rounded-lg outline-none my-2' type={type} placeholder={hint} onChange={(e) => setVar(e.target.value)}>
        </input>
    )
}
