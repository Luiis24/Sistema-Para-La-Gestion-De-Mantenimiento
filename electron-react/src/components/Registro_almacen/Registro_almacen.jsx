import React, { useState } from 'react'
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Registro_almacen = () => {
    const [nombreInsumo, setNombreInsumo] = useState("");
    const [fechaLlegadaInsumo, setFechaLlegadaInsumo] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [cantidadInsumo, setCantidadInsumo] = useState("");
    const [proveedorInsumo, setProveedorInsumo] = useState("");
    const [tipo, setTipo] = useState("");
    const { isLoading, setIsLoading } = useLoading();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true)
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/RegistrarInsumo`,
                {
                    nombre_insumo: nombreInsumo,
                    fecha_llegada_insumo: fechaLlegadaInsumo,
                    cantidad_insumo: cantidadInsumo,
                    proveedor_insumo: proveedorInsumo,
                    tipo: tipo
                }
            );
            setIsLoading(false)
            toast.success('Registro exitoso')
            if (tipo === 'insumo') {
                window.location.href = "/almacen"
            } else {
                window.location.href = "/herramientas"
            }


        } catch (error) {
            setIsLoading(false)
            toast.error('Error al registrar insumo')
            console.error("Error al registrar insumos", error);
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />
            {isLoading ? <Cargando /> : ''}
            <form onSubmit={handleSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Agregar un nuevo recurso</h1>
                </div>
                <div className='inp-registro-CM'>
                    <Select onChange={(e) => setTipo(e.target.value)} isRequired placeholder='Insumo o herramienta' className='mt-3'>
                        <SelectItem key={'insumo'} value={'insumo'}>Insumo</SelectItem>
                        <SelectItem key={'herramienta'} value={'herramienta'}>Herramienta</SelectItem>
                    </Select>
                    <div>
                        <Input
                            type="text"
                            placeholder='Nombre del insumo o herramienta'
                            value={nombreInsumo}
                            onChange={(e) => setNombreInsumo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder='Cantidad'
                            value={cantidadInsumo}
                            onChange={(e) => setCantidadInsumo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder='Proveedor'
                            value={proveedorInsumo}
                            onChange={(e) => setProveedorInsumo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className='text-sm px-1'>Fecha de entrega:</label>
                        <Input
                            type="date"
                            value={fechaLlegadaInsumo}
                            onChange={(e) => setFechaLlegadaInsumo(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='btn-terminar'>
                    <Link to={'/almacen'} className='boton-cancelar-registro'>
                        <Button className="boton-cancelar-aprendices">
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                            </svg> Atrás
                        </Button>
                    </Link>
                    <Button type="submit" className='boton-registrar-ap'>Registrar</Button>
                </div>
            </form>

        </div>
    )
}
