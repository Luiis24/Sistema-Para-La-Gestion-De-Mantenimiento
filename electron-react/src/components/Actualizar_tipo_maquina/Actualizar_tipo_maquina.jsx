import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Actualizar_tipo_maquina = () => {
    const [nombre_tipo_maquina, setNombre_tipo_maquina] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [maquina, setMaquina] = useState([]);
    const [selectedMaquina, setSelectedMaquina] = useState('');
    const {isLoading, setIsLoading} = useLoading();

    useEffect(() => {
        // Cargar tipos de máquina al montar el componente
        setIsLoading(true)
        const fetchTiposMaquina = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tipoMaquinas`);
                setMaquina(response.data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error('Error al obtener tipo de máquinas', error);
            }
        };

        fetchTiposMaquina();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/actualizarTipoMaquina`, {
                id_tipo_maquina: selectedMaquina,
                nombre_tipo_maquina: nombre_tipo_maquina,
                descripcion_tipo_maquina: descripcion,
            });
            setIsLoading(false)
            toast.success('Tipo máquina actualizada exitosamente');
            window.location.href = '/tornos'
            
        } catch (error) {
            setIsLoading(false)
            toast.error('Error al actualizar el tipo máquina');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer/>
            {isLoading ? <Cargando/> : ''}
            <form onSubmit={handleFormSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Actualizar tipo de máquina</h1>
                </div>
                <div className='inp-registro-CM'>
                    <Select
                        onChange={(event) => setSelectedMaquina(event.target.value)}
                        selectedKeys={selectedMaquina}
                        className=' mt-3'
                        placeholder='Seleccione la máquina'
                    >
                        {maquina.map((tipo) => (
                            <SelectItem key={tipo.id_tipo_maquina} value={tipo.id_tipo_maquina}>
                                {tipo.nombre_tipo_maquina}
                            </SelectItem>
                        ))}
                    </Select>

                    <div>
                        <Input
                            type="text"
                            placeholder="Cambiar nombre del tipo de maquina"
                            value={nombre_tipo_maquina}
                            onChange={(event) => setNombre_tipo_maquina(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Descripcion del tipo de maquina"
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
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