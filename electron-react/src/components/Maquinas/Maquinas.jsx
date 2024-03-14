import React from 'react'
import './Maquinas.css'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import check from '../../img/check.jpg'
import ordenT from '../../img/ordenT.avif'
import hojaV from '../../img/hojaV.jpg'

export const Maquinas = () => {

  return (
    <div>

      <div className="containerM">
        <div className="navHorizontal grid-cols-none">
          <h2 id='active'>Información</h2>
        </div>

        <div className="slider">
          <div className="sombra">
            <h2>Máquinas</h2>
            <p>¡Registra el estado, ordenes de trabajo de la máquina <br></br>y mira el historial de reparaciones en la hoja de vida!</p>
          </div>
        </div>
        <div className='card-maq'>
        <div className="md:grid grid-cols-3 gap-5 w-[85%] mx-auto mb-16 items-center">
          <Card className="py-4 mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">             
            <h4 className="font-bold text-large">Checklist</h4>
              <p className="text-tiny uppercase font-bold">Registra el estado de la máquina</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={check}
                width={270}
              />
            </CardBody>
          </Card>
          <Card className="py-4 mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Orden de trabajo</h4>
              <p className="text-tiny uppercase font-bold">Registra una orden de trabajo</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={ordenT}
                width={270}
              />
            </CardBody>
          </Card>
          <Card className="py-4 mt-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">    
            <h4 className="font-bold text-large">Hoja de vida</h4>
              <p className="text-tiny uppercase font-bold">Observa especificaciones de la máquina</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={hojaV}
                width={270}
              />
            </CardBody>
          </Card>
        </div>
        </div>
      </div>

    </div>
  )
}
