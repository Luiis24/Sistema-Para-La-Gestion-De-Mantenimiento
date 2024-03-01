import React, { useState, useEffect } from "react";
import axios from "axios";

export const Estado_componentes = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState({});
  const [historialRegistros, setHistorialRegistros] = useState([]);
  const [componentesNombres, setComponentesNombres] = useState([]);
  const [registrosAgrupados, setRegistrosAgrupados] = useState({});
  const [selectedMaquina, setSelectedMaquina] = useState(null);

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get("http://localhost:4002/GetMaquinas");
      setMaquinas(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de máquinas", error);
    }
  };

  const fetchUltimoRegistro = async (idMaquina) => {
    try {
      const response = await axios.get(
        `http://localhost:4002/GetUltimoRegistro/${idMaquina}`
      );
      setUltimoRegistro(response.data);
    } catch (error) {
      console.error("Error al obtener el último registro", error);
    }
  };

  const fetchHistorialRegistros = async (idMaquina) => {
    try {
      const response = await axios.get(
        `http://localhost:4002/GetHistorialRegistros/${idMaquina}`
      );
      setHistorialRegistros(response.data);

      // Agrupar por número de inspección
      const registrosAgrupados = agruparPorInspeccion(response.data);
      setRegistrosAgrupados(registrosAgrupados);
    } catch (error) {
      console.error("Error al obtener el historial de registros", error);
    }
  };

  const fetchComponentesNombres = async (idMaquina) => {
    try {
      const response = await axios.get(
        `http://localhost:4002/componenteChecklist/${idMaquina}`
      );
      setComponentesNombres(response.data);
    } catch (error) {
      console.error("Error al obtener los nombres de componentes", error);
    }
  };

  useEffect(() => {
    if (selectedMaquina) {
      fetchComponentesNombres(selectedMaquina);
    }
  }, [selectedMaquina]);

  const agruparPorInspeccion = (registros) => {
    const registrosAgrupados = {};

    registros.forEach((registro) => {
      const { num_inspeccion } = registro;

      if (!registrosAgrupados[num_inspeccion]) {
        registrosAgrupados[num_inspeccion] = [];
      }

      registrosAgrupados[num_inspeccion].push(registro);
    });

    return registrosAgrupados;
  };

  const obtenerNombreEstadoComponente = (idComponente, estadoComponente) => {
    const componente = componentesNombres.find(
      (comp) => comp.id_componente === idComponente
    );
    const nombreComponente = componente
      ? componente.nombre_componente
      : "Nombre no disponible";
    return `${nombreComponente} - ${estadoComponente}`;
  };

  const renderUltimoRegistroInfo = () => {
    if (!ultimoRegistro || !ultimoRegistro.estadosComponentes) {
      return null;
    }

    const componentesUltimoRegistro = ultimoRegistro.estadosComponentes;
    const ultimoNumInspeccion = Math.max(
      ...componentesUltimoRegistro.map((comp) => comp.num_inspeccion)
    );
    const componentesFiltrados = componentesUltimoRegistro.filter(
      (comp) => comp.num_inspeccion === ultimoNumInspeccion
    );

    return (
      <div>
        <h4>Último Registro</h4>
        {componentesFiltrados.map((componente) => (
          <div key={componente.id_componente}>
            <p>
              Nombre del componente:{" "}
              {obtenerNombreEstadoComponente(
                componente.id_componente,
                componente.estado_componente
              )}
            </p>
          </div>
        ))}
        <p>Fecha: {ultimoRegistro.fecha}</p>
        <p>Hora Inicio: {ultimoRegistro.hora_inicio}</p>
        <p>Hora Fin: {ultimoRegistro.hora_fin}</p>
      </div>
    );
  };

  return (
    <div>
      <h2>Estado de Componentes</h2>
      <ul>
        {maquinas.map((maquina) => (
          <div key={maquina.id_maquina}>
            <p>{maquina.nombre_maquina}</p>
            <button
              onClick={() => {
                setSelectedMaquina(maquina.id_maquina);
                fetchUltimoRegistro(maquina.id_maquina);
              }}
            >
              Ver Último Registro
            </button>
            <button
              onClick={() => {
                setSelectedMaquina(maquina.id_maquina);
                fetchHistorialRegistros(maquina.id_maquina);
              }}
            >
              Ver Historial de Registros
            </button>
          </div>
        ))}
      </ul>

      {selectedMaquina && (
        <div>
          <h3>
            Información para la Máquina:{" "}
            {
              maquinas.find((maquina) => maquina.id_maquina === selectedMaquina)
                ?.nombre_maquina
            }
          </h3>

          {renderUltimoRegistroInfo()}

          <div>
            <h4>Historial de Registros</h4>
            {Object.keys(registrosAgrupados)
              .sort((a, b) => b - a) // Ordenar las inspecciones en orden descendente
              .map((numInspeccion) => (
                <div key={numInspeccion}>
                  <h5>Número de Inspección: {numInspeccion}</h5>
                  {registrosAgrupados[numInspeccion].map((registro, index) => (
                    <div key={registro.id_checklist}>
                      {index === 0 && (
                        <>
                          <p>
                            Fecha:{" "}
                            {new Date(registro.fecha).toLocaleDateString()}
                          </p>
                          <p>Hora Inicio: {registro.hora_inicio}</p>
                          <p>Hora Fin: {registro.hora_fin}</p>
                        </>
                      )}
                      <p>
                        {obtenerNombreEstadoComponente(
                          registro.id_componente,
                          registro.estado_componente
                        )}
                      </p>
                      {/* Otros campos del registro */}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};