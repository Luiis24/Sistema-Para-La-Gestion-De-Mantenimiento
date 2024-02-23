import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export const Insumos = () => {
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [fechaLlegadaInsumo, setFechaLlegadaInsumo] = useState(new Date().toISOString().split('T')[0]);
  const [cantidadInsumo, setCantidadInsumo] = useState('');
  const [proveedorInsumo, setProveedorInsumo] = useState('');
  const [insumos, setInsumos] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4002/RegistrarInsumo', {
        nombre_insumo: nombreInsumo,
        fecha_llegada_insumo: fechaLlegadaInsumo,
        cantidad_insumo: cantidadInsumo,
        proveedor_insumo: proveedorInsumo,
      });

      console.log(response.data);

      setNombreInsumo('');
      setFechaLlegadaInsumo(new Date().toISOString().split('T')[0]);
      setCantidadInsumo('');
      setProveedorInsumo('');

      // Después de registrar un nuevo insumo, llamar de nuevo para actualizar la lista
      fetchInsumos();
    } catch (error) {
      console.error('Error al registrar insumos', error);
    }
  };

  // Obtener la lista de insumos al montar el componente
  useEffect(() => {
    fetchInsumos();
  }, []); // Llamar solo al montar el componente

  const fetchInsumos = async () => {
    try {
      const response = await axios.get('http://localhost:4002/GetInsumos');
      // Ordenar los insumos por fecha de llegada (más nuevo arriba)
      const sortedInsumos = response.data.sort((a, b) => new Date(b.fecha_llegada_insumo) - new Date(a.fecha_llegada_insumo));
      setInsumos(sortedInsumos);
      console.log('Datos de insumos obtenidos:', sortedInsumos);
    } catch (error) {
      console.error('Error al obtener la lista de insumos', error);
    }
  };

  return (
    <div>
      <h1>Almacen de insumos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del insumo:</label>
          <input
            type="text"
            value={nombreInsumo}
            onChange={(e) => setNombreInsumo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de llegada del insumo:</label>
          <input
            type="date"
            value={fechaLlegadaInsumo}
            onChange={(e) => setFechaLlegadaInsumo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad del insumo:</label>
          <input
            type="number"
            value={cantidadInsumo}
            onChange={(e) => setCantidadInsumo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Proveedor del insumo:</label>
          <input
            type="text"
            value={proveedorInsumo}
            onChange={(e) => setProveedorInsumo(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrar Insumo</button>
      </form>

      {/* Mostrar la tabla de insumos */}
      <h2>Insumos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de llegada</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Usando</th>
            <th>Disponibles</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((insumo) => (
            <tr key={insumo.id_insumos}>
              <td>{insumo.nombre_insumo}</td>
              <td>{format(new Date(insumo.fecha_llegada_insumo), 'dd/MM/yyyy')}</td>
              <td>{insumo.proveedor_insumo}</td>
              <td>{insumo.cantidad_insumo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
