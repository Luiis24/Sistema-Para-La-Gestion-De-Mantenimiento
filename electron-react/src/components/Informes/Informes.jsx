import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from 'axios';
import './Informes.css'
import { Orden_trabajo_modal } from './Orden_trabajo_modal';

export const Informes = () => {
    const [ordenesTrabajo, setOrdenesTrabajo] = useState([]);
    const [ordenTrabajo, setOrdenTrabajo] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4002/getOrdenesTrabajo')
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
            const response = await axios.post('http://localhost:4002/getOrdenTrabajo', { id });
            const ot = await response.data
            setOrdenTrabajo(ot);    
            setModalVisible(true);
        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div>
            <div className="navVertical">
                <Link to={'/MenuPrincipal'}>
                    <div className="principal">
                        <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
                        <h2>Principal</h2>
                    </div>
                </Link>
                <ul className='navList'>
                    <li id='activeMaquina'>Informes</li>
                    <li><Link to={'/registroReparacion'}>Reparaciones</Link></li>
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Informes</h2>
                </div>

                <div className="containerInformes">
                    <Table>
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
                            {ordenesTrabajo.map((orden) => {
                                return (
                                    <TableRow key={orden.id_orden_de_trabajo} onClick={() => handleInfoOT(orden.id_orden_de_trabajo)} className='cursor-pointer'>
                                        <TableCell>{orden.id_maquina}</TableCell>
                                        <TableCell>{orden.tipo_de_trabajo}</TableCell>
                                        <TableCell>{orden.tipo_de_mantenimiento}</TableCell>
                                        <TableCell>{orden.tipo_de_sistema}</TableCell>
                                        <TableCell>{orden.fecha_inicio_ot}</TableCell>
                                        <TableCell>{orden.fecha_fin_ot}</TableCell>
                                        <TableCell>{orden.costo_mantenimiento}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

            </div>

            {modalVisible && (
                <Orden_trabajo_modal ordenTrabajo={ordenTrabajo}/>
            )}
        </div>
    )
}

// INSERT INTO public.orden_de_trabajo(
// 	fecha_inicio_ot, hora_inicio_ot, fecha_fin_ot, hora_fin_ot, total_horas_ot, precio_hora, total_mano_obra, tipo_de_trabajo, tipo_de_mantenimiento, tipo_de_sistema, descripcion_de_trabajo, subtotal_ot, iva, total_precio_horas, costo_mantenimiento, id_maquina, id_aprendiz)
// 	VALUES ('24-02-2024', '16:00', '29-02-2024', '18:00', '36', '4000', '50000', 'Inspeccion', 'Correctivo no planificado', 'Mecanico', 'reparacion del sistema mecanico', '456000', '50000', '900000', '99380498', '2', '23');
