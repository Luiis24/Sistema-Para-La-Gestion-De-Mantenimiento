import React from 'react';
import './inicio_sesion.css';

export const Inicio_sesion = () => {
  return (
    <div className='todo'>
      <div className='complete'>
        <div className='inicio_sesion'>
        <div className='titulo-sesion'>Iniciar Sesión</div>
            <div className='numid'>Número de identificacion:</div>
            <input className='inpt-cc' placeholder="Usuario" type="text" id="cc" name="cc" />
            <div className='cont'>Contraseña:</div>
            <input className='inpt-pass' type="password" id="pass" name="pass" placeholder="Contraseña"/>
            <div className='btn-iniciar-ses'>
             <button className='boton-iniciar' type='submit'>Ingresar</button>
             </div>
        </div>
      </div>

<div className="animacion" >
            <ul className="cuadros">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
  )
}
