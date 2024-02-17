import React from 'react'
import './Nueva_salida_almacen.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'

export const Nueva_salida_almacen = () => {
    return (
        <div>
            <div className="navVertical">
                <Link to={'/MenuPrincipal'}>
                    <div className="principal">
                        <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
                        <h2>Principal</h2>
                    </div>
                </Link>
                <ul className='navList'>
                    <li><Link to={'/almacen'}>Inventario</Link></li>
                    <li><Link to={'/entradaAlmacen'}>Entradas</Link></li>
                    <li id='activeMaquina'>Salidas</li>
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Nueva Salidas</h2>
                    <h2>Registro de salida</h2>

                    <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link>
                    <input type="checkbox" id="navbar-toggle"></input>
                    <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

                    <ul className='navListR'>
                    <li><Link to={'/almacen'}>Inventario</Link></li>
                    <li><Link to={'/entradaAlmacen'}>Entradas</Link></li>
                    <li id='activeMaquina'>Salidas</li>
                </ul>
                </div>

                <div className="txtNuevaSalida">
                    <h3>Salidas</h3>
                </div>

                <form action="" className='nuevaSalidaAlmacen'>
                    <div className="rowValuesNSA">
                        <div className="valuesNSA">
                            <label>Producto:</label>
                            <select name="producto" id="">
                                <option value="alicate">Alicate</option>
                                <option value="n">Nose</option>
                            </select>
                        </div>
                        <div className="valuesNSA">
                            <label>Fecha:</label>
                            <input type='date' />
                        </div>
                    </div>
                    <div className="rowValuesNSA">
                        <div className="valuesNSA">
                            <label>Cantidad:</label>
                            <input type="number" name="cantidad" id="" />
                        </div>
                        <div className="valuesNSA">
                            <label>Numero de producto:</label>
                            <input type='number' name='nProducto' />
                        </div>
                    </div>
                    <div className="rowValuesNSA">
                        <div className="valuesNSA">
                            <label>Responsable:</label>
                            <input type='text' />
                        </div>
                    </div>
                    <div className="rowValuesNSA">
                        <button>Guardar</button>
                        <button>Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
