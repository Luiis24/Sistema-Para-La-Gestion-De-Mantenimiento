import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Almacen.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Button } from "@nextui-org/react";
import { SearchIcon } from '../Aprendices/SearchIcon';
import { PlusIcon } from '../Aprendices/PlusIcon'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export const Almacen = () => {
    const [insumos, setInsumos] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [entradaInsumo, setEntradaInsumo] = useState()
    const [filters, setFilters] = useState({
        nombre: '',
        estado: 'all',
        stock: 0
    })

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

    const filterInsumos = (insumos) => {
        return insumos.filter(insumo => {
            return ((insumo.cantidad_insumo >= filters.stock) &&
                (filters.estado === 'all' ||
                    insumo.estado_insumo === filters.estado) &&
                (filters.nombre === '' ||
                    insumo.nombre === filters.nombre)
            )
        })
    }

    const handleUso = (event) => {
        setFilters(prevState => ({
            ...prevState,
            estado: event.target.value
        }))
    }

    const handleStock = (event) => {
        setFilters(prevState => ({
            ...prevState,
            stock: event.target.value
        }))
    }

    const handleNombre = (event) => {
        setFilters(prevState => ({
            ...prevState,
            nombre: event.target.value
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntradaInsumo({
            ...entradaInsumo,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const filteredInsumos = filterInsumos(insumos);

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
                            <option value="all">Todos</option>
                            <option value="disponible">Disponible</option>
                            <option value="enUso">En uso</option>
                        </select>

                        <input type='range' id='stock' min='0' max='100' onChange={handleStock}></input>
                        <span>{filters.stock}</span>



                        <Button
                            className="bg-foreground text-background h-12"
                            onPress={onOpen}
                            endContent={<PlusIcon style={{ fontSize: 'large' }} />}
                            size="sm" >
                            Nuevo Insumo
                        </Button>
                    </div>


                    <Table>
                        <TableHeader>
                            <TableColumn className='text-lg'>N. inventario</TableColumn>
                            <TableColumn className='text-lg'>Nombre</TableColumn>
                            <TableColumn className='text-lg'>Proveedor</TableColumn>
                            <TableColumn className='text-lg'>Entradas</TableColumn>
                            <TableColumn className='text-lg'>En uso</TableColumn>
                            <TableColumn className='text-lg'>Stock</TableColumn>
                            <TableColumn className='text-lg'>Estado</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No se encontro insumos."}>
                            {filteredInsumos.map(insumo => {
                                return <TableRow key={insumo.id_insumo}>
                                    <TableCell className='text-lg'>{insumo.id_insumos}</TableCell>
                                    <TableCell className='text-lg'>{insumo.nombre}</TableCell>
                                    <TableCell className='text-lg'>{insumo.proveedor}</TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo}</TableCell>
                                    <TableCell className='text-lg flex items-center gap-3 cursor-pointer'>0<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    </TableCell>
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


            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl">Registrar Insumo</ModalHeader>
                            <ModalBody className="modalIOT">
                                <div className="formIOT">
                                    <Input type="text" name="nombreInsumo" onChange={handleChange} placeholder='Nombre Insumo' />
                                </div>
                                <div className="formIOT">
                                    <Input type="number" name="cantidad" onChange={handleChange} placeholder='Cantidad'/>
                                </div>
                                <div className="formIOT">
                                    <Input type="date" name="fecha" onChange={handleChange} placeholder='Fecha'/>
                                </div>
                                <div className="formIOT">
                                    <Input type="number" name="proveedor" onChange={handleChange} placeholder='Proveedor'/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="text-slate-50 bg-red-500" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <div className="botton-registrar-div">
                                <Button className="text-white" onClick={handleSubmit} onPress={onClose}>
                                    Registrar
                                </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
