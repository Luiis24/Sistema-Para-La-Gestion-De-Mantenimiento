import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Insumos.css'
import logoSena from '../../img/logo.png'
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

export const Insumos = () => {
    const [insumos, setInsumos] = useState([]);
    const [ordenNombreAscendente, setOrdenNombreAscendente] = useState(true);
    const [ordenCantidadAscendente, setOrdenCantidadAscendente] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInsumoId, setSelectedInsumoId] = useState(null);
    const [cantidadUsar, setCantidadUsar] = useState(1);
    const [maxCantidadUsar, setMaxCantidadUsar] = useState(1);
    const [selectedInsumoNombre, setSelectedInsumoNombre] = useState("");
    const [modalDevolucionVisible, setModalDevolucionVisible] = useState(false);
    const [cantidadDevolver, setCantidadDevolver] = useState(1);
    const [maxCantidadDevolver, setMaxCantidadDevolver] = useState(1);

    useEffect(() => {
        const fetchInsumos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/GetInsumos`);
                const insumosOrdenados = response.data.sort((a, b) =>
                    ordenNombreAscendente
                        ? a.nombre_insumo.localeCompare(b.nombre_insumo)
                        : b.nombre_insumo.localeCompare(a.nombre_insumo)
                );
                setInsumos(insumosOrdenados);
            } catch (error) {
                console.error('Error al obtener la lista de insumos', error);
            }
        };

        fetchInsumos();
    }, [ordenNombreAscendente]);

    const handleToggleOrdenNombre = () => {
        setOrdenNombreAscendente((prev) => !prev);
    };

    const handleToggleOrdenCantidad = () => {
        const insumosOrdenados = [...insumos].sort((a, b) =>
            ordenCantidadAscendente
                ? a.cantidad_insumo - b.cantidad_insumo
                : b.cantidad_insumo - a.cantidad_insumo
        );
        setInsumos(insumosOrdenados);
        setOrdenCantidadAscendente((prev) => !prev);
    };

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
                <ul className='navList'>
                    <li><Link to={"/almacen"}>Inventario</Link></li>
                    <li id='activeMaquina'>Uso</li>
                </ul>
            </div>

            <div className="containerM">
                <div className="navHorizontal">
                    <h2 id='active'>Lista de Insumos</h2>
                </div>

                <div className='filtersInsumosUso'>
                    <Button onClick={handleToggleOrdenNombre} className="bg-foreground text-background h-12">
                        {ordenNombreAscendente ? 'Ordenar A-Z' : 'Ordenar Z-A'}
                    </Button>
                    <Button onClick={handleToggleOrdenCantidad} className="bg-foreground text-background h-12">
                        {ordenCantidadAscendente ? 'Ordenar Mayor a Menor' : 'Ordenar Menor a Mayor'}
                    </Button>
                </div>
                <Table className='table_insumosUso'>
                    <TableHeader>
                        <TableColumn className='text-lg'>Nombre</TableColumn>
                        <TableColumn className='text-lg'>Disponibles</TableColumn>
                        <TableColumn className='text-lg'>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {insumos.map((insumo) => (
                            <TableRow key={insumo.id_insumos}>
                                <TableCell className='text-lg'>{insumo.nombre_insumo}</TableCell>
                                <TableCell className='text-lg'>{insumo.cantidad_insumo - (insumo.insumos_en_uso || 0)}</TableCell>
                                <TableCell className='flex gap-3'>
                                    <Button onClick={() => handleGestionarInsumo(insumo.id_insumos)}>
                                        Usar
                                    </Button>
                                    <Button onClick={() => handleDevolverInsumo(insumo.id_insumos)}>
                                        Devolver
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

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
                                <a href={'/insumos'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></a>
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
                                <a href={'/insumos'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></a>
                                <button type="submit" className='boton-registrar'>Devolver</button>
                            </div>
                        </form>

                    </div>
                )}
            </div>
        </div>
    );
};