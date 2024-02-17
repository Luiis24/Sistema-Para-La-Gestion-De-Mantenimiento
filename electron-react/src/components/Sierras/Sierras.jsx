import React from "react";
import "./Sierras.css";
import { Link } from "react-router-dom";
import menu from "../../img/menu.png";
import logoSena from "../../img/logo.png"; 
export const Sierras = () => {
  return (
    <div>
      <div className="containerM">
        <div className="navHorizontal">
          <h2 id="active">Información</h2>
          <Link to={"/"} className="homeR">
            <img className="logoSenaR" src={logoSena} alt="logo Sena"></img>
          </Link>
          <input type="checkbox" id="navbar-toggle"></input>
          <label htmlFor="navbar-toggle" className="menu-responsive">
            <img className="menuR" src={menu} alt="menu"></img>
          </label>

          <ul className="navListR">
            <li id="activeMaquina">Sierras</li>
            <li>
              <Link to={"/checklistMaquina"}>Sierra</Link>
            </li>
          </ul>
        </div>
        <div className="slider">
          <div className="sombra">
            <h2>Sierras</h2>
            <p>
              ¡Registra el estado, ordenes de trabajo de la maquina <br></br>y
              mira el historial de reparaciones en la hoja de vida!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
