import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './navbars.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/OIG3.png'
import { useAuth } from '../../estados/usuario';
import menu from '../../img/menu.png'
import { useLoading } from '../../estados/spinner'
import { Cargando } from '../Cargando/Cargando'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export const Navbars = () => {

  const [maquinas, setMaquinas] = useState([]);
  const [tipoMaquina, setTipoMaquina] = useState([])
  const [maquinasPorTipo, setMaquinasPorTipo] = useState({});

  const [tipoMSeleccionada, setTipoMSeleccionada] = useState();
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState();

  const { rol } = useAuth();
  const { isLoading, setIsLoading } = useLoading();

  // Traer maquinas y tipos de maquinas al navbar

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/getMaquinas`)
      .then(datos => {
        setMaquinas(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de máquinas:', error);
      });

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tipoMaquinas`)
      .then(datos => {
        setTipoMaquina(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de tipos de máquinas:', error);
      });
  }, []);

  // Separar maquinas por tipo de maquina

  useEffect(() => {
    const maquinasPorTipo = {};
    maquinas.forEach(maquina => {
      if (!maquinasPorTipo[maquina.id_tipo_maquina]) {
        maquinasPorTipo[maquina.id_tipo_maquina] = [];
      }
      maquinasPorTipo[maquina.id_tipo_maquina].push(maquina);
    });
    setMaquinasPorTipo(maquinasPorTipo);
    setIsLoading(false)
  }, [maquinas]);


  // estilos tipo de maquina y maquinas seleccionadas

  const selectTipoMaquina = (id) => {
    if (tipoMSeleccionada === id) {
      setTipoMSeleccionada(null); // Si es el mismo tipo, oculta
    } else {
      setTipoMSeleccionada(id); // Si es un tipo diferente, muestra
    }
    localStorage.setItem('tipoMSeleccionada', id);
  };

  const selectMaquina = (id) => {
    setMaquinaSeleccionada(id);
    localStorage.setItem('maquinaSeleccionada', id);
  };

  useEffect(() => {
    const storedTipoMSeleccionada = localStorage.getItem('tipoMSeleccionada');
    if (storedTipoMSeleccionada) {
      setTipoMSeleccionada(storedTipoMSeleccionada);
    }

    const storedMaquinaSeleccionada = localStorage.getItem('maquinaSeleccionada');
    if (storedMaquinaSeleccionada) {
      setMaquinaSeleccionada(storedMaquinaSeleccionada);
    }
  }, []);

  return (
    <div>
      {isLoading ? <Cargando /> : ''}
      <div className="navVertical">
        <Link to={'/MenuPrincipal'} className='w-fit md:w-full' onClick={() => { localStorage.removeItem('formValues') }}>
          <div className="principal">
            <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
            <h2>SGMI</h2>
          </div>
        </Link>
        <input type="checkbox" id="navbar-toggle"></input>
        <label htmlFor="navbar-toggle" className="menu-responsive cursor-pointer"><img className='menuR' src={menu} alt='menu'></img></label>
        <div className="containerSectionN">
          <div className="listMaquinas">
            <p className='text-sm text-gray-600 pl-4 font-semibold'><Link to={'/tornos'}>Maquinas</Link></p>

            {tipoMaquina ? tipoMaquina.map(tipoM => {
              return <div className="tipoMaquina" key={tipoM.id_tipo_maquina}>
                <div id={tipoM.id_tipo_maquina} className={`tipoMaquinaN hover:text-gray-200 focus:bg-gray-200 ${tipoMSeleccionada === tipoM.id_tipo_maquina ? 'activeMaquina' : ''}`} onClick={() => { selectTipoMaquina(tipoM.id_tipo_maquina) }}>
                  <h3 className='text-2xl'>{tipoM.nombre_tipo_maquina}</h3>
                  <svg className="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                  </svg>
                </div>

                <div className={`listMaquinasN ${tipoMSeleccionada === tipoM.id_tipo_maquina ? '' : 'hidden'}`} id={tipoM.id_tipo_maquina}>

                  {maquinasPorTipo[tipoM.id_tipo_maquina] ? maquinasPorTipo[tipoM.id_tipo_maquina].map(maquina => {
                    return (
                      <div className={`maquinaN ${maquinaSeleccionada === maquina.id_maquina ? 'activeMaquina' : ''}`} key={maquina.id_maquina} id={maquina.id_maquina}>
                        <a href={`/checklistMaquina/${maquina.id_maquina}`} onClick={() => { selectMaquina(maquina.id_maquina); localStorage.removeItem('formValues') }}><h3 className='text-xl'>{maquina.nombre_maquina}</h3></a>
                      </div>
                    )
                  }) : <p className='p-4 text-sm text-gray-500'>No hay máquinas para este tipo</p>}

                </div>
              </div>
            }) : <p>No hay tipos de máquinas disponibles</p>}

          </div>
          {rol === 'Instructor' ? <div className="adminMaquina atrasN-alm">
            <p className='text-sm text-gray-600 pl-4 font-semibold'>Admin tools</p>
            <Dropdown>
              <DropdownTrigger>
                <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                  <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                  </svg>

                  <h3 className='text-lg'>Tipo máquina</h3>
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem><Link to={'/crearTipoMaquina'}><div className="text-small font-bold">Agregar</div></Link></DropdownItem>
                <DropdownItem><Link to={'/actualizarTipoMaquina'}><div className="text-small font-bold">Editar</div></Link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                  <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                  </svg>

                  <h3 className='text-lg'>Máquina</h3>
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem><Link to={'/crearMaquina'}><div className="text-small font-bold">Agregar</div></Link></DropdownItem>
                <DropdownItem><Link to={'/actualizarMaquina'}><div className="text-small font-bold">Editar</div></Link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div>
              <Link to={'/MenuPrincipal'} onClick={() => { localStorage.removeItem('formValues') }}>
                <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                  <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                  </svg>
                  <h3 className='text-lg'>Atrás</h3>
                </div>
              </Link>
            </div>
          </div> :
            <div>
              <hr/>
              <Link to={'/MenuPrincipal'} onClick={() => { localStorage.removeItem('formValues') }}>
                <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                  <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                  </svg>
                  <h3 className='text-lg'>Atras</h3>
                </div>
              </Link>
            </div>
          }



        </div>
      </div>
    </div>
  )
}
