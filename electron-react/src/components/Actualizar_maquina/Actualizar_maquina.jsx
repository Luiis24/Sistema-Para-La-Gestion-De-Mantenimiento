import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Select, SelectItem, Button} from '@nextui-org/react';
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
                <div className='btn-terminar'>
                    <Link to={'/tornos'} className='boton-cancelar-registro'>
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
    );
};