import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSena from '../../img/OIG3.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SelectItem, Select, Pagination } from "@nextui-org/react";
import axios from 'axios';
import './Informes.css'
import { Orden_trabajo_modal } from './Orden_trabajo_modal';
import menu from '../../img/menu.png'
import { format } from "date-fns";
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'


export const Informes = () => {
    const [ordenesTrabajo, setOrdenesTrabajo] = useState([]);
    const [ordenTrabajo, setOrdenTrabajo] = useState([]);
    const [insumosUtilizados, setInsumosUtilizados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [maquinas, setMaquinas] = useState()
    const { isLoading, setIsLoading } = useLoading();
    const [filters, setFilters] = useState({
        tipoTrabajo: "all",
        tipoMantenimiento: "all",
        tipoSistema: "all",
        maquina: "all",
        encurso: "all"
    });

    // paginador
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 15;

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/getOrdenesTrabajo`)
            .then(datos => {
                setOrdenesTrabajo(datos.data);
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.error('Error al obtener los datos:', error);
            });

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/getMaquinas`)
            .then(datos => {
                setMaquinas(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    // informacion orden de trabajo modal
    const handleInfoOT = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/getOrdenTrabajo`, { id });
            const ot = await response.data
            setOrdenTrabajo(ot);
            setIsLoading(false)
            setModalVisible(true);
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    const handleInfoIU = async (id_orden_de_trabajo) => {
        try {
            setIsLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/getInsumosUtilizados`, { id_orden_de_trabajo });
            const iu = await response.data
            setInsumosUtilizados(iu);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    //filtros informes

    const filterOrdenes = (ordenesTrabajo) => {
        const fechaActual = new Date().toISOString(); // Obtener la fecha actual

        return ordenesTrabajo.filter((orden) => {
            const fechaFin = new Date(orden.fecha_fin_ot).toISOString();
            // Verificar si se aplican los filtros de en curso y la fecha de finalización es posterior a la fecha actual
            if (filters.encurso === "en curso") {
                return (
                    (filters.tipoTrabajo === "all" || orden.tipo_de_trabajo === filters.tipoTrabajo) &&
                    (filters.tipoMantenimiento === "all" || orden.tipo_de_mantenimiento === filters.tipoMantenimiento) &&
                    (filters.tipoSistema === "all" || orden.tipo_de_sistema === filters.tipoSistema) &&
                    (filters.maquina === "all" || orden.nombre_maquina === filters.maquina) &&
                    (fechaFin >= fechaActual)
                );
            } else {
                // Aplicar los filtros sin considerar el estado de en curso
                return (
                    (filters.tipoTrabajo === "all" || orden.tipo_de_trabajo === filters.tipoTrabajo) &&
                    (filters.tipoMantenimiento === "all" || orden.tipo_de_mantenimiento === filters.tipoMantenimiento) &&
                    (filters.tipoSistema === "all" || orden.tipo_de_sistema === filters.tipoSistema) &&
                    (filters.maquina === "all" || orden.nombre_maquina === filters.maquina)
                );
            }
        });
    };

    const handleEstado = (key, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [key]: value
        }));
    };

    const filteredOrdenes = filterOrdenes(ordenesTrabajo);

    // cambiar de pagina

    const totalPaginas = Math.ceil(filteredOrdenes.length / itemsPorPagina);
    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    }
    const startIndex = (paginaActual - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    const paginatedOrdenes = filteredOrdenes.slice(startIndex, endIndex);

    return (
        <div>
            {isLoading ? <Cargando /> : ''}
            <div className="navVertical">
                <Link to={'/MenuPrincipal'}>
                    <div className="principal">
                        <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
                        <h2>SGMI</h2>
                    </div>
                </Link>
                <input type="checkbox" id="navbar-toggle"></input>
                <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>
                <ul className="navList">
                    <li id="activeMaquina">Informes</li>
                    <li>
                        <Link to={"/registroReparacion"}>Reparación</Link>
                    </li>

                    <div className='atrasN-alm'>
                        <Link to={'/MenuPrincipal'} onClick={() => { localStorage.removeItem('formValues') }}>
                            <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                                </svg>
                                <h3 className='text-lg'>Atrás</h3>
                            </div>
                        </Link>
                    </div>
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Informes</h2>
                </div>

                <div className="containerInformes">

                    <div className="filtersUsuarios">
                        <Select className='w-11/12 h-11' placeholder="Máquinas" onChange={(e) => { handleEstado('maquina', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            {maquinas ? maquinas.map(maquina =>
                                <SelectItem key={maquina.nombre_maquina} value={maquina.nombre_maquina}>{maquina.nombre_maquina}</SelectItem>
                            ) : ''}
                        </Select>

                        <Select className='w-11/12 h-11' placeholder="Tipo de trabajo" onChange={(e) => { handleEstado('tipoTrabajo', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='inspeccion' key='inspeccion'>Inspeccion</SelectItem>
                            <SelectItem value='servicio' key='servicio'>Servicio</SelectItem>
                            <SelectItem value='reparacion' key='reparacion'>Reparación</SelectItem>
                            <SelectItem value='modificacion' key='modificacion'>Modificación</SelectItem>
                            <SelectItem value='fabricacion' key='fabricacion'>Fabricación</SelectItem>
                            <SelectItem value='montaje' key='montaje'>Montaje</SelectItem>
                            <SelectItem value='desmontaje' key='desmontaje'>Desmontaje</SelectItem>
                            <SelectItem value='cambio' key='cambio'>Cambio</SelectItem>
                        </Select>

                        <Select className='w-11/12 h-11' placeholder='Tipo de mantenimiento' onChange={(e) => { handleEstado('tipoMantenimiento', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='correctivo no planificado' key='correctivo no planificado'>Correctivo no planificado</SelectItem>
                            <SelectItem value='correctivo palificado' key='correctivo palificado'>Correctivo planificado</SelectItem>
                            <SelectItem value='mantenimiento preventivo' key='mantenimiento preventivo'>Mantenimiento preventivo</SelectItem>
                            <SelectItem value='basado en el tiempo' key='basado en el tiempo'>Basado en el tiempo</SelectItem>
                            <SelectItem value='basado en el uso o contador' key='basado en el uso o contador'>Basado en el uso o contador</SelectItem>
                            <SelectItem value='basado en condicion' key='basado en condicion'>Basado en condición</SelectItem>
                            <SelectItem value='predictivo' key='predictivo'>Predictivo</SelectItem>
                            <SelectItem value='proactivo' key='proactivo'>Proactivo</SelectItem>
                            <SelectItem value='detectivo' key='detectivo'>Detectivo</SelectItem>
                            <SelectItem value='de emergencia' key='de emergencia'>De emergencia</SelectItem>
                            <SelectItem value='autonomo' key='autonomo'>Autonomo</SelectItem>
                            <SelectItem value='de reacondicionamiento' key='de reacondicionamiento'>De reacondicionamiento</SelectItem>
                            <SelectItem value='de reemplazo' key='de reemplazo'>De reemplazo</SelectItem>
                        </Select>

                        <Select className='w-11/12 h-11' placeholder='Tipo de sistema' onChange={(e) => { handleEstado('tipoSistema', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='mecanico' key='mecanico'>Mecánico</SelectItem>
                            <SelectItem value='electrico' key='electrico'>Eléctrico</SelectItem>
                            <SelectItem value='hidraulico' key='hidraulico'>Hidráulico</SelectItem>
                            <SelectItem value='neumatico' key='neumatico'>Neumático</SelectItem>
                            <SelectItem value='de control' key='de control'>De control</SelectItem>
                            <SelectItem value='de refrigeracion' key='de refrigeracion'>De refrigeración</SelectItem>
                            <SelectItem value='de lubricacion' key='de lubricacion'>De lubricación</SelectItem>
                            <SelectItem value='de alimentacion' key='de alimentacion'>De alimentación</SelectItem>
                            <SelectItem value='de seguridad' key='de seguridad'>De seguridad</SelectItem>
                            <SelectItem value='de comunicacion' key='de comunicacion'>De comunicación</SelectItem>
                        </Select>

                        <Select className='w-11/12 h-11' placeholder='En curso' onChange={(e) => { handleEstado('encurso', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='en curso' key='en curso'>En curso</SelectItem>
                        </Select>
                    </div>

                    <Table selectionMode="single">
                        <TableHeader>
                            <TableColumn className='text-lg'>Máquina</TableColumn>
                            <TableColumn className='text-lg'>Tipo de trabajo</TableColumn>
                            <TableColumn className='text-lg'>Tipo de mantenimiento</TableColumn>
                            <TableColumn className='text-lg'>Tipo de sistema</TableColumn>
                            <TableColumn className='text-lg'>Fecha inicio</TableColumn>
                            <TableColumn className='text-lg'>Fecha fin</TableColumn>
                            <TableColumn className='text-lg'>Costo</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No se encontro."}>
                            {paginatedOrdenes.map((orden) => {
                                return (
                                    <TableRow key={orden.id_orden_de_trabajo} onClick={() => { handleInfoOT(orden.id_orden_de_trabajo); handleInfoIU(orden.id_orden_de_trabajo) }} className='cursor-pointer'>
                                        <TableCell className='text-lg'>{orden.nombre_maquina}</TableCell>
                                        <TableCell className='text-lg'>{orden.tipo_de_trabajo}</TableCell>
                                        <TableCell className='text-lg'>{orden.tipo_de_mantenimiento}</TableCell>
                                        <TableCell className='text-lg'>{orden.tipo_de_sistema}</TableCell>
                                        <TableCell className='text-lg'>{format(new Date(orden.fecha_inicio_ot), "dd/MM/yyyy")}</TableCell>
                                        <TableCell className='text-lg'>{format(new Date(orden.fecha_fin_ot), "dd/MM/yyyy")}</TableCell>
                                        <TableCell className='text-lg'>{orden.costo_mantenimiento}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                <div className="paginador">
                    <Pagination showControls total={totalPaginas} initialPage={paginaActual} onChange={cambiarPagina} color="default" />
                </div>
            </div>

            {modalVisible && (
                <Orden_trabajo_modal ordenTrabajo={ordenTrabajo} insumosUtilizados={insumosUtilizados} />
            )}

        </div>
    )
}
