import React, {useState} from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Input, Button } from "@nextui-org/react";

export const Nueva_salida_almacen = ({onOpen}) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const [entradaInsumo, setEntradaInsumo] = useState()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntradaInsumo({
            ...entradaInsumo,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} id='salida'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">Registrar salida insumo</ModalHeader>
                        <ModalBody className="modalIOT">
                            <div className="formIOT">
                                <Input type="text" name="nombreInsumo" onChange={handleChange} placeholder='Nombre Insumo' />
                            </div>
                            <div className="formIOT">
                                <Input type="number" name="cantidad" onChange={handleChange} placeholder='Cantidad' />
                            </div>
                            <div className="formIOT">
                                <Input type="date" name="fecha" onChange={handleChange} placeholder='Fecha' />
                            </div>
                            <div className="formIOT">
                                <Input type="number" name="proveedor" onChange={handleChange} placeholder='Responsable' />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="text-slate-50 bg-red-500" variant="flat" onPress={onClose}>
                                Cerrar
                            </Button>
                            <div className="botton-registrar-div">
                                <Button className="text-white" onClick={handleSubmit} onPress={onClose}>
                                    Registrar
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
