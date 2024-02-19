import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React, { useState } from 'react'
import './Tabla_macanicos.css'
import { DeleteIcon } from "../Tabla_insumos_ot/DeleteIcon";

export const Tabla_mecanicos_ot = ({formMecanicos, setFormMecanicos}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [rowsMecanicos, setrowsMecanicos] = useState([]);

    const deleteRow = (id) => {
        setrowsMecanicos(rowsMecanicos.filter((_, idx) => idx !== id))
    }

    const addRow = (newRow) => {
        setrowsMecanicos([...rowsMecanicos, newRow])
    }

    const handleChange = (e) => {
        setFormMecanicos({
            ...formMecanicos,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        addRow(formMecanicos);
    }
    return (
        <div>
            <div className="containerTIOT">
                <Table className='w-full'>
                    <TableHeader>
                        <TableColumn className="text-lg">Nombres</TableColumn>
                        <TableColumn className="text-lg ">Número Documento</TableColumn>
                        <TableColumn className="text-lg ">Eliminar</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {rowsMecanicos[0] ? rowsMecanicos.map((row, id) => {
                            return <TableRow key={id+1}>
                                <TableCell className="text-lg">{row.nombre}</TableCell>
                                <TableCell className="text-lg">{row.documento}</TableCell>
                                <TableCell onClick={() => deleteRow(id)} className="text-red-500"><DeleteIcon/></TableCell>
                            </TableRow>
                        }) :  <TableRow>
                                <TableCell className="text-lg text-slate-400">Nombre completo</TableCell>
                                <TableCell className="text-lg text-slate-400 ">No. Documento</TableCell>
                                <TableCell className="text-slate-400"><DeleteIcon/></TableCell>
                        </TableRow>}

                    </TableBody>
                </Table>
            </div>
            <div className="btn-registrarMOT">
                <Button onPress={onOpen}>Agregar mecánico</Button>
            </div>
            

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl">Registrar mecánico</ModalHeader>
                            <ModalBody className="modalIOT">
                                <div className="formIOT">
                                    
                                    <Input className="" placeholder="Nombre completo" type="text" name="nombre" onChange={handleChange} />
                                </div>
                                <div className="formIOT">
                                 
                                    <Input placeholder="Número de identificación" type="number" name="documento" onChange={handleChange} />
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
        </div>
    )
}