import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Caracteristicas_maquina = () => {
  const [nombreCaracteristica, setNombreCaracteristica] = useState('');
  const [funcionMaquina, setFuncionMaquina] = useState('');
  const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);

  useEffect(() => {
    fetchCaracteristicasMaquina();
  }, []);

  const fetchCaracteristicasMaquina = async () => {
    try {
      const response = await axios.get('http://localhost:4002/GetCaracteristicasMaquina');
      setCaracteristicasMaquina(response.data);
    } catch (error) {
      console.error('Error al obtener las características de la máquina', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:4002/Crear_Caracteristica_Maquina', {
        nombre_caracteristica: nombreCaracteristica,
        funcion_maquina: funcionMaquina,
      });

      toast.success('Característica de máquina registrada exitosamente');
      fetchCaracteristicasMaquina();
    } catch (error) {
      console.error('Error al registrar la característica de la máquina', error);
      toast.error('Error al registrar la característica de la máquina');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Registro de características de máquina</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la característica:</label>
          <input
            type="text"
            placeholder="Nombre de la característica"
            value={nombreCaracteristica}
            onChange={(event) => setNombreCaracteristica(event.target.value)}
          />
        </div>
        <div>
          <label>Función de la máquina:</label>
          <input
            type="text"
            placeholder="Función de la máquina"
            value={funcionMaquina}
            onChange={(event) => setFuncionMaquina(event.target.value)}
          />
        </div>
        <button type="submit">Registrar Característica</button>
      </form>
      
      <div>
        <h3>Características de máquina registradas:</h3>
        <ul>
          {caracteristicasMaquina.map((caracteristica) => (
            <li key={caracteristica.id}>
              <p>Nombre: {caracteristica.nombre_caracteristica}</p>
              <p>Función: {caracteristica.funcion_maquina}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Caracteristicas_maquina;
