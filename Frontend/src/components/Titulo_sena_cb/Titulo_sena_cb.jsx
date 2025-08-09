import React from 'react';
import './Titulo_sena_cb.css';
import logo from './Sena_logo.png';

export const Titulo_sena_cb = () => {
  return (
    
      <div className='logo-sena'>
       <img src={logo} className="img-logo-sena"></img>
       <div className='titulo-completo'>
      <div className='titulo-sena'>SGMI</div>
       <div className='titulo-taller'> CBI - Taller Maquinas Y Herramientas</div>
      </div>

      </div>
      
  )
}
