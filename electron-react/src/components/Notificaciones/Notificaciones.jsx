import React, { useEffect, useState } from 'react'
import './Notificaciones.css'
import { Link } from 'react-router-dom'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardBody, Image } from "@nextui-org/react";
import campana from '../Menu/Imagenes_Menu/campana.png';
import axios from 'axios'
import semaforo from '../../img/semaforo.jpg'
import { format } from "date-fns";

export const Notificaciones = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [componentes, setComponentes] = useState();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/componentesAAlertar`)
            .then(datos => {
                setComponentes(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos', error);
            });
    }, []);
    return (
        <div>
            <div className="iconP">
                <Link onClick={() => onOpen()}>
                    <img src={campana} alt='Notificaciones' />
                </Link>
            </div>

            <Modal
                size={'3xl'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Notificaciones</ModalHeader>
                            <ModalBody>
                                <div>
                                    {componentes.map(componente => 
                                        <Card
                                        isBlurred
                                        className="border-none dark:bg-default-100/50 max-w-[100%]"
                                        shadow="sm"
                                    >
                                        <CardBody>
                                            <div className="flex items-center gap-5 px-3 w-full">
                                                
                                                <div className="relative img-semaforo">
                                                    <Image
                                                        alt="Semaforo"
                                                        className="object-cover"
                                                        shadow="md"
                                                        src={semaforo}
                                                        isBlurred
                                                    />
                                                </div>
                                                <div className='flex justify-between py-5 gap-6 md:gap-3 w-full'>
                                                <div className="flex flex-col col-span-6 md:col-span-8">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-col gap-0">
                                                            <h1 className="text-xl font-medium">{componente.nombre_maquina}</h1>
                                                            <p className="text-small text-foreground/80">{format(new Date(componente.fecha), "dd/MM/yyyy")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col col-span-6 md:col-span-8">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-col gap-0">
                                                            <h3 className="font-medium text-foreground/90">{componente.tipo_componente}</h3>
                                                            <h1 className="text-small text-foreground/80">{componente.nombre_componente}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col col-span-6 md:col-span-8">
                                                    <div className="flex justify-between">
                                                        <div className="flex flex-col gap-0">
                                                            <h1 className="text-lg font-medium">{componente.operario}</h1>
                                                            <h3 className="text-small text-foreground/80">{componente.ficha_aprendiz}</h3>
                                                            <p className="text-small text-foreground/80">{componente.programa_aprendiz}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <Button
                                                    isIconOnly
                                                    className="text-default-900/60 data-[hover]:bg-foreground/10 ot-notificacion"
                                                    radius="full"
                                                    variant="light"
                                                    onClick={() => window.location.href = `/OrdenDeTrabajo/${componente.id_maquina}`}
                                                >
                                                    <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                        )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}
