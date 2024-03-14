import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Select, SelectItem} from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Actualizar_maquina = () => {
    const [nombre_maquina, setNombre_maquina] = useState('');
    const [manual_maquina, setManual_maquina] = useState('');
    const [maquina, setMaquina] = useState([]);
    const [selectedMaquina, setSelectedMaquina] = useState('');
    const {isLoading, setIsLoading} = useLoading();

    useEffect(() => {
        // Cargar tipos de máquina al montar el componente
        setIsLoading(true)
        const fetchTiposMaquina = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getMaquinas`);
                setMaquina(response.data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error('Error al obtener máquina', error);
            }
        };

        fetchTiposMaquina();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/actualizarMaquina`, {
                id_maquina: selectedMaquina,
                nombre_maquina: nombre_maquina,
                manual_maquina: manual_maquina,
            });
            setIsLoading(false)
            toast.success('Máquina actualizada exitosamente');
            window.location.href = '/tornos'
            
        } catch (error) {
            setIsLoading(false)
            toast.error('Error al actualizar la máquina');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer/>
            {isLoading ? <Cargando/> : ''}
            <form onSubmit={handleFormSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Actualizar informacion máquina</h1>
                </div>
                <div className='inp-registro-CM'>
                    <Select
                        onChange={(event) => setSelectedMaquina(event.target.value)}
                        selectedKeys={selectedMaquina}
                        className=' mt-3'
                        placeholder='Seleccione la máquina'
                    >
                        {maquina.map((tipo) => (
                            <SelectItem key={tipo.id_maquina} value={tipo.id_maquina}>
                                {tipo.nombre_maquina}
                            </SelectItem>
                        ))}
                    </Select>

                    <div>
                        <Input
                            type="text"
                            placeholder="Cambiar nombre de la máquina"
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