import React from 'react';
import './Titulo_sena_cb.css';
import logo from '../../img/OIG3.png';

export const Titulo_sena_cb = () => {
  return (

    <div className='logo-sena'>
      <img src={logo} className="img-logo-sena" alt='Logo Sena'></img>
      <div className='titulo-completo hidden md:flex flex-col'>
        <div className='titulo-sena'>Centro De Biotecnologia Industrial</div>
        <div className='titulo-taller'> Taller Maquinas Y Herramientas</div>
      </div>

    </div>

  )
}
