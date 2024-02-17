import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export const Registro_almacen = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registrar Insumo</ModalHeader>
                            <ModalBody className="modalIOT">
                                <div className="formIOT">
                                    <label htmlFor="cantidad" className="text-lg">Nombre Insumo</label>
                                    <Input type="text" name="nombreInsumo" onChange={handleChange} />
                                </div>
                                <div className="formIOT">
                                    <label htmlFor="unidad">Cantidad</label>
                                    <Input type="number" name="cantidad" onChange={handleChange} />
                                </div>
                                <div className="formIOT">
                                    <label htmlFor="unidad">Fecha</label>
                                    <Input type="date" name="fecha" onChange={handleChange} />
                                </div>
                                <div className="formIOT">
                                    <label htmlFor="unidad">Proveedor</label>
                                    <Input type="number" name="proveedor" onChange={handleChange} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>
                                    Registrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
    </div>
  )
}
