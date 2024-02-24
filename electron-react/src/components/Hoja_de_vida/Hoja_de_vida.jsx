import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbars } from "../Navbars/Navbars";
import axios from "axios";
import "./Hoja_de_vida.css";
import {
  Input,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Select,
  SelectItem,
} from "@nextui-org/react";

export const Hoja_de_vida = () => {
  const { id_maquina } = useParams();
  const [historial, setHistorial] = useState([]);
  const [maquinaid, setMaquinaid] = useState();
  const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState("");
  const [marca_motor, setMarca_motor] = useState("");
  const [modelo_motor, setModelo_motor] = useState("");
  const [descripcion_motor, setDescripcion_motor] = useState("");
  const [serie_motor, setSerie_motor] = useState("");
  const [tamaño_motor, setTamaño_motor] = useState("");
  const [potencia_motor, setPotencia_motor] = useState("");
  const [rpm_motor, setRpm_motor] = useState("");
  const [voltaje_motor, setVoltaje_motor] = useState("");
  const [amp_motor, setAmp_motor] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4002/HojaVida/${id_maquina}`)
      .then((datos) => {
        const maquina = datos.data;
        setMaquinaid(maquina);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [id_maquina]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4002/crearCaracteristicasMotor", {
        id_maquina: selectedMaquina,
        marca_motor,
        modelo_motor,
        descripcion_motor,
        serie_motor,
        tamaño_motor,
        potencia_motor,
        rpm_motor,
        voltaje_motor,
        amp_motor,
      });

      console.log("Características del motor registradas exitosamente");
    } catch (error) {
      console.error("Error al registrar las características del motor", error);
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };
  return (
    <div>
      <Navbars></Navbars>
      <div className="containerM">
        <div className="navHorizontal">
          <Link to={`/checklistMaquina/${id_maquina}`}>
            <h2>
              CheckList
              <svg
                class="w-6 h-6 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6"
                />
              </svg>
            </h2>
          </Link>
          <Link to={`/OrdenDeTrabajo/${id_maquina}`}>
            <h2>
              Orden de trabajo
              <svg
                class="w-6 h-6 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                  clip-rule="evenodd"
                />
              </svg>
            </h2>
          </Link>
          <h2 id="active">
            Hoja de vida
            <svg
              class="w-6 h-6 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                clip-rule="evenodd"
              />
            </svg>
          </h2>
        </div>
        <div className="tituloSeccionOT">
          <h2>Descripción del equipo</h2>
        </div>
        <hr />
        <div className="containerHv">
          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Nombre-hv">Nombre</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Nombre-hv"
                placeholder="Nombre del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Marca-hv">Marca</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Marca-hv"
                placeholder="Marca del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Frecuencia-hv">Año de fabricación</label>
              <Input
                type="Text"
                className="w-11/12 h-11"
                name="Frecuencia-hv"
                placeholder="Año fabricación del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Fabricante-hv">Fabricante</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Fabricante-hv"
                placeholder="Nombre del fabricante"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Ubicación-hv">Ubicación</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Ubicación-hv"
                placeholder="Ubicación del equipo"
                readOnly
              ></Input>
            </div>
          </div>
          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Características-hv">Características</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Características-hv"
                placeholder="Escribe sus características"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Código-hv">Código</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Código-hv"
                placeholder="Código del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Modelo-hv">Modelo</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Modelo-hv"
                placeholder="Modelo del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-mecánico-hv">Número de serie</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-mecánico-hv"
                placeholder="Número de serie del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Prioridad-hv">Prioridad</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Prioridad-hv"
                placeholder="Prioridad del equipo"
                readOnly
              ></Input>
            </div>
          </div>
        </div>
        <hr />
        {/*Descripción técnica*/}
        <div className="tituloSeccionOT">
          <h2>Descripción técnica</h2>
        </div>
        <hr />
        <div className="containerHv">
          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Voltaje-hv">Voltaje</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Voltaje-hv"
                placeholder="Escribe el voltaje del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Corriente-hv">Corriente</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Corriente-hv"
                placeholder="Escribe la corriente del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Frecuencia-hv">Frecuencia</label>
              <Input
                type="Text"
                className="w-11/12 h-11"
                name="Frecuencia-hv"
                placeholder="Escribe la frecuencia del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Capacidad-hv">Capacidad</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Capacidad-hv"
                placeholder="Escribe la capacidad del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Peso-hv">Peso</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Peso-hv"
                placeholder="Escribe el peso del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Alimentación-hv">Alimentación</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Alimentación-hv"
                placeholder="Tipo de alimentación del equipo"
                readOnly
              ></Input>
            </div>
          </div>

          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Sistema-eléctrico-hv">Sistema eléctrico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-eléctrico-hv"
                placeholder="¿Cuenta con sistema eléctrico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-electrónico-hv">
                Sistema electrónico
              </label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-electrónico-hv"
                placeholder="¿Cuenta con sistema electrónico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-mecánico-hv">Sistema mecánico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-mecánico-hv"
                placeholder="¿Cuenta con sistema mecánico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-neumático-hv">Sistema neumático</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-neumático-hv"
                placeholder="¿Cuenta con sistema neumático?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-hidráulico-hv">Sistema hidráulico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-hidráulico-hv"
                placeholder="¿Cuenta con sistema hidráulico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-térmico-hv">Sistema térmico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema térmico-hv"
                placeholder="¿Cuenta con sistema térmico?"
                readOnly
              ></Input>
            </div>
          </div>
        </div>
        <hr />
        <div className="tituloSeccionOT">
          <h2>Datos del equipo - Características</h2>
        </div>
        <div className="container-table-hv">
          <Table>
            <TableHeader>
              <TableColumn className="text-lg">Nombre</TableColumn>
              <TableColumn className="text-lg">Descripción</TableColumn>
            </TableHeader>
            <TableBody>
              {caracteristicasMaquina.map((caracteristica) => (
                <TableRow key={caracteristica.id}>
                  <TableCell className="text-lg text-slate-400">
                    {" "}
                    {caracteristica.nombre_caracteristica}
                  </TableCell>
                  <TableCell className="text-lg text-slate-400">
                    {" "}
                    {caracteristica.descripcion_caracteristica}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <hr />
        <div className="tituloSeccionOT">
          <h2>Función del equipo</h2>
        </div>
        <hr />
        <div className="containerDOT">
          <Textarea
            placeholder="Describe las funciones del equipo"
            className="col-span-8 md:col-span-6 mb-6 md:mb-0"
            name="descripcion_de_trabajo"
          />
        </div>
        <hr />

        {/*Caracteísticas del motor*/}

        <div className="tituloSeccionOT">
          <h2>Características de los motores</h2>
        </div>
        <hr />
        <form onSubmit={handleFormSubmit}>
          <div className="containerHv">
            <div className="sectionHv">
              <div className="valueHv">
                <label>Marca del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe la marca del motor"
                  value={marca_motor}
                  onChange={(event) => setMarca_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>Modelo del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe el modelo del motor"
                  value={modelo_motor}
                  onChange={(event) => setModelo_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>Descripción del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Describe el motor"
                  value={descripcion_motor}
                  onChange={(event) => setDescripcion_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>Serie del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe la serie del motor"
                  value={serie_motor}
                  onChange={(event) => setSerie_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>Tamaño del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe el tamaño del motor"
                  value={tamaño_motor}
                  onChange={(event) => setTamaño_motor(event.target.value)}
                />
              </div>
            </div>
            <div className="sectionHv">
              <div className="valueHv">
                <label>Potencia del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escrie la potencia del motor"
                  value={potencia_motor}
                  onChange={(event) => setPotencia_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>RPM del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe las RPM del motor"
                  value={rpm_motor}
                  onChange={(event) => setRpm_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>Voltaje del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe el voltaje del motor"
                  value={voltaje_motor}
                  onChange={(event) => setVoltaje_motor(event.target.value)}
                />
              </div>
              <div className="valueHv">
                <label>AMP del motor:</label>
                <Input
                  readOnly
                  type="text"
                  placeholder="Escribe los AMP del motor"
                  value={amp_motor}
                  onChange={(event) => setAmp_motor(event.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
        <hr />
        <hr />

        {/*Historial reparaciones*/}
        <div className="tituloSeccionOT">
          <h2>Historial de reparaciones</h2>
        </div>
        <div className="container-table-hv">
          <Table>
            <TableHeader>
              <TableColumn className="text-lg">Procedimiento</TableColumn>
              <TableColumn className="text-lg">
                Repuestos involucrados
              </TableColumn>
              <TableColumn className="text-lg">Observaciones</TableColumn>
              <TableColumn className="text-lg">Fecha</TableColumn>
            </TableHeader>
            <TableBody>
              {historial.map((registro) => (
                <TableRow key={registro.id_registro}>
                  <TableCell className="text-lg text-slate-400">
                    {" "}
                    {registro.procedimiento_historial}
                  </TableCell>
                  <TableCell className="text-lg text-slate-400">
                    {registro.insumos_usados_historial}
                  </TableCell>
                  <TableCell className="text-lg text-slate-400">
                    {registro.observaciones_historial}
                  </TableCell>
                  <TableCell className="text-lg text-slate-400">
                    {formatFecha(registro.fecha_historial)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <hr />
      </div>
    </div>
  );
};
