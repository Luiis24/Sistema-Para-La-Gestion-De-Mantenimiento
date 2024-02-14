import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ... (importaciones)

export const Check_list = () => {
    const [componentes, setComponentes] = useState([]);
    const [estadosComponentes, setEstadosComponentes] = useState({});
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    useEffect(() => {
        // Llamada a la API para obtener los componentes del checklist
        fetchComponentesChecklist();
    }, []);

    const fetchComponentesChecklist = async () => {
        try {
            const response = await axios.get('http://localhost:4002/componenteChecklist');
            const initialEstados = {};
            response.data.forEach((componente) => {
                initialEstados[componente.id_componente] = ''; // Estado inicial: vacío
            });
            setEstadosComponentes(initialEstados);
            setComponentes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de componentes del checklist', error);
        }
    };

    const handleEstadoChange = (componenteId, estado) => {
        setEstadosComponentes((prevEstados) => ({
            ...prevEstados,
            [componenteId]: estado,
        }));
    };

    const renderEstadoOptions = (nombreComponente) => {
        if (nombreComponente.toLowerCase().includes('nivel')) {
            return (
                <>
                    <option disable selected hidden>Nivel</option>
                    <option key="altoNivel" value="Alto Nivel">Alto Nivel</option>
                    <option key="bajoNivel" value="Bajo Nivel">Bajo Nivel</option>
                </>
            );
        } else {
            return (
                <>
                    <option disable selected hidden>Estado</option>
                    <option key="bueno" value="bueno">Bueno</option>
                    <option key="malo" value="malo">Malo</option>
                    <option key="alertar" value="alertar">Alertar</option>
                </>
            );
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Enviar estados a la API para registrarlos
            const estadosRegistrados = Object.entries(estadosComponentes).map(([id_componente, estado_componente]) => ({
                id_componente,
                estado_componente,
            }));

            // Enviar información de hoja de inspección y estados de componentes
            await axios.post('http://localhost:4002/registerHojaInspeccion', {
                fecha,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                estadosComponentes: estadosRegistrados,
            });

            toast.success('Hoja de inspección y estados de componentes registrados exitosamente');

            // Limpiar estados y fechas después del registro
            setEstadosComponentes({});
            setFecha('');
            setHoraInicio('');
            setHoraFin('');

        } catch (error) {
            console.error('Error al registrar hoja de inspección y estados de componentes', error);
            toast.error('Error al registrar hoja de inspección y estados de componentes');
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2>Lista de Componentes del Checklist</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Fecha:
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </label>
                <label>
                    Hora de Inicio:
                    <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                </label>
                <label>
                    Hora de Fin:
                    <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
                </label>
                <ul>
                    {componentes.map((componente) => (
                        <li key={componente.id_componente}>
                            <label>
                                Tipo: {componente.tipo_componente}, Nombre: {componente.nombre_componente}
                                <select
                                    value={estadosComponentes[componente.id_componente] || ''}
                                    onChange={(e) => handleEstadoChange(componente.id_componente, e.target.value)}
                                >
                                    {renderEstadoOptions(componente.nombre_componente)}
                                </select>
                            </label>
                        </li>
                    ))}
                </ul>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
