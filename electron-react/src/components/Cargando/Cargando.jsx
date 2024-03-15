import React from 'react'
import cargando from '../../img/cargando.gif'

export const Cargando = () => {
  return (
    <div className='fixed inset-x-0 inset-y-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40'>
        <img src={cargando} className='md:w-[20%] w-[50%]'></img>
    </div>
  )
}
