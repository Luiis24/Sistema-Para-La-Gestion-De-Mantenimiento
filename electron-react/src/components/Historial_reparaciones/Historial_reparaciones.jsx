import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectItem,
  Textarea,
  Input,
  Button
} from "@nextui-org/react";
import "./Historial_reparaciones.css";
import { Link } from "react-router-dom";

export const Historial_reparaciones = () => {
  const fechaActual = new Date().toISOString().split("T")[0]; // Cambiar el formato de fecha para postgres
  const [procedimiento_historial, setProcedimiento_historial] = useState("");
  const [insumos_usados_historial, setinsumos_usados_historial] = useState("");
  const [observaciones_historial, setObservaciones_historial] = useState("");
  const [fecha_historial, setFecha_historial] = useState(fechaActual);
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState("");

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get("http://localhost:4002/getMaquinas");
      setMaquinas(response.data.reverse());
    } catch (error) {
      console.error("Error al obtener las máquinas", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedMaquina)

    try {
      await axios.post("http://localhost:4002/crearHistorialReparaciones", {
        id_maquina: selectedMaquina,
        procedimiento_historial,
        insumos_usados_historial,
        observaciones_historial,
        fecha_historial,
      });

      console.log("Registro en el historial de reparaciones exitoso");
    } catch (error) {
      console.error(
        "Error al registrar en el historial de reparaciones",
        error
      );
    }
  };

  const handleselected = (e) => {
    setSelectedMaquina(e.target.value)
  }


  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="Historial-rp">
      <div className="Historial-rp-bq">
        <h1 className="Titulo-hlp">Historial de reparaciones</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="container-hlp">
            <div className="section-hlp">
              <div className="value-hr">
                <Select
                  placeholder="Selecciona una máquina"
                  selectedKeys={selectedMaquina}
                  onChange={handleselected}
                >
                  <SelectItem disable selected hidden>
                    Maquinas registradas
                  </SelectItem>
                  {maquinas.map((maquina) => (
                    <SelectItem
                      key={maquina.id_maquina}
                      value={maquina.id_maquina}
                    >
                      {maquina.nombre_maquina}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="value-hr">
                <Textarea
                  type="Textarea"
                  placeholder="Describe el procedimiento realizado"
                  value={procedimiento_historial}
                  onChange={(event) =>
                    setProcedimiento_historial(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="container-hlp">
            <div className="section-hlp">
              <div className="value-hr">
                <Textarea
                  type="Textarea"
                  placeholder="Escribe los repuestos involucrados"
                  value={insumos_usados_historial}
                  onChange={(event) =>
                    setinsumos_usados_historial(event.target.value)
                  }
                />
              </div>
              <div className="value-hr">
                <Textarea
                  type="Textarea"
                  placeholder="Escribe las observaciones"
                  value={observaciones_historial}
                  onChange={(event) =>
                    setObservaciones_historial(event.target.value)
                  }
                />
              </div>
              <div className="value-hr">
                <Input
                  type="text"
                  placeholder="Fecha:"
                  value={formatFecha(fecha_historial)}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="Button-registrar-hlp">
            <Button type="submit">Registrar reparación</Button>
            <p><Link to={'/MenuPrincipal'}>wkcml</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};