import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Componentes_check = () => {
    const [tipoComponente, setTipoComponente] = useState('');
    const [nombreComponente, setNombreComponente] = useState('');
    const [componentes, setComponentes] = useState([]);

    useEffect(() => {
        // Obtener la lista de componentes al cargar el componente
        fetchComponentes();
    }, []);

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

            // Actualizar la lista de componentes después de registrar uno nuevo
            fetchComponentes();
        } catch (error) {
            console.error('Error al registrar componente del checklist', error);
            toast.error('Error al registrar componente del checklist');
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2>Registro de Componentes del Checklist</h2>
            <form>
                <div>
                    <label htmlFor="tipoComponente">Tipo de Componente:</label>
                    <input
                        type="text"
                        id="tipoComponente"
                        value={tipoComponente}
                        onChange={(event) => setTipoComponente(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nombreComponente">Nombre de Componente:</label>
                    <input
                        type="text"
                        id="nombreComponente"
                        value={nombreComponente}
                        onChange={(event) => setNombreComponente(event.target.value)}
                    />
                </div>
                <div>
                    <button type="button" onClick={RegistrarComponente}>Registrar Componente</button>
                </div>
            </form>

            <h2>Listado de Componentes del Checklist</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tipo de Componente</th>
                        <th>Nombre de Componente</th>
                    </tr>
                </thead>
                <tbody>
                    {componentes.map((componente) => (
                        <tr key={componente.id}>
                            <td>{componente.tipo_componente}</td>
                            <td>{componente.nombre_componente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};