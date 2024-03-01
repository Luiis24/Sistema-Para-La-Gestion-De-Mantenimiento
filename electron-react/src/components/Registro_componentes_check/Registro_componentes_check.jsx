import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const Registro_componentes_check = () => {
    const [tipoComponente, setTipoComponente] = useState('');
    const [nombreComponente, setNombreComponente] = useState('');
    const [componentes, setComponentes] = useState([]);
    const [ultimaMaquina, setUltimaMaquina] = useState('');

    useEffect(() => {
        fetchUltimaMaquina();
        fetchComponentes();
    }, []);

    const fetchUltimaMaquina = async () => {
        try {
            const response = await axios.get('http://localhost:4002/ultimaMaquina');
            setUltimaMaquina(response.data.nombre_maquina);
        } catch (error) {
            console.error('Error al obtener la última máquina registrada', error);
        }
    };

    const fetchComponentes = async () => {
        try {
            const response = await axios.get('http://localhost:4002/componenteChecklist');
            setComponentes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de componentes del checklist', error);
        }
    };

    const RegistrarComponente = async () => {
        try {
            const response = await axios.post('http://localhost:4002/registerComponenteChecklist', {
                tipo_componente: tipoComponente,
                nombre_componente: nombreComponente
            });

            console.log(response.data);
            toast.success('Componente registrado exitosamente');


            fetchComponentes();

            fetchUltimaMaquina();
        } catch (error) {
            console.error('Error al registrar componente del checklist', error);
            toast.error('Error al registrar componente del checklist');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />

            <form className='rg-caracteristicasM'>
                <div className="titulo-registro-CM">
                    <h2>Registro de Componentes del Checklist para maquina {ultimaMaquina}</h2>
                </div>
                <div className='inp-registro-CM'>
                <div className='mt-3'>
                    <label htmlFor="tipoComponente">Tipo de Componente o Sistema:</label>
                    <select
                        id="tipoComponente"
                        value={tipoComponente}
                        onChange={(event) => setTipoComponente(event.target.value)}
                        className='w-full h-14 bg-gray-100 rounded-md p-3'
                    >
                        <option disable selected hidden>Componente o Sistema</option>
                        <option value="Componente Electrico">Componente Electrico</option>
                        <option value="Componente Mecanico">Componente Mecánico</option>
                        <option value="Estados de la Maquina">Estados de la Maquina</option>
                        <option value="Funcionamiento Electrico">Funcionamiento Electrico</option>
                        <option value="Motor">Motor</option>
                        <option value="Niveles de Aceite">Niveles de Aceite</option>
                        <option value="Sistema de Lubricacion">Sistema de Lubricación</option>
                        <option value="Sistema Electrico">Sistema Electrico</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="nombreComponente">Nombre de Componente:</label>
                    <Input
                        type="text"
                        id="nombreComponente"
                        value={nombreComponente}
                        onChange={(event) => setNombreComponente(event.target.value)}
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