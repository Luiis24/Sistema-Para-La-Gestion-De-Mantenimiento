import React, { useState, useEffect } from "react";
import axios from "axios";
import { button } from "@nextui-org/react";

export const Estado_componentes = ({id_maquina}) => {
  const [maquinas, setMaquinas] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState({});
  const [historialRegistros, setHistorialRegistros] = useState([]);
  const [componentesNombres, setComponentesNombres] = useState([]);
  const [registrosAgrupados, setRegistrosAgrupados] = useState({});
  const [selectedMaquina, setSelectedMaquina] = useState(id_maquina);

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

  const fetchUltimoRegistro = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/GetUltimoRegistro/${selectedMaquina}`
      );
      setUltimoRegistro(response.data);
    } catch (error) {
      console.error("Error al obtener el último registro", error);
    }
  };

  const fetchHistorialRegistros = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/GetHistorialRegistros/${selectedMaquina}`
      );
      setHistorialRegistros(response.data);

      // Agrupar por número de inspección
      const registrosAgrupados = agruparPorInspeccion(response.data);
      setRegistrosAgrupados(registrosAgrupados);
    } catch (error) {
      console.error("Error al obtener el historial de registros", error);
    }
  };

  const fetchComponentesNombres = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/componenteChecklist/${selectedMaquina}`
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
      {/* <ul>
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
      </ul> */}
            <button
              onClick={() => {
                fetchHistorialRegistros();
              }}
            >
              Ver Historial de Registros
            </button>

      {selectedMaquina && (
        <div>

          {renderUltimoRegistroInfo()}

          <div>
            {Object.keys(registrosAgrupados)
              .sort((a, b) => b - a) // Ordenar las inspecciones en orden descendente
              .map((numInspeccion) => (
                <div key={numInspeccion} className="mb-3">
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