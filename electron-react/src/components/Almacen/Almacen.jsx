import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Almacen.css'
import { Link } from 'react-router-dom'
import { format } from "date-fns";
import logoSena from '../../img/logo.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Button, Pagination } from "@nextui-org/react";
import { SearchIcon } from '../Aprendices/SearchIcon';
import { PlusIcon } from '../Aprendices/PlusIcon';

export const Almacen = () => {
    const [insumos, setInsumos] = useState([]);
    const [filters, setFilters] = useState({
        nombre: '',
        estado: 'all',
        stock: 0,
    });

    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;

    // get insumos
    useEffect(() => {
        axios.get('http://localhost:4002/insumos')
            .then(datos => {
                const sortedInsumos = datos.data.sort(
                    (a, b) =>
                        new Date(b.fecha_llegada_insumo) - new Date(a.fecha_llegada_insumo)
                );
                setInsumos(sortedInsumos);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    // filtrar insumos
    const filterInsumos = (insumos) => {
        return insumos.filter(insumo => {
            if (filters.estado === 'all') {
                return (
                    insumo.cantidad_insumo >= filters.stock &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre)
                );
            } else if (filters.estado === '1') { // Si se selecciona "Disponible"
                return (
                    insumo.cantidad_insumo - (insumo.insumos_en_uso || 0) > filters.stock &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre)
                );
            } else if (filters.estado === '0') { // Si se selecciona "En uso"
                return (
                    insumo.insumos_en_uso > 0 &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre)
                );
            }
            return true;
        })
    }

    const handleUso = (event) => {
        setFilters(prevState => ({
            ...prevState,
            estado: event.target.value
        }))
        setPaginaActual(1);
    }

    const handleStock = (event) => {
        setFilters(prevState => ({
            ...prevState,
            stock: event.target.value
        }))
        setPaginaActual(1)
    }

    const handleNombre = (event) => {
        setFilters(prevState => ({
            ...prevState,
            nombre: event.target.value
        }))
        setPaginaActual(1)
    }

    const filteredInsumos = filterInsumos(insumos);

    const totalPaginas = Math.ceil(filteredInsumos.length / itemsPorPagina);

    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    }


    const startIndex = (paginaActual - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    const paginatedInsumos = filteredInsumos.slice(startIndex, endIndex);

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
                    <li id='activeMaquina'>Inventario</li>
                    <li><Link to={'/insumos'}>Uso</Link></li>
                    {/* <li><Link to={'/entradaAlmacen'}>Entradas</Link></li>
                    <li><Link to={'/salidaAlmacen'}>Salidas</Link></li> */}
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Insumos</h2>
                </div>

                <div className="containerAlmacen">
                    <div className="filtrosAlmacen">
                        <Input classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                            placeholder="Buscar por nombre..."
                            size="sm"
                            startContent={<SearchIcon className="text-default-300" />}
                            onChange={handleNombre}
                        />

                        <select placeholder='Estado' className="filterU" onChange={handleUso}>
                            <option disable selected hidden>Estado</option>
                            <option value="all">Todos</option>
                            <option value="1">Disponible</option>
                            <option value="0">En uso</option>
                        </select>

                        <input type='range' id='stock' min='0' max='100' onChange={handleStock}></input>
                        <span>{filters.stock}</span>


                        <Link to={"/entradaAlmacen"}>
                            <Button
                                className="bg-foreground text-background h-12"
                                endContent={<PlusIcon style={{ fontSize: 'large' }} />}
                                size="sm" >
                                Nuevo Insumo
                            </Button>
                        </Link>
                        <Button
                            className="bg-foreground text-background h-12 cursor-not-allowed"
                            endContent={<PlusIcon style={{ fontSize: 'large' }} />}
                            size="sm" >
                            Salida Insumo
                        </Button>
                    </div>


                    <Table>
                        <TableHeader>
                            <TableColumn className='text-lg'>Nombre</TableColumn>
                            <TableColumn className='text-lg'>Agregado</TableColumn>
                            <TableColumn className='text-lg'>Proveedor</TableColumn>
                            <TableColumn className='text-lg'>Cantidad</TableColumn>
                            <TableColumn className='text-lg'>En uso</TableColumn>
                            <TableColumn className='text-lg'>Disponibles</TableColumn>
                            <TableColumn className='text-lg'>Estado</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No se encontro insumos."}>
                            {paginatedInsumos.map(insumo => {
                                return <TableRow key={insumo.id_insumo}>
                                    <TableCell className='text-lg'>{insumo.nombre_insumo}</TableCell>
                                    <TableCell className='text-lg'>{format(new Date(insumo.fecha_llegada_insumo), "dd/MM/yyyy")}</TableCell>
                                    <TableCell className='text-lg'>{insumo.proveedor_insumo}</TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo}</TableCell>
                                    <TableCell className='text-lg flex items-center gap-3 cursor-pointer'>{insumo.insumos_en_uso || 0}
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo - (insumo.insumos_en_uso || 0)}</TableCell>
                                    <TableCell>
                                        <Chip className="capitalize text-lg p-3 rounded-lg" color={insumo.insumos_en_uso === insumo.cantidad_insumo ? 'danger' : 'success'} size="sm" variant="flat">
                                            {insumo.insumos_en_uso === insumo.cantidad_insumo ? 'No disponible' : 'Disponible'}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    <div className="paginador">
                    <Pagination showControls total={totalPaginas} initialPage={paginaActual} onChange={cambiarPagina} color="secondary"/>
                </div>
                </div>



            </div>
        </div>
    )
}
