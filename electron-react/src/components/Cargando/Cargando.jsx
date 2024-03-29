import React from 'react'
import './Cargando.css'

export const Cargando = () => {
  return (
    <div className='fixed inset-x-0 inset-y-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-40'>
        <span className='loader md:w-[20%] w-[50%]'></span>
    </div>
  )
}
