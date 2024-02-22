import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from "@nextui-org/react";
import { UsuarioProvider } from './estados/usuario';
import Descripcion_del_equipo_hv from './components/Descripcion_del_equipo_hv/Descripcion_del_equipo_hv';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsuarioProvider>
      <NextUIProvider>
        <Descripcion_del_equipo_hv/>
      </NextUIProvider>
    </UsuarioProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
