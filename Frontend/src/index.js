import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Inicio_sesion_instructor } from './components/Inicio_sesion_instructor/Inicio_sesion_instructor';
import { Inicio_sesion_aprendiz } from './components/Inicio_sesion_aprendiz/Inicio_sesion_aprendiz';
import { Titulo_sena_cb } from './components/Titulo_sena_cb/Titulo_sena_cb';
import { Menu_principal } from './components/Menu_principal/Menu_principal';
import { Registro_aprendiz } from './components/Registro_aprendiz/Registro_aprendiz';
import { Animacion_cuadros } from './components/Animacion_cuadros/Animacion_cuadros';
import { Registro_instructor } from './components/Registro_instructor/Registro_instructor';
import { Componentes_check } from './components/Componentes_check/Componentes_check'
import { Check_list } from './components/Check_list/Check_list'
import Estado_componente from './components/Estado_componente/Estado_componente';
import Crear_tipo_maquina from './components/Crear_tipo_maquina/Crear_tipo_maquina';
import { Crear_maquina } from './components/Crear_maquina/Crear_maquina';
import { Caracteristicas_motor } from './components/Caracteristicas_motor/Caracteristicas_motor'
import { Historial_reparaciones } from './components/Historial_reparaciones/Historial_reparaciones';
import  Descripcion_del_equipo_hv  from './components/Descripcion_del_equipo_hv/Descripcion_del_equipo_hv'; 
import Caracteristicas_maquina from './components/Caracteristicas_maquina/Caracteristicas_maquina';
import CrearHojaVidaMaquina from './components/Hoja_de_vida/CrearHojaVidaMaquina ';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <Crear_maquina/>
  <Descripcion_del_equipo_hv/>
  <Caracteristicas_maquina/>
  <Caracteristicas_motor/>
  <Historial_reparaciones/>

 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
