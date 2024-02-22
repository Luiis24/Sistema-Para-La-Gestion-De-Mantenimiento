import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '../Aprendices/PlusIcon';
import './Caracteristicas_maquina.css'

const Caracteristicas_maquina = () => {
    const [maquinas, setMaquinas] = useState([]);
    const [selectedMaquina, setSelectedMaquina] = useState('');
    const [caracteristicas, setCaracteristicas] = useState([{ id: '', nombre: '', descripcion: '' }]);
    const [funcionMaquina, setFuncionMaquina] = useState('');
    const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);

    useEffect(() => {
        fetchMaquinas();
        fetchCaracteristicasMaquina();
    }, []);

    const fetchMaquinas = async () => {
        try {
            const response = await axios.get('http://localhost:4002/maquinas');
            setMaquinas(response.data.reverse());
        } catch (error) {
            console.error('Error al obtener las máquinas', error);
        }
    };

    const fetchCaracteristicasMaquina = async () => {
        try {
            const response = await axios.get('http://localhost:4002/GetCaracteristicasMaquina');
            setCaracteristicasMaquina(response.data);
        } catch (error) {
            console.error('Error al obtener las características de la máquina', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Promise.all(
                caracteristicas.map(async (caracteristica) => {
                    if (caracteristica.id !== '') {
                        // Existing characteristic, update it
                        await axios.put(`http://localhost:4002/Actualizar_Caracteristica_Maquina/${caracteristica.id}`, {
                            nombre_caracteristica: caracteristica.nombre,
                            descripcion_caracteristica: caracteristica.descripcion,
                        });
                    } else {
                        // New characteristic, create it
                        await axios.post('http://localhost:4002/Crear_Caracteristica_Maquina', {
                            id_maquina: selectedMaquina,
                            nombre_caracteristica: caracteristica.nombre,
                            descripcion_caracteristica: caracteristica.descripcion,
                        });
                    }
                })
            );

            // Update or create function
            await axios.post('http://localhost:4002/Actualizar_Funcion_Maquina', {
                id_maquina: selectedMaquina,
                funcion_maquina: funcionMaquina,
            });

            toast.success('Características de máquina registradas exitosamente');
            fetchCaracteristicasMaquina();
            setCaracteristicas([{ id: '', nombre: '', descripcion: '' }]);
            setFuncionMaquina('');
        } catch (error) {
            console.error('Error al registrar las características de la máquina', error);
            toast.error('Error al registrar las características de la máquina');
        }
    };

    const handleDeleteCaracteristica = async (caracteristicaId) => {
        try {
            await axios.delete(`http://localhost:4002/Eliminar_Caracteristica_Maquina/${caracteristicaId}`);
            toast.success('Característica eliminada exitosamente');
            fetchCaracteristicasMaquina();
        } catch (error) {
            console.error('Error al eliminar la característica de la máquina', error);
            toast.error('Error al eliminar la característica de la máquina');
        }
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />

            <form onSubmit={handleSubmit} className='rg-caracteristicasMq'>
                <div className="titulo-registro-CM">
                    <h2>Registro de características de máquina</h2>
                </div>

                <div className='inp-registro-CM'>
                    <select
                        value={selectedMaquina}
                        onChange={(event) => setSelectedMaquina(event.target.value)}
                        className=' mt-3 h-14 bg-gray-100 rounded-md p-3'
                    >
                        <option value="">Seleccione una máquina</option>
                        {maquinas.map((maquina) => (
                            <option key={maquina.id_maquina} value={maquina.id_maquina}>
                                {maquina.nombre_maquina}
                            </option>
                        ))}
                    </select>

                    {caracteristicas.map((caracteristica, index) => (
                        <div key={index} className='col-carcateristicasM'>
                            <Input
                                type="text"
                                placeholder={`Nombre de la característica ${index + 1}`}
                                value={caracteristica.nombre}
                                onChange={(event) => {
                                    const updatedCaracteristicas = [...caracteristicas];
                                    updatedCaracteristicas[index].nombre = event.target.value;
                                    setCaracteristicas(updatedCaracteristicas);
                                }}
                            />
                            <Input
                                placeholder={`Descripción de la característica ${index + 1}`}
                                value={caracteristica.descripcion}
                                onChange={(event) => {
                                    const updatedCaracteristicas = [...caracteristicas];
                                    updatedCaracteristicas[index].descripcion = event.target.value;
                                    setCaracteristicas(updatedCaracteristicas);
                                }}
                            />
                            {caracteristica.id !== '' && (
                                <button type="button" onClick={() => handleDeleteCaracteristica(caracteristica.id)}>
                                    Eliminar Característica
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={() => setCaracteristicas([...caracteristicas, { id: '', nombre: '', descripcion: '' }])}
                            className="bg-foreground text-background h-12"
                            endContent={<PlusIcon style={{ fontSize: 'large' }} />}
                        >
                            Característica
                        </Button>
                    </div>
                    <div>
                        <textarea
                            type="text"
                            placeholder="Función de la máquina"
                            className='w-full mt-3 h-14 bg-gray-100 rounded-md p-3'
                            value={funcionMaquina}
                            onChange={(event) => setFuncionMaquina(event.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-5 p-3">
                    <Link to={'/tornos'} className='boton-cancelar-registro'>⮜ ‎ Atrás</Link>
                    <button type="submit" className='boton-registrar'>Registrar</button>
                </div>

            </form>

            {/* <div>
                <h3>Características de máquina registradas:</h3>
                <ul>
                    {caracteristicasMaquina.map((caracteristica) => (
                        <li key={caracteristica.id}>
                            <p>Nombre: {caracteristica.nombre_caracteristica}</p>
                            <p>Descripción: {caracteristica.descripcion_caracteristica}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
                <h3>Función de la máquina:</h3>
                <p>{funcionMaquina}</p>
            </div> */}
        </div>
    );
};

export default Caracteristicas_maquina;