import React, { useState, useEffect } from 'react'
import './Checklist_maquina.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import { Navbars } from '../Navbars/Navbars'
import { HojaInspeccion } from '../HojaInspeccion/HojaInspeccion';
import { Componentes_check } from '../Componentes_check/Componentes_check'
import { Check_list } from '../Check_list/Check_list';
import { useAuth } from '../../estados/usuario';

export const Checklist_maquina = () => {
    const [maquinaid, setMaquinaid] = useState();
    const { id_maquina } = useParams();
    const { programaFormacion } = useAuth();


    useEffect(() => {
        axios
            .get(`http://localhost:4002/checklist/${id_maquina}`)
            .then((datos) => {
                const maquina = datos.data;
                setMaquinaid(maquina);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, [id_maquina]);

    return (
        <div>
            <Navbars />

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'><p className='hidden md:flex'>CheckList</p>
                        <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6" />
                        </svg>
                    </h2>
                    {programaFormacion === 'Técnico de mecanizado' ?
                        <a className='cursor-not-allowed'>
                            <h2><p className='hidden md:flex'>Orden de trabajo</p>
                                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                                </svg>
                            </h2>
                        </a> :
                        <Link to={`/OrdenDeTrabajo/${id_maquina}`}>
                            <h2><p className='hidden md:flex'>Orden de trabajo</p>
                                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                                </svg>
                            </h2>
                        </Link>
                    }

                    <Link to={`/hojaVida/${id_maquina}`}>
                        <h2><p className='hidden md:flex'>Hoja de vida</p>
                            <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd" />
                            </svg>
                        </h2>
                    </Link>
                </div>

                <form action="" name='checklist'>
                    <div className="componentesChecklist">

                        <div className="nombreSistema">
                            <h2>Checklist {maquinaid ? maquinaid.nombre_maquina : ''}</h2>
                        </div>


                        {/* <HojaInspeccion/>
                            // <Componentes_check/> */}
                        <HojaInspeccion />
                        <Check_list />



                    </div>
                </form>
            </div>
        </div>
    )
}
