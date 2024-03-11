import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Select, SelectItem, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import './Registro_componente_check.css'

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
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ultimaMaquina`);
            setUltimaMaquina(response.data.nombre_maquina);
        } catch (error) {
            console.error('Error al obtener la última máquina registrada', error);
        }
    };

    const fetchComponentes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/componenteChecklist`);
            setComponentes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de componentes del checklist', error);
        }
    };

    const RegistrarComponente = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/registerComponenteChecklist`, {
                tipo_componente: tipoComponente,
                nombre_componente: nombreComponente
            });


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

            <form className='rg-componentes' onSubmit={RegistrarComponente}>
                <div className="titulo-registro-CM">
                    <h2>Registro de componentes {ultimaMaquina}</h2>
                    
                </div>
                <div className='inp-registro-CM'>
                <div className='mt-3'>
                    <Select
                    placeholder='Tipo de componente o sistema'
                        id="tipoComponente"
                        selectedKeys={tipoComponente}
                        onChange={(event) => setTipoComponente(event.target.value)}
                   
                    >
                        <SelectItem value="Componente Electrico">Componente eléctrico</SelectItem>
                        <SelectItem value="Componente Mecanico">Componente mecánico</SelectItem>
                        <SelectItem value="Estados de la Maquina">Estados de la máquina</SelectItem>
                        <SelectItem value="Funcionamiento Electrico">Funcionamiento eléctrico</SelectItem>
                        <SelectItem value="Motor">Motor</SelectItem>
                        <SelectItem value="Niveles de Aceite">Niveles de aceite</SelectItem>
                        <SelectItem value="Sistema de Lubricacion">Sistema de lubricación</SelectItem>
                        <SelectItem value="Sistema Electrico">Sistema eléctrico</SelectItem>
                    </Select>
                </div>

                <div className='input-check'>
                    <Input
                    className='mt-8'
                        type="text"
                        id="nombreComponente"
                        placeholder='Nombre del componente'
                        value={nombreComponente}
                        onChange={(event) => setNombreComponente(event.target.value)}
                    />
                </div>
                </div>
                <div className='btn-terminar-registro'>
                    <Link to={'/tornos'} className='boton-cancelar-registro'><h3>⮜ ‎ Salir</h3></Link>
                    <Button type="submit" className='boton-registrar'>Registrar</Button>
                </div>
            </form>
        </div>
    );
};  