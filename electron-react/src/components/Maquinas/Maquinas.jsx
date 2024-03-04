import React from 'react'
import './Maquinas.css'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import maquinas from '../../img/maquinasFoto1.jpg'

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

        {/* <div className="tornoT">
          <h2>Caracteristicas</h2>
          <p>Se denomina torno (del latín tornus, y este del griego τόρνος ‘giro’ ‘vuelta’)1​ a un conjunto de máquinas y herramientas que permiten mecanizar, roscar, cortar, agujerear, cilindrar, desbastar y ranurar piezas de forma geométrica por revolución. Estas máquinas-herramienta operan haciendo girar la pieza a mecanizar (sujeta en el cabezal o también llamado chuck fijada entre los puntos de centraje) mientras una o varias herramientas de corte son empujadas en un movimiento regulado de avance contra la superficie de la pieza, cortando la viruta de acuerdo con las condiciones tecnológicas de mecanizado adecuadas. Desde el inicio de la Revolución industrial, el torno se ha convertido en una máquina básica importante en el proceso industrial de mecanizado.</p>
        </div> */}
        <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto mb-10">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Registra el estado de la maquina</p>
              <h4 className="font-bold text-large">Checklist</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={maquinas}
                width={270}
              />
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Registra una orden de trabajo</p>
              <h4 className="font-bold text-large">Orden de trabajo</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={maquinas}
                width={270}
              />
            </CardBody>
          </Card>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Observa especificaciones de la maquina</p>
              <h4 className="font-bold text-large">Hoja de vida</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={maquinas}
                width={270}
              />
            </CardBody>
          </Card>
        </div>
      </div>

    </div>
  )
}
