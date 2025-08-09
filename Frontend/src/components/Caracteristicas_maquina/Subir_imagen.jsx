import React, { useState } from "react";
import axios from "axios";

export const Subir_imagen = () => {
  const [image, setImage] = useState();
  const [imagen_maquina, setImagen_maquin] = useState();

  const submitImage = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("imagen_maquina", imagen_maquina);

    try {
      await axios.post("http://localhost:4002/Caracteristicas_maquina", {
        imagen_maquina: imagen_maquina,
        formData,
      });

      console.log("Caracteristicas de la máquina registradas exitosamente");
    } catch (error) {
      console.error(
        "Error al registrar las caracteristicas de la máquina",
        error
      );
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImagen_maquin(e.target.files[0]);
  };

  return (
    <div>
      <h3>IMAGEN</h3>
      <div>
        <form onSubmit={submitImage}>
          <label>Imagen de la maquina (opcional):</label>
          <input
            type="file"
            placeholder="Sube una imagen de la maquina"
            accept="image/*"
            onChange={onInputChange}
          />
          <div></div>
          <button type="submit">Subir Imagen</button>
        </form>
      </div>
    </div>
  );
};
