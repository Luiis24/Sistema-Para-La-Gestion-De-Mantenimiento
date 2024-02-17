import React from 'react'
import './Notificaciones.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'

export const Notificaciones = () => {
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
                    <li id='activeMaquina'>Notificaciones</li>
                    <li>Tareas Realizadas</li>
                </ul>
            </div>

            <div className="containerM">
                <div className="navHorizontal">
                    <h2 id='active'>Fallos</h2>

                    <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link>
                    <input type="checkbox" id="navbar-toggle"></input>
                    <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

                    <ul className='navListR'>
                        <li id='activeMaquina'>Notificaciones</li>
                        <li>Tareas Realizadas</li>
                    </ul>
                </div>

                <table className='notificacionesTabla'>
                    <thead>
                        <tr>
                            <td>Maquina</td>
                            <td>Estado</td>
                            <td>Fecha</td>
                            <td>Responsable</td>
                            <td>Instructor</td>
                            <td>Id</td>
                            <td>Ficha</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Torno Wiston 1</td>
                            <td>Reparacion</td>
                            <td>8/11/13</td>
                            <td>Enain Murillo</td>
                            <td>Enain Murillo</td>
                            <td>1</td>
                            <td>2340987</td>
                        </tr>
                    </tbody>
                </table>

                <div className='notificacionMaquinaContainer' id='cerrarN'>
                    <div className="notificacionMaquina">
                        <div className="headNotificacion">
                            <h3>Alerta</h3>
                            <h2 className="cerrarN" onClick={() => { document.getElementById("cerrarN").style.display = "none" }}>X</h2>
                        </div>
                        <div className="bodyNotificacion">
                            <div className="maquinaNoticar">
                                <img src="https://todotornos.com/wp-content/uploads/2023/07/torno-partes-1.jpg" alt='Imagen De Torno'></img>
                                <h3>Torno Wiston 1</h3>
                            </div>
                            <div className="maquinaNoticar">
                                <p>En este momento esta maquina <br /> se encuentra en reparacion</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
