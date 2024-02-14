import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Estado_componente = () => {
    const [ultimosEstados, setUltimosEstados] = useState({});

    useEffect(() => {
        fetchUltimosEstados();
    }, []);

    const fetchUltimosEstados = async () => {
        try {
            const response = await axios.get('http://localhost:4002/getUltimosEstados');
            console.log(response.data); // Verifica la respuesta del servidor
            setUltimosEstados(response.data);
        } catch (error) {
            console.error('Error al obtener los últimos estados', error);
        }
    };

    return (
        <div>
            <h2>Últimos Estados de Componentes</h2>
            {Object.entries(ultimosEstados).map(([id_componente, componenteInfo]) => (
                <div key={id_componente}>
                    <h3>{componenteInfo.tipo}</h3>
                    <ul>
                        <li>
                            Nombre: {componenteInfo.nombre}, {componenteInfo.estado}.
                        </li>
                        <li>
                            Fecha: {new Date(componenteInfo.fecha).toLocaleDateString('es-ES')}.
                            </li>
                            <li>
                            Hora de inicio: {componenteInfo.horaInicio}. 
                       </li>
                       <li>
                             Hora de fin: {componenteInfo.horaFin}.
                       </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Estado_componente;