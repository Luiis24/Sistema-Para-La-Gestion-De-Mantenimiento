import React from 'react'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow } from "@nextui-org/react";

export const Informes = () => {
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
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Informes</h2>
                </div>
                <Table>
                    <TableHeader>
                        <TableColumn className='text-lg'>Nombre</TableColumn>
                        <TableColumn className='text-lg'>Documento</TableColumn>
                        <TableColumn className='text-lg'>Fecha</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No disponible."}>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
