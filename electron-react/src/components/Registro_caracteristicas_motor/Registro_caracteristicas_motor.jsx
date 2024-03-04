import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registro_caracteristicas_motor.css'
import { Link } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Registro_caracteristicas_motor = () => {
    const [maquinas, setMaquinas] = useState([]);
    const [selectedMaquina, setSelectedMaquina] = useState('');

    const [marca_motor, setMarca_motor] = useState('');
    const [modelo_motor, setModelo_motor] = useState('');
    const [descripcion_motor, setDescripcion_motor] = useState('');
    const [serie_motor, setSerie_motor] = useState('');
    const [tamaño_motor, setTamaño_motor] = useState('');
    const [potencia_motor, setPotencia_motor] = useState('');
    const [rpm_motor, setRpm_motor] = useState('');
    const [voltaje_motor, setVoltaje_motor] = useState('');
    const [amp_motor, setAmp_motor] = useState('');

    // Cargar la lista de máquinas al montar el componente
    useEffect(() => {
        const fetchMaquinas = async () => {
            try {
                const response = await axios.get('http://localhost:4002/getMaquinas');
                // Ordenar las máquinas por ID de forma descendente
                const maquinasOrdenadas = response.data.sort((a, b) => b.id_maquina - a.id_maquina);
                setMaquinas(maquinasOrdenadas);
            } catch (error) {
                console.error('Error al obtener la lista de máquinas', error);
            }
        };

        fetchMaquinas();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearCaracteristicasMotor', {
                id_maquina: selectedMaquina,
                marca_motor,
                modelo_motor,
                descripcion_motor,
                serie_motor,
                tamaño_motor,
                potencia_motor,
                rpm_motor,
                voltaje_motor,
                amp_motor,
            });

            toast.success('Características registradas exitosamente');
            window.location.href = '/crearComponentesCheck'
        } catch (error) {
            toast.error('Error al registrar carcaterísticas')
            console.error('Error al registrar las características del motor', error);
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer/>
            <form onSubmit={handleFormSubmit} className='rg-caracteristicasM'>
                <div className="titulo-registro-CM">
                    <h1>Agrega las características del motor</h1>
                </div>
                <div className='inp-registro-CM'>
                    <select
                        value={selectedMaquina}
                        onChange={(event) => setSelectedMaquina(event.target.value)}
                        className=' h-14 bg-gray-100 rounded-md p-3'
                    >
                        <option disable selected hidden>Maquinas registradas</option>
                        {maquinas.map((maquina) => (
                            <option key={maquina.id_maquina} value={maquina.id_maquina}>
                                {maquina.nombre_maquina}
                            </option>
                        ))}
                    </select>
                    <div>
                        <Input
                            className="mt-4"
                            type="text"
                            placeholder="Escribe la marca del motor"
                            value={marca_motor}
                            onChange={(event) => setMarca_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escribe el modelo del motor"
                            value={modelo_motor}
                            onChange={(event) => setModelo_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Describe el motor"
                            value={descripcion_motor}
                            onChange={(event) => setDescripcion_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escribe la serie del motor"
                            value={serie_motor}
                            onChange={(event) => setSerie_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escribe el tamaño del motor"
                            value={tamaño_motor}
                            onChange={(event) => setTamaño_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escrie la potencia del motor"
                            value={potencia_motor}
                            onChange={(event) => setPotencia_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escribe las RPM del motor"
                            value={rpm_motor}
                            onChange={(event) => setRpm_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escribe el voltaje del motor"
                            value={voltaje_motor}
                            onChange={(event) => setVoltaje_motor(event.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Escribe los AMP del motor"
                            value={amp_motor}
                            onChange={(event) => setAmp_motor(event.target.value)}
                        />
                    </div>
                    <div className='btn-terminar-registro'>
                        <button type="submit" className='boton-registrar'>Registrar</button>
                    </div>

                </div>
            </form>
        </div>
    );
};