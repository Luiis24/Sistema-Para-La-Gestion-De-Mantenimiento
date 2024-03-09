import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import './Aprendices.css'
import { SearchIcon } from './SearchIcon';
import { PlusIcon } from './PlusIcon'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Button, Pagination, Spinner, getKeyValue, SelectItem, Select } from "@nextui-org/react";


export const Aprendices = () => {
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [estado, setEstado] = useState();
    const [aprendizSelected, setAprendizSelected] = useState()
    const [filters, setFilters] = useState({
        nombre: '',
        ficha: 'all',
        equipo: 'all'
    });

    const [page, setPage] = React.useState(1);

    // const { data, isLoading } = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, users, {
    //     keepPreviousData: true,
    // });

    const rowsPerPage = 10;

    const pages = useMemo(() => {
        return users?.count ? Math.ceil(users.count / rowsPerPage) : 0;
    }, [users?.count, rowsPerPage]);

    // const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

    const handleAprendiz = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/actualizarAprendiz`, { aprendizSelected, estado });
            setModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/aprendices`)
            .then(datos => {
                setUsers(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const statusColorMap = {
        activo: "success",
        inactivo: "danger",
        vacation: "warning",
    };


    const filterUsers = (users) => {
        return users.filter(user => {
            return ((filters.ficha === 'all' ||
                user.ficha_aprendiz === parseInt(filters.ficha)) &&
                (filters.equipo === 'all' ||
                    user.equipo_aprendiz === filters.equipo) &&
                (filters.nombre === '' ||
                    user.num_doc_aprendiz === parseInt(filters.nombre))
            )
        })
    }

    const handleEstado = (key, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleNombre = (event) => {
        setFilters(prevState => ({
            ...prevState,
            nombre: event.target.value
        }))
    }


    const fichas = users.map(user => user.ficha_aprendiz);
    const FichasNORepetidos = [...new Set(fichas)]

    const equipos = users.map(user => user.equipo_aprendiz);
    const eqnoRepetidos = [...new Set(equipos)]

    const filteredUsers = filterUsers(users);

    return (
        <div>
            <div className="navVertical">
                <Link to={'/MenuPrincipal'}>
                    <div className="principal">
                        <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
                        {/* <img className="logoSena-2" src={logoSenablanco} alt='LogoSenablanco'></img> */}
                        <h2>Principal</h2>
                    </div>
                </Link>
                <input type="checkbox" id="navbar-toggle"></input>
                <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

                <ul className="navList">
                    <li id="activeMaquina">Aprendices</li>
                    <li>
                        <Link to={"/instructores"}>Instructores</Link>
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
                    <h2 id='active'>Lista de aprendices</h2>

                    {/* <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link> */}
                    <input type="checkbox" id="navbar-toggle"></input>
                    <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

                    <ul className='navListR'>
                        <li id='activeMaquina'>Aprendices</li>
                        <li>Nuevo Aprendiz</li>
                    </ul>
                </div>

                <div className="containerUsuarios">
                    <div className="filtersUsuarios">
                        <Input classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                            placeholder="Buscar por numero de documento..."
                            size="sm"
                            startContent={<SearchIcon className="text-default-300" />}
                            onChange={handleNombre}
                        />

                        <Select  placeholder="Fichas" onChange={(e) => { handleEstado('ficha', e.target.value); }}>
                            <SelectItem value="all" key={'all'}>Todos</SelectItem>
                            {FichasNORepetidos.map(ficha => (
                                <SelectItem value={ficha} key={ficha}>{ficha}</SelectItem>
                            ))}
                        </Select>


                        <Select placeholder="Equipos" onChange={(e) => { handleEstado('equipo', e.target.value); }}>
                            <SelectItem value="all" key={'all'}>Todos</SelectItem>
                            {eqnoRepetidos.map(eq => {
                                return <SelectItem value={eq} key={eq}>{eq}</SelectItem>
                            })}
                        </Select>

                        <Link to={'/registroAprendiz'}>
                            <Button
                                className="bg-foreground text-background h-12 md:w-32"
                                endContent={<PlusIcon style={{ fontSize: 'large' }} />}
                                size="sm"
                            >
                                Nuevo Usuario
                            </Button>
                        </Link>
                        <Link to={'/actualizarFicha'}>
                            <Button
                                className="bg-foreground text-background h-12 md:w-32"
                                endContent={
                                    <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clipRule="evenodd" />
                                    </svg>
                                }
                                size="sm"
                            >
                                Ficha
                            </Button>
                        </Link>
                    </div>


                    <Table
                        bottomContent={
                            pages > 0 ? (
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={pages}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            ) : null
                        }
                    >
                        <TableHeader>
                            <TableColumn className='text-lg'>Nombre</TableColumn>
                            <TableColumn className='text-lg'>Documento</TableColumn>
                            <TableColumn className='text-lg'>Programa de formacion</TableColumn>
                            <TableColumn className='text-lg'>Equipo</TableColumn>
                            <TableColumn className='text-lg'>Telefono</TableColumn>
                            <TableColumn className='text-lg'>Ficha</TableColumn>
                            <TableColumn className='text-lg'>Estado</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No se encontro."}
                            items={users ?? []}
                            loadingContent={<Spinner />}
                        >
                            {filteredUsers.map(user => {
                                return <TableRow key={user.id_aprendiz}>
                                    <TableCell className='text-lg'>{user.nombre_aprendiz}</TableCell>
                                    <TableCell className='text-lg'>{user.num_doc_aprendiz}</TableCell>
                                    <TableCell className='text-lg'>{user.programa_aprendiz}</TableCell>
                                    <TableCell className='text-lg'>{user.equipo_aprendiz}</TableCell>
                                    <TableCell className='text-lg'>{user.telefono_aprendiz}</TableCell>
                                    <TableCell className='text-lg'>{user.ficha_aprendiz}</TableCell>
                                    <TableCell>
                                        <Chip className="capitalize text-lg p-3 rounded-lg" color={statusColorMap[user.estado]} size="sm" variant="flat" onClick={() => { setModalVisible(true); setAprendizSelected(user.id_aprendiz) }}>
                                            <p className='w-20 text-center'>{user.estado}</p>
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {modalVisible && (
                <div className="modal-insumos">
                    <form className='form-modal-insumos' onSubmit={handleAprendiz}>
                        <div className="titulo-form-MI">
                            <h3>Actualizar estado aprendiz</h3>
                        </div>
                        <Input value={aprendizSelected} />
                        <Select name='estado' onChange={(e) => setEstado(e.target.value)} placeholder='Cambiar estado'>
                            <SelectItem key={'inactivo'} value={'inactivo'}>Inactivo</SelectItem>
                            <SelectItem key={'activo'} value={'activo'}>Activo</SelectItem>
                        </Select>
                        <div className='btn-terminar-registro'>
                            <a onClick={() => setModalVisible(false)} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></a>
                            <button type="submit" className='boton-registrar'>Actualizar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

// ALTER TABLE IF EXISTS public.aprendices
//     ADD COLUMN estado character varying(10);
