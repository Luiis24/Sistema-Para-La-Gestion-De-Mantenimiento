import React, { useState, useEffect } from "react";
import axios from "axios";

export const Historial_reparaciones = () => {
  const fechaActual = new Date().toISOString().split('T')[0]; // Cambiar el formato de fecha para postgres
  const [historial, setHistorial] = useState([]);
  const [procedimiento_historial, setProcedimiento_historial] = useState("");
  const [insumos_usados_historial, setinsumos_usados_historial] = useState("");
  const [observaciones_historial, setObservaciones_historial] = useState("");
  const [fecha_historial, setFecha_historial] = useState(fechaActual);
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState('');

  useEffect(() => {
    fetchHistorialReparaciones();
    fetchMaquinas();
  }, []);

  const fetchHistorialReparaciones = async () => {
    try {
      const response = await axios.get('http://localhost:4002/GetHistorialReparaciones');
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al obtener el historial de reparaciones', error);
    }
  };

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get('http://localhost:4002/getMaquinas');
      setMaquinas(response.data.reverse());
    } catch (error) {
      console.error('Error al obtener las máquinas', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:4002/crearHistorialReparaciones', {
        id_maquina: selectedMaquina,
        procedimiento_historial,
        insumos_usados_historial,
        observaciones_historial,
        fecha_historial,
      });

      console.log('Registro en el historial de reparaciones exitoso')
      fetchHistorialReparaciones();
    } catch (error) {
      console.error('Error al registrar en el historial de reparaciones', error);
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div>
      <h1>Historial de reparaciones</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Selecciona una máquina:</label>
          <select
          
            value={selectedMaquina}
            onChange={(event) => setSelectedMaquina(event.target.value)}
          >
           <option disable selected hidden> Tipo de Maquina</option>
            {maquinas.map((maquina) => (
              <option key={maquina.id_maquina} value={maquina.id_maquina}>
                {maquina.nombre_maquina}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Procedimiento realizado:</label>
          <textarea
            type="textarea"
            placeholder="Describe el procedimiento realizado"
            value={procedimiento_historial}
            onChange={(event) => setProcedimiento_historial(event.target.value)}
          />
        </div>
        <div>
          <label>Repuestos involucrados:</label>
          <textarea
            type="textarea"
            placeholder="Escribe los repuestos involucrados"
            value={insumos_usados_historial}
            onChange={(event) => setinsumos_usados_historial(event.target.value)}
          />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea
            type="textarea"
            placeholder="Escribe la marca del motor"
            value={observaciones_historial}
            onChange={(event) => setObservaciones_historial(event.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="text"
            value={formatFecha(fecha_historial)}
            readOnly
          />
        </div>
        <button type="submit">Registrar en el historial de reparaciones</button>
      </form>
      <div>
        <h2>Historial de Reparaciones Registrado</h2>
        <ul>
          {historial.map((registro) => (
            <li key={registro.id_registro}>
              <p>Procedimiento: {registro.procedimiento_historial}</p>
              <p>Repuestos involucrados: {registro.insumos_usados_historial}</p>
              <p>Observaciones: {registro.observaciones_historial}</p>
              <p>Fecha: {formatFecha(registro.fecha_historial)}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

