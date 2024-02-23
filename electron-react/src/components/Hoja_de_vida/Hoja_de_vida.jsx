import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbars } from '../Navbars/Navbars'
import axios from 'axios'

export const Hoja_de_vida = () => {
    const { id_maquina } = useParams();
    const [maquinaid, setMaquinaid] = useState();

    const [descripcionEquipo, setDescripcionEquipo] = useState([]);
    const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);
    const [caracteristicasMotor, setCaracteristicasMotor] = useState([]);
    const [historialReparaciones, setHistorialReparaciones] = useState([]);



    useEffect(() => {

        const handleMaquinaSelect = async () => {
            try {
                // Obtener la descripción del equipo por id_maquina
                const descripcionEquipoData = await axios.get(`http://localhost:4002/getDescripcionEquipoById/${id_maquina}`);
                setDescripcionEquipo(descripcionEquipoData.data);
                console.log('Descripción del Equipo:', descripcionEquipoData.data);

                // Obtener las características de la máquina por id_maquina
                const caracteristicasMaquinaData = await axios.get(`http://localhost:4002/getCaracteristicasMaquinaById/${id_maquina}`);
                setCaracteristicasMaquina(caracteristicasMaquinaData.data);
                console.log('Características de la Máquina:', caracteristicasMaquinaData.data);

                // Obtener las características del motor por id_maquina
                const caracteristicasMotorData = await axios.get(`http://localhost:4002/getCaracteristicasMotorById/${id_maquina}`);
                setCaracteristicasMotor(caracteristicasMotorData.data);
                console.log('Características del Motor:', caracteristicasMotorData.data);

                // Obtener el historial de reparaciones por id_maquina
                const historialReparacionesData = await axios.get(`http://localhost:4002/getHistorialReparacionesById/${id_maquina}`);
                setHistorialReparaciones(historialReparacionesData.data);
                console.log('Historial de Reparaciones:', historialReparacionesData.data);
            } catch (error) {
                console.error('Error al obtener la información de la máquina seleccionada', error);
            }
        };

        handleMaquinaSelect()
    }, [id_maquina]);

    useEffect(() => {
        axios
            .get(`http://localhost:4002/HojaVida/${id_maquina}`)
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
            <Navbars></Navbars>
            <div className="containerM">

                <div className="navHorizontal">
                    <Link to={`/checklistMaquina/${id_maquina}`}>
                        <h2>CheckList
                            <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6" />
                            </svg>
                        </h2>
                    </Link>
                    <Link to={`/OrdenDeTrabajo/${id_maquina}`}>
                        <h2>Orden de trabajo
                            <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                            </svg>
                        </h2>
                    </Link>
                    <h2 id='active'>Hoja de vida
                        <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd" />
                        </svg>
                    </h2>
                </div>

                <div className="crearCM">


                    <div className="nombreSistema">
                        <h2>Hoja de vida {maquinaid ? maquinaid.nombre_maquina : ''}</h2>
                    </div>

                    <hr />

                    {/* Información de la máquina seleccionada */}
                    {descripcionEquipo.length > 0 && (
                        <div>
                            <h2>Descripción del Equipo</h2>
                            {descripcionEquipo.map((item, index) => (
                                <div key={index}>
                                    <p>Nombre: {item.nombre_equipo}</p>
                                    <p>Marca: {item.marca_equipo}</p>
                                    {/* Agrega más campos según sea necesario */}
                                </div>
                            ))}
                        </div>
                    )}

                    {caracteristicasMaquina.length > 0 && (
                        <div>
                            <h2>Características de la Máquina</h2>
                            {caracteristicasMaquina.map((item, index) => (
                                <div key={index}>
                                    <p>Descripción: {item.descripcion_caracteristica}</p>
                                    {/* Agrega más campos según sea necesario */}
                                </div>
                            ))}
                        </div>
                    )}

                    {caracteristicasMotor.length > 0 && (
                        <div>
                            <h2>Características del Motor</h2>
                            {caracteristicasMotor.map((item, index) => (
                                <div key={index}>
                                    <p>Marca: {item.marca_motor}</p>
                                    {/* Agrega más campos según sea necesario */}
                                </div>
                            ))}
                        </div>
                    )}

                    {historialReparaciones.length > 0 && (
                        <div>
                            <h2>Historial de Reparaciones</h2>
                            {historialReparaciones.map((item, index) => (
                                <div key={index}>
                                    <p>Procedimiento: {item.procedimiento_historial}</p>
                                    {/* Agrega más campos según sea necesario */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
