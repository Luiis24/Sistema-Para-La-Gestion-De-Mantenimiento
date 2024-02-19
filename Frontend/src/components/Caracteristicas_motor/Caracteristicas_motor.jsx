import React, { useState } from 'react';
import axios from 'axios';

export const Caracteristicas_motor = () => {
    const [marca_motor, setMarca_motor] = useState('');
    const [modelo_motor, setModelo_motor] = useState('');
    const [descripcion_motor, setDescripcion_motor] = useState('');
    const [serie_motor, setSerie_motor] = useState('');
    const [tamaño_motor, setTamaño_motor] = useState('');
    const [potencia_motor, setPotencia_motor] = useState('');
    const [rpm_motor, setRpm_motor] = useState('');
    const [voltaje_motor, setVoltaje_motor] = useState('');
    const [amp_motor, setAmp_motor] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearCaracteristicasMotor', {
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

            console.log('Características del motor registradas exitosamente');
        } catch (error) {
            console.error('Error al registrar las características del motor', error);
        }
    };

    return (
        <div>
            <h1>Agrega las características del motor.</h1>
            <form onSubmit={handleFormSubmit}>
            <div>
                <div>
                    <label>Marca del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe la marca del motor"
                        value={marca_motor}
                        onChange={(event) => setMarca_motor(event.target.value)}
                    />
                </div>
                 <div>
                    <label>Modelo del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe el modelo del motor"
                          value={modelo_motor}
                        onChange={(event) => setModelo_motor(event.target.value)}
                    />
                </div>
                <div>
                    <label>Descripción del motor:</label>
                    <input
                        type="text"
                        placeholder="Describe el motor"
                          value={descripcion_motor}
                        onChange={(event) => setDescripcion_motor(event.target.value)}
                    />
                </div>
                 <div>
                    <label>Serie del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe la serie del motor"
                          value={serie_motor}
                        onChange={(event) => setSerie_motor(event.target.value)}
                    />
                </div>
                <div>
                    <label>Tamaño del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe el tamaño del motor"
                          value={tamaño_motor}
                        onChange={(event) => setTamaño_motor(event.target.value)}
                    />
                </div>
                 <div>
                    <label>Potencia del motor:</label>
                    <input
                        type="text"
                        placeholder="Escrie la potencia del motor"
                          value={potencia_motor}
                        onChange={(event) => setPotencia_motor(event.target.value)}
                    />
                </div>
                <div>
                    <label>RPM del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe las RPM del motor"
                          value={rpm_motor}
                        onChange={(event) => setRpm_motor(event.target.value)}
                    />
                </div>
                 <div>
                    <label>Voltaje del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe el voltaje del motor"
                          value={voltaje_motor}
                        onChange={(event) => setVoltaje_motor(event.target.value)}
                    />
                </div>
                <div>
                    <label>AMP del motor:</label>
                    <input
                        type="text"
                        placeholder="Escribe los AMP del motor"
                          value={amp_motor}
                        onChange={(event) => setAmp_motor(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Registrar caracteristicas del motor</button>
                </div>
          
        </div>
            </form>
        </div>
    );
};
