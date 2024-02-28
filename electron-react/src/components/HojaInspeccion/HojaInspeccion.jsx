import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, SelectItem, Input, Select, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import './HojaInspeccion.css'
import { Link } from 'react-router-dom';

export const HojaInspeccion = () => {
    const fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    const [fecha, setFecha] = useState(fechaActual);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [componentes, setComponentes] = useState([]);
    const [estadosComponentes, setEstadosComponentes] = useState({});
    const [registros, setRegistros] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        // Obtener la lista de componentes al cargar el componente
        fetchComponentes();
        // Obtener los registros de estados
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
            // Crear un array de objetos con el formato necesario para la API
            const checklistData = Object.keys(estadosComponentes).map((componenteId) => ({
                id_componente: componenteId,
                estado_componente: estadosComponentes[componenteId],
            }));

            // Enviar datos al servidor
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
            <div className="containerTIOT">
                <Table>
                    <TableHeader>
                        <TableColumn className='text-lg'>Fecha</TableColumn>
                        <TableColumn className='text-lg'>Hora inicio</TableColumn>
                        <TableColumn className='text-lg ml-6'>Hora fin</TableColumn>
                        {componentes.map((componente) => (
                            <th key={componente.id_componente}>{componente.nombre_componente}</th>
                        ))}
                    </TableHeader>
                    <TableBody emptyContent={"Registre hoja de inspección."}>
                        {registros.map((registro) => (
                            <TableRow key={registro.id_registro}>
                                <TableCell>{registro.fecha}</TableCell>
                                <TableCell>{registro.hora_inicio}</TableCell>
                                <TableCell>{registro.hora_fin}</TableCell>
                                {componentes.map((componente) => (
                                    <td key={componente.id_componente}>{registro[componente.id_componente]}</td>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ToastContainer />
            <div className='button-inp flex justify-center btn-registrarIOT'>
                <Button className='button-inp' onPress={onOpen}>Hoja de inspección</Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement={"center"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl">Registrar hoja de inspección</ModalHeader>
                            <ModalBody className="modalIOT">
                                <form onSubmit={RegistrarCheckList} className='formHojaInspeccion'>
                                    <div className='campoHI'>
                                        <label className='w-2/4 text-base'>Fecha:</label>
                                        <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                                    </div>
                                    <div className='campoHI'>
                                        <label className='w-2/4 text-base'>Hora de inicio:</label>
                                        <Input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                                    </div>
                                    <div className='campoHI'>
                                        <label className='w-2/4 text-base'>Hora de fin:</label>
                                        <Input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
                                    </div>
                                    {componentes.map((componente) => (
                                        <div key={componente.id_componente} className='campoHI'>
                                            <label className='w-2/4 text-base'>{componente.tipo_componente} - {componente.nombre_componente}:</label>
                                            <Select
                                                value={estadosComponentes[componente.id_componente]}
                                                onChange={(e) => handleEstadoChange(componente.id_componente, e.target.value)}
                                                required
                                            >
                                                <SelectItem value="" disabled hidden>Estado del componente</SelectItem>
                                                <SelectItem value="bueno">Bueno</SelectItem>
                                                <SelectItem value="malo">Malo</SelectItem>
                                                <SelectItem value="notificar">Notificar</SelectItem>
                                            </Select>
                                        </div>
                                    ))}
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <div className='button-cerrar'>
                                    <Button className='text-slate-50 bg-red-500' variant="flat" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </div>
                                <div className='button-2-inp'>
                                    <Button className='text-white' type="submit" onPress={onClose}>
                                        Registrar
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
};