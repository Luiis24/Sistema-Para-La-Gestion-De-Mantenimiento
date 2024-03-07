import React, { useState, useEffect } from 'react'
import './Checklist_maquina.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import { Navbars } from '../Navbars/Navbars'
import { Check_list } from '../Check_list/Check_list';
import { useAuth } from '../../estados/usuario';
import { Estado_componentes } from '../Estado_componentes/Estado_componentes';

export const Checklist_maquina = () => {
    const [maquinaid, setMaquinaid] = useState();
    const { id_maquina } = useParams();
    const { programaFormacion } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/checklist/${id_maquina}`)
            .then((datos) => {
                const maquina = datos.data;
                setMaquinaid(maquina);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, [id_maquina]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <div>
            <Navbars />

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'><p className='hidden md:flex'>CheckList</p>
                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6" />
                        </svg>
                    </h2>
                    <Link to={`/OrdenDeTrabajo/${id_maquina}`}>
                        <h2><p className='hidden md:flex'>Orden de trabajo</p>
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                            </svg>
                        </h2>
                    </Link>

                    <Link to={`/hojaVida/${id_maquina}`}>
                        <h2><p className='hidden md:flex'>Hoja de vida</p>
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                            </svg>
                        </h2>
                    </Link>
                </div>


                <div className="componentesChecklist">

                    <div className="nombreSistema">
                        <h2>Checklist {maquinaid ? maquinaid.nombre_maquina : ''}</h2>
                    </div>

                    <Check_list id_maquina={id_maquina} />

                    <div className="button-HR">
                        <button onClick={openModal}>
                            Historial
                        </button>
                    </div>
                    <Estado_componentes id_maquina={id_maquina} modalVisible={modalVisible} onClose={closeModal} />

                </div>
            </div>
        </div>
    )
}