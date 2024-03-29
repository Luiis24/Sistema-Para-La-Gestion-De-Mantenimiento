import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Select, SelectItem, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import './Registro_componente_check.css'
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Registro_componentes_check = () => {
  const [tipoComponente, setTipoComponente] = useState('');
  const [nombreComponente, setNombreComponente] = useState('');
  const [componentes, setComponentes] = useState([]);
  const [ultimaMaquina, setUltimaMaquina] = useState('');
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true)
    fetchUltimaMaquina();
    fetchComponentes();
    setIsLoading(false)
  }, []);

  const fetchUltimaMaquina = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ultimaMaquina`);
      setUltimaMaquina(response.data.nombre_maquina);
    } catch (error) {
      console.error('Error al obtener la última máquina registrada', error);
    }
  };

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
      setIsLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/registerComponenteChecklist`, {
        tipo_componente: tipoComponente,
        nombre_componente: nombreComponente
      });

      setIsLoading(false)
      toast.success('Componente registrado exitosamente');

      fetchComponentes();

      fetchUltimaMaquina();
    } catch (error) {
      setIsLoading(false)
      console.error('Error al registrar componente del checklist', error);
      toast.error('Error al registrar componente del checklist');
    }
  }; console.log(tipoComponente)

  return (
    <div className='container-rg-caracteristicasM'>
      <ToastContainer />
      {isLoading ? <Cargando /> : ''}
      <form className="rg-componentes" onSubmit={RegistrarComponente}>
        <div className="titulo-registro-CM">
          <h2>Registro de componentes {ultimaMaquina}</h2>
        </div>
        <div className="inp-registro-CM">
          <div className="mt-3">
            <Select
              placeholder="Tipo de componente o sistema"
              id="tipoComponente"
              selectedKeys={tipoComponente}
              onChange={(event) => setTipoComponente(event.target.value)}
            >
              <SelectItem value="Componente Electrico">
                Componente eléctrico
              </SelectItem>
              <SelectItem value="Componente Mecanico">
                Componente mecánico
              </SelectItem>
              <SelectItem value="Estados de la Maquina">
                Estados de la máquina
              </SelectItem>
              <SelectItem value="Funcionamiento Electrico">
                Funcionamiento eléctrico
              </SelectItem>
              <SelectItem value="Motor">Motor</SelectItem>
              <SelectItem value="Niveles de Aceite">
                Niveles de aceite
              </SelectItem>
              <SelectItem value="Sistema de Lubricacion">
                Sistema de lubricación
              </SelectItem>
              <SelectItem value="Sistema Electrico">
                Sistema eléctrico
              </SelectItem>
            </Select>
          </div>

          <div className="input-check">
            <Input
              className="mt-8"
              type="text"
              id="nombreComponente"
              placeholder="Nombre del componente"
              value={nombreComponente}
              onChange={(event) => setNombreComponente(event.target.value)}
            />
          </div>
        </div>
        <div className="btn-terminar-ch">
          <Link to={"/tornos"} className='boton-cancelar-registroR'>
            <Button className="boton-cancelarR">
              <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
              </svg> Atrás
            </Button>
          </Link>
          <Button type="submit" className="boton-registrarR">
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
};  