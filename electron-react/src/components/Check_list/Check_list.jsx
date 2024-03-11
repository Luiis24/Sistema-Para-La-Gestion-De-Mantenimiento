import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { useAuth } from '../../estados/usuario';

export const Check_list = ({ id_maquina }) => {
    const [componentes, setComponentes] = useState([]);
    const [estadosComponentes, setEstadosComponentes] = useState({});
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [selectedMaquina, setSelectedMaquina] = useState(id_maquina);
    const [users, setUsers] = useState([]);
    const [formOperarios, setFormOperarios] = useState()
    const {user, rol} = useAuth();

    useEffect(() => {
        fetchComponentesByMaquina();
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/aprendices`)
            .then(datos => {
                setUsers(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const fetchComponentesByMaquina = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/componenteChecklist/${selectedMaquina}`);
            const initialEstados = {};
            response.data.forEach((componente) => {
                initialEstados[componente.id_componente] = '';
            });
            setEstadosComponentes(initialEstados);

            // Agrupar componentes por tipo_componente
            const groupedComponentes = response.data.reduce((acc, componente) => {
                if (!acc[componente.tipo_componente]) {
                    acc[componente.tipo_componente] = [];
                }
                acc[componente.tipo_componente].push(componente);
                return acc;
            }, {});
            setComponentes(groupedComponentes);
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
    const handleOperario = (e) => {
            const { name, value } = e.target;
            if (name === "nombre") {
                // Buscar el aprendiz seleccionado
                const selectedAprendiz = users.find(user => user.id_aprendiz === parseInt(value));
                // Actualizar el estado con el nombre y el id_insumo seleccionados, y establecer el valor máximo para la cantidad
                setFormOperarios({
                    ...formOperarios,
                    [name]: value,
                    nombre: selectedAprendiz.nombre_aprendiz,
                    num_doc_aprendiz: selectedAprendiz.num_doc_aprendiz,
                    ficha_aprendiz: selectedAprendiz.ficha_aprendiz,
                    programa_aprendiz: selectedAprendiz.programa_aprendiz,
                    equipo_aprendiz: selectedAprendiz.equipo_aprendiz
                });
    
            } else {
                // setformInsumos({
                //     ...formInsumos,
                //     [name]: value,
                //     subtotal: subtotal
                // });
            }
    }

    const handleFormSubmit = async (event) => {
        console.log('enviando')
        event.preventDefault();

        // Verificar que los valores necesarios estén presentes
        if (!selectedMaquina || !fecha || !horaInicio || !horaFin) {
            toast.error('Por favor, complete todos los campos antes de enviar.');
            return;
        }

        try {
            const estadosRegistrados = Object.entries(estadosComponentes).map(([id_componente, estado_componente]) => ({
                id_componente,
                estado_componente,
            }));

            console.log('Datos a enviar:', {
                id_maquina: selectedMaquina,
                fecha,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                estadosComponentes: estadosRegistrados,
                ficha_aprendiz: user.ficha_aprendiz ? user.ficha_aprendiz : formOperarios.ficha_aprendiz,
                operario: user.nombre_aprendiz ? user.nombre_aprendiz : formOperarios.nombre,
                num_doc_aprendiz: user.num_doc_aprendiz ? user.num_doc_aprendiz : formOperarios.num_doc_aprendiz,
                programa_aprendiz: user.programa_aprendiz ? user.programa_aprendiz : formOperarios.programa_aprendiz,
                equipo_aprendiz: user.equipo_aprendiz ? user.equipo_aprendiz : formOperarios.equipo_aprendiz
            });

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/registerChecklist`, {
                id_maquina: selectedMaquina,
                fecha,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                estadosComponentes: estadosRegistrados,
                ficha_aprendiz: user.ficha_aprendiz,
                operario: user.nombre_aprendiz,
                num_doc_aprendiz: user.num_doc_aprendiz,
                programa_aprendiz: user.programa_aprendiz,
                equipo_aprendiz: user.equipo_aprendiz
            });

            toast.success('Registro en la checklist exitoso');
            setEstadosComponentes({});
            setFecha('');
            setHoraInicio('');
            setHoraFin('');
            window.location.href = "/tornos"


        } catch (error) {
            console.error('Error al registrar en la checklist', error);
            toast.error('Error al registrar en la checklist. Por favor, inténtelo nuevamente.');
        }
    };


    return (
        <div>
            <ToastContainer />

            <form onSubmit={handleFormSubmit}>
                <div className="containerOT">
                    <div className="sectionOT">
                        <div className="valueOT">
                            <label>Fecha:</label>
                            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                        </div>
                        <div className="valueOT">
                            <label> Hora de Inicio:</label>
                            <Input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                        </div>
                        <div className="valueOT">
                            <label>Hora de Fin:</label>
                            <Input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
                        </div>
                        <div className="valueOT">
                            <label>Ficha:</label>
                            <Input value={user.ficha_aprendiz} readOnly/>
                        </div>
                    </div>
                    <div className="sectionOT">
                        <div className="valueOT">
                            <label>Operario:</label>
                            {rol === 'Instructor' ? 
                            <Select placeholder='operario' name='nombre' onChange={handleOperario}>
                                {users.map(user => 
                                    <SelectItem key={user.id_aprendiz} value={user.id_aprendiz}>{user.nombre_aprendiz}</SelectItem>
                                )}

                            </Select>
                            : <Input value={user.nombre_aprendiz ? user.nombre_aprendiz : 'instructor'} readOnly/>}
                        </div>
                        <div className="valueOT">
                            <label>N.Identificacion:</label>
                            <Input value={user.num_doc_aprendiz} readOnly/>
                        </div>
                        <div className="valueOT">
                            <label>Programa Formacion:</label>
                            <Input value={user.programa_aprendiz} readOnly/>
                        </div>
                        <div className="valueOT">
                            <label>Equipo:</label>
                            <Input value={user.equipo_aprendiz} readOnly />
                        </div>
                    </div>
                </div>

                {Object.entries(componentes).map(([tipo, componentesTipo]) => (
                    <div key={tipo}>
                        <div className="nombreSistema">
                            <h2>{tipo}</h2>
                        </div>
                        <div className='containerComponentes'>
                            {componentesTipo.map((componente) => (
                                <div className='nombreComponente' key={componente.id_componente}>
                                    <label>
                                        {componente.nombre_componente}
                                    </label>
                                    <select
                                        // value={estadosComponentes[componente.id_componente] || ''}
                                        onChange={(e) => handleEstadoChange(componente.id_componente, e.target.value)}
                                        className='2xl:w-72 w-64 h-14'
                                    >
                                        <option selected hidden>{estadosComponentes[componente.id_componente] || ''}</option>
                                        {renderEstadoOptions(componente.nombre_componente)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="button-inp flex justify-center btn-registrarIOT">
                    <Button className='rgCheckList' type='submit' onClick={() => handleFormSubmit}>Registrar</Button>
                </div>
            </form>

        </div>
    );
};

// ALTER TABLE IF EXISTS public.checklist
//     ADD COLUMN ficha_aprendiz integer;

// ALTER TABLE IF EXISTS public.checklist
//     ADD COLUMN operario character varying;

// ALTER TABLE IF EXISTS public.checklist
//     ADD COLUMN num_doc_aprendiz integer;

// ALTER TABLE IF EXISTS public.checklist
//     ADD COLUMN programa_aprendiz character varying;

// ALTER TABLE IF EXISTS public.checklist
//     ADD COLUMN equipo_aprendiz integer;