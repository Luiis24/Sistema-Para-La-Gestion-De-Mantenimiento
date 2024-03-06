import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Pagination } from "@nextui-org/react";
import './Estado_componentes.css'
import logoSena from '../../img/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Estado_componentes = ({ id_maquina, modalVisible, onClose }) => {
  const [maquinas, setMaquinas] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState({});
  const [historialRegistros, setHistorialRegistros] = useState([]);
  const [componentesNombres, setComponentesNombres] = useState([]);
  const [registrosAgrupados, setRegistrosAgrupados] = useState({});
  const [selectedMaquina, setSelectedMaquina] = useState(id_maquina);

  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 1;


  useEffect(() => {
    fetchMaquinas();
    fetchHistorialRegistros();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/GetMaquinas`);
      setMaquinas(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de máquinas", error);
    }
  };

  const fetchUltimoRegistro = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/GetUltimoRegistro/${selectedMaquina}`
      );
      setUltimoRegistro(response.data);
    } catch (error) {
      console.error("Error al obtener el último registro", error);
    }
  };

  const fetchHistorialRegistros = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/GetHistorialRegistros/${selectedMaquina}`
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
        `${process.env.REACT_APP_API_BASE_URL}/componenteChecklist/${selectedMaquina}`
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
    return (
      <div className="componentesEstado">
        <h3>{nombreComponente}</h3>
        <h3>{estadoComponente}</h3>
      </div>
    )
  };

  // const renderUltimoRegistroInfo = () => {
  //   if (!ultimoRegistro || !ultimoRegistro.estadosComponentes) {
  //     return null;
  //   }

  //   const componentesUltimoRegistro = ultimoRegistro.estadosComponentes;
  //   const ultimoNumInspeccion = Math.max(
  //     ...componentesUltimoRegistro.map((comp) => comp.num_inspeccion)
  //   );
  //   const componentesFiltrados = componentesUltimoRegistro.filter(
  //     (comp) => comp.num_inspeccion === ultimoNumInspeccion
  //   );


  //   return (
  //     <div>
  //       <h4>Último Registro</h4>
  //       {componentesFiltrados.map((componente) => (
  //         <div key={componente.id_componente}>
  //           <p>
  //             Nombre del componente:{" "}
  //             {obtenerNombreEstadoComponente(
  //               componente.id_componente,
  //               componente.estado_componente
  //             )}
  //           </p>
  //         </div>
  //       ))}
  //       <p>Fecha: {ultimoRegistro.fecha}</p>
  //       <p>Hora Inicio: {ultimoRegistro.hora_inicio}</p>
  //       <p>Hora Fin: {ultimoRegistro.hora_fin}</p>
  //     </div>
  //   );
  // };

  // modal
  const renderGruposPorPagina = () => {
    const startIndex = (paginaActual - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    const numInspecciones = Object.keys(registrosAgrupados)
      .sort((a, b) => b - a); // Ordenar las inspecciones en orden descendente

    // Obtener los grupos de inspecciones en la página actual
    const gruposPagina = numInspecciones.slice(startIndex, endIndex);

    if (gruposPagina.length === 0) {
      return null // No hay grupos de inspección, por lo tanto, no renderizar el modal
    }

    return (
      <div className={modalVisible ? 'modal-EC' : 'hidden'}>
      <div className={modalVisible ? 'container-modal-EC' : 'hidden'}>

        <div className="headModal">
          <div className="flex items-center">
          <img src={logoSena}></img>
          <h2 className="text-lg font-semibold">SGMI</h2>
          </div>
          <button onClick={onClose} className="cerrarModal">cerrar</button>
        </div>

        {gruposPagina.map((numInspeccion) => (

          <div key={numInspeccion} className="mb-3">
            <h5 className="px-2 mb-2">Número de Inspección: {numInspeccion}</h5>
            <hr/>
            {registrosAgrupados[numInspeccion].map((registro, index) => (
              <div key={registro.id_checklist} className="registro">
                {index === 0 && (
                  <>
                    <div className="containerOT">
                      <div className="sectionOT">
                        <div className="valueOT">
                          <label>Fecha:</label>
                          <Input value={new Date(registro.fecha).toLocaleDateString()} required />
                        </div>
                        <div className="valueOT">
                          <label>Hora de Inicio:</label>
                          <Input value={registro.hora_inicio} required />
                        </div>
                        <div className="valueOT">
                          <label>Hora de Fin:</label>
                          <Input value={registro.hora_fin} required />
                        </div>
                        <div className="valueOT">
                          <label>Ficha:</label>
                          <Input value={registro.ficha_aprendiz} readOnly />
                        </div>
                      </div>
                      <div className="sectionOT">
                        <div className="valueOT">
                          <label>Operario:</label>
                          <Input value={registro.operario} readOnly />
                        </div>
                        <div className="valueOT">
                          <label>Número de Identificación:</label>
                          <Input value={registro.num_doc_aprendiz} readOnly />
                        </div>
                        <div className="valueOT">
                          <label>Programa de Formación:</label>
                          <Input value={registro.programa_aprendiz} readOnly />
                        </div>
                        <div className="valueOT">
                          <label>Equipo:</label>
                          <Input value={registro.equipo_aprendiz} readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="txEstados">
                      <h3>Estado de los componentes</h3>
                    </div>
                  </>
                )}
                    {obtenerNombreEstadoComponente(
                      registro.id_componente,
                      registro.estado_componente
                    )}
              </div>
            ))}
          </div>
        ))}
        {renderPaginador()}
      </div>
      </div>
    );
  };

  // paginador
  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  }

  const renderPaginador = () => {
    const totalPaginas = Math.ceil(Object.keys(registrosAgrupados).length / itemsPorPagina);

    return (
      <div className="paginadorEC">
        <Pagination total={totalPaginas} initialPage={paginaActual} onChange={cambiarPagina} color="default"></Pagination>
      </div>
    );
  };
  

  return (

      renderGruposPorPagina()
  );
};