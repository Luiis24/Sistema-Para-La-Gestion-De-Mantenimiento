import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from '@nextui-org/react';

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
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/componenteChecklist`);
            setComponentes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de componentes del checklist', error);
        }
    };

    const RegistrarComponente = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/registerComponenteChecklist`, {
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
            <form className='flex gap-5 flex-col m-5'>
                
            <h2>Registro de Componentes del Checklist</h2>
                <div>
                    <label htmlFor="tipoComponente">Tipo de Componente o Sistema:</label>
                     <select id="tipoComponente" value={tipoComponente} 
                        onChange={(event) => setTipoComponente(event.target.value)} className='w-full h-12 bg-gray-100 br-5'>
                            <option disable selected hidden>Componente o Sistema</option>
                            <option value="Componente Electrico">Componente Electrico</option>
                            <option value="Componente Mecanico">Componente Mecánico</option>
                            <option value="Estados de la Maquina">Estados de la Maquina</option>
                            <option value="Funcionamiento Electrico">Funcionamiento Electrico</option>
                            <option value="Motor">Motor</option>
                            <option value="Niveles de Aceite">Niveles de Aceite</option>
                            <option value="Sistema de Lubricacion">Sistema de Lubricación</option>
                            <option value="Sistema Electrico">Sistema Electrico</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="nombreComponente">Nombre de Componente:</label>
                    <Input
                        type="text"
                        id="nombreComponente"
                        value={nombreComponente}
                        onChange={(event) => setNombreComponente(event.target.value)}
                    />
                </div>
                <div>
                    <Button type="button" onClick={RegistrarComponente}>Registrar Componente</Button>
                </div>
            </form>

            <h2>Listado de Componentes del Checklist</h2>
            <Table>
                <TableHeader>
                        <TableColumn>Tipo de componente</TableColumn>
                        <TableColumn>Nombre de componente</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Error."}>
                {componentes.map((componente) => (
                        <TableRow key={componente.id}>
                            <TableCell>{componente.tipo_componente}</TableCell>
                            <TableCell>{componente.nombre_componente}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};