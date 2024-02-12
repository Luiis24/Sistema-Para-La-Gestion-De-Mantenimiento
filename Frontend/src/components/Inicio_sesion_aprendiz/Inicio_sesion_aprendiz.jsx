import React, { useState } from 'react';
import axios from 'axios';
import './Inicio_sesion_aprendiz.css';

export const Inicio_sesion_aprendiz = () => {
  const [num_doc_aprendiz, setNum_doc_aprendiz] = useState('');
  const [password_aprendiz, setPassword_aprendiz] = useState('');

  const Iniciar_Sesion = async () => {
    try {
      const response = await axios.post('http://localhost:4002/loginAprendiz', {
        num_doc_aprendiz: num_doc_aprendiz, 
        password_aprendiz: password_aprendiz 
      });

      console.log(response.data); 

    } catch (error) {
      console.error('Error de aprendiz al iniciar sesión', error);
    }
  };

  return (
    <div className='todo'>
      <div className='complete'>
        <div className='inicio_sesion'>
          <div className='titulo-sesion'>Iniciar Sesión (Aprd)</div>
          <div className='numid'>Número de identificación:</div>
          <input
            className='inpt-cc'
            placeholder="Usuario"
            type="text"
            value={num_doc_aprendiz}
            onChange={(e) => setNum_doc_aprendiz(e.target.value)}
          />
          <div className='cont'>Contraseña:</div>
          <input
            className='inpt-pass'
            type="password"
            value={password_aprendiz}
            onChange={(e) => setPassword_aprendiz(e.target.value)}
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
