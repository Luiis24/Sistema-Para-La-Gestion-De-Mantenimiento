import React from 'react'
import './Maquinas.css'
import { Link } from 'react-router-dom'

export const Maquinas = () => {

  return (
    <div>

      <div className="containerM">
        <div className="navHorizontal grid-cols-none">
          <h2 id='active'>Informacion</h2>
        </div>

        <div className="slider">
          <div className="sombra">
            <h2>Maquinas</h2>
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
