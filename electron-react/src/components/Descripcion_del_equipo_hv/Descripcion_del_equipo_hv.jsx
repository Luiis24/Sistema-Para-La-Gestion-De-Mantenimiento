import React, { useState } from 'react';
import './Descripcion_del_equipo_hv.css'
import axios from 'axios';

const Descripcion_del_equipo_hv = () => {
  const fechaActual = new Date().toISOString().split('T')[0];
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [fechaFabricacion, setFechaFabricacion] = useState(fechaActual);
  const [fabricante_equipo, setFabricante_equipo] = useState('');
  const [ubicacion_equipo, setUbicacion_equipo] = useState('');
  const [caracteristicas_equipo, setCaracteristicas_equipo] = useState('');
  const [codigo_equipo, setCodigo_equipo] = useState('');
  const [modelo_equipo, setModelo_equipo] = useState('');
  const [num_serie_equipo, setNum_serie_equipo] = useState('');
  const [prioridad_equipo, setPrioridad_equipo] = useState('');
  const [voltaje_equipo, setVoltaje_equipo] = useState('');
  const [corriente_equipo, setCorriente_equipo] = useState('');
  const [frecuencia_equipo, setFrecuencia_equipo] = useState('');
  const [capacidad_equipo, setCapacidad_equipo] = useState('');
  const [peso_equipo, setPeso_equipo] = useState('');
  const [alimentacion_equipo, setAlimentacion_equipo] = useState('');
  const [sistema_electrico_equipo, setSistema_electrico_equipo] = useState('');
  const [sistema_electronico_equipo, setSistema_electronico_equipo] = useState('');
  const [sistema_mecanico_equipo, setSistema_mecanico_equipo] = useState('');
  const [sistema_neumatico_equipo, setSistema_neumatico_equipo] = useState('');
  const [sistema_hidraulico_equipo, setSistema_hidraulico_equipo] = useState('');
  const [sistema_termico_equipo, setSistema_termico_equipo] = useState('');
  
  const registrarEquipo = async (equipo) => {
    try {
      const response = await axios.post('http://localhost:4002/registrarEquipo', equipo);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error al registrar equipo', error);
    
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipo = {
      nombre_equipo: nombre,
      marca_equipo: marca,
      fecha_fabricacion_equipo:fechaFabricacion,
      fabricante_equipo: fabricante_equipo, 
      ubicacion_equipo:ubicacion_equipo, 
      caracteristicas_equipo:caracteristicas_equipo, 
      codigo_equipo:codigo_equipo, 
      modelo_equipo:modelo_equipo, 
      num_serie_equipo:num_serie_equipo, 
      prioridad_equipo:prioridad_equipo, 
      voltaje_equipo:voltaje_equipo, 
      corriente_equipo:corriente_equipo, 
      frecuencia_equipo:frecuencia_equipo, 
      capacidad_equipo:capacidad_equipo, 
      peso_equipo:peso_equipo, 
      alimentacion_equipo:alimentacion_equipo, 
      sistema_electrico_equipo:sistema_electrico_equipo, 
      sistema_electronico_equipo:sistema_electronico_equipo, 
      sistema_mecanico_equipo:sistema_mecanico_equipo, 
      sistema_neumatico_equipo:sistema_neumatico_equipo, 
      sistema_hidraulico_equipo:sistema_hidraulico_equipo, 
      sistema_termico_equipo:sistema_termico_equipo,
    };

    await registrarEquipo(equipo);
  };

  return (
    <div>
        <div className='nombreSistema'>
      <h1>Descripción del equipo</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del equipo:</label>
          <input
            type="text"
            placeholder="Nombre equipo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Marca del equipo:</label>
          <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de fabricación del equipo:</label>
          <input
            type="date"
            value={fechaFabricacion}
            onChange={(e) => setFechaFabricacion(e.target.value)}
          />
        </div>
        <div>
          <label>Fabricante del equipo:</label>
          <input
            type="text"
            placeholder="Fabricante del equipo"
            value={fabricante_equipo}
            onChange={(e) => setFabricante_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Ubicacion del equipo:</label>
          <input
            type="text"
            placeholder="Ubicacion del equipo"
            value={ubicacion_equipo}
            onChange={(e) => setUbicacion_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Caracteristicas del equipo:</label>
          <textarea
            placeholder="Marca"
            value={caracteristicas_equipo}
            onChange={(e) => setCaracteristicas_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Codigo del equipo:</label>
          <input
            type="text"
            placeholder="Codigo del equipo"
            value={codigo_equipo}
            onChange={(e) => setCodigo_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Modelo del equipo:</label>
          <input
            type="text"
            placeholder="Modelo del equipo"
            value={modelo_equipo}
            onChange={(e) => setModelo_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Numero de serie del equipo:</label>
          <input
            type="text"
            placeholder="Numero de serie del equipo"
            value={num_serie_equipo}
            onChange={(e) => setNum_serie_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Prioridad del equipo:</label>
          <input
            type="text"
            placeholder="Prioridad del equipo"
            value={prioridad_equipo}
            onChange={(e) => setPrioridad_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Voltaje del equipo:</label>
          <input
            type="text"
            placeholder="Escribe el voltaje del equipo"
            value={voltaje_equipo}
            onChange={(e) => setVoltaje_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Corriente del equipo:</label>
          <input
            type="text"
            placeholder="Escribe la corriente del equipo"
            value={corriente_equipo}
            onChange={(e) => setCorriente_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Frecuencia del equipo:</label>
          <input
            type="text"
            placeholder="Escribe la frecuencia del equipo"
            value={frecuencia_equipo}
            onChange={(e) => setFrecuencia_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Capacidad del equipo:</label>
          <input
            type="text"
            placeholder="Escribe la capacidad del equipo"
            value={capacidad_equipo}
            onChange={(e) => setCapacidad_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Peso del equipo:</label>
          <input
            type="text"
            placeholder="Escribe el peso del equipo"
            value={peso_equipo}
            onChange={(e) => setPeso_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Alimentación del equipo:</label>
          <input
            type="text"
            placeholder="Escribe el tipo de alimentación del equipo"
            value={alimentacion_equipo}
            onChange={(e) => setAlimentacion_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Sistema electrico del equipo:</label>
          <input
            type="text"
            placeholder="Escribe si el equipo cuenta con sistema electrico"
            value={sistema_electrico_equipo}
            onChange={(e) => setSistema_electrico_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Sistema electronico del equipo:</label>
          <input
            type="text"
            placeholder="Escribe si el equipo cuenta con sistema"
            value={sistema_electronico_equipo}
            onChange={(e) => setSistema_electronico_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Sistema mecanico del equipo:</label>
          <input
            type="text"
            placeholder="Escribe si el equipo cuenta con sistema mecanico"
            value={sistema_mecanico_equipo}
            onChange={(e) => setSistema_mecanico_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Sistema neumatico del equipo:</label>
          <input
            type="text"
            placeholder="Escribe si el equipo cuenta con sistema neumatico"
            value={sistema_neumatico_equipo}
            onChange={(e) => setSistema_neumatico_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Sistema hidraulico del equipo:</label>
          <input
            type="text"
            placeholder="Escribe si el equipo cuenta con sistema hidraulico"
            value={sistema_hidraulico_equipo}
            onChange={(e) => setSistema_hidraulico_equipo(e.target.value)}
          />
        </div>
        <div>
          <label>Sistema termico del equipo:</label>
          <input
            type="text"
            placeholder="Escribe si el equipo cuenta con sistema termico"
            value={sistema_termico_equipo}
            onChange={(e) => setSistema_termico_equipo(e.target.value)}
          />
        </div>
        <button type="submit">Registrar Equipo</button>
      </form>
    </div>
  );
};

export default Descripcion_del_equipo_hv;