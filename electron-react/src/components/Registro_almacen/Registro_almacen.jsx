import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Registro_almacen = () => {
    const [nombreInsumo, setNombreInsumo] = useState("");
    const [fechaLlegadaInsumo, setFechaLlegadaInsumo] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [cantidadInsumo, setCantidadInsumo] = useState("");
    const [proveedorInsumo, setProveedorInsumo] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:4002/RegistrarInsumo",
                {
                    nombre_insumo: nombreInsumo,
                    fecha_llegada_insumo: fechaLlegadaInsumo,
                    cantidad_insumo: cantidadInsumo,
                    proveedor_insumo: proveedorInsumo,
                }
            );

            toast.success('Registro exitoso')
            window.location.href = "/almacen"

        } catch (error) {
            toast.error('Error al registrar insumo')
            console.error("Error al registrar insumos", error);
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Agregar un nuevo insumo</h1>
                </div>
                <div className='inp-registro-CM'>
                    <div className='mt-3'>
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
                <div className='btn-terminar-registro'>
                    <Link to={'/almacen'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></Link>
                    <button type="submit" className='boton-registrar'>Registrar</button>
                </div>
            </form>

        </div>
    )
}
