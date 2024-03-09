import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Registro_salida_insumo = () => {
    const [idInsumo, setIdInsumo] = useState("");
    const [cantidadInsumo, setCantidadInsumo] = useState("");

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
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/SalidaInsumo`,
                {
                    id_insumo: idInsumo,
                    cantidad_insumo: cantidadInsumo,
                }
            );
            console.log(response)

            toast.success('Registro exitoso')
            window.location.href = "/almacen"

        } catch (error) {
            toast.error('Error al registrar salida de insumo')
            console.error("Error al registrar insumos", error);
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Registrar salida de insumo</h1>
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
                                        <SelectItem value={insumo.id_insumos} key={insumo.id_insumos}>
                                            {insumo.nombre_insumo}({insumo.cantidad_insumo - insumo.insumos_en_uso})
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
                </div>
                <div className='btn-terminar-registro'>
                    <Link to={'/almacen'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></Link>
                    <button type="submit" className='boton-registrar'>Registrar</button>
                </div>
            </form>

        </div>
    )
}
