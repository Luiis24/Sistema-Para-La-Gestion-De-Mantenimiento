import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Crear_maquina = () => {
    const [nombre_maquina, setNombre_maquina] = useState('');
    const [manual_maquina, setManual_maquina] = useState('');
    const [tiposMaquina, setTiposMaquina] = useState([]);
    const [selectedTipoMaquina, setSelectedTipoMaquina] = useState('');

    useEffect(() => {
        // Cargar tipos de máquina al montar el componente
        const fetchTiposMaquina = async () => {
            try {
                const response = await axios.get('http://localhost:4002/tipoMaquinas');
                setTiposMaquina(response.data);
            } catch (error) {
                console.error('Error al obtener los tipos de máquina', error);
            }
        };

        fetchTiposMaquina();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearMaquina', {
                nombre_maquina: nombre_maquina,
                manual_maquina: manual_maquina,
                id_tipo_maquina: selectedTipoMaquina,
            });

            toast.success('Máquina registrada exitosamente');
            window.location.href = '/crearDescripcionEquipo'
            
        } catch (error) {
            toast.error('Error al registrar la máquina');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer/>
            <form onSubmit={handleFormSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Crear una nueva maquina</h1>
                </div>
                <div className='inp-registro-CM'>
                    <select
                        value={selectedTipoMaquina}
                        onChange={(event) => setSelectedTipoMaquina(event.target.value)}
                        className=' mt-3 h-14 bg-gray-100 rounded-md p-3'
                    >
                        <option disable selected hidden>Tipo de maquina</option>
                        {tiposMaquina.map((tipo) => (
                            <option key={tipo.id_tipo_maquina} value={tipo.id_tipo_maquina}>
                                {tipo.nombre_tipo_maquina}
                            </option>
                        ))}
                    </select>

                    <div>
                        <Input
                            type="text"
                            placeholder="Nombre de la maquina"
                            value={nombre_maquina}
                            onChange={(event) => setNombre_maquina(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="URL manual de la maquina"
                            value={manual_maquina}
                            onChange={(event) => setManual_maquina(event.target.value)}
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