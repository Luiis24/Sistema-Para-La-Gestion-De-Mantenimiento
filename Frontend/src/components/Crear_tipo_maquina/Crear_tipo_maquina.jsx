import React, { useState } from 'react';
import axios from 'axios';

const CrearTipoMaquina = () => {
    const [nombreTipoMaquina, setNombreTipoMaquina] = useState('');
    const [descripcionTipoMaquina, setDescripcionTipoMaquina] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearTipoMaquina', {
                nombre_tipo_maquina: nombreTipoMaquina,
                descripcion_tipo_maquina: descripcionTipoMaquina,
            });

            console.log('Tipo de máquina registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar el tipo de máquina', error);
        }
    };

    return (
        <div>
            <h1>Crear Un Nuevo Tipo De Maquina</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Nombre del Tipo de Maquina:</label>
                    <input
                        type="text"
                        placeholder="Tipo de Maquina"
                        value={nombreTipoMaquina}
                        onChange={(event) => setNombreTipoMaquina(event.target.value)}
                    />
                </div>
                <div>
                    <label>Descripción del Tipo de Maquina:</label>
                    <input
                        type="textarea"
                        placeholder="Describe el tipo de Maquina que estás creando"
                        value={descripcionTipoMaquina}
                        onChange={(event) => setDescripcionTipoMaquina(event.target.value)}
                    />
                </div>
                <button type="submit">Registrar Tipo de Maquina</button>
            </form>
        </div>
    );
};

export default CrearTipoMaquina;
