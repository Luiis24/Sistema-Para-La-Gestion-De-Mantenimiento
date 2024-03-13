import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbars } from '../Navbars/Navbars'
import './Hoja_de_vida.css'
import axios from 'axios'
import { format } from "date-fns";
import { Input, Textarea, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from '@nextui-org/react'
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Hoja_de_vida = () => {
    const { id_maquina } = useParams();
    const [maquinaid, setMaquinaid] = useState();

    const [descripcionEquipo, setDescripcionEquipo] = useState([]);
    const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);
    const [caracteristicasMotor, setCaracteristicasMotor] = useState([]);
    const [historialReparaciones, setHistorialReparaciones] = useState([]);
    const {isLoading, setIsLoading} = useLoading();



    useEffect(() => {

        const handleMaquinaSelect = async () => {
            try {
                setIsLoading(true)
                // Obtener la descripción del equipo por id_maquina
                const descripcionEquipoData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getDescripcionEquipoById/${id_maquina}`);
                setDescripcionEquipo(descripcionEquipoData.data);
                // console.log('Descripción del Equipo:', descripcionEquipoData.data);

                // Obtener las características de la máquina por id_maquina
                const caracteristicasMaquinaData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getCaracteristicasMaquinaById/${id_maquina}`);
                setCaracteristicasMaquina(caracteristicasMaquinaData.data);
                // console.log('Características de la Máquina:', caracteristicasMaquinaData.data);

                // Obtener las características del motor por id_maquina
                const caracteristicasMotorData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getCaracteristicasMotorById/${id_maquina}`);
                setCaracteristicasMotor(caracteristicasMotorData.data);
                // console.log('Características del Motor:', caracteristicasMotorData.data);

                // Obtener el historial de reparaciones por id_maquina
                const historialReparacionesData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getHistorialReparacionesById/${id_maquina}`);
                setHistorialReparaciones(historialReparacionesData.data);
                // console.log('Historial de Reparaciones:', historialReparacionesData.data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error('Error al obtener la información de la máquina seleccionada', error);
            }
        };

        handleMaquinaSelect()
    }, [id_maquina]);

    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/HojaVida/${id_maquina}`)
            .then((datos) => {
                const maquina = datos.data;
                setMaquinaid(maquina);
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error("Error al obtener los datos:", error);
            });
    }, [id_maquina]);

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const año = date.getFullYear();
        return `${dia}/${mes}/${año}`;
      };

    return (
        <div>
            <Navbars></Navbars>
            {isLoading ? <Cargando/> : ''}
            <div className="containerM">

                <div className="navHorizontal">
                    <Link to={`/checklistMaquina/${id_maquina}`}>
                        <h2><p className='hidden md:flex'>CheckList</p>
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6" />
                            </svg>
                        </h2>
                    </Link>
                    <Link to={`/OrdenDeTrabajo/${id_maquina}`}>
                        <h2><p className='hidden md:flex'>Orden de trabajo</p>
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                            </svg>
                        </h2>
                    </Link>
                    <h2 id='active'><p className='hidden md:flex'>Hoja de vida</p>
                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                        </svg>
                    </h2>
                </div>

                <div className="crearCM">


                    {/* Información de la máquina seleccionada */}
                    {descripcionEquipo.length > 0 && (
                        <div>
                            {descripcionEquipo.map((item, index) => (
                                <div key={index}>
                                    <div className="tituloSeccionOT">
                                        <h2>Descripción del equipo</h2>
                                    </div>
                                    <hr />
                                    <div className="containerHv">
                                        <div className="sectionHv">
                                            <div className="valueHv">
                                                <label htmlFor="Nombre-hv">Nombre</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11 font-semibold"
                                                    name="Nombre-hv"
                                                    placeholder={item.nombre_equipo}
                                                    isReadOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Marca-hv">Marca</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Marca-hv"
                                                    placeholder={item.marca_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Frecuencia-hv">Año de fabricación</label>
                                                <Input
                                                    type="Text"
                                                    className="w-11/12 h-11"
                                                    name="Frecuencia-hv"
                                                    placeholder={format(new Date(item.fecha_fabricacion_equipo), "dd/MM/yyyy")}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Fabricante-hv">Fabricante</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Fabricante-hv"
                                                    placeholder={item.fabricante_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Ubicación-hv">Ubicación</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Ubicación-hv"
                                                    placeholder={item.ubicacion_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                        </div>
                                        <div className="sectionHv">
                                            <div className="valueHv">
                                                <label htmlFor="Características-hv">Características</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Características-hv"
                                                    placeholder={item.caracteristicas_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Código-hv">Código</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Código-hv"
                                                    placeholder={item.codigo_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Modelo-hv">Modelo</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Modelo-hv"
                                                    placeholder={item.modelo_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-mecánico-hv">Número de serie</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Sistema-mecánico-hv"
                                                    placeholder={item.num_serie_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Prioridad-hv">Prioridad</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Prioridad-hv"
                                                    placeholder={item.prioridad_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                    {/*Descripción técnica*/}
                                    <div className="tituloSeccionOT">
                                        <h2>Descripción técnica</h2>
                                    </div>
                                    <hr />
                                    <div className="containerHv">
                                        <div className="sectionHv">
                                            <div className="valueHv">
                                                <label htmlFor="Voltaje-hv">Voltaje</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Voltaje-hv"
                                                    placeholder={item.voltaje_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Corriente-hv">Corriente</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Corriente-hv"
                                                    placeholder={item.corriente_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Frecuencia-hv">Frecuencia</label>
                                                <Input
                                                    type="Text"
                                                    className="w-11/12 h-11"
                                                    name="Frecuencia-hv"
                                                    placeholder={item.frecuencia_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Capacidad-hv">Capacidad</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Capacidad-hv"
                                                    placeholder={item.capacidad_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Peso-hv">Peso</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Peso-hv"
                                                    placeholder={item.peso_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Alimentación-hv">Alimentación</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Alimentación-hv"
                                                    placeholder={item.alimentacion_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                        </div>

                                        <div className="sectionHv">
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-eléctrico-hv">Sistema eléctrico</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    placeholder={item.sistema_electrico_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-electrónico-hv">
                                                    Sistema electrónico
                                                </label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Sistema-electrónico-hv"
                                                    placeholder={item.sistema_electronico_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-mecánico-hv">Sistema mecánico</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Sistema-mecánico-hv"
                                                    placeholder={item.sistema_mecanico_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-neumático-hv">Sistema neumático</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Sistema-neumático-hv"
                                                    placeholder={item.sistema_neumatico_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-hidráulico-hv">Sistema hidráulico</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11"
                                                    name="Sistema-hidráulico-hv"
                                                    placeholder={item.sistema_hidraulico_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                            <div className="valueHv">
                                                <label htmlFor="Sistema-térmico-hv">Sistema térmico</label>
                                                <Input
                                                    type="text"
                                                    className="w-11/12 h-11 cursor-default"
                                                    name="Sistema térmico-hv"
                                                    placeholder={item.sistema_termico_equipo}
                                                    readOnly
                                                ></Input>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}

                    {caracteristicasMaquina.length > 0 && (
                        <div>
                            <div className="tituloSeccionOT">
                                <h2>Datos del equipo - Características</h2>
                            </div>
                            <hr/>
                            <div className="container-table-hv">
                                <Table className='w-full'>
                                    <TableHeader>
                                        <TableColumn className='text-lg'>Nombre</TableColumn>
                                        <TableColumn className='text-lg'>Descripción</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {caracteristicasMaquina.map((caracteristica) => (

                                            <TableRow key={caracteristica.id_caracteristicas_maquina}>
                                                <TableCell className='text-lg'> {caracteristica.nombre_caracteristica}</TableCell>
                                                <TableCell className='text-lg'> {caracteristica.descripcion_caracteristica}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <hr />
                            <div className="tituloSeccionOT">
                                <h2>Función del equipo</h2>
                            </div>
                            <hr />
                            <div className="containerDOT">
                                <Textarea
                                    placeholder={caracteristicasMaquina[0].funcion_maquina}
                                    className="col-span-8 md:col-span-6 mb-6 md:mb-0"
                                    name="descripcion_de_trabajo"
                                    readOnly
                                />
                            </div>
                            <hr />
                        </div>
                    )}



                    {caracteristicasMotor.length > 0 && (
                        <div>
                            <div className="tituloSeccionOT">
                                <h2>Características de los motores</h2>
                            </div>
                            <hr />
                            {caracteristicasMotor.map((item, index) => (
                                <div className="containerHv" key={index}>
                                    <div className="sectionHv">

                                        <div className="valueHv">
                                            <label>Marca del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.marca_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>Modelo del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.modelo_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>Descripción del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.descripcion_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>Serie del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.serie_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>Tamaño del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.tamaño_motor}
                                            />
                                        </div>
                                    </div>
                                    <div className="sectionHv">
                                        <div className="valueHv">
                                            <label>Potencia del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.potencia_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>RPM del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.rpm_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>Voltaje del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.voltaje_motor}
                                            />
                                        </div>
                                        <div className="valueHv">
                                            <label>AMP del motor:</label>
                                            <Input
                                                readOnly
                                                type="text"
                                                placeholder={item.amp_motor}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {historialReparaciones.length > 0 && (
                        <div>
                            <hr/>
                            <div className="tituloSeccionOT">
                                <h2>Historial de reparaciones</h2>
                            </div>
                            <hr/>
                            <div className="container-table-hv">
                                <Table>
                                    <TableHeader>
                                        <TableColumn className="text-lg">Procedimiento</TableColumn>
                                        <TableColumn className="text-lg">
                                            Repuestos involucrados
                                        </TableColumn>
                                        <TableColumn className="text-lg">Observaciones</TableColumn>
                                        <TableColumn className="text-lg">Fecha</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {historialReparaciones.map((registro) => (
                                            <TableRow key={registro.id_registro}>
                                                <TableCell className="text-lg">
                                                    {" "}
                                                    {registro.procedimiento_historial}
                                                </TableCell>
                                                <TableCell className="text-lg">
                                                    {registro.insumos_usados_historial}
                                                </TableCell>
                                                <TableCell className="text-lg">
                                                    {registro.observaciones_historial}
                                                </TableCell>
                                                <TableCell className="text-lg">
                                                    {formatFecha(registro.fecha_historial)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
