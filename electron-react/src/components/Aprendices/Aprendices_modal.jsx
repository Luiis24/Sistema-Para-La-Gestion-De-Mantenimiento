import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

export const Aprendices_modal = ({ aprendiz }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div>
            <p onClick={onOpen}>Informacion</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Informacion aprendiz</ModalHeader>
                            <ModalBody>
                                <div className='infoAprendiz'>
                                    <div className='flex items-center gap-5'>
                                        <label>Nombre</label>
                                        <Input value={aprendiz.nombre_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Correo</label>
                                        <Input value={aprendiz.email_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Telefono</label>
                                        <Input value={aprendiz.telefono_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Numero identidad</label>
                                        <Input value={aprendiz.num_doc_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Tipo de documento</label>
                                        <Input value={aprendiz.tipo_doc_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Equipo</label>
                                        <Input value={aprendiz.equipo_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Ficha</label>
                                        <Input value={aprendiz.ficha_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Contraseña</label>
                                        <Input value={aprendiz.password_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Programa</label>
                                        <Input value={aprendiz.programa_aprendiz} />
                                    </div>
                                    <div>
                                        <label>Estado</label>
                                        <Input value={aprendiz.estado} />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
