import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Check_list = () => {
    const [componentes, setComponentes] = useState([]);
    const [estadosComponentes, setEstadosComponentes] = useState({});

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Enviar estados a la API para registrarlos
            await axios.post('http://localhost:4002/registerCheckList', {
                checklistData: Object.entries(estadosComponentes).map(([id_componente, estado_componente]) => ({
                    id_componente,
                    estado_componente,
                })),
            });

            toast.success('Estados de componentes registrados exitosamente');
        } catch (error) {
            console.error('Error al registrar estados de componentes', error);
            toast.error('Error al registrar estados de componentes');
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2>Lista de Componentes del Checklist</h2>
            {componentes.length === 0 ? (
                <p>No hay componentes registrados</p>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <ul>
                        {componentes.map((componente) => (
                            <li key={componente.id_componente}>
                                <label>
                                    Tipo: {componente.tipo_componente}, Nombre: {componente.nombre_componente}
                                    <select
                                        value={estadosComponentes[componente.id_componente] || ''}
                                        onChange={(e) => handleEstadoChange(componente.id_componente, e.target.value)}
                                    >
                                        <option key="estado" disabled hidden>Estado</option>
                                        <option key="bueno" value="bueno">Bueno</option>
                                        <option key="malo" value="malo">Malo</option>
                                        <option key="alertar" value="alertar">Alertar</option>
                                    </select>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button type="submit">Enviar</button>
                </form>
            )}
        </div>
    );
};
