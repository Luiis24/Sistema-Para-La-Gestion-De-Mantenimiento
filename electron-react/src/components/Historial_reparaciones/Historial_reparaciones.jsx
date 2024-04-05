import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectItem,
  Textarea,
  Input,
  Button
} from "@nextui-org/react";
import "./Historial_reparaciones.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'
import {Titulo_sena_cb} from '../Titulo_sena_cb/Titulo_sena_cb'

export const Historial_reparaciones = () => {
  const fechaActual = new Date().toISOString().split("T")[0]; // Cambiar el formato de fecha para postgres
  const [procedimiento_historial, setProcedimiento_historial] = useState("");
  const [insumos_usados_historial, setinsumos_usados_historial] = useState("");
  const [observaciones_historial, setObservaciones_historial] = useState("");
  const [fecha_historial, setFecha_historial] = useState(fechaActual);
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState("");
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getMaquinas`);
      setMaquinas(response.data.reverse());
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error al obtener las máquinas", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/crearHistorialReparaciones`, {
        id_maquina: selectedMaquina,
        procedimiento_historial,
        insumos_usados_historial,
        observaciones_historial,
        fecha_historial,
      });
      setIsLoading(false)
      toast.success('Registro en el historial de reparaciones exitoso')
      window.location.href = `/hojaVida/${selectedMaquina}`
    } catch (error) {
      setIsLoading(false)
      toast.error('Error al registrar en el historial de reparaciones')
      console.error(
        "Error al registrar en el historial de reparaciones",
        error
      );
    }
  };

  const handleselected = (e) => {
    setSelectedMaquina(e.target.value)
  }


  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className='container-rg-historial'>
      <ToastContainer />
      {isLoading ? <Cargando /> : ''}
      <div className="w-full flex justify-start"><Titulo_sena_cb/></div>
      <form onSubmit={handleFormSubmit} className='rg-caracteristicasM my-5'>
        <div className="titulo-registro-CM">
          <h2 className="Titulo-hlp">Historial de reparaciones</h2>
        </div>
        <div className='inp-registro-CM'>
          <div className="value-hr">
            <Select
              placeholder="Selecciona una máquina"
              onChange={handleselected}
            >
              {maquinas.map((maquina) => (
                <SelectItem
                  key={maquina.id_maquina}
                  value={maquina.id_maquina}
                >
                  {maquina.nombre_maquina}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="value-hr">
            <Textarea
              type="Textarea"
              placeholder="Describe el procedimiento realizado"
              value={procedimiento_historial}
              onChange={(event) =>
                setProcedimiento_historial(event.target.value)
              }
            />
          </div>
          <div className="value-hr">
            <Textarea
              type="Textarea"
              placeholder="Escribe los repuestos involucrados"
              value={insumos_usados_historial}
              onChange={(event) =>
                setinsumos_usados_historial(event.target.value)
              }
            />
          </div>
          <div className="value-hr">
            <Textarea
              type="Textarea"
              placeholder="Escribe las observaciones"
              value={observaciones_historial}
              onChange={(event) =>
                setObservaciones_historial(event.target.value)
              }
            />
          </div>
          <div className="value-hr">
            <Input
              type="text"
              placeholder="Fecha:"
              value={formatFecha(fecha_historial)}
              readOnly
            />
          </div>
        </div>
        <div className='btn-terminar'>
          <Link to={'/informes'} className='boton-cancelar-registroR'>
            <Button className="boton-cancelarR">
              <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
              </svg> Atrás
            </Button>
          </Link>
          <Button type="submit" className='boton-registrarR'>Registrar</Button>
        </div>
      </form>
    </div>
  );
};