import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Check_list = () => {
    const fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    const [fecha, setFecha] = useState(fechaActual);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [componentes, setComponentes] = useState([]);
    const [estadosComponentes, setEstadosComponentes] = useState({});
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        fetchComponentes();
        fetchRegistros();
    }, []);

    const fetchComponentes = async () => {
        try {
            const response = await axios.get('http://localhost:4002/getComponentesChecklist');
            setComponentes(response.data);

            // Inicializar estados de componentes
            const initialEstados = {};
            response.data.forEach((componente) => {
                initialEstados[componente.id_componente] = '';
            });
            setEstadosComponentes(initialEstados);
        } catch (error) {
            console.error('Error al obtener la lista de componentes del checklist', error);
        }
    };

    const fetchRegistros = async () => {
        try {
            const response = await axios.get('http://localhost:4002/getRegistrosEstados');
            setRegistros(response.data);
        } catch (error) {
            console.error('Error al obtener los registros de estados', error);
        }
    };

    const handleEstadoChange = (componenteId, estado) => {
        setEstadosComponentes((prevEstados) => ({
            ...prevEstados,
            [componenteId]: estado,
        }));
    };

    const RegistrarCheckList = async (event) => {
        event.preventDefault();

        try {
            const checklistData = Object.keys(estadosComponentes).map((componenteId) => ({
                id_componente: componenteId,
                estado_componente: estadosComponentes[componenteId],
            }));

            
            await axios.post('http://localhost:4002/registerCheck_list', checklistData);

            // Limpiar estados después de enviar
            const resetEstados = Object.keys(estadosComponentes).reduce((acc, componenteId) => {
                acc[componenteId] = '';
                return acc;
            }, {});
            setEstadosComponentes(resetEstados);

            // Mostrar mensaje de éxito
            toast.success('Check list registrado exitosamente');

            // Actualizar los registros después de enviar
            fetchRegistros();
        } catch (error) {
            console.error('Error al registrar Check list', error);
            toast.error('Error al registrar Check list');
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2>Check List Torno Wiston 1</h2>
            <form onSubmit={RegistrarCheckList}>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div>
                    <label>Hora de inicio:</label>
                    <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                </div>
                <div>
                    <label>Hora de fin:</label>
                    <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
                </div>
                {componentes.map((componente) => (
                    <div key={componente.id_componente}>
                        <label>{componente.tipo_componente} - {componente.nombre_componente}:</label>
                        <select
                            value={estadosComponentes[componente.id_componente]}
                            onChange={(e) => handleEstadoChange(componente.id_componente, e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Estado del componente</option>
                            <option value="bueno">Bueno</option>
                            <option value="malo">Malo</option>
                            <option value="notificar">Notificar</option>
                        </select>
                    </div>
                ))}
                <div>
                    <button type="submit">Guardar Registro</button>
                </div>
            </form>

            <h2>Registros de Estados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        {componentes.map((componente) => (
                            <th key={componente.id_componente}>{componente.nombre_componente}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro) => (
                        <tr key={registro.id_registro}>
                            <td>{registro.fecha}</td>
                            <td>{registro.hora_inicio}</td>
                            <td>{registro.hora_fin}</td>
                            {componentes.map((componente) => (
                                <td key={componente.id_componente}>{registro[componente.id_componente]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
