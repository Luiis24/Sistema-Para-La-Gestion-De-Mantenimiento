import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Caracteristicas_motor = () => {
    const [nombre_maquina, setNombre_maquina] = useState('');
    const [manual_maquina, setManual_maquina] = useState('');
    const [tiposMaquina, setTiposMaquina] = useState([]);
    const [selectedTipoMaquina, setSelectedTipoMaquina] = useState('');

    useEffect(() => {
        // Cargar tipos de máquina al montar el componente
        const fetchTiposMaquina = async () => {
            try {
                const response = await axios.get('http://localhost:4002/getTiposMaquina');
                setTiposMaquina(response.data);
            } catch (error) {
                console.error('Error al obtener los tipos de máquina', error);
            }
        };

        fetchTiposMaquina();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearMaquina', {
                nombre_maquina: nombre_maquina,
                manual_maquina: manual_maquina,
                tipo_maquina: selectedTipoMaquina,
            });

            console.log('Máquina registrada exitosamente');
        } catch (error) {
            console.error('Error al registrar la máquina', error);
        }
    };

    return (
        <div>
            <h1>Crear una nueva maquina.</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Selecciona un tipo de maquina:</label>
                    <select
                        value={selectedTipoMaquina}
                        onChange={(event) => setSelectedTipoMaquina(event.target.value)}
                    >
                        <option disable selected hidden> Tipo de Maquina</option>
                        {tiposMaquina.map((tipo) => (
                            <option key={tipo.id_tipo_maquina} value={tipo.nombre_tipo_maquina}>
                                {tipo.nombre_tipo_maquina}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nombre de la maquina:</label>
                    <input
                        type="text"
                        placeholder="Nombre de la Maquina"
                        value={nombre_maquina}
                        onChange={(event) => setNombre_maquina(event.target.value)}
                    />
                </div>
                 <div>
                    <label>Manual de la maquina:</label>
                    <input
                        type="text"
                        placeholder="Manual de la Maquina"
                        value={manual_maquina}
                        onChange={(event) => setManual_maquina(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Registrar nueva maquina</button>
                </div>
            </form>
        </div>
    );
};
