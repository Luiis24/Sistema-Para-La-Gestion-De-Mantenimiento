import React from 'react'
import './Principal.css'
import cerrarSesion from './img/cerrar-sesion.png'
import campana from './img/campana.png'
import informacion from './img/informacion.png'

export const Principal = () => {
  return (
    <div>
        <div className="tituloPrincipal">
            <img src='data:image/png;base64,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' alt='Logo Sena'></img>
            <div className="containerTitulos">
                <h2>Centro De Biotecnologia Industrial</h2>
                <p>Taller Maquinas Y Herramientas</p>
            </div>
        </div>

        <div className="containerMenu">
        <div className="menu">
            <div className="containerP">
                <h2>Torno</h2>
            </div>
            <div className="containerP">
                <h2>Fresadora</h2>
            </div>
            <div className="containerP">
                <h2>Sierra</h2>
            </div>
            <div className="containerP">
                <h2>CNC</h2>
            </div>
            <div className="containerP">
                <h2>Compresor De Tornillo</h2>
            </div>
            <div className="containerP">
                <h2>Almacen</h2>
            </div>
            <div className="containerP">
                <h2>Esmeriles</h2>
            </div>
            <div className="containerP">
                <h2>Aprendices</h2>
            </div>
            <div className="containerP">
                <h2>Informes</h2>
            </div>
        </div>
        </div>

        <div className="IconsPrincipal">
            <div className="iconP">
                <img src={cerrarSesion} alt='Cerrar Sesion'/>
            </div>
            <div className="iconP">
                <img src={campana} alt='Notificaciones'/>
            </div>
            <div className="iconP">
                <img src={informacion} alt='Mas Informacion'/>
            </div>
        </div>
        
    </div>
  )
}
