import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { format } from "date-fns";
import logoSena from '../../img/logo.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Button, Pagination, Select, SelectItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { SearchIcon } from '../Aprendices/SearchIcon';
import { PlusIcon } from '../Aprendices/PlusIcon';
import menu from '../../img/menu.png'
import { useAuth } from '../../estados/usuario';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Herramientas = () => {
    const [insumos, setInsumos] = useState([]);
    const [insumosUtilizadosAlmacen, setInsumosUtilizadosAlmacen] = useState([]);
    const [modalVisibleInsumoU, setModalVisibleInsumoU] = useState(false);
    const { rol } = useAuth();
    const { isLoading, setIsLoading } = useLoading();

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

    const [cantidadConsumida, setCantidadConsumida] = useState(0);
    const [selectedInsumoNombre, setSelectedInsumoNombre] = useState("");
    const [modalDevolucionVisible, setModalDevolucionVisible] = useState(false);
    const [cantidadDevolver, setCantidadDevolver] = useState(0);
    const [maxCantidadDevolver, setMaxCantidadDevolver] = useState(1);
    const [nota, setNota] = useState("");
    const [notaInsumo, setNotaInsumo] = useState("");

    // paginador
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 15;

    // get insumos
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/insumos`)
            .then(datos => {
                const sortedInsumos = datos.data.sort(
                    (a, b) =>
                        new Date(b.fecha_llegada_insumo) - new Date(a.fecha_llegada_insumo)
                );
                setInsumos(sortedInsumos);
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const handleInsumosUtilizados = async (id_insumo) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/getInsumosUtilizadosAlmacen`, { id_insumo });
            const insumos = await response.data
            setInsumosUtilizadosAlmacen(insumos);
            setIsLoading(false)
            setModalVisibleInsumoU(true);
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    // filtrar insumos
    const filterInsumos = (insumos) => {
        const filtered = insumos.filter(insumo => {
            if (filters.estado === 'all') {
                return (
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre) &&
                    (insumo.tipo === 'herramienta')
                );
            } else if (filters.estado === '1') { // Si se selecciona "Disponible"
                return (
                    (insumo.cantidad_insumo - (insumo.insumos_en_uso || 0) > 0) &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre) &&
                    (insumo.tipo === 'herramienta')
                );
            } else if (filters.estado === '0') { // Si se selecciona "En uso"
                return (
                    (insumo.insumos_en_uso > 0) &&
                    (filters.nombre === '' || insumo.nombre_insumo === filters.nombre) &&
                    (insumo.tipo === 'herramienta')
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

    const handleDevolverInsumo = (id) => {
        console.log("ID del insumo seleccionado para devolver:", id);
        setSelectedInsumoId(id);

        const insumoSeleccionado = insumos.find((insumo) => insumo.id_insumos === id);
        setMaxCantidadDevolver(insumoSeleccionado.insumos_en_uso || 0);

        setSelectedInsumoNombre(insumoSeleccionado.nombre_insumo);

        setModalDevolucionVisible(true);
        setModalVisible(false);
    };

    const handleSubmitDevolucionModal = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            console.log("ID del insumo a devolver:", selectedInsumoId);

            if (selectedInsumoId === null) {
                setIsLoading(false)
                console.error('ID del insumo no definida');
                return;
            }

            const totalCantidad = parseInt(cantidadDevolver) + parseInt(cantidadConsumida);
            if (totalCantidad > maxCantidadDevolver) {
                setIsLoading(false)
                toast.error('La suma de la cantidad a devolver y la cantidad a salir supera la cantidad máxima permitida');
                return;
            }
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

            const devolverInsumoPromise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/DevolverInsumo/${selectedInsumoId}`, {
                id_insumo: selectedInsumoId,
                cantidad: cantidadDevolver,
                nota: `${nota || ""} - Fecha: ${formattedDate}` // Verificar si la nota existe, si no, enviar una cadena vacía
            });

            const salidaInsumoPromise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/SalidaInsumoEnUso`, {
                id_insumo: selectedInsumoId,
                cantidad_insumo: cantidadConsumida,
                nota: `${nota || ""} - Fecha: ${formattedDate}` // Verificar si la nota existe, si no, enviar una cadena vacía
            });

            // Esperar a que ambas solicitudes se completen antes de continuar
            await Promise.all([devolverInsumoPromise, salidaInsumoPromise]);

            // console.log(`Insumo con ID ${selectedInsumoId} devuelto. Cantidad: ${cantidadDevolver}`);
            setIsLoading(false)
            setModalDevolucionVisible(false);
            toast.success('Registro de devolucion exitoso')
            window.location.href = "/almacen"
        } catch (error) {
            setIsLoading(false)
            toast.error('Error al devolver insumo')
            console.error('Error al devolver insumo', error);
        }
    };

    const handleVerNotas = (id) => {
        const insumoSeleccionado = insumos.find((insumo) => insumo.id_insumos === id);
        setNotaInsumo(insumoSeleccionado.nota_insumo || "");
        setModalVisible(true);
    };
    return (
        <div>
            {isLoading ? <Cargando /> : ''}
            <ToastContainer />
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
                    <Link to={'/almacen'}><h2>Insumos</h2></Link>
                    <h2 id='active'>Herramientas</h2>
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

                        <Select placeholder='Estado' name='estado' onChange={handleUso} className='w-1/5'>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="1">Disponible</SelectItem>
                            <SelectItem value="0">En uso</SelectItem>
                        </Select>

                        <Button onClick={handleOrdenNombre} className="bg-default-100 h-12 w-1/5">
                            {ordenNombreAscendente ? 'Ordenar A-Z' : 'Ordenar Z-A'}
                        </Button>

                        <Button className="bg-default-100 h-12 w-1/5" onClick={handleOrdenCantidad}>
                            {ordenCantidadAscendente ? 'Mayor a menor' : 'Menor a mayor'}
                        </Button>


                        {rol === 'Instructor' ?
                            <Link to={"/entradaAlmacen"}>
                                <Button
                                    className="bg-foreground text-background h-12"
                                    endContent={<PlusIcon style={{ fontSize: 'medium' }} />}
                                    size="sm" >
                                    Nuevo Recurso
                                </Button>
                            </Link> : ''}
                        {rol === 'Instructor' ?
                            <Link to={"/salidaAlmacen"}>
                                <Button
                                    className="bg-foreground text-background text-gray-200 h-12"
                                    endContent={
                                        <svg className="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M5.027 10.9a8.729 8.729 0 0 1 6.422-3.62v-1.2A2.061 2.061 0 0 1 12.61 4.2a1.986 1.986 0 0 1 2.104.23l5.491 4.308a2.11 2.11 0 0 1 .588 2.566 2.109 2.109 0 0 1-.588.734l-5.489 4.308a1.983 1.983 0 0 1-2.104.228 2.065 2.065 0 0 1-1.16-1.876v-.942c-5.33 1.284-6.212 5.251-6.25 5.441a1 1 0 0 1-.923.806h-.06a1.003 1.003 0 0 1-.955-.7A10.221 10.221 0 0 1 5.027 10.9Z" />
                                        </svg>
                                    }
                                    size="sm" >
                                    Salida Recurso
                                </Button>
                            </Link> : ''}
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
                                return <TableRow key={insumo.id_insumos}>
                                    <TableCell className='text-lg'>{insumo.nombre_insumo}</TableCell>
                                    <TableCell className='text-lg'>{format(new Date(insumo.fecha_llegada_insumo), "dd/MM/yyyy")}</TableCell>
                                    <TableCell className='text-lg'>{insumo.proveedor_insumo}</TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo}</TableCell>
                                    <TableCell className='text-lg flex items-center gap-3 cursor-pointer mt-2' onClick={() => handleInsumosUtilizados(insumo.id_insumos)}>
                                        {insumo.insumos_en_uso || 0}
                                    </TableCell>
                                    <TableCell className='text-lg'>{insumo.cantidad_insumo - (insumo.insumos_en_uso || 0)}</TableCell>
                                    <TableCell>
                                        <Chip className="capitalize text-lg p-3 rounded-lg h-10" color={insumo.insumos_en_uso === insumo.cantidad_insumo ? 'danger' : 'success'} size="sm" variant="flat">
                                            <p className='w-28 text-center'>{insumo.insumos_en_uso === insumo.cantidad_insumo ? 'No disponible' : 'Disponible'}</p>
                                        </Chip>
                                    </TableCell>
                                    <TableCell className='flex gap-3'>
                                        <div className="relative flex justify-end items-center gap-2">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="light">
                                                        <svg className="w-6 h-6 text-gray-800 hover:text-lime-500 dark:text-white" aria-hidden="true" fill="none" focusable="false" role="presentation" viewBox="0 0 24 24">
                                                            <path
                                                                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => handleDevolverInsumo(insumo.id_insumos)}>Devolver</DropdownItem>
                                                    <DropdownItem onClick={() => handleInsumosUtilizados(insumo.id_insumos)} className='flex items-center'> En uso </DropdownItem>
                                                    <DropdownItem onClick={() => handleVerNotas(insumo.id_insumos)} >Notas</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    <div className="paginador">
                        <Pagination showControls total={totalPaginas} initialPage={paginaActual} onChange={cambiarPagina} color="default" />
                    </div>
                </div>


                {modalDevolucionVisible && (
                    <div className="modal-insumos">

                        <form onSubmit={handleSubmitDevolucionModal} className='form-modal-insumos'>
                            <div className="titulo-form-MI">
                                <h3>Devolver insumo o herramienta "{selectedInsumoNombre}"</h3>
                            </div>
                            <div className='inp-registro-DI'>
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
                                    min={0}
                                    max={maxCantidadDevolver}
                                />
                                <label className='flex gap-2 items-center'>Cantidad consumida <p className='text-lg'>(máximo {maxCantidadDevolver})</p></label>
                                <Input
                                    type="number"
                                    placeholder="Cantidad consumida"
                                    value={cantidadConsumida}
                                    onChange={(e) => setCantidadConsumida(e.target.value)}
                                    min={0}
                                    max={maxCantidadDevolver}
                                />
                                <Input
                                    type="text"
                                    placeholder="Registrar nota (opcional)"
                                    value={nota}
                                    onChange={(e) => setNota(e.target.value)}
                                />
                            </div>
                            <div className='btn-terminar-registro'>
                                <a onClick={() => setModalDevolucionVisible(false)} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></a>
                                <button type="submit" className='boton-registrar'>Devolver</button>
                            </div>
                        </form>

                    </div>
                )}

                {modalVisibleInsumoU && insumosUtilizadosAlmacen.length > 0 && (
                    <div className="modal-insumos">

                        <div className='form-modal-insumos'>
                            <div className="titulo-form-MI">
                                <h3>Insumo utilizado en</h3>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableColumn>Nombre</TableColumn>
                                    <TableColumn>Cantidad</TableColumn>
                                    <TableColumn>Unidad</TableColumn>
                                    <TableColumn>Valor unitario</TableColumn>
                                    <TableColumn>Orden de trabajo</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {insumosUtilizadosAlmacen.map(insumo =>
                                        <TableRow>
                                            <TableCell>{insumo.nombre_insumo_ot}</TableCell>
                                            <TableCell>{insumo.cantidad_insumo_ot}</TableCell>
                                            <TableCell>{insumo.unidad_insumo_ot}</TableCell>
                                            <TableCell>{insumo.valor_insumo_ot}</TableCell>
                                            <TableCell>{insumo.id_orden_de_trabajo}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            <div className='btn-terminar-registro'>
                                <a className='boton-cancelar-registro' onClick={() => setModalVisibleInsumoU(false)}><h3>⮜ ‎ Atrás</h3></a>
                            </div>
                        </div>

                    </div>
                )}


                {modalVisible && notaInsumo && (
                    <div className="modal-insumos">

                        <div className='form-modal-insumos'>
                            <div className="titulo-form-MI">
                                <h3>Nota</h3>
                            </div>

                            <p>{notaInsumo}</p>

                            <div className='btn-terminar-registro'>
                                <a className='boton-cancelar-registro' onClick={() => setModalVisible(false)}><h3>⮜ ‎ Atrás</h3></a>
                            </div>
                        </div>

                    </div>
                )}


            </div>
        </div>
    )
}
