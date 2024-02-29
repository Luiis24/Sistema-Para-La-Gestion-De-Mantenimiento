import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Estado_componente = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState({});
  const [historialRegistros, setHistorialRegistros] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState(null);

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get('http://localhost:4002/GetMaquinas');
      setMaquinas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de máquinas', error);
    }
  };

  const fetchUltimoRegistro = async (idMaquina) => {
    try {
      const response = await axios.get(`http://localhost:4002/GetUltimoRegistro/${idMaquina}`);
      setUltimoRegistro(response.data);
    } catch (error) {
      console.error('Error al obtener el último registro', error);
    }
  };

  const fetchHistorialRegistros = async (idMaquina) => {
    try {
      const response = await axios.get(`http://localhost:4002/GetHistorialRegistros/${idMaquina}`);
      setHistorialRegistros(response.data);
    } catch (error) {
      console.error('Error al obtener el historial de registros', error);
    }
  };

  return (
    <div>
      <h2>Estado de Componentes</h2>
      <ul>
        {maquinas.map((maquina) => (
          <div key={maquina.id_maquina}>
            <p>{maquina.nombre_maquina}</p>
            <button onClick={() => {
              setSelectedMaquina(maquina.id_maquina);
              fetchUltimoRegistro(maquina.id_maquina);
            }}>Ver Último Registro</button>
            <button onClick={() => {
              setSelectedMaquina(maquina.id_maquina);
              fetchHistorialRegistros(maquina.id_maquina);
            }}>Ver Historial de Registros</button>
          </div>
        ))}
      </ul>

      {selectedMaquina && (
        <div>
          <h3>Información para la Máquina: {maquinas.find(maquina => maquina.id_maquina === selectedMaquina)?.nombre_maquina}</h3>

          <div>
            <h4>Último Registro</h4>
            <pre>{JSON.stringify(ultimoRegistro, null, 2)}</pre>
          </div>

          <div>
            <h4>Historial de Registros</h4>
            <ul>
              {historialRegistros.map((registro) => (
                <li key={registro.num_inspeccion}>
                  <p>Número de Inspección: {registro.num_inspeccion}</p>
                  <pre>{JSON.stringify(registro, null, 2)}</pre>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};