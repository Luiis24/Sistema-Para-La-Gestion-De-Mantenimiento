import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Textarea } from '@nextui-org/react';
import { PlusIcon } from '../Aprendices/PlusIcon';
import './Caracteristicas_maquina.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'
import { DeleteIcon } from "../Tabla_insumos_ot/DeleteIcon";

const Caracteristicas_maquina = () => {
    const [ultimaMaquina, setUltimaMaquina] = useState('');
    const [selectedMaquina, setSelectedMaquina] = useState('');
    const [caracteristicas, setCaracteristicas] = useState([{ id: 0, nombre: '', descripcion: '' }]);
    const [funcionMaquina, setFuncionMaquina] = useState('');
    const { isLoading, setIsLoading } = useLoading();
    const [idCounter, setIdCounter] = useState(1);
    useEffect(() => {
        fetchMaquinas();
    }, []);

    const fetchMaquinas = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ultimaMaquina`);
            setUltimaMaquina(response.data.nombre_maquina);
            setSelectedMaquina(response.data.id_maquina)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error al obtener las máquinas', error);
        }
    };console.log(caracteristicas)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await Promise.all(
                caracteristicas.map(async (caracteristica) => {
                    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Crear_Caracteristica_Maquina`, {
                        id_maquina: selectedMaquina,
                        nombre_caracteristica: caracteristica.nombre,
                        descripcion_caracteristica: caracteristica.descripcion,
                    });
                    // if (caracteristica.id !== '') {
                    //     // Existing characteristic, update it
                    //     await axios.put(`${process.env.REACT_APP_API_BASE_URL}/Actualizar_Caracteristica_Maquina/${caracteristica.id}`, {
                    //         nombre_caracteristica: caracteristica.nombre,
                    //         descripcion_caracteristica: caracteristica.descripcion,
                    //     });
                    // } else {
                    //     // New characteristic, create it
                    //     await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Crear_Caracteristica_Maquina`, {
                    //         id_maquina: selectedMaquina,
                    //         nombre_caracteristica: caracteristica.nombre,
                    //         descripcion_caracteristica: caracteristica.descripcion,
                    //     });
                    // }
                })
            );

            // Update or create function
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Actualizar_Funcion_Maquina`, {
                id_maquina: selectedMaquina,
                funcion_maquina: funcionMaquina,
            });
            setIsLoading(false)
            toast.success('Características de máquina registradas exitosamente');
            window.location.href = '/crearCaracteristicasMotor';
        } catch (error) {
            setIsLoading(false)
            console.error('Error al registrar las características de la máquina', error);
            toast.error('Error al registrar las características de la máquina');
        }
    };

    const handleDeleteCaracteristica = (caracteristicaIndex) => {
        const updatedCaracteristicas = caracteristicas.filter((_, index) => index !== caracteristicaIndex);
        setCaracteristicas(updatedCaracteristicas);
    };

    const scrollCarcateristicas = () => {
        const container_cm = document.getElementById('container-col-CM');
        container_cm.classList.add('overflow-y-scroll');
    };

    const addNewCaracteristica = () => {
        const newCaracteristica = {
            id: idCounter,
            nombre: '',
            descripcion: ''
        };
        setCaracteristicas([...caracteristicas, newCaracteristica]);
        setIdCounter(prevCounter => prevCounter + 1);
        scrollCarcateristicas();
    };

    return (
        <div className='container-rg-caracteristicasM'>
            <ToastContainer />
            {isLoading ? <Cargando /> : ''}
            <form onSubmit={handleSubmit} className='rg-caracteristicasMq'>
                <div className="titulo-registro-CM">
                    <h2>Registro características de {ultimaMaquina}</h2>
                </div>

                <div className='inp-registro-CM'>
                    <div className="container-col-CM" id='container-col-CM'>
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
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCaracteristica(index)}
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={addNewCaracteristica}
                            className="bg-foreground text-background h-12"
                            endContent={<PlusIcon style={{ fontSize: 'large' }} />}
                        >
                            Característica
                        </Button>
                    </div>
                    <div>
                        <Textarea
                            type="text"
                            disableAutosize
                            placeholder="Función de la máquina"
                            className='w-full mt-3 h-18 p-3'
                            value={funcionMaquina}
                            onChange={(event) => setFuncionMaquina(event.target.value)}
                        />
                    </div>
                </div>
                <div className="btn-hv">
                    <Button type="submit" className="boton-registrar">
                        Siguiente
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default Caracteristicas_maquina;
