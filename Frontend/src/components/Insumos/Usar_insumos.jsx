import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Usar_insumos = () => {
  const [insumos, setInsumos] = useState([]);
  const [ordenNombreAscendente, setOrdenNombreAscendente] = useState(true);
  const [ordenCantidadAscendente, setOrdenCantidadAscendente] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInsumoId, setSelectedInsumoId] = useState(null);
  const [cantidadUsar, setCantidadUsar] = useState(1);
  const [maxCantidadUsar, setMaxCantidadUsar] = useState(1);
  const [selectedInsumoNombre, setSelectedInsumoNombre] = useState("");
  const [modalDevolucionVisible, setModalDevolucionVisible] = useState(false);
  const [cantidadDevolver, setCantidadDevolver] = useState(1);
  const [maxCantidadDevolver, setMaxCantidadDevolver] = useState(1);

  useEffect(() => {
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

    const insumoSeleccionado = insumos.find((insumo) => insumo.id_insumos === id);
    const maxCantidad = insumoSeleccionado.cantidad_insumo - (insumoSeleccionado.insumos_en_uso || 0);
    setMaxCantidadUsar(maxCantidad);

    setSelectedInsumoNombre(insumoSeleccionado.nombre_insumo);

    setModalVisible(true);
    setModalDevolucionVisible(false);
  };

  const handleDevolverInsumo = (id) => {
    console.log("ID del insumo seleccionado para devolver:", id);
    setSelectedInsumoId(id);

    const insumoSeleccionado = insumos.find((insumo) => insumo.id_insumos === id);
    setMaxCantidadDevolver(insumoSeleccionado.insumos_en_uso || 0);

    setSelectedInsumoNombre(insumoSeleccionado.nombre_insumo);

    setModalDevolucionVisible(true);
    setModalVisible(false);
  };

  const handleSubmitModal = async (event) => {
    event.preventDefault();

    try {
      console.log("ID del insumo a usar:", selectedInsumoId);

      if (selectedInsumoId === null) {
        console.error('ID del insumo no definida');
        return;
      }

      if (cantidadUsar > maxCantidadUsar) {
        console.error('La cantidad ingresada supera la cantidad disponible');
        return;
      }

      await axios.post(`http://localhost:4002/UsarInsumo/${selectedInsumoId}`, {
        id_insumo: selectedInsumoId,
        cantidad: cantidadUsar,
      });

      console.log(`Insumo con ID ${selectedInsumoId} usado. Cantidad: ${cantidadUsar}`);
      setModalVisible(false);
    } catch (error) {
      console.error('Error al usar insumo', error);
    }
  };

  const handleSubmitDevolucionModal = async (event) => {
    event.preventDefault();

    try {
      console.log("ID del insumo a devolver:", selectedInsumoId);

      if (selectedInsumoId === null) {
        console.error('ID del insumo no definida');
        return;
      }

      if (cantidadDevolver > maxCantidadDevolver) {
        console.error('La cantidad ingresada supera la cantidad en uso');
        return;
      }

      await axios.post(`http://localhost:4002/DevolverInsumo/${selectedInsumoId}`, {
        id_insumo: selectedInsumoId,
        cantidad: cantidadDevolver,
      });

      console.log(`Insumo con ID ${selectedInsumoId} devuelto. Cantidad: ${cantidadDevolver}`);
      setModalDevolucionVisible(false);
    } catch (error) {
      console.error('Error al devolver insumo', error);
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
            {insumo.nombre_insumo} - Disponibles: {insumo.cantidad_insumo - (insumo.insumos_en_uso || 0)}
            <button onClick={() => handleGestionarInsumo(insumo.id_insumos)}>
              Usar Insumo
            </button>
            <button onClick={() => handleDevolverInsumo(insumo.id_insumos)}>
              Devolver Insumo
            </button>
          </li>
        ))}
      </ul>

      {modalVisible && (
        <div className="modal">
          <h3>Selecciona una opción para {selectedInsumoNombre}:</h3>
          <form onSubmit={handleSubmitModal}>
            <label>
              Cantidad a usar (máximo {maxCantidadUsar}):
              <input
                type="number"
                value={cantidadUsar}
                onChange={(e) => setCantidadUsar(e.target.value)}
                min={1}
                max={maxCantidadUsar}
              />
            </label>
            <button type="submit">Usar Insumo</button>
          </form>
        </div>
      )}

      {modalDevolucionVisible && (
        <div className="modal">
          <h3>Selecciona una opción para devolver {selectedInsumoNombre}:</h3>
          <form onSubmit={handleSubmitDevolucionModal}>
            <label>
              Cantidad a devolver (máximo {maxCantidadDevolver}):
              <input
                type="number"
                value={cantidadDevolver}
                onChange={(e) => setCantidadDevolver(e.target.value)}
                min={1}
                max={maxCantidadDevolver}
              />
            </label>
            <button type="submit">Devolver Insumo</button>
          </form>
        </div>
      )}
    </div>
  );
};
