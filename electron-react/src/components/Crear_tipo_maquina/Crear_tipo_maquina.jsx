import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Input } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearTipoMaquina = () => {
    const [nombreTipoMaquina, setNombreTipoMaquina] = useState('');
    const [descripcionTipoMaquina, setDescripcionTipoMaquina] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearTipoMaquina', {
                nombre_tipo_maquina: nombreTipoMaquina,
                descripcion_tipo_maquina: descripcionTipoMaquina,
            });

            toast.success('Tipo de máquina registrado exitosamente');
        } catch (error) {
            toast.error('Error al registrar el tipo de máquina');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer/>
            <form onSubmit={handleFormSubmit} className='rg-caracteristicasM'>
                <div className="titulo-registro-CM">
                    <h1>Crear nuevo tipo de maquina</h1>
                </div>
                <div className='inp-registro-CM'>
                    <div>
                        <Input
                            type="text"
                            placeholder="Tipo de Maquina"
                            value={nombreTipoMaquina}
                            onChange={(event) => setNombreTipoMaquina(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="textarea"
                            placeholder="Describe el tipo de Maquina que estás creando"
                            value={descripcionTipoMaquina}
                            onChange={(event) => setDescripcionTipoMaquina(event.target.value)}
                        />
                    </div>
                </div>
                <div className='btn-terminar-registro'>
                    <Link to={'/tornos'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></Link>
                    <button type="submit" className='boton-registrar'>Registrar</button>
                </div>
            </form>

        </div>
    );
};

export default CrearTipoMaquina;