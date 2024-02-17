import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Almacen.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";

export const Almacen = () => {
    const [insumos, setInsumos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4002/insumos')
            .then(datos => {
                setInsumos(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const statusColorMap = {
        disponible: "success",
        paused: "danger",
        vacation: "warning",
    };

    return (
        <div>
            <div className="navVertical">
                <Link to={'/'}>
                    <div className="principal">
                        <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
                        <h2>Principal</h2>
                    </div>
                </Link>
                <ul className='navList'>
                    <li id='activeMaquina'>Inventario</li>
                    <li><Link to={'/entradaAlmacen'}>Entradas</Link></li>
                    <li><Link to={'/salidaAlmacen'}>Salidas</Link></li>
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Insumos</h2>

                    <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link>
                    <input type="checkbox" id="navbar-toggle"></input>
                    <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

                    <ul className='navListR'>
                        <li id='activeMaquina'>Inventario</li>
                        <li><Link to={'/entradaAlmacen'}>Entradas</Link></li>
                        <li><Link to={'/salidaAlmacen'}>Salida</Link></li>
                    </ul>
                </div>

                <Table>
                    <TableHeader>
                        <TableColumn className='text-lg'>N. inventario</TableColumn>
                        <TableColumn className='text-lg'>Nombre</TableColumn>
                        <TableColumn className='text-lg'>Proveedor</TableColumn>
                        <TableColumn className='text-lg'>Entradas</TableColumn>
                        <TableColumn className='text-lg'>Salidas</TableColumn>
                        <TableColumn className='text-lg'>Stock</TableColumn>
                        <TableColumn className='text-lg'>Estado</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {insumos.map(insumo => {
                            return <TableRow key={insumo.id_insumo}>
                                <TableCell className='text-lg'>{insumo.id_insumos}</TableCell>
                                <TableCell className='text-lg'>{insumo.nombre}</TableCell>
                                <TableCell className='text-lg'>{insumo.proveedor}</TableCell>
                                <TableCell className='text-lg'>{insumo.cantidad_insumo}</TableCell>
                                <TableCell className='text-lg'>0</TableCell>
                                <TableCell className='text-lg'>{insumo.cantidad_insumo}</TableCell>
                                <TableCell><Chip className="capitalize text-lg p-3 rounded-lg" color={statusColorMap[insumo.estado_insumo]} size="sm" variant="flat">
                                    Disponible
                                </Chip></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
