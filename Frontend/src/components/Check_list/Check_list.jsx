import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Check_list = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const [estadosComponentes, setEstadosComponentes] = useState({});
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
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

  const fetchComponentesByMaquina = async (idMaquina) => {
    try {
      const response = await axios.get(`http://localhost:4002/componenteChecklist/${idMaquina}`);
      const initialEstados = {};
      response.data.forEach((componente) => {
        initialEstados[componente.id_componente] = '';
      });
      setEstadosComponentes(initialEstados);
      setComponentes(response.data);
      setSelectedMaquina(idMaquina);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const estadosRegistrados = Object.entries(estadosComponentes).map(([id_componente, estado_componente]) => ({
        id_componente,
        estado_componente,
      }));

      await axios.post('http://localhost:4002/registerChecklist', {
        id_maquina: selectedMaquina,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        estadosComponentes: estadosRegistrados,
      });

      toast.success('Registro en la checklist exitoso');

      setEstadosComponentes({});
      setFecha('');
      setHoraInicio('');
      setHoraFin('');

    } catch (error) {
      console.error('Error al registrar en la checklist', error);
      toast.error('Error al registrar en la checklist');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Lista de Máquinas</h2>
      <ul>
        {maquinas.map((maquina) => (
          <p key={maquina.id_maquina}>
            <button onClick={() => fetchComponentesByMaquina(maquina.id_maquina)}>
              {maquina.nombre_maquina}
            </button>
          </p>
        ))}
      </ul>

      {selectedMaquina && (
        <div>
          <h2>Lista de Componentes del Checklist</h2>
          <p>Maquina seleccionada: {maquinas.find(maquina => maquina.id_maquina === selectedMaquina)?.nombre_maquina}</p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Fecha:
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            </label>
            <label>
              Hora de Inicio:
              <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
            </label>
            <label>
              Hora de Fin:
              <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
            </label>
            <ul>
              {componentes.map((componente) => (
                <li key={componente.id_componente}>
                  <label>
                    Tipo: {componente.tipo_componente}, Nombre: {componente.nombre_componente}
                    <select
                      value={estadosComponentes[componente.id_componente] || ''}
                      onChange={(e) => handleEstadoChange(componente.id_componente, e.target.value)}
                    >
                      {renderEstadoOptions(componente.nombre_componente)}
                    </select>
                  </label>
                </li>
              ))}
            </ul>
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};
