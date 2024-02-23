import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Hoja_de_vida = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState('');
  const [descripcionEquipo, setDescripcionEquipo] = useState([]);
  const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);
  const [caracteristicasMotor, setCaracteristicasMotor] = useState([]);
  const [historialReparaciones, setHistorialReparaciones] = useState([]);

  // Cargar la lista de máquinas al montar el componente
  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const response = await axios.get('http://localhost:4002/getMaquinas');
        // Ordenar las máquinas por la id de forma descendente
        const sortedMaquinas = response.data.sort((a, b) => b.id_maquina - a.id_maquina);
        setMaquinas(sortedMaquinas);
      } catch (error) {
        console.error('Error al obtener la lista de máquinas', error);
      }
    };

    fetchMaquinas();
  }, []);

  const handleMaquinaSelect = async (id_maquina) => {
    try {
      // Obtener la descripción del equipo por id_maquina
      const descripcionEquipoData = await axios.get(`http://localhost:4002/getDescripcionEquipoById/${id_maquina}`);
      setDescripcionEquipo(descripcionEquipoData.data);
      console.log('Descripción del Equipo:', descripcionEquipoData.data);

      // Obtener las características de la máquina por id_maquina
      const caracteristicasMaquinaData = await axios.get(`http://localhost:4002/getCaracteristicasMaquinaById/${id_maquina}`);
      setCaracteristicasMaquina(caracteristicasMaquinaData.data);
      console.log('Características de la Máquina:', caracteristicasMaquinaData.data);

      // Obtener las características del motor por id_maquina
      const caracteristicasMotorData = await axios.get(`http://localhost:4002/getCaracteristicasMotorById/${id_maquina}`);
      setCaracteristicasMotor(caracteristicasMotorData.data);
      console.log('Características del Motor:', caracteristicasMotorData.data);

      // Obtener el historial de reparaciones por id_maquina
      const historialReparacionesData = await axios.get(`http://localhost:4002/getHistorialReparacionesById/${id_maquina}`);
      setHistorialReparaciones(historialReparacionesData.data);
      console.log('Historial de Reparaciones:', historialReparacionesData.data);
    } catch (error) {
      console.error('Error al obtener la información de la máquina seleccionada', error);
    }
  };

  return (
    <div>
      <h1>Hoja de Vida</h1>
   

      {/* Botones para mostrar datos de cada máquina */}
      {maquinas.map((maquina) => (
        <div key={maquina.id_maquina}>
          <button onClick={() => handleMaquinaSelect(maquina.id_maquina)}>
            Mostrar Datos de {maquina.nombre_maquina}
          </button>
        </div>
      ))}

      <hr />

      {/* Información de la máquina seleccionada */}
      {descripcionEquipo.length > 0 && (
        <div>
          <h2>Descripción del Equipo</h2>
          {descripcionEquipo.map((item, index) => (
            <div key={index}>
              <p>Nombre: {item.nombre_equipo}</p>
              {/* Agrega más campos según sea necesario */}
            </div>
          ))}
        </div>
      )}

      {caracteristicasMaquina.length > 0 && (
        <div>
          <h2>Características de la Máquina</h2>
          {caracteristicasMaquina.map((item, index) => (
            <div key={index}>
              <p>Descripción: {item.descripcion_caracteristica}</p>
              {/* Agrega más campos según sea necesario */}
            </div>
          ))}
        </div>
      )}

      {caracteristicasMotor.length > 0 && (
        <div>
          <h2>Características del Motor</h2>
          {caracteristicasMotor.map((item, index) => (
            <div key={index}>
              <p>Marca: {item.marca_motor}</p>
              {/* Agrega más campos según sea necesario */}
            </div>
          ))}
        </div>
      )}

      {historialReparaciones.length > 0 && (
        <div>
          <h2>Historial de Reparaciones</h2>
          {historialReparaciones.map((item, index) => (
            <div key={index}>
              <p>Procedimiento: {item.procedimiento_historial}</p>
              {/* Agrega más campos según sea necesario */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
