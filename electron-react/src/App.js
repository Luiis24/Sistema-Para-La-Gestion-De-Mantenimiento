import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Torno } from './components/Torno/Torno';
import { Checklist_maquina } from './components/Checklist_maquina/Checklist_maquina';
import { Orden_trabajo_maquina } from './components/Orden_trabajo_maquina/Orden_trabajo_maquina';
import { Menu_principal } from './components/Menu_principal/Menu_principal'
import { Aprendices } from './components/Aprendices/Aprendices';
import { Almacen } from './components/Almacen/Almacen';
import { Nueva_entrada_almacen } from './components/Nueva_entrada_almacen/Nueva_entrada_almacen';
import { Nueva_salida_almacen } from './components/Nueva_salida_almacen/Nueva_salida_almacen';
import { Cnc } from './components/Cnc/Cnc';
import { Notificaciones } from './components/Notificaciones/Notificaciones';
import { Fresadora } from './components/Fresadora/Fresadora';
import {Titulo_sena_cb} from './components/Titulo_sena_cb/Titulo_sena_cb';
import {Animacion_cuadros} from './components/Animacion_cuadros/Animacion_cuadros';
import {Registro_aprendiz} from './components/Registro_aprendiz/Registro_aprendiz'
import './components/Navbars/navbars.css'
import { Inicio_sesion_instructor } from './components/Inicio_sesion_instructor/Inicio_sesion_instructor';
import {Inicio_sesion_aprendiz} from './components/Inicio_sesion_aprendiz/Inicio_sesion_aprendiz'
import { Navbars } from './components/Navbars/Navbars';
import {Check_list} from './components/HojaInspeccion/HojaInspeccion'
import { Hoja_de_vida } from './components/Hoja_de_vida/Hoja_de_vida';
import CrearTipoMaquina from './components/Crear_tipo_maquina/Crear_tipo_maquina';
import { Crear_maquina } from './components/Crear_maquina/Crear_maquina';
import { Menu } from './components/Menu/Menu';
import { Informes } from './components/Informes/Informes';
import { Instructores } from './components/Instructores/Instructores';
import { Registro_instructor } from './components/Registro_instructor/Registro_instructor';

const router = createBrowserRouter ([
  {
    path:"/MenuPrincipal",
    element: <><Menu/></>
  },
  {
    path:"/registerInstructor",
    element: <><Titulo_sena_cb/><Inicio_sesion_instructor/><Animacion_cuadros/></>
  },
  {
    path:"/",
    element: <><Titulo_sena_cb/><Inicio_sesion_aprendiz/><Animacion_cuadros/></>
  },
  {
    path:"/tornos",
    element: <><Navbars/><Torno/></>
  },
  {
    path:"/checklistMaquina/:id_maquina",
    element: <Checklist_maquina/>
  },
  {
    path:"/OrdenDeTrabajo/:id_maquina",
    element: <><Navbars/><Orden_trabajo_maquina/></>
  },
  {
    path:"/hojaVida/:id_maquina",
    element: <><Hoja_de_vida/></>
  },
  {
    path:"/cnc",
    element: <><Cnc/></>
  },
  {
    path:"/fresadoras",
    element: <><Fresadora/></>
  },
  {
    path:"/almacen",
    element: <><Almacen/></>
  },
  {
    path:"/entradaAlmacen",
    element: <><Nueva_entrada_almacen/></>
  },
  {
    path:"/salidaAlmacen",
    element: <><Nueva_salida_almacen/></>
  },
  {
    path:"/aprendices",
    element: <><Aprendices/></>
  },
  {
    path:"/notificaciones",
    element: <><Notificaciones/></>
  },
  {
    path:"/registroAprendiz",
    element: <><Registro_aprendiz/><Animacion_cuadros/></>
  }, 
  {
    path:"/hojaInspeccion",
    element: <><Check_list/></>
  },
  {
    path:"/crearTipoMaquina",
    element: <><CrearTipoMaquina/><Animacion_cuadros/></>
  },
  {
    path:"/crearMaquina",
    element: <><Crear_maquina/><Animacion_cuadros/></>
  },
  {
    path:"/informes",
    element: <><Informes/></>
  },
  {
    path:"/instructores",
    element: <><Instructores/></>
  },
  {
    path:"/Registroinstructores",
    element: <><Registro_instructor/></>
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
