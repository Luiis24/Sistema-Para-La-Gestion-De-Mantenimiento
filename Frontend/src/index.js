import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Inicio_sesion } from './components/Inicio_de_sesion/Inicio_sesion';
import { Titulo_sena_cb } from './components/Titulo_sena_cb/Titulo_sena_cb';
import { Menu_principal } from './components/Menu_principal/Menu_principal';
import { Registro_aprendiz } from './components/Registro_aprendiz/Registro_aprendiz';
import { Animacion_cuadros } from './components/Animacion_cuadros/Animacion_cuadros';
import { Registro_instructor } from './components/Registro_instructor/Registro_instructor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
  <Titulo_sena_cb/>
  <Animacion_cuadros/>
  <Menu_principal/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
