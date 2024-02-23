import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Descripcion_del_equipo_hv.css";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";

export const Descripcion_del_equipo_hv = () => {
  const fechaActual = new Date().toISOString().split("T")[0];
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState("");
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [fechaFabricacion, setFechaFabricacion] = useState(fechaActual);
  const [fabricante_equipo, setFabricante_equipo] = useState("");
  const [ubicacion_equipo, setUbicacion_equipo] = useState("");
  const [caracteristicas_equipo, setCaracteristicas_equipo] = useState("");
  const [codigo_equipo, setCodigo_equipo] = useState("");
  const [modelo_equipo, setModelo_equipo] = useState("");
  const [num_serie_equipo, setNum_serie_equipo] = useState("");
  const [prioridad_equipo, setPrioridad_equipo] = useState("");
  const [voltaje_equipo, setVoltaje_equipo] = useState("");
  const [corriente_equipo, setCorriente_equipo] = useState("");
  const [frecuencia_equipo, setFrecuencia_equipo] = useState("");
  const [capacidad_equipo, setCapacidad_equipo] = useState("");
  const [peso_equipo, setPeso_equipo] = useState("");
  const [alimentacion_equipo, setAlimentacion_equipo] = useState("");
  const [sistema_electrico_equipo, setSistema_electrico_equipo] = useState("");
  const [sistema_electronico_equipo, setSistema_electronico_equipo] =
    useState("");
  const [sistema_mecanico_equipo, setSistema_mecanico_equipo] = useState("");
  const [sistema_neumatico_equipo, setSistema_neumatico_equipo] = useState("");
  const [sistema_hidraulico_equipo, setSistema_hidraulico_equipo] =
    useState("");
  const [sistema_termico_equipo, setSistema_termico_equipo] = useState("");

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get("http://localhost:4002/getMaquinas");
      setMaquinas(response.data.reverse()); // Reversing the order to display newer machines first
    } catch (error) {
      console.error("Error al obtener las máquinas", error);
    }
  };

  const registrarEquipo = async (equipo) => {
    try {
      const response = await axios.post(
        "http://localhost:4002/registrarEquipo",
        equipo
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar equipo", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipo = {
      id_maquina: selectedMaquina,
      nombre_equipo: nombre,
      marca_equipo: marca,
      fecha_fabricacion_equipo: fechaFabricacion,
      fabricante_equipo: fabricante_equipo,
      ubicacion_equipo: ubicacion_equipo,
      caracteristicas_equipo: caracteristicas_equipo,
      codigo_equipo: codigo_equipo,
      modelo_equipo: modelo_equipo,
      num_serie_equipo: num_serie_equipo,
      prioridad_equipo: prioridad_equipo,
      voltaje_equipo: voltaje_equipo,
      corriente_equipo: corriente_equipo,
      frecuencia_equipo: frecuencia_equipo,
      capacidad_equipo: capacidad_equipo,
      peso_equipo: peso_equipo,
      alimentacion_equipo: alimentacion_equipo,
      sistema_electrico_equipo: sistema_electrico_equipo,
      sistema_electronico_equipo: sistema_electronico_equipo,
      sistema_mecanico_equipo: sistema_mecanico_equipo,
      sistema_neumatico_equipo: sistema_neumatico_equipo,
      sistema_hidraulico_equipo: sistema_hidraulico_equipo,
      sistema_termico_equipo: sistema_termico_equipo,
    };

    await registrarEquipo(equipo);
  };

  return (
    <div className="registro-hv-componente">
      <div className="Registro-descripcion-hv">
        <div className="titulo-registro">
          <h1>Descripción del equipo</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs-registro-hv">
            <div className="Primera-fila-input">
              <div>
                <label className="label-hv">Seleccionar máquina:</label>
                <Select
                  className="w-64"
                  placeholder="Selecciona máquina"
                  value={selectedMaquina}
                  onChange={(event) => setSelectedMaquina(event.target.value)}
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
              <div>
                <label className="label-hv">Nombre del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Nombre equipo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Marca del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Marca"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">
                  Fecha de fabricación del equipo:
                </label>
                <Input
                  type="date"
                  className="w-64"
                  value={fechaFabricacion}
                  onChange={(e) => setFechaFabricacion(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Fabricante del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Fabricante del equipo"
                  value={fabricante_equipo}
                  onChange={(e) => setFabricante_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Ubicacion del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Ubicación del equipo"
                  value={ubicacion_equipo}
                  onChange={(e) => setUbicacion_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Características del equipo:</label>
                <Textarea
                  placeholder="Escribe sus características"
                  value={caracteristicas_equipo}
                  onChange={(e) => setCaracteristicas_equipo(e.target.value)}
                />
              </div>
            </div>
            {/*Segunda fila*/}
            <div className="segunda-fila-input">
              <div>
                <label className="label-hv">Código del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Codigo del equipo"
                  value={codigo_equipo}
                  onChange={(e) => setCodigo_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Modelo del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Modelo del equipo"
                  value={modelo_equipo}
                  onChange={(e) => setModelo_equipo(e.target.value)}
                />
              </div>

              <div>
                <label className="label-hv">Número de serie del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Número de serie del equipo"
                  value={num_serie_equipo}
                  onChange={(e) => setNum_serie_equipo(e.target.value)}
                />
              </div>

              <div>
                <label className="label-hv">Prioridad del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Prioridad del equipo"
                  value={prioridad_equipo}
                  onChange={(e) => setPrioridad_equipo(e.target.value)}
                />
              </div>

              <div>
                <label className="label-hv">Voltaje del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Escribe el voltaje del equipo"
                  value={voltaje_equipo}
                  onChange={(e) => setVoltaje_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Corriente del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Escribe la corriente del equipo"
                  value={corriente_equipo}
                  onChange={(e) => setCorriente_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Frecuencia del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Escribe la frecuencia del equipo"
                  value={frecuencia_equipo}
                  onChange={(e) => setFrecuencia_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Capacidad del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Escribe la capacidad del equipo"
                  value={capacidad_equipo}
                  onChange={(e) => setCapacidad_equipo(e.target.value)}
                />
              </div>
            </div>
            {/*tercera fila*/}
            <div className="tercera-fila-input">
              <div>
                <label className="label-hv">Peso del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Escribe el peso del equipo"
                  value={peso_equipo}
                  onChange={(e) => setPeso_equipo(e.target.value)}
                />
              </div>

              <div>
                <label className="label-hv">Alimentación del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="Tipo de alimentación del equipo"
                  value={alimentacion_equipo}
                  onChange={(e) => setAlimentacion_equipo(e.target.value)}
                />
              </div>

              <div>
                <label className="label-hv">
                  Sistema eléctrico del equipo:
                </label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="¿Cuenta con sistema eléctrico?"
                  value={sistema_electrico_equipo}
                  onChange={(e) => setSistema_electrico_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">
                  Sistema electrónico del equipo:
                </label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="¿Cuenta con sistema electrónico?"
                  value={sistema_electronico_equipo}
                  onChange={(e) =>
                    setSistema_electronico_equipo(e.target.value)
                  }
                />
              </div>
              <div>
                <label className="label-hv">Sistema mecánico del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="¿Cuenta con sistema mecánico?"
                  value={sistema_mecanico_equipo}
                  onChange={(e) => setSistema_mecanico_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">
                  Sistema neumático del equipo:
                </label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="¿Cuenta con sistema neumático?"
                  value={sistema_neumatico_equipo}
                  onChange={(e) => setSistema_neumatico_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">
                  Sistema hidráulico del equipo:
                </label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="¿Cuenta con sistema hidráulico?"
                  value={sistema_hidraulico_equipo}
                  onChange={(e) => setSistema_hidraulico_equipo(e.target.value)}
                />
              </div>
              <div>
                <label className="label-hv">Sistema térmico del equipo:</label>
                <Input
                  type="text"
                  className="w-64"
                  placeholder="¿Cuenta con sistema térmico?"
                  value={sistema_termico_equipo}
                  onChange={(e) => setSistema_termico_equipo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="buttons-hv">
            <div className="button-cancelar-hv">
              <Button type="submit">⮜ ‎ Atrás</Button>
            </div>
            <div className="button-registrar-hv">
              <Button type="submit">Registrar equipo</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Descripcion_del_equipo_hv;
