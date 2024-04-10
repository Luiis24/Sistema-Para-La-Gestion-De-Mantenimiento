import React from 'react'
import nose from '../../img/developer.jpg'
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import './Mas_informacion.css'
import { Titulo_sena_cb } from '../Titulo_sena_cb/Titulo_sena_cb';

export const Mas_informacion = () => {
    return (
        <div>
            {/* <div className='bannerMI'>
                <div className='w-[88%] m-auto flex justify-start logoMI'><Link to={'/MenuPrincipal'} className='flex items-center gap-2 mt-3'><img src={logo}></img> <h3 className='font-semibold text-lg text-pretty'>Sistema Gestion Mantenimiento Industrial</h3></Link></div>
                <div className='w-full text-center'><h2 className='font-bold md:text-4xl text-xl'>Centro de información</h2></div>
                <div className='flex justify-center gap-3 mt-8 pb-8 md:w-full w-[90%] m-auto'>
                    <Chip variant="bordered" className='text-white font-medium uppercase'>Copyright</Chip>
                    <Chip variant="bordered" className='text-white font-medium uppercase'>Desarrolladores</Chip>
                    <Chip variant="bordered" className='text-white font-medium uppercase'>Contacto</Chip>
                </div>
            </div> */}
            <Link to={'/MenuPrincipal'}><Titulo_sena_cb /></Link>
            <hr />
            <div className="containerMasInfo">

                <div className='flex w-[80%] mx-auto mb-16 mt-16 items-center'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-3xl font-medium'>Copyright</h1>
                        <h2 className='text-xl font-medium'>SGMI - Sistema Gestion Mantenimiento Industrial</h2>
                        <p className='text-pretty'>Todos los derechos de autor reservados. Este sitio web fue creado por aprendices del SENA. Por favor, respetar la propiedad intelectual y no reproducir ningún contenido sin autorización.</p>
                        <Link to={'/MenuPrincipal'} className='w-[80%]'>
                        <Button className='botonAtras mx-auto'>
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                            </svg> Atrás
                        </Button>
                        </Link>
                    </div>
                </div>


                <div className='flex flex-col gap-5 w-[90%] mx-auto mb-16 mt-16 items-center'>
                    <Card className='w-[90%]'>
                        <CardBody>
                            <div className="flex items-center gap-5 px-3 w-full">
                                <div className="relative">
                                    <Image
                                        alt="Semaforo"
                                        className="object-cover"
                                        shadow="md"
                                        src={nose}
                                        width={150}
                                        isBlurred
                                    />
                                </div>
                                <div className='flex justify-between flex-col md:flex-row py-5 gap-6 md:gap-3 w-full overscroll-x-auto'>
                                    <div className="flex flex-col col-span-6 md:col-span-8 justify-center">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0">
                                                <h1 className="text-xl font-medium">Jhon Eduard España</h1>
                                                <h1 className="text-small text-foreground/80">jhoneduardhernandezespana50@gmail.com</h1>
                                                <p className="text-small text-foreground/80">Desarrollador</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CardBody>
                    </Card>

                    <Card className='w-[90%]'>
                        <CardBody>
                            <div className="flex items-center gap-5 px-3 w-full">
                                <div className="relative">
                                    <Image
                                        alt="Semaforo"
                                        className="object-cover"
                                        shadow="md"
                                        src={nose}
                                        width={150}
                                        isBlurred
                                    />
                                </div>
                                <div className='flex justify-between flex-col md:flex-row py-5 gap-6 md:gap-3 w-full overscroll-x-auto'>
                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0">
                                                <h1 className="text-xl font-medium">Luis Fernando Morales</h1>
                                                <h1 className="text-small text-foreground/80">nandoarmo01@gmail.com</h1>
                                                <p className="text-small text-foreground/80">Desarrollador</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CardBody>
                    </Card>

                    <Card className='w-[90%]'>
                        <CardBody>
                            <div className="flex items-center gap-5 px-3 w-full">
                                <div className="relative">
                                    <Image
                                        alt="Semaforo"
                                        className="object-cover"
                                        shadow="md"
                                        src={nose}
                                        width={150}
                                        isBlurred
                                    />
                                </div>
                                <div className='flex justify-between flex-col md:flex-row py-5 gap-6 md:gap-3 w-full overscroll-x-auto'>
                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0">
                                                <h1 className="text-xl font-medium">Camilo Andres Jaramillo</h1>
                                                <h1 className="text-small text-foreground/80">camilojara0000@gmail.com</h1>
                                                <p className="text-small text-foreground/80">Desarrollador</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* <div className='2xl:absolute relative bottom-0 h-32 w-full f'>
                <hr />
                <div className='w-[88%] m-auto mt-10 flex-col'>
                    <p className='text-lg font-semibold flex items-center gap-2'>

                        copyright - Sistema Gestion Mantenimiento Industrial</p>
                    <p className='text-base font-semibold'>2024 - SENA</p>
                </div>

            </div> */}
        </div>
    )
}
