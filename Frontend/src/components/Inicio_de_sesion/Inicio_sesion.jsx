import React from 'react';
import './inicio_sesion.css';

export const Inicio_sesion = () => {
  return (
    <div className='todo'>

      <div className='titulo-sena'>Centro De Biotecnologia Industrial</div>
      <div className='complete'>
        <div className='inicio_sesion'>  
            <div className='numid'>Número de identificacion:</div>
            <input className='inpt-cc' type="text" id="cc" name="cc" placeholder="Usuario"/>
            <div className='cont'>Contraseña:</div>
            <input className='inpt-pass' type="password" id="pass" name="pass" placeholder="Contraseña"/>

            <div className='btn-iniciar-ses'>
             <button className='btn-iniciar'>Ingresar</button>
             </div>

        </div>
      
      </div>


    </div>
  )
}
