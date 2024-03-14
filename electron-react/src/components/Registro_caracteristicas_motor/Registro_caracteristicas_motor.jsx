import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registro_caracteristicas_motor.css'
import { Link } from 'react-router-dom';
import { Input, Select, SelectItem, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Registro_caracteristicas_motor = () => {
    const [maquinas, setMaquinas] = useState([]);
    const [selectedMaquina, setSelectedMaquina] = useState('');
    const [ultimaMaquina, setUltimaMaquina] = useState('');

    const [marca_motor, setMarca_motor] = useState('');
    const [modelo_motor, setModelo_motor] = useState('');
    const [descripcion_motor, setDescripcion_motor] = useState('');
    const [serie_motor, setSerie_motor] = useState('');
    const [tamaño_motor, setTamaño_motor] = useState('');
    const [potencia_motor, setPotencia_motor] = useState('');
    const [rpm_motor, setRpm_motor] = useState('');
    const [voltaje_motor, setVoltaje_motor] = useState('');
    const [amp_motor, setAmp_motor] = useState('');
    const {isLoading, setIsLoading} = useLoading();

    // Cargar la lista de máquinas al montar el componente
    useEffect(() => {
        const fetchMaquinas = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ultimaMaquina`);
                setSelectedMaquina(response.data.id_maquina);
                setUltimaMaquina(response.data.nombre_maquina);
                setIsLoading(false)
            } catch (error) {
              setIsLoading(false)
                console.error('Error al obtener la lista de máquinas', error);
            }
        };

        fetchMaquinas();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
          setIsLoading(true)
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/crearCaracteristicasMotor`, {
                id_maquina: selectedMaquina,
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
            setIsLoading(false)
            toast.success('Características registradas exitosamente');
            window.location.href = '/crearComponentesCheck'
        } catch (error) {
          setIsLoading(false)
            toast.error('Error al registrar carcaterísticas')
            console.error('Error al registrar las características del motor', error);
        }
    };

    return (
      <div className="container-rg-caracteristicasMotor">
      <ToastContainer />
      {isLoading ? <Cargando/> : ''}
      <form onSubmit={handleFormSubmit} className="rg-caracteristicasM">
        <div className="titulo-registro-CM">
          <h1>Características del motor</h1>
        </div>
        <div className="inputs-registo-motor">
            <div className="fila-1">
          <Input
            value={ultimaMaquina}
            isDisabled
          />
          <div className="section-edp">
            <Input
              className="mt-8"
              type="text"
              placeholder="Marca del motor"
              value={marca_motor}
              onChange={(event) => setMarca_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="Modelo del motor"
              value={modelo_motor}
              onChange={(event) => setModelo_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="Describe el motor"
              value={descripcion_motor}
              onChange={(event) => setDescripcion_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="Serie del motor"
              value={serie_motor}
              onChange={(event) => setSerie_motor(event.target.value)}
            />
          </div>
          </div>
          <div className="fila-2">
          <div className="section-edp">
            <Input
            className=""
              type="text"
              placeholder="Tamaño del motor"
              value={tamaño_motor}
              onChange={(event) => setTamaño_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="Potencia del motor"
              value={potencia_motor}
              onChange={(event) => setPotencia_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="RPM del motor"
              value={rpm_motor}
              onChange={(event) => setRpm_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="Voltaje del motor"
              value={voltaje_motor}
              onChange={(event) => setVoltaje_motor(event.target.value)}
            />
          </div>
          <div className="section-edp">
            <Input
            className="mt-8"
              type="text"
              placeholder="AMP del motor"
              value={amp_motor}
              onChange={(event) => setAmp_motor(event.target.value)}
            />
          </div>
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