import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SelectItem, Select } from "@nextui-org/react";
import axios from 'axios';
import './Informes.css'
import { Orden_trabajo_modal } from './Orden_trabajo_modal';
import menu from '../../img/menu.png'
import { format } from "date-fns";

export const Informes = () => {
    const [ordenesTrabajo, setOrdenesTrabajo] = useState([]);
    const [ordenTrabajo, setOrdenTrabajo] = useState([]);
    const [insumosUtilizados, setInsumosUtilizados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoTrabajo, setTipoTrabajo] = useState()
    const [tipoMantenimiento, setTipoMantenimiento] = useState()
    const [tipoSistema, setTipoSistema] = useState()
    const [filters, setFilters] = useState({
        tipoTrabajo: "all",
        tipoMantenimiento: "all",
        tipoSistema:"all"
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/getOrdenesTrabajo`)
            .then(datos => {
                setOrdenesTrabajo(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    // informacion orden de trabajo modal
    const handleInfoOT = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/getOrdenTrabajo`, { id });
            const ot = await response.data
            setOrdenTrabajo(ot);
            setModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInfoIU = async (id_orden_de_trabajo) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/getInsumosUtilizados`, { id_orden_de_trabajo });
            const iu = await response.data
            setInsumosUtilizados(iu);
        } catch (error) {
            console.log(error);
        }
    }

    //filtros informes
    const filterOrdenes = (ordenesTrabajo) => {
        return ordenesTrabajo.filter((orden) => {
            return (
                (filters.tipoTrabajo === "all" ||
                    orden.tipo_de_trabajo === filters.tipoTrabajo) &&
                (filters.tipoMantenimiento === "all" ||
                    orden.tipo_de_mantenimiento === filters.tipoMantenimiento) &&
                (filters.tipoSistema === "all" ||
                    orden.tipo_de_sistema === filters.tipoSistema)
            );
        });
    };

    const handleEstado = (key, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [key]: value
        }));
    };

    const filteredOrdenes = filterOrdenes(ordenesTrabajo);

    return (
        <div>
            <div className="navVertical">
                <Link to={'/MenuPrincipal'}>
                    <div className="principal">
                        <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
                        <h2>Principal</h2>
                    </div>
                </Link>
                <input type="checkbox" id="navbar-toggle"></input>
                <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>
                <ul className="navList">
                    <li id="activeMaquina">Informes</li>
                    <li>
                        <Link to={"/registroReparacion"}>Reparacion</Link>
                    </li>
                    <div className='atrasN'>
                        <Link to={'/MenuPrincipal'}>
                            <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
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
                        <Select className='w-11/12 h-11' placeholder="Tipo de trabajo" onChange={(e) => { setTipoTrabajo(e.target.value); handleEstado('tipoTrabajo', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='inspeccion' key='inspeccion'>Inspeccion</SelectItem>
                            <SelectItem value='servicio' key='servicio'>Servicio</SelectItem>
                            <SelectItem value='reparacion' key='reparacion'>Reparacion</SelectItem>
                            <SelectItem value='modificacion' key='modificacion'>Modificacion</SelectItem>
                            <SelectItem value='fabricacion' key='fabricacion'>Fabricacion</SelectItem>
                            <SelectItem value='montaje' key='montaje'>Montaje</SelectItem>
                            <SelectItem value='desmontaje' key='desmontaje'>Desmontaje</SelectItem>
                            <SelectItem value='cambio' key='cambio'>Cambio</SelectItem>
                        </Select>

                        <Select className='w-11/12 h-11' placeholder='Tipo de mantenimiento' onChange={(e) => { setTipoMantenimiento(e.target.value); handleEstado('tipoMantenimiento', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='correctivo no planificado' key='correctivo no planificado'>Correctivo no planificado</SelectItem>
                            <SelectItem value='correctivo palificado' key='correctivo palificado'>Correctivo planificado</SelectItem>
                            <SelectItem value='mantenimiento preventivo' key='mantenimiento preventivo'>Mantenimiento preventivo</SelectItem>
                            <SelectItem value='basado en el tiempo' key='basado en el tiempo'>Basado en el tiempo</SelectItem>
                            <SelectItem value='basado en el uso o contador' key='basado en el uso o contador'>Basado en el uso o contador</SelectItem>
                            <SelectItem value='basado en condicion' key='basado en condicion'>Basado en condicion</SelectItem>
                            <SelectItem value='predictivo' key='predictivo'>Predictivo</SelectItem>
                            <SelectItem value='proactivo' key='proactivo'>Proactivo</SelectItem>
                            <SelectItem value='detectivo' key='detectivo'>Detectivo</SelectItem>
                            <SelectItem value='de emergencia' key='de emergencia'>De emergencia</SelectItem>
                            <SelectItem value='autonomo' key='autonomo'>Autonomo</SelectItem>
                            <SelectItem value='de reacondicionamiento' key='de reacondicionamiento'>De reacondicionamiento</SelectItem>
                            <SelectItem value='de reemplazo' key='de reemplazo'>De reemplazo</SelectItem>
                        </Select>

                        <Select className='w-11/12 h-11' placeholder='Tipo de sistema' onChange={(e) => { setTipoSistema(e.target.value); handleEstado('tipoSistema', e.target.value); }}>
                            <SelectItem value={'all'} key={'all'}>Todos</SelectItem>
                            <SelectItem value='mecanico' key='mecanico'>Mecanico</SelectItem>
                            <SelectItem value='electrico' key='electrico'>Electrico</SelectItem>
                            <SelectItem value='hidraulico' key='hidraulico'>Hidraulico</SelectItem>
                            <SelectItem value='neumatico' key='neumatico'>Neumatico</SelectItem>
                            <SelectItem value='de control' key='de control'>De control</SelectItem>
                            <SelectItem value='de refrigeracion' key='de refrigeracion'>De refrigeracion</SelectItem>
                            <SelectItem value='de lubricacion' key='de lubricacion'>De lubricacion</SelectItem>
                            <SelectItem value='de alimentacion' key='de alimentacion'>De alimentacion</SelectItem>
                            <SelectItem value='de seguridad' key='de seguridad'>De seguridad</SelectItem>
                            <SelectItem value='de comunicacion' key='de comunicacion'>De comunicacion</SelectItem>
                        </Select>
                    </div>

                    <Table selectionMode="single">
                        <TableHeader>
                            <TableColumn className='text-lg'>Maquina</TableColumn>
                            <TableColumn className='text-lg'>Tipo de trabajo</TableColumn>
                            <TableColumn className='text-lg'>Tipo de mantenimiento</TableColumn>
                            <TableColumn className='text-lg'>Tipo de sistema</TableColumn>
                            <TableColumn className='text-lg'>Fecha inicio</TableColumn>
                            <TableColumn className='text-lg'>Fecha fin</TableColumn>
                            <TableColumn className='text-lg'>Costo</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No disponible."}>
                            {filteredOrdenes.map((orden) => {
                                return (
                                    <TableRow key={orden.id_orden_de_trabajo} onClick={() => { handleInfoOT(orden.id_orden_de_trabajo); handleInfoIU(orden.id_orden_de_trabajo) }} className='cursor-pointer'>
                                        <TableCell>{orden.id_maquina}</TableCell>
                                        <TableCell>{orden.tipo_de_trabajo}</TableCell>
                                        <TableCell>{orden.tipo_de_mantenimiento}</TableCell>
                                        <TableCell>{orden.tipo_de_sistema}</TableCell>
                                        <TableCell>{format(new Date(orden.fecha_inicio_ot), "dd/MM/yyyy")}</TableCell>
                                        <TableCell>{format(new Date(orden.fecha_fin_ot), "dd/MM/yyyy")}</TableCell>
                                        <TableCell>{orden.costo_mantenimiento}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

            </div>

            {modalVisible && (
                <Orden_trabajo_modal ordenTrabajo={ordenTrabajo} insumosUtilizados={insumosUtilizados} />
            )}
        </div>
    )
}

// INSERT INTO public.orden_de_trabajo(
// 	fecha_inicio_ot, hora_inicio_ot, fecha_fin_ot, hora_fin_ot, total_horas_ot, precio_hora, total_mano_obra, tipo_de_trabajo, tipo_de_mantenimiento, tipo_de_sistema, descripcion_de_trabajo, subtotal_ot, iva, total_precio_horas, costo_mantenimiento, id_maquina, id_aprendiz)
// 	VALUES ('24-02-2024', '16:00', '29-02-2024', '18:00', '36', '4000', '50000', 'Inspeccion', 'Correctivo no planificado', 'Mecanico', 'reparacion del sistema mecanico', '456000', '50000', '900000', '99380498', '2', '23');
