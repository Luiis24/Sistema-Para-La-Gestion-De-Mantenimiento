import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Input, Button } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

const CrearTipoMaquina = () => {
    const [nombreTipoMaquina, setNombreTipoMaquina] = useState('');
    const [descripcionTipoMaquina, setDescripcionTipoMaquina] = useState('');
    const { isLoading, setIsLoading } = useLoading();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/crearTipoMaquina`, {
                nombre_tipo_maquina: nombreTipoMaquina,
                descripcion_tipo_maquina: descripcionTipoMaquina,
            });
            setIsLoading(false)
            toast.success('Tipo de máquina registrado exitosamente');
            window.location.href = '/tornos'
        } catch (error) {
            setIsLoading(false)
            toast.error('Error al registrar el tipo de máquina');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />
            {isLoading ? <Cargando /> : ''}
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
                    <Link to={'/tornos'} className='boton-cancelar-registroR'>
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
    );
};

export default CrearTipoMaquina;