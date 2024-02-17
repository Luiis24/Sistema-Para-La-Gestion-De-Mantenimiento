import React, { useState, useEffect } from 'react'
import './Checklist_maquina.css'
import { Link, useParams } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'
import { Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';
import { Navbars } from '../Navbars/Navbars'

export const Checklist_maquina = () => {

    const [componentes, setComponentes] = useState([]);
    const [sistema, setSistema] = useState([])
    const [maquinaid, setMaquinaid] = useState();
    const { id_maquina } = useParams();
    useEffect(() => {
        axios.get('http://localhost:4002/componenteChecklist')
            .then(datos => {
                setComponentes(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

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

    // const ordenarSisetma = () => {
    //     setSistema(componentes.filter((componente) => componente.tipo_componente = componente[0]))
    // }

    // console.log(setSistema)

    return (
        <div>
            <Navbars />

            <div className="containerM">

                <div className="navHorizontal">

                    <h2 id='active'>CheckList
                        <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6" />
                        </svg>
                    </h2>
                    <h2><Link to={`/OrdenDeTrabajo/${id_maquina}`}>Orden de trabajo</Link>
                        <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                        </svg>
                    </h2>
                    <h2><Link to={`/hojaVida/${id_maquina}`}>Hoja de vida</Link>
                        <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd" />
                        </svg>

                    </h2>
                </div>

                <form action="" name='checklist'>
                    <div className="componentesChecklist">
                        <div className="nombreSistema">
                            <h2>Sistema Electrico {maquinaid ? maquinaid.nombre_maquina : ''}</h2>
                        </div>

                        <div className="containerComponentes">
                            {componentes.map(componente => {
                                return <div className="nombreComponente">
                                    <label>{componente.nombre_componente}</label>
                                    <Select placeholder="Estado" className="2xl:w-72 w-64" name={componente.nombre_componente}>
                                        <SelectItem value="bueno">Bueno</SelectItem>
                                        <SelectItem value="malo">Malo</SelectItem>
                                        <SelectItem value="notificar">Notificar</SelectItem>
                                        <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                                        <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                                    </Select>
                                </div>
                            })}
                            <div className="nombreComponente">
                                <label>Interruptores Principales</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Acometida del equipo</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Hongo para emergencia</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                        </div>

                        <div className="nombreSistema">
                            <h2>Sistema Lubricacion</h2>
                        </div>

                        <div className="containerComponentes">
                            <div className="nombreComponente">
                                <label>Nivel de aceite en caja de velocidades</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                                    <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Nivel de aceite en caja de avance</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                                    <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Bancadas y guias lubricadas</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                        </div>

                        <div className="nombreSistema">
                            <h2>Componentes Electricos</h2>
                        </div>

                        <div className="containerComponentes">
                            <div className="nombreComponente">
                                <label>Luz Piloto</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                                    <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Motor de caja de velocidades</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                                    <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Lampara del torno</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Estado del horometro</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                            <div className="nombreComponente">
                                <label>Interruptor de la bomba de lubricacion</label>
                                <Select placeholder="Estado" className="2xl:w-72 w-64" >
                                    <SelectItem value="bueno">Bueno</SelectItem>
                                    <SelectItem value="malo">Malo</SelectItem>
                                    <SelectItem value="notificar">Notificar</SelectItem>
                                </Select>
                            </div>
                        </div>

                        <div className="containerComponentes">
                            <button className='rgCheckList'>Registrar</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
