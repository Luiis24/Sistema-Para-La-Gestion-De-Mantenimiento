import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'


export const Actualizar_estado_ficha = () => {
    const [estado, setEstado] = useState();
    const [fichaSelected, setFichaSelected] = useState();
    const [aprendices, setAprendices] = useState([]);
    const {isLoading, setIsLoading} = useLoading();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/aprendices`)
            .then(datos => {
                setAprendices(datos.data);
            })
            .catch(error => {
                setIsLoading(false)
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/actualizarFicha`, {
                ficha_aprendiz: fichaSelected,
                estado: estado,
            });

            setIsLoading(false)
            toast.success('Ficha actualizada exitosamente');
            window.location.href = '/aprendices'

        } catch (error) {
            setIsLoading(false)
            toast.error('Error al actualizar la máquina');
        }
    };

    const fichas = aprendices.map(user => user.ficha_aprendiz);
    const FichasNORepetidos = [...new Set(fichas)]

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />
            {isLoading ? <Cargando/> : ''}
            <form onSubmit={handleFormSubmit} className='rg-caracteristicasM'>

                <div className="titulo-registro-CM">
                    <h1>Actualizar Ficha</h1>
                </div>
                <div className='inp-registro-CM'>
                    <Select
                        onChange={(event) => setFichaSelected(event.target.value)}
                        className=' mt-3'
                        placeholder='Seleccione la Ficha'
                    >
                        {FichasNORepetidos.map((ficha) => (
                            <SelectItem value={ficha} key={ficha}>
                                {ficha}
                            </SelectItem>
                        ))}
                    </Select>

                    <div>
                        <Select name='estado' onChange={(e) => setEstado(e.target.value)} placeholder='Cambiar estado'>
                            <SelectItem key={'inactivo'} value={'inactivo'}>Inactivo</SelectItem>
                            <SelectItem key={'activo'} value={'activo'}>Activo</SelectItem>
                        </Select>
                    </div>
                </div>
                <div className='btn-terminar-registro'>
                    <Link to={'/aprendices'} className='boton-cancelar-registro'><h3>⮜ ‎ Atrás</h3></Link>
                    <button type="submit" className='boton-registrar'>Actualizar</button>
                </div>
            </form>

        </div>
    );
};