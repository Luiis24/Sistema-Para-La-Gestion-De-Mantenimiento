import React from 'react'
import './Torno.css'
import { Link } from 'react-router-dom'
import menu from '../../img/menu.png'
import logoSena from '../../img/logo.png'

export const Torno = () => {

  return (
    <div>

      <div className="containerM">
        <div className="navHorizontal">
          <h2 id='active'>Informacion</h2>

          <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link>
          <input type="checkbox" id="navbar-toggle"></input>
          <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt="menu"></img></label>

          <ul className='navListR'>
            <li id='activeMaquina'>Tornos</li>
            <li><Link to={'/checklistMaquina'}>Wiston 1</Link></li>
            <li>Wiston 2</li>
            <li>Wiston 3</li>
            <li>Red Start</li>
          </ul>
        </div>

        {/* <div className="infoTorno">
            <img src="https://todotornos.com/wp-content/uploads/2023/07/torno-partes-1.jpg" alt='Imagen De Torno'/>
            <p>Se denomina torno (del latín tornus, y este del griego τόρνος ‘giro’ ‘vuelta’)1​ a un conjunto de máquinas y herramientas que permiten mecanizar, roscar, cortar, agujerear, cilindrar, desbastar y ranurar piezas de forma geométrica por revolución. Estas máquinas-herramienta operan haciendo girar la pieza a mecanizar (sujeta en el cabezal o también llamado chuck fijada entre los puntos de centraje) mientras una o varias herramientas de corte son empujadas en un movimiento regulado de avance contra la superficie de la pieza, cortando la viruta de acuerdo con las condiciones tecnológicas de mecanizado adecuadas. Desde el inicio de la Revolución industrial, el torno se ha convertido en una máquina básica importante en el proceso industrial de mecanizado.</p>
          </div>  */}
        <div className="slider">
          <div className="sombra">
            <h2>Tornos</h2>
            <p>¡Registra el estado, ordenes de trabajo de la maquina <br></br>y mira el historial de reparaciones en la hoja de vida!</p>
          </div>
        </div>

        <div className="tornoT">
          <h2>Caracteristicas</h2>
          <p>Se denomina torno (del latín tornus, y este del griego τόρνος ‘giro’ ‘vuelta’)1​ a un conjunto de máquinas y herramientas que permiten mecanizar, roscar, cortar, agujerear, cilindrar, desbastar y ranurar piezas de forma geométrica por revolución. Estas máquinas-herramienta operan haciendo girar la pieza a mecanizar (sujeta en el cabezal o también llamado chuck fijada entre los puntos de centraje) mientras una o varias herramientas de corte son empujadas en un movimiento regulado de avance contra la superficie de la pieza, cortando la viruta de acuerdo con las condiciones tecnológicas de mecanizado adecuadas. Desde el inicio de la Revolución industrial, el torno se ha convertido en una máquina básica importante en el proceso industrial de mecanizado.</p>
        </div>
      </div>

    </div>
  )
}
