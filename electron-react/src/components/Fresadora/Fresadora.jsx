import React from "react";
import "./Fresadora.css";
import fresadora from "./fresadora.png";
import { Link } from "react-router-dom";
import logoSena from "../../img/logo.png";
import menu from "../../img/menu.png";

export const Fresadora = () => {
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
          <li id="activeMaquina">Fresadoras</li>
          <Link to={"/checklistMaquina"}>
            <li>Kondor</li>
          </Link>
          <li>Inmomil</li>
          <li>Inmodril</li>
          <li>Taladrofresa</li>
        </ul>
      </div>

      <div className="containerM">
        <div className="navHorizontal">
          <h2 id="active">Información</h2>
        </div>

        <div className="infoFresadora">
          <img src={fresadora} alt="Imagen De Fresadora" />
          <p>
            Una fresadora es una máquina herramienta para realizar trabajos
            mecanizados por arranque de viruta, mediante el movimiento de una
            herramienta rotativa de varios filos de corte, denominada fresa.1​
            Mediante el fresado se pueden mecanizar los más diversos materiales,
            como madera, acero, fundición de hierro, metales no férricos y
            materiales sintéticos, superficies planas o curvas, de entalladura,
            de ranuras, de dentado, etc. Además, las piezas fresadas pueden ser
            desbastadas o afinadas. En las fresadoras tradicionales, la pieza se
            desplaza acercando las zonas a mecanizar a la herramienta,
            permitiendo obtener formas diversas, desde superficies planas a
            otras más complejas.
          </p>
        </div>
      </div>
    </div>
  );
};
