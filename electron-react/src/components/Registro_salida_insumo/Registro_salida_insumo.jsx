import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem } from "@nextui-org/react";
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
    const {isLoading, setIsLoading} = useLoading();

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
            {isLoading ? <Cargando/> : ''}
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
                <div className='btn-terminar-registro'>
                    <Link to={'/almacen'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></Link>
                    <button type="submit" className='boton-registrar'>Registrar</button>
                </div>
            </form>

        </div>
    )
}
