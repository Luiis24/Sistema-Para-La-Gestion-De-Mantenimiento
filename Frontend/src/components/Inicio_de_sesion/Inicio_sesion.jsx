import React, { useState } from 'react';
import axios from 'axios';
import './inicio_sesion.css';

export const Inicio_sesion = () => {
  const [cc, setCc] = useState('');
  const [password, setPassword] = useState('');

  const Iniciar_Sesion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginInstructor', {
        cc_instructor: cc,
        password_instructor: password
      });

      console.log(response.data); 

    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className='todo'>
      <div className='complete'>
        <div className='inicio_sesion'>
          <div className='titulo-sesion'>Iniciar Sesión</div>
          <div className='numid'>Número de identificación:</div>
          <input
            className='inpt-cc'
            placeholder="Usuario"
            type="text"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          />
          <div className='cont'>Contraseña:</div>
          <input
            className='inpt-pass'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <div className='btn-iniciar-ses'>
            <button className='boton-iniciar' type='button' onClick={Iniciar_Sesion}>
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
