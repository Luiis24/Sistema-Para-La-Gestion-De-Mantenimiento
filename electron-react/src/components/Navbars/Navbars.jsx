import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './navbars.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import { useAuth } from '../../estados/usuario';
import menu from '../../img/menu.png'

export const Navbars = () => {

  const [maquinas, setMaquinas] = useState([]);
  const [tipoMaquina, setTipoMaquina] = useState([])
  const [maquinasPorTipo, setMaquinasPorTipo] = useState({});

  const [tipoMSeleccionada, setTipoMSeleccionada] = useState();
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState();

  const { rol } = useAuth();

  // Traer maquinas y tipos de maquinas al navbar

  useEffect(() => {
    axios.get('http://localhost:4002/getMaquinas')
      .then(datos => {
        setMaquinas(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de máquinas:', error);
      });

    axios.get('http://localhost:4002/tipoMaquinas')
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
      <div className="navVertical">
        <Link to={'/MenuPrincipal'} className='w-fit md:w-full'>
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
                        <a href={`/checklistMaquina/${maquina.id_maquina}`} onClick={() => { selectMaquina(maquina.id_maquina) }}><h3 className='text-xl'>{maquina.nombre_maquina}</h3></a>
                      </div>
                    )
                  }) : <p className='p-4 text-sm text-gray-500'>No hay máquinas para este tipo</p>}

                </div>
              </div>
            }) : <p>No hay tipos de máquinas disponibles</p>}

          </div>
          {rol === 'Instructor' ? <div className="adminMaquina">
            <p className='text-sm text-gray-600 pl-4 font-semibold'>Admin tools</p>
            <Link to={'/crearTipoMaquina'}>
              <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
                <h3 className='text-lg'>Tipo maquina</h3>
              </div>
            </Link>
            <Link to={'/crearMaquina'}>
              <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
                <h3 className='text-lg'>Maquina</h3>
              </div>
            </Link>
            {/* <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
            <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clipRule="evenodd" />
            </svg>
            <h3 className='text-lg text-gray-600 '>Maquinas</h3>
          </div> */}
          </div> : ''}

          <div className='atrasN'>
            <Link to={'/MenuPrincipal'}>
              <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                </svg>
                <h3 className='text-lg'>Atras</h3>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
