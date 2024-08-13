import React from 'react'

export default function Hero() {
  return (
    <div className='min-h-screen flex flex-col gap-10 item-center justify-center text-center max-w-[900px] w-full mx-auto p-4'>
        <div className='flex flex-col gap-4'>
            <p>IT'S TIME TO GET</p>
            <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>SWOLE<span className='text-blue-400'>NORMOUS</span></h1>
        </div>
        <p className='text-sm md:text-base text-bold'>I hereby acknowledge that I maybe become 
        <span className='text-blue-400 font-medium'> incredibly and unbelievably swolenormous</span> and accept all risks of
        becoming the local <span className='text-blue-400 font-medium'>mass montrosity</span>
        , included in this swolenormously valuable deal is being unable to fit through doors due to 
        <span className='text-blue-400 font-medium'> over swolenormousity</span></p>
        <span className=''>
        <button className='px-8 py-4 border-[2px] border-blue-400 bg-slate-950 border-solid blue-shadow duration-200 rounded-lg' onClick={() => {window.location.href = "#WorkoutGen"}}>
            I accept all risks <br></br> and shall begin my road to swolenormousity</button>
        </span>
    </div>
  )
}
