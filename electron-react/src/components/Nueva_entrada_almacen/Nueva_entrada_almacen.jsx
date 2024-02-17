import React from 'react'
import './Nueva_entrada_almacen.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'

export const Nueva_entrada_almacen = () => {
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
                    <li><Link to={'/almacen'}>Inventario</Link></li>
                    <li id='activeMaquina'>Entradas</li>
                    <li><Link to={'/salidaAlmacen'}>Salidas</Link></li>
                </ul>
            </div>

            <div className="containerM">

                <div className="navHorizontal">
                    <h2 id='active'>Nueva entrada</h2>
                    <h2>Registro de entradas</h2>

                    <Link to={'/'} className='homeR'><img className="logoSenaR" src={logoSena} alt='logo Sena'></img></Link>
                    <input type="checkbox" id="navbar-toggle"></input>
                    <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>

                    <ul className='navListR'>
                        <li><Link to={'/almacen'}>Inventario</Link></li>
                        <li id='activeMaquina'>Entradas</li>
                        <li><Link to={'/salidaAlmacen'}>Salidas</Link></li>
                    </ul>
                </div>

                <div className="txtNuevaEntrada">
                    <h3>Entradas</h3>
                </div>

                <form action="" className='nuevaEntradaAlmacen'>
                    <div className="rowValuesNEA">
                        <div className="valuesNEA">
                            <label>Producto:</label>
                            <select name="producto" id="">
                                <option value="alicate">Alicate</option>
                                <option value="n">Nose</option>
                            </select>
                        </div>
                        <div className="valuesNEA">
                            <label>Fecha:</label>
                            <input type='date' />
                        </div>
                    </div>
                    <div className="rowValuesNEA">
                        <div className="valuesNEA">
                            <label>Cantidad:</label>
                            <input type="number" name="cantidad" id="" />
                        </div>
                        <div className="valuesNEA">
                            <label>Numero de producto:</label>
                            <input type='number' name='nProducto' />
                        </div>
                    </div>
                    <div className="rowValuesNEA">
                        <div className="valuesNEA">
                            <label>Proveedor:</label>
                            <input type='text' />
                        </div>
                    </div>
                    <div className="rowValuesNEA">
                        <button>Guardar</button>
                        <button>Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
