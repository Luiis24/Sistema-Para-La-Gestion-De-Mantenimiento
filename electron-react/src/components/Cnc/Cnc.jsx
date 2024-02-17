import React from 'react'
import './Cnc.css'
import CncImage from './Cnc.png'
import CncImage2 from './Cnc2.png'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'

export const Cnc = () => {
  return (
    <div>
      <div className="navVertical">
        <Link to={'/'}>
          <div className="principal">
            <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
            <h2>Principal</h2>
          </div>
        </Link>
        <ul className='navList'>
          <li id='activeMaquina'>CNC</li>
          <li>CNC Hartford</li>
          <li>CNC Leadwell</li>
        </ul>
      </div>

      <div className="containerM">
        <div className="navHorizontal">
          <h2 id='active'>Informacion</h2>

          <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link>
          <input type="checkbox" id="navbar-toggle"></input>
          <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

          <ul className='navListR'>
            <li id='activeMaquina'>CNC</li>
            <li>CNC Hartford</li>
            <li>CNC Leadwell</li>
          </ul>
        </div>

        <div className="infoCNC">
          <img src={CncImage} alt='Imagen De CNC Hartford' />
          <div className="Cncmaquina">
            <h3>CENTRO DE MECANIZADO HARTFORD</h3>
            <p>Centro de mecanizado vertical altamente automatizado capaz de realizar múltiples operaciones de maquinado en una instalación bajo CNC, su sistema de mecanizado destaca por su velocidad de producción.En IMOCOM contamos con la variedad de las líneas de mecanizado vertical Hartford HCMC, LG & MVP. Si está interesado en conocer más fichas técnicas de las diferentes líneas Hartford que le ofrece IMOCOM</p>
          </div>

        </div>
        <div className="infoCNC">
          <img src={CncImage2} alt='Imagen De CNC Leadwell' />
          <div className="Cncmaquina">
            <h3>TORNO CNC LEADWELL CARACTERíSTICAS </h3>
            <p>Base y columna están diseñadas con gran espacio entre guías de
              deslizamiento para una máxima estabilidad. El husillo nariz corta de alta velocidad proporciona una respuesta sensible con operaciones de roscado 4.000 rpm. 48 metros de marcha rápida en tres ejes reduce en gran medida el tiempo de mecanizado. Sistema automático Estable Cambio de herramienta no sólo reduce el tiempo de no corte, sino que también extiende la vida útil del cabezal. Resaltar</p>
          </div>
        </div>
      </div>
    </div>
  )
}
