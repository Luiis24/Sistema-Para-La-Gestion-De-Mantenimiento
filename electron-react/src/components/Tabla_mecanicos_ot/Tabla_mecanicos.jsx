import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React, { useState } from 'react'
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
            <div className="containerTIOT you">
                <Table className='tablaOT you'>
                    <TableHeader>
                        <TableColumn className="text-lg">Nombres</TableColumn>
                        <TableColumn className="text-lg">Numero Documento</TableColumn>
                        <TableColumn className="text-lg">Eliminar</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {rowsMecanicos[0] ? rowsMecanicos.map((row, id) => {
                            return <TableRow key={id+1}>
                                <TableCell className="text-lg">{row.nombre}</TableCell>
                                <TableCell className="text-lg">{row.documento}</TableCell>
                                <TableCell onClick={() => deleteRow(id)} className="text-red-500"><DeleteIcon/></TableCell>
                            </TableRow>
                        }) :  <TableRow>
                                <TableCell className="text-lg text-slate-400">Nombres y apellidos</TableCell>
                                <TableCell className="text-lg text-slate-400">No. Documento</TableCell>
                                <TableCell className="text-slate-400"><DeleteIcon/></TableCell>
                        </TableRow>}

                    </TableBody>
                </Table>
            </div>
            <div className="btn-registrarMOT">
                <Button onPress={onOpen}>Agregar Mecanico</Button>
            </div>
            

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registrar Mecanico</ModalHeader>
                            <ModalBody className="modalIOT">
                                <div className="formIOT">
                                    <label htmlFor="cantidad" className="text-lg">Nombres y apellidos</label>
                                    <Input type="text" name="nombre" onChange={handleChange} />
                                </div>
                                <div className="formIOT">
                                    <label htmlFor="unidad">No. Documento</label>
                                    <Input type="number" name="documento" onChange={handleChange} />
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
