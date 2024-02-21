import React, { useState, useEffect } from "react";
import "./Orden_trabajo_maquina.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import logoSena from "../../img/logo.png";
import menu from "../../img/menu.png";
import { Tabla_insumos_ot } from "../Tabla_insumos_ot/Tabla_insumos_ot";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Tabla_mecanicos_ot } from "../Tabla_mecanicos_ot/Tabla_mecanicos";
import { useAuth } from "../../estados/usuario";

export const Orden_trabajo_maquina = () => {
  const [maquinaid, setMaquinaid] = useState();
  const [formOT, setFormOT] = useState();
  const [formMecanicos, setFormMecanicos] = useState();
  const [formInsumos, setformInsumos] = useState();
  const { id_maquina } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:4002/ordenDeTrabajo/${id_maquina}`)
      .then((datos) => {
        const maquina = datos.data;
        setMaquinaid(maquina);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [id_maquina]);

  const registrarOrdenDeTrabajo = async () => {
    try {
      // const response = await axios.post('http://localhost:4002/registerOrdenTrabajo', {
      //   id_orden_de_trabajo: 1,
      //   fecha_inicio_ot: formOT.fecha_inicio_ot,
      //   hora_inicio_ot: formOT.hora_inicio_ot,
      //   fecha_fin_ot: formOT.fecha_fin_ot,
      //   hora_fin_ot: formOT.hora_fin_ot,
      //   p_formacion:,
      //   total_horas_ot: formOT.total_horas_ot,
      //   precio_hora: formOT.precio_hora,
      //   total_mano_obra: formOT.total_mano_obra,
      //   ficha_ot:,
      //   ubicacion_ot: formOT.ubicacion_ot,
      //   nombre_maquina_ot: maquinaid.nombre_maquina,
      //   id_maquina: maquinaid.id_maquina,
      //   tipo_de_trabajo: formOT.tipo_de_trabajo,
      //   tipo_de_mantenimiento: formOT.tipo_de_mantenimiento,
      //   tipo_de_sistema: formOT.tipo_de_sistema,
      //   mecanicos_responsables: formMecanicos,
      //   descripcion_de_trabajo: formOT.descripcion_de_trabajo,
      //   insumos_utilizados: formInsumos,
      //   subtotal,
      //   iva,
      //   costo_mantenimiento
      // });

      // console.log(response.data)

      console.log(formOT.fecha_inicio_ot);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormOT({
      ...formOT,
      [name]: value,
    });
    console.log(formOT);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registrarOrdenDeTrabajo(formOT);
  };

  return (
    <div>
      <div className="containerM">
        <div className="navHorizontal">
          <h2>
            <Link to={"/checklistMaquina"}>Checklist</Link>
          </h2>
          <h2 id="active">Orden de trabajo</h2>
          <Link to={'/hoja-de-vida'}><h2>Hoja de vida</h2></Link>

          <Link to={"/"} className="homeR">
            <img className="logoSenaR" src={logoSena} alt="logo Sena"></img>
          </Link>
          <input type="checkbox" id="navbar-toggle"></input>
          <label htmlFor="navbar-toggle" className="menu-responsive">
            <img className="menuR" src={menu} alt="menu"></img>
          </label>

          <ul className="navListR">
            <li>
              <Link to={"/tornos"}>Tornos</Link>
            </li>
            <li id="activeMaquina">Wiston 1</li>
            <li>Wiston 2</li>
            <li>Wiston 3</li>
            <li>Red Start</li>
          </ul>
        </div>

        <div className="tituloSeccionOT">
          <h2>
            Formato orden de trabajo {maquinaid ? maquinaid.nombre_maquina : ""}
          </h2>
        </div>
        <hr />
        <form onSubmit={handleSubmit} name="OrdenDeTrabajo">
          <div className="containerOT">
            <div className="sectionOT">
              <div className="valueOT">
                <label htmlFor="fecha_inicio_ot">Fecha inicio</label>
                <Input
                  type="date"
                  className="w-11/12 h-11"
                  name="fecha_inicio_ot"
                  onChange={handleChange}
                ></Input>
              </div>

              <div className="valueOT">
                <label htmlFor="hora_inicio_ot">Hora inicio</label>
                <Input
                  type="time"
                  className="w-11/12 h-11"
                  placeholder="00:00"
                  name="hora_inicio_ot"
                  onChange={handleChange}
                ></Input>
              </div>

              <div className="valueOT">
                <label htmlFor="fecha_fin_ot">Fecha finalización</label>
                <Input
                  type="date"
                  className="w-11/12 h-11"
                  name="fecha_fin_ot"
                  onChange={handleChange}
                ></Input>
              </div>

              <div className="valueOT">
                <label htmlFor="hora_fin_ot">Hora finalización</label>
                <Input
                  type="time"
                  className="w-11/12 h-11"
                  name="hora_fin_ot"
                  onChange={handleChange}
                ></Input>
              </div>

              <div className="valueOT">
                <label htmlFor="p_formacion">Programa de formación</label>
                <Input
                  type="search"
                  className="w-11/12 h-11"
                  name="p_formacion"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
            <div className="sectionOT">
              <div className="valueOT">
                <label htmlFor="total_horas_ot">Total horas trabajadas</label>
                <Input
                  type="number"
                  className="w-11/12 h-11"
                  name="total_horas_ot"
                  onChange={handleChange}
                ></Input>
              </div>

              <div className="valueOT">
                <label htmlFor="precio_hora">Precio hora-hombre</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-11/12 h-11"
                  name="precio_hora"
                  onChange={handleChange}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>

              <div className="valueOT">
                <label htmlFor="total_mano_obra">Total mano de obra</label>
                <Input
                  type="number"
                  name="total_mano_obra"
                  placeholder="0.00"
                  className="w-11/12 h-11"
                  disabled
                  onChange={handleChange}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>

              <div className="valueOT">
                <label htmlFor="ficha_ot">Ficha</label>
                <Input
                  type="search"
                  className="w-11/12 h-11"
                  name="ficha_ot"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </div>
          <hr />
          <div className="tituloSeccionOT">
            <h3>Mecánicos responsables</h3>
          </div>
          <hr />

          <div className="containerOT">
            <div className="sectionOT">
              <div className="valueOT">
                <label htmlFor="ubicacion_ot">
                  Ubicación (lugar donde se realiza el trabajo)
                </label>
                <Input
                  type="text"
                  className="w-11/12 h-11"
                  name="ubicacion_ot"
                  onChange={handleChange}
                />
              </div>
              <div className="valueOT">
                <label htmlFor="nombre_maquina_ot">
                  Nombre de la maquina o equipo al intervenir
                </label>
                <Input
                  type="text"
                  name="nombre_maquina_ot"
                  className="w-11/12 h-11"
                  value={maquinaid ? maquinaid.nombre_maquina : ""}
                  disabled
                  onChange={handleChange}
                />
              </div>
              <div className="valueOT">
                <label htmlFor="id_maquina">
                  Codigo de la maquina o equipo
                </label>
                <Input
                  type="number"
                  name="id_maquina"
                  className="w-11/12 h-11"
                  value={maquinaid ? maquinaid.id_maquina : ""}
                  disabled
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sectionOT">
              <div className="valueOT">
                <label>Tipo de trabajo</label>
                <Select
                  className="w-11/12 h-11"
                  placeholder="Inspección"
                  name="tipo_de_trabajo"
                  onChange={handleChange}
                >
                  <SelectItem>Inspección</SelectItem>
                  <SelectItem>Servicio</SelectItem>
                  <SelectItem>Reparación</SelectItem>
                  <SelectItem>Modificación</SelectItem>
                  <SelectItem>Fabricación</SelectItem>
                  <SelectItem>Montaje</SelectItem>
                  <SelectItem>Desmontaje</SelectItem>
                  <SelectItem>Cambio</SelectItem>
                </Select>
              </div>
              <div className="valueOT">
                <label>Tipo de mantenimiento</label>
                <Select
                  className="w-11/12 h-11"
                  placeholder="Correctivo no planificado"
                  name="tipo_de_mantenimiento"
                  onChange={handleChange}
                >
                  <SelectItem>Correctivo no planificado</SelectItem>
                  <SelectItem>Correctivo planificado</SelectItem>
                  <SelectItem>Mantenimiento preventivo</SelectItem>
                  <SelectItem>Basado en el tiempo</SelectItem>
                  <SelectItem>Basado en el uso o contador</SelectItem>
                  <SelectItem>Basado en condición</SelectItem>
                  <SelectItem>Predictivo</SelectItem>
                  <SelectItem>Proactivo</SelectItem>
                  <SelectItem>Detectivo</SelectItem>
                  <SelectItem>De emergencia</SelectItem>
                  <SelectItem>Autonomo</SelectItem>
                  <SelectItem>De reacondicionamiento</SelectItem>
                  <SelectItem>De reemplazo</SelectItem>
                </Select>
              </div>
              <div className="valueOT">
                <label>Tipo de sistema</label>
                <Select
                  className="w-11/12 h-11"
                  placeholder="Mecánico"
                  name="tipo_de_sistema"
                  onChange={handleChange}
                >
                  <SelectItem>Mecánico</SelectItem>
                  <SelectItem>Electrico</SelectItem>
                  <SelectItem>Hidráulico</SelectItem>
                  <SelectItem>Neumático</SelectItem>
                  <SelectItem>De control</SelectItem>
                  <SelectItem>De refrigeración</SelectItem>
                  <SelectItem>De lubricación</SelectItem>
                  <SelectItem>De alimentación</SelectItem>
                  <SelectItem>De seguridad</SelectItem>
                  <SelectItem>De comunicación</SelectItem>
                </Select>
              </div>
            </div>
          </div>

          <Tabla_mecanicos_ot
            formMecanicos={formMecanicos}
            setFormMecanicos={setFormMecanicos}
          />
          <hr />
          <div className="tituloSeccionOT">
            <h3>Descripción del trabajo o actividad a realizar</h3>
          </div>
          <hr />
          <div className="containerDOT">
            <Textarea
              placeholder="Describe el trabajo o acividad a realizar"
              className="col-span-8 md:col-span-6 mb-6 md:mb-0"
              name="descripcion_de_trabajo"
              onChange={handleChange}
            />
          </div>
          <hr />
          <div className="tituloSeccionOT">
            <h3>Recursos</h3>
          </div>
          <hr />
          <Tabla_insumos_ot
            formInsumos={formInsumos}
            setformInsumos={setformInsumos}
          />
          <div className="button-ot">
          <Button className="" type="submit">Registrar orden de trabajo</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
