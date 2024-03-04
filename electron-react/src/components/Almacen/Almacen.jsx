import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Almacen.css'
import { Link } from 'react-router-dom'
import { format } from "date-fns";
import logoSena from '../../img/logo.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Button, Pagination } from "@nextui-org/react";
import { SearchIcon } from '../Aprendices/SearchIcon';
import { PlusIcon } from '../Aprendices/PlusIcon';
import menu from '../../img/menu.png'

export const Almacen = () => {
    const [insumos, setInsumos] = useState([]);

    // filtros
    const [filters, setFilters] = useState({
        nombre: '',
        estado: 'all'
    });
    const [ordenNombreAscendente, setOrdenNombreAscendente] = useState(true);
    const [ordenCantidadAscendente, setOrdenCantidadAscendente] = useState(true);

    // usar y devolver insumos
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInsumoId, setSelectedInsumoId] = useState(null);
    const [cantidadUsar, setCantidadUsar] = useState(1);
    const [maxCantidadUsar, setMaxCantidadUsar] = useState(1);
    const [selectedInsumoNombre, setSelectedInsumoNombre] = useState("");
    const [modalDevolucionVisible, setModalDevolucionVisible] = useState(false);
    const [cantidadDevolver, setCantidadDevolver] = useState(1);
    const [maxCantidadDevolver, setMaxCantidadDevolver] = useState(1);

    // paginador
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 15;

    // get insumos
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/insumos`)
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
        const filtered = insumos.filter(insumo => {
            if (filters.estado === 'all') {
                return (
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre)
                );
            } else if (filters.estado === '1') { // Si se selecciona "Disponible"
                return (
                    (insumo.cantidad_insumo - (insumo.insumos_en_uso || 0) > 0) &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre)
                );
            } else if (filters.estado === '0') { // Si se selecciona "En uso"
                return (
                    (insumo.insumos_en_uso > 0) &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre)
                );
            }
            return true;
        });
    
        if (ordenNombreAscendente) {
            filtered.sort((a, b) => (a.nombre_insumo > b.nombre_insumo) ? 1 : -1);
        } else {
            filtered.sort((a, b) => (a.nombre_insumo < b.nombre_insumo) ? 1 : -1);
        }
    
        if (!ordenCantidadAscendente) {
            filtered.sort((a, b) => b.cantidad_insumo - a.cantidad_insumo);
        }
    
        return filtered;
    }


    // cambiar filtros

    const handleUso = (event) => {
        setFilters(prevState => ({
            ...prevState,
            estado: event.target.value
        }))
        setPaginaActual(1);
    }

    const handleNombre = (event) => {
        setFilters(prevState => ({
            ...prevState,
            nombre: event.target.value
        }))
        setPaginaActual(1)
    }

    const handleOrdenNombre = () => {
        setOrdenNombreAscendente(!ordenNombreAscendente);
        setPaginaActual(1)
    }

    const handleOrdenCantidad = () => {
        setOrdenCantidadAscendente(!ordenCantidadAscendente);
        setPaginaActual(1)
    }

    const filteredInsumos = filterInsumos(insumos);


    // cambiar de pagina

    const totalPaginas = Math.ceil(filteredInsumos.length / itemsPorPagina);
    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    }
    const startIndex = (paginaActual - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    const paginatedInsumos = filteredInsumos.slice(startIndex, endIndex);


    // usar y devolver insumo

    const handleGestionarInsumo = (id) => {
        console.log("ID del insumo seleccionado:", id);
        setSelectedInsumoId(id);

        const insumoSeleccionado = insumos.find((insumo) => insumo.id_insumos === id);
        const maxCantidad = insumoSeleccionado.cantidad_insumo - (insumoSeleccionado.insumos_en_uso || 0);
        setMaxCantidadUsar(maxCantidad);

        setSelectedInsumoNombre(insumoSeleccionado.nombre_insumo);

        setModalVisible(true);
        setModalDevolucionVisible(false);
    };

    const handleDevolverInsumo = (id) => {
        console.log("ID del insumo seleccionado para devolver:", id);
        setSelectedInsumoId(id);

        const insumoSeleccionado = insumos.find((insumo) => insumo.id_insumos === id);
        setMaxCantidadDevolver(insumoSeleccionado.insumos_en_uso || 0);

        setSelectedInsumoNombre(insumoSeleccionado.nombre_insumo);

        setModalDevolucionVisible(true);
        setModalVisible(false);
    };

    const handleSubmitModal = async (event) => {
        event.preventDefault();

        try {
            console.log("ID del insumo a usar:", selectedInsumoId);

            if (selectedInsumoId === null) {
                console.error('ID del insumo no definida');
                return;
            }

            if (cantidadUsar > maxCantidadUsar) {
                console.error('La cantidad ingresada supera la cantidad disponible');
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/UsarInsumo/${selectedInsumoId}`, {
                id_insumo: selectedInsumoId,
                cantidad: cantidadUsar,
            });

            console.log(`Insumo con ID ${selectedInsumoId} usado. Cantidad: ${cantidadUsar}`);
            setModalVisible(false);
            window.location.href = "/almacen"
        } catch (error) {
            console.error('Error al usar insumo', error);
        }
    };

    const handleSubmitDevolucionModal = async (event) => {
        event.preventDefault();

        try {
            console.log("ID del insumo a devolver:", selectedInsumoId);

            if (selectedInsumoId === null) {
                console.error('ID del insumo no definida');
                return;
            }

            if (cantidadDevolver > maxCantidadDevolver) {
                console.error('La cantidad ingresada supera la cantidad en uso');
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/DevolverInsumo/${selectedInsumoId}`, {
                id_insumo: selectedInsumoId,
                cantidad: cantidadDevolver,
            });

            console.log(`Insumo con ID ${selectedInsumoId} devuelto. Cantidad: ${cantidadDevolver}`);
            setModalDevolucionVisible(false);
            window.location.href = "/almacen"
        } catch (error) {
            console.error('Error al devolver insumo', error);
        }
    };

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
                <ul className='navList'>
                    <li id='activeMaquina'>Inventario</li>
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Insumos</h2>
                </div>

                <div className="containerAlmacen">
                    <div className="filtrosAlmacen">
                        <Input classNames={{
                            base: "w-1/3 sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                            placeholder="Buscar por nombre..."
                            size="sm"
                            startContent={<SearchIcon className="text-default-300" />}
                            onChange={handleNombre}
                        />

                        <select placeholder='Estado' className="filterI" onChange={handleUso}>
                            <option disable selected hidden>Estado</option>
                            <option value="all">Todos</option>
                            <option value="1">Disponible</option>
                            <option value="0">En uso</option>
                        </select>

                        <button className='filterI' onClick={handleOrdenNombre}>
                            {ordenNombreAscendente ? 'Ordenar A-Z' : 'Ordenar Z-A'}
                        </button>

                        <button className='filterI' onClick={handleOrdenCantidad}>
                            {ordenCantidadAscendente ? 'Mayor a menor' : 'Menor a mayor'}
                        </button>


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
                            <TableColumn>Acciones</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No se encontro insumos."}>
                            {paginatedInsumos.map(insumo => {
                                return <TableRow key={insumo.id_insumo}>
                                    <TableCell className='text-lg'>{insumo.nombre_insumo}</TableCell>
                                    <TableCell className='text-lg'>{format(new Date(insumo.fecha_llegada_insumo), "dd/MM/yyyy")}</TableCell>
                                    <TableCell className='text-lg'>{insumo.proveedor_insumo}</TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo}</TableCell>
                                    <TableCell className='text-lg flex items-center gap-3 cursor-pointer'>
                                        {insumo.insumos_en_uso || 0}
                                        <svg className="w-6 h-6 text-gray-800 hover:text-lime-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo - (insumo.insumos_en_uso || 0)}</TableCell>
                                    <TableCell>
                                        <Chip className="capitalize text-lg p-3 rounded-lg h-10" color={insumo.insumos_en_uso === insumo.cantidad_insumo ? 'danger' : 'success'} size="sm" variant="flat">
                                            <p className='w-28 text-center'>{insumo.insumos_en_uso === insumo.cantidad_insumo ? 'No disponible' : 'Disponible'}</p>
                                        </Chip>
                                    </TableCell>
                                    <TableCell className='flex gap-3'>
                                        <button onClick={() => handleGestionarInsumo(insumo.id_insumos)}>Usar</button>
                                        <button onClick={() => handleDevolverInsumo(insumo.id_insumos)}>Devolver</button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    <div className="paginador">
                        <Pagination showControls total={totalPaginas} initialPage={paginaActual} onChange={cambiarPagina} color="default" />
                    </div>
                </div>

                {modalVisible && (
                    <div className="modal-insumos">

                        <form onSubmit={handleSubmitModal} className='form-modal-insumos'>
                            <div className="titulo-form-MI">
                                <h3>Usar insumo o herramienta "{selectedInsumoNombre}"</h3>
                            </div>
                            <div className='inp-registro-CM'>
                                <label>Nombre
                                    <Input
                                        value={selectedInsumoNombre}
                                        readonly
                                    />
                                </label>
                                <label className='flex gap-2 items-center'>Cantidad a usar <p className='text-lg'>(máximo {maxCantidadUsar})</p></label>
                                <Input
                                    type="number"
                                    value={cantidadUsar}
                                    onChange={(e) => setCantidadUsar(e.target.value)}
                                    min={1}
                                    max={maxCantidadUsar}
                                />
                            </div>
                            <div className='btn-terminar-registro'>
                                <a href={'/almacen'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></a>
                                <button type="submit" className='boton-registrar'>Usar insumo</button>
                            </div>
                        </form>

                    </div>
                )}

                {modalDevolucionVisible && (
                    <div className="modal-insumos">

                        <form onSubmit={handleSubmitDevolucionModal} className='form-modal-insumos'>
                            <div className="titulo-form-MI">
                                <h3>Devolver insumo o herramienta "{selectedInsumoNombre}"</h3>
                            </div>
                            <div className='inp-registro-CM'>
                                <label>Nombre
                                    <Input
                                        value={selectedInsumoNombre}
                                        readonly
                                    />
                                </label>
                                <label className='flex gap-2 items-center'>Cantidad a devolver <p className='text-lg'>(máximo {maxCantidadDevolver})</p></label>
                                <Input
                                    type="number"
                                    placeholder="Cantidad a devolver"
                                    value={cantidadDevolver}
                                    onChange={(e) => setCantidadDevolver(e.target.value)}
                                    min={1}
                                    max={maxCantidadDevolver}
                                />
                            </div>
                            <div className='btn-terminar-registro'>
                                <a href={'/almacen'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></a>
                                <button type="submit" className='boton-registrar'>Devolver</button>
                            </div>
                        </form>

                    </div>
                )}


            </div>
        </div>
    )
}
