import React from 'react'
import logo from '../../img/OIG3.png'
import nose from '../../img/developer.jpg'
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import './Mas_informacion.css'

export const Mas_informacion = () => {
    return (
        <div>
            <div className='bannerMI'>
                <div className='w-[88%] m-auto flex justify-start logoMI'><Link to={'/MenuPrincipal'} className='flex items-center gap-2 mt-3'><img src={logo}></img> <h3 className='font-semibold text-lg text-pretty'>Sistema Gestion Mantenimiento Industrial</h3></Link></div>
                <div className='w-full text-center'><h2 className='font-bold md:text-4xl text-xl'>Centro de información</h2></div>
                <div className='flex justify-center gap-3 mt-8 pb-8 md:w-full w-[90%] m-auto'>
                    <Chip variant="bordered" className='text-white font-medium uppercase'>Copyright</Chip>
                    <Chip variant="bordered" className='text-white font-medium uppercase'>Desarrolladores</Chip>
                    <Chip variant="bordered" className='text-white font-medium uppercase'>Contacto</Chip>
                </div>
            </div>
            <hr />
            <div className='md:grid grid-cols-3 gap-5 w-[70%] mx-auto mb-16 mt-16 items-center'>
                <Card className="py-4 flex-col justify-center items-center">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col">
                        <h4 className="font-bold text-large">Luis Fernando Morales</h4>
                        <p className="text-tiny uppercase font-bold">Luis@misena.edu.co</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 flex items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={nose}
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Card className="py-4 flex-col justify-center items-center">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col">
                        <h4 className="font-bold text-large">Jhon Eduard España</h4>
                        <p className="text-tiny uppercase font-bold">Jhon@misena.edu.co</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 flex items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={nose}
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Card className="py-4 flex-col justify-center items-center">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col">
                        <h4 className="font-bold text-large">Camilo Andres Jaramillo</h4>
                        <p className="text-tiny uppercase font-bold">Camilo@misena.edu.co</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 flex items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={nose}
                            width={270}
                        />
                    </CardBody>
                </Card>
            </div>

            <div className='2xl:absolute relative bottom-0 h-32 w-full f'>
                <hr />
                <div className='w-[88%] m-auto mt-10 flex-col'>
                    <p className='text-lg font-semibold flex items-center gap-2'>
                        <svg fill="#000000" height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 220 220" space="preserve">
                            <path d="M110,0C49.346,0,0,49.346,0,110s49.346,110,110,110s110-49.346,110-110S170.654,0,110,0z M110,190
	c-44.112,0-80-35.888-80-80s35.888-80,80-80c44.112,0,80,35.888,80,80S154.112,190,110,190z M139.718,128.264l16.218,15.065
	l-8.172,7.152c-10.236,8.956-23.312,13.89-36.817,13.89c-30.344,0-55.031-24.178-55.031-53.895
	c0-29.649,24.687-53.771,55.031-53.771c13.516,0,26.548,4.888,36.692,13.764l7.873,6.89L139.97,92.91l-6.901-6.097
	c-5.937-5.243-13.792-8.131-22.122-8.131c-18.226,0-33.054,14.263-33.054,31.793c0,17.6,14.828,31.918,33.054,31.918
	c8.238,0,16.094-2.933,22.122-8.258L139.718,128.264z"/>
                        </svg>
                        copyright - Sistema Gestion Mantenimiento Industrial</p>
                    <p className='text-base font-semibold'>2024 - SENA</p>
                </div>

            </div>
        </div>
    )
}
