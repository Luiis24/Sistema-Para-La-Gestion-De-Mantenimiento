import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Registro_salida_insumo = () => {
    const [idInsumo, setIdInsumo] = useState("");
    const [cantidadInsumo, setCantidadInsumo] = useState("");
    const [nota, setNota] = useState();
    const { isLoading, setIsLoading } = useLoading();

    const [insumos, setInsumos] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/insumos`)
            .then(datos => {
                setInsumos(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true)
            const insumo_BD = insumos.find(insumo => insumo.id_insumos === parseInt(idInsumo))

            if (!insumo_BD) {
                toast.error('El insumo seleccionado no existe');
                setIsLoading(false)
                return;
            }
            const cantidad_insumo_BD = insumo_BD.cantidad_insumo;

            if (cantidadInsumo <= 0) {
                toast.error('La cantidad de salida debe ser mayor que cero');
                setIsLoading(false)
                return;
            }

            if (cantidadInsumo > cantidad_insumo_BD) {
                toast.error('La cantidad de salida supera la cantidad disponible en stock');
                setIsLoading(false)
                return;
            }
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/SalidaInsumo`,
                {
                    id_insumo: idInsumo,
                    cantidad_insumo: cantidadInsumo,
                    nota: `${nota || ""} - Fecha: ${formattedDate}`
                }
            );

            setIsLoading(false)
            toast.success('Registro exitoso')
            window.location.href = "/almacen"

        } catch (error) {
            setIsLoading(false)
            toast.error('Error al registrar salida de insumo')
            console.error("Error al registrar insumos", error);
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />
            {isLoading ? <Cargando /> : ''}
            <form onSubmit={handleSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Registrar salida de recurso</h1>
                </div>
                <div className='inp-registro-CM'>
                    <div className='mt-3'>
                        <Select
                            placeholder='Nombre del insumo o herramienta'
                            onChange={(e) => setIdInsumo(e.target.value)}
                            required>
                            {insumos.map((insumo) => {
                                // Verificar si la cantidad disponible es mayor que 0
                                if (insumo.cantidad_insumo - (insumo.insumos_en_uso || 0) > 0) {
                                    return (
                                        <SelectItem value={insumo.id_insumos} key={insumo.id_insumos} endContent={<p>{insumo.cantidad_insumo - insumo.insumos_en_uso}</p>}>
                                            {insumo.nombre_insumo}
                                        </SelectItem>
                                    );
                                } else {
                                    return null; // No agregar la opción al select si la cantidad es 0
                                }
                            })}
                        </Select>
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder='Cantidad'
                            min={1}
                            onChange={(e) => setCantidadInsumo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder='Registrar nota (opcional)'
                            onChange={(e) => setNota(e.target.value)}
                        />
                    </div>
                </div>
                <div className='btn-terminar'>
                    <Link to={'/almacen'} className='boton-cancelar-registroR'>
                        <Button className="boton-cancelarR">
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                            </svg> Atrás
                        </Button>
                    </Link>
                    <Button type="submit" className='boton-registrarR'>Registrar</Button>
                </div>
            </form>

        </div>
    )
}
