import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Inicio_sesion } from './components/Inicio_de_sesion/Inicio_sesion';
import { Titulo_sena_cb } from './components/Titulo_sena_cb/Titulo_sena_cb';
import { Menu_principal } from './components/Menu_principal/Menu_principal';
import { Registro_aprendiz } from './components/Registro_aprendiz/Registro_aprendiz';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
  <Titulo_sena_cb/>
  <Registro_aprendiz/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
