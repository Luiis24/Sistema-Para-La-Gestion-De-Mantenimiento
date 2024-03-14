import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Maquinas } from './components/Maquinas/Maquinas';

import { Checklist_maquina } from './components/Checklist_maquina/Checklist_maquina';
import { Orden_trabajo_maquina } from './components/Orden_trabajo_maquina/Orden_trabajo_maquina';
import { Hoja_de_vida } from './components/Hoja_de_vida/Hoja_de_vida';

import { Aprendices } from './components/Aprendices/Aprendices';
import { Registro_aprendiz } from './components/Registro_aprendiz/Registro_aprendiz'

import { Inicio_sesion_aprendiz } from './components/Inicio_sesion_aprendiz/Inicio_sesion_aprendiz'

import { Instructores } from './components/Instructores/Instructores';
import { Registro_instructor } from './components/Registro_instructor/Registro_instructor';

import { Almacen } from './components/Almacen/Almacen';
import { Registro_almacen } from './components/Registro_almacen/Registro_almacen';
// import { Nueva_salida_almacen } from './components/Nueva_salida_almacen/Nueva_salida_almacen';


import { Notificaciones } from './components/Notificaciones/Notificaciones';

import { Titulo_sena_cb } from './components/Titulo_sena_cb/Titulo_sena_cb';
import { Animacion_cuadros } from './components/Animacion_cuadros/Animacion_cuadros';
import { Menu } from './components/Menu/Menu';

import './components/Navbars/navbars.css'
import { Navbars } from './components/Navbars/Navbars';

import CrearTipoMaquina from './components/Crear_tipo_maquina/Crear_tipo_maquina';
import { Crear_maquina } from './components/Crear_maquina/Crear_maquina';

import { Informes } from './components/Informes/Informes';

import { Registro_caracteristicas_motor } from './components/Registro_caracteristicas_motor/Registro_caracteristicas_motor'
import Caracteristicas_maquina from './components/Caracteristicas_maquina/Caracteristicas_maquina';
import Registro_descripcion_equipo_hv from './components/Registro_descripcion_equipo_hv/Registro_descripcion_equipo_hv';

import { Historial_reparaciones } from './components/Historial_reparaciones/Historial_reparaciones';
import { Registro_componentes_check } from './components/Registro_componentes_check/Registro_componentes_check';
import { Actualizar_maquina } from './components/Actualizar_maquina/Actualizar_maquina';
import { Registro_salida_insumo } from './components/Registro_salida_insumo/Registro_salida_insumo';
import { Actualizar_estado_ficha } from './components/Actualizar_estado_ficha/Actualizar_estado_ficha';
import { Actualizar_tipo_maquina } from './components/Actualizar_tipo_maquina/Actualizar_tipo_maquina';
import { Herramientas } from './components/Herramientas/Herramientas';

const router = createBrowserRouter([
  {
    path: "/MenuPrincipal",
    element: <><Menu /><Animacion_cuadros /></>
  },
  {
    path: "/",
    element: <><Titulo_sena_cb /><Inicio_sesion_aprendiz /><Animacion_cuadros /></>
  },
  {
    path: "/tornos",
    element: <><Navbars /><Maquinas /></>
  },
  {
    path: "/checklistMaquina/:id_maquina",
    element: <Checklist_maquina />
  },
  {
    path: "/OrdenDeTrabajo/:id_maquina",
    element: <><Navbars /><Orden_trabajo_maquina /></>
  },
  {
    path: "/hojaVida/:id_maquina",
    element: <><Hoja_de_vida /></>
  },
  {
    path: "/almacen",
    element: <><Almacen /></>
  },
  {
    path: "/aprendices",
    element: <><Aprendices /></>
  },
  {
    path: "/notificaciones",
    element: <><Notificaciones /></>
  },
  {
    path: "/registroAprendiz",
    element: <><Registro_aprendiz /><Animacion_cuadros /></>
  },
  {
    path: "/crearTipoMaquina",
    element: <><CrearTipoMaquina /><Animacion_cuadros /></>
  },
  {
    path: "/crearMaquina",
    element: <><Crear_maquina /><Animacion_cuadros /></>
  },
  {
    path: "/informes",
    element: <><Informes /></>
  },
  {
    path: "/instructores",
    element: <><Instructores /></>
  },
  {
    path: "/Registroinstructores",
    element: <><Registro_instructor /><Animacion_cuadros /></>
  },
  {
    path: "/crearCaracteristicasMotor",
    element: <><Registro_caracteristicas_motor /><Animacion_cuadros /></>
  },
  ,
  {
    path: "/crearCaracteristicasMaquina",
    element: <><Caracteristicas_maquina /><Animacion_cuadros /></>
  },
  {
    path: "/crearDescripcionEquipo",
    element: <><Registro_descripcion_equipo_hv /><Animacion_cuadros /></>
  },
  {
    path: "/crearComponentesCheck",
    element: <><Registro_componentes_check /><Animacion_cuadros /></>
  },
  {
    path: "/herramientas",
    element: <><Herramientas /></>
  },
  {
    path: "/entradaAlmacen",
    element: <><Registro_almacen /><Animacion_cuadros /></>
  },
  {
    path: "/salidaAlmacen",
    element: <><Registro_salida_insumo/><Animacion_cuadros/></>
  },
  {
    path: "/registroReparacion",
    element: <><Historial_reparaciones /><Animacion_cuadros /></>
  },
  {
    path: "/actualizarMaquina",
    element: <><Actualizar_maquina /><Animacion_cuadros /></>
  },
  {
    path: "/actualizarTipoMaquina",
    element: <><Actualizar_tipo_maquina/><Animacion_cuadros /></>
  },
  {
    path: "/actualizarFicha",
    element: <><Actualizar_estado_ficha/><Animacion_cuadros/></>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
