import React, { useState, useEffect } from "react";
import "./Checklist_maquina.css";
import { Link } from "react-router-dom";
import logoSena from "../../img/logo.png";
import menu from "../../img/menu.png";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Check_list } from "../HojaInspeccion/HojaInspeccion";

export const Checklist_maquina = () => {
  const [componentes, setComponentes] = useState([]);
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

  // const ordenarSisetma = () => {
  //     setSistema(componentes.filter((componente) => componente.tipo_componente = componente[0]))
  // }

  // console.log(setSistema)

  return (
    <div>
      <div className="navVertical">
        <Link to={"/"}>
          <div className="principal">
            <img className="logoSena" src={logoSena} alt="Logo Sena"></img>
            <h2>Principal</h2>
          </div>
        </Link>
        <ul className="navList">
          <li>
            <Link to={"/tornos"}>Tornos</Link>
          </li>
          <li id="activeMaquina">Wiston 1</li>
          <li>Wiston 2</li>
          <li>Wiston 3</li>
          <li>Red Start</li>
        </ul>
      </div>

      <div className="containerM">
        <div className="navHorizontal">
          <h2 id="active">Checklist</h2>
          <h2>
            <Link to={'/OrdenDeTrabajo/:id_maquina'}>Orden de trabajo</Link>
          </h2>
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
        <div className="nombreSistema">
              <h2>Hoja de inspección</h2>
            </div>
            <hr/>
            <Check_list></Check_list>
        <form action="" name="checklist">
          <div className="componentesChecklist">
            <hr />
            <div className="nombreSistema">
              <h2>Sistema Eléctrico</h2>
            </div>
<hr/>
            <div className="containerComponentes">
              {componentes.map((componente) => {
                return (
                  <div className="nombreComponente">
                    <label>{componente.nombre_componente}</label>
                    <Select
                      placeholder="Estado"
                      className="2xl:w-72 w-11/12 left-64"
                      name={componente.nombre_componente}
                    >
                      <SelectItem value="bueno">Bueno</SelectItem>
                      <SelectItem value="malo">Malo</SelectItem>
                      <SelectItem value="notificar">Notificar</SelectItem>
                      <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                      <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                    </Select>
                  </div>
                );
              })}
              <div className="nombreComponente">
                <label>Interruptores Principales</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-80">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Acometida del equipo</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Hongo para emergencia</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
            </div>
<hr/>
            <div className="nombreSistema">
              <h2>Sistema lubricación</h2>
            </div>
<hr/>
            <div className="containerComponentes">
              <div className="nombreComponente">
              
                <label>Nivel de aceite en caja de velocidades</label>
         
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="altoNivel">Alto nivel</SelectItem>
                  <SelectItem value="bajoNivel">Bajo nivel</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Nivel de aceite en caja de avance</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="altoNivel">Alto nivel</SelectItem>
                  <SelectItem value="bajoNivel">Bajo nivel</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Bancadas y guías lubricadas</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
            </div>
<hr />
            <div className="nombreSistema">
              <h2>Componentes Eléctricos</h2>
            </div>
<hr />
            <div className="containerComponentes">
              <div className="nombreComponente">
                <label>Luz Piloto</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                  <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Motor de caja de velocidades</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="altoNivel">Alto Nivel</SelectItem>
                  <SelectItem value="bajoNivel">Bajo Nivel</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Lámpara del torno</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Estado del horometro</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
              <div className="nombreComponente">
                <label>Interruptor de la bomba de lubricación</label>
                <Select placeholder="Estado" className="2xl:w-72 w-11/12 left-64">
                  <SelectItem value="bueno">Bueno</SelectItem>
                  <SelectItem value="malo">Malo</SelectItem>
                  <SelectItem value="notificar">Notificar</SelectItem>
                </Select>
              </div>
            </div>

            <div className="containerComponentes">
              <button className="rgCheckList">Registrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
