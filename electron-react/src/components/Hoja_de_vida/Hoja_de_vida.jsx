import React, { useState, useEffect } from "react";
import "./Hoja_de_vida.css";
import { Link, useParams } from "react-router-dom";
import menu from "../../img/menu.png";
import { Input } from "@nextui-org/react";
import axios from "axios";

export const Hoja_de_vida = () => {
  const [maquinaid, setMaquinaid] = useState();
  const [formOT, setFormOT] = useState();
  const [componentes, setComponentes] = useState([]);
  const { id_maquina } = useParams();
  const [sistema, setSistema] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4002/componenteChecklist")
      .then((datos) => {
        setComponentes(datos.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormOT({
      ...formOT,
      [name]: value,
    });
    console.log(formOT);
  };
  // const ordenarSisetma = () => {
  //     setSistema(componentes.filter((componente) => componente.tipo_componente = componente[0]))
  // }

  // console.log(setSistema)

  return (
    <div>
      <div className="containerM">
        <div className="navHorizontal">
          <Link to={"/checklistMaquina"}>
            <h2>Checklist</h2>
          </Link>
          <h2>
            <Link to={"/OrdenDeTrabajo/:id_maquina"}> Orden de trabajo</Link>
          </h2>
          <h2 id="active">Hoja de vida</h2>
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
        {/*Bloque 1*/}
        <div className="nombreSistema">
          <h2>Hoja de vida</h2> {maquinaid ? maquinaid.nombre_maquina : ""}
        </div>
        <hr />
        <form action="" name="Hoja-v">
          <div className="componentesChecklist">
            <hr />
            <div className="nombreSistema">
              <h2>Descripción del equipo</h2>
            </div>
            <hr />
            <div className="container-hv">
              <div className="input-hv">
                {/*primera fila*/}
                <div className="Primerafila">
                  <label className="label-hv">Nombre</label>
                  <div className="inputs-hv">
                    <Input
                      type="text"
                      placeholder="Ingresa nombre de la máquina"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Marca</label>
                  <div className="inputs-hv">
                    <Input
                      type="text"
                      placeholder="Ingresa marca de la máquina"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Año fabricación</label>
                  <div className="inputs-hv">
                    <Input
                      type="Date"
                      placeholder="Fecha de fabricación"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Fabricante</label>
                  <div className="inputs-hv">
                    <Input
                      type="text"
                      placeholder="Nombre fabricante"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Ubicación</label>
                  <div className="inputs-hv">
                    <Input
                      type="text"
                      placeholder="Ubicación de la máquina"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
            {/*Segunda fila*/}
            <div className="container-hv2">
              <div className="input-hv2">
                <div className="segundafila">
                  <label className="label-hv">Características</label>
                  <div className="inputs-hv2">
                    <Input
                      type="text"
                      placeholder="Ingresa sus características"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Código</label>
                  <div className="inputs-hv2">
                    <Input
                      type="Number"
                      placeholder="Ingresa código"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Modelo</label>
                  <div className="inputs-hv2">
                    <Input
                      type="text"
                      placeholder="Ingresa el modelo"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Número de serie</label>
                  <div className="inputs-hv2">
                    <Input
                      type="Number"
                      placeholder="Ingresa número de serie"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <label className="label-hv">Prioridad</label>
                  <div className="inputs-hv2">
                    <Input
                      type="Text"
                      placeholder="Ingresa prioridad"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/*Bloque 2*/}
            <div className="nombreSistema">
              <h2>Descripción técnica</h2>
            </div>
            <hr />
            <div className="container-hv">
              <div className="input-hv">
              <div className="inputs-hv">
                <label>Nivel de aceite en caja de velocidades</label>
                <div className="inputs-hv2">
                    <Input
                      type="Text"
                      placeholder="Ingresa prioridad"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
              </div>
              <div className="inputs-hv">
                <label>Nivel de aceite en caja de avance</label>
                <div className="inputs-hv2">
                    <Input
                      type="Text"
                      placeholder="Ingresa prioridad"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
              </div>
              <div className="inputs-hv">
                <label>Bancadas y guías lubricadas</label>
                <div className="inputs-hv2">
                    <Input
                      type="Text"
                      placeholder="Ingresa prioridad"
                      className="w-11/12 h-11"
                      name="fecha_inicio_ot"
                      onChange={handleChange}
                    ></Input>
                  </div>
              </div>
            </div>
            <hr />
            <div className="nombreSistema">
              <h2>Datos del equipo</h2>
            </div>
            <hr />
            <div className="containerComponentes">
              <div className="inputs-hv">
                <label>Luz Piloto</label>
              </div>
              <div className="inputs-hv">
                <label>Motor de caja de velocidades</label>
              </div>
              <div className="inputs-hv">
                <label>Lámpara del torno</label>
              </div>
              <div className="inputs-hv">
                <label>Estado del horometro</label>
              </div>
              <div className="inputs-hv">
                <label>Interruptor de la bomba de lubricación</label>
              </div>
            </div>
            </div>
            </div>
            <div className="containerComponentes">
              <button className="rgCheckList">Registrar</button>
            </div>
           
          
        </form>
      </div>
    </div>
  );
};
