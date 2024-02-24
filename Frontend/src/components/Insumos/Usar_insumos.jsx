import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Usar_insumos = () => {
  const [insumos, setInsumos] = useState([]);
  const [ordenNombreAscendente, setOrdenNombreAscendente] = useState(true);
  const [ordenCantidadAscendente, setOrdenCantidadAscendente] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInsumoId, setSelectedInsumoId] = useState(null);
  const [cantidadUsar, setCantidadUsar] = useState(1);

  useEffect(() => {
    // Función para cargar la lista de insumos
    const fetchInsumos = async () => {
      try {
        const response = await axios.get('http://localhost:4002/GetInsumos');
        const insumosOrdenados = response.data.sort((a, b) =>
          ordenNombreAscendente
            ? a.nombre_insumo.localeCompare(b.nombre_insumo)
            : b.nombre_insumo.localeCompare(a.nombre_insumo)
        );
        setInsumos(insumosOrdenados);
      } catch (error) {
        console.error('Error al obtener la lista de insumos', error);
      }
    };

    fetchInsumos();
  }, [ordenNombreAscendente]);

  const handleToggleOrdenNombre = () => {
    setOrdenNombreAscendente((prev) => !prev);
  };

  const handleToggleOrdenCantidad = () => {
    const insumosOrdenados = [...insumos].sort((a, b) =>
      ordenCantidadAscendente
        ? a.cantidad_insumo - b.cantidad_insumo
        : b.cantidad_insumo - a.cantidad_insumo
    );
    setInsumos(insumosOrdenados);
    setOrdenCantidadAscendente((prev) => !prev);
  };

  const handleGestionarInsumo = (id) => {
    console.log("ID del insumo seleccionado:", id);
    setSelectedInsumoId(id);
    setModalVisible(true);
  };

  const handleSubmitModal = async (event) => {
    event.preventDefault();

    try {
      console.log("ID del insumo a usar:", selectedInsumoId);

      if (selectedInsumoId === null) {
        console.error('ID del insumo no definida');
        return;
      }

     await axios.post(`http://localhost:4002/UsarInsumo/${selectedInsumoId}`, {
  cantidad: cantidadUsar,
});

      console.log(`Insumo con ID ${selectedInsumoId} usado. Cantidad: ${cantidadUsar}`);
      setModalVisible(false);
    } catch (error) {
      console.error('Error al usar insumo', error);
    }
  };

  return (
    <div>
      <h1>Usar insumos</h1>
      <h2>Lista de Insumos</h2>
      <div>
        <button onClick={handleToggleOrdenNombre}>
          {ordenNombreAscendente ? 'Ordenar A-Z' : 'Ordenar Z-A'}
        </button>
        <button onClick={handleToggleOrdenCantidad}>
          {ordenCantidadAscendente ? 'Ordenar Mayor a Menor' : 'Ordenar Menor a Mayor'}
        </button>
      </div>
      <ul>
        {insumos.map((insumo) => (
          <li key={insumo.id_insumos}>
            {insumo.nombre_insumo} - Disponibles: {insumo.cantidad_insumo}
            <button onClick={() => handleGestionarInsumo(insumo.id_insumos)}>
              Gestionar Insumo
            </button>
          </li>
        ))}
      </ul>

      {modalVisible && (
        <div className="modal">
          <h3>Selecciona una opción:</h3>
          <form onSubmit={handleSubmitModal}>
            <label>
              Cantidad a usar:
              <input
                type="number"
                value={cantidadUsar}
                onChange={(e) => setCantidadUsar(e.target.value)}
                min={1}
              />
            </label>
            <button type="submit">Usar Insumo</button>
          </form>
          {/* Puedes agregar más opciones o botones según sea necesario */}
          <button onClick={() => handleModalOption('Devolver')}>Devolver Insumo</button>
        </div>
      )}
    </div>
  );
};
