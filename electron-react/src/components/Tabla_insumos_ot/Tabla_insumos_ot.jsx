import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem } from "@nextui-org/react";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Tabla_insumos_ot.css'
import { DeleteIcon } from "./DeleteIcon";

export const Tabla_insumos_ot = ({formInsumos, setformInsumos}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [rows, setRows] = useState([]);

    const [insumos, setInsumos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4002/insumos')
            .then(datos => {
                setInsumos(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const deleteRow = (id) => {
        setRows(rows.filter((_, idx) => idx !== id))
    }

    const addRow = (newRow) => {
        setRows([...rows, newRow])
    }

    // const validarformInsumos = () => {
    //     if(formInsumos.nombre && formInsumos.cantidad && formInsumos.unidad && formInsumos.valorUnitario){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformInsumos({
            ...formInsumos,
            [name]: value
        });
        console.log(formInsumos);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // if(!validarformInsumos()){return}

        addRow(formInsumos);
    }
    return (
        <div>
            <div className="containerTIOT">
                <Table className='tablaOT'>
                    <TableHeader>
                        <TableColumn className="text-lg">Item</TableColumn>
                        <TableColumn className="text-lg">Cantidad</TableColumn>
                        <TableColumn className="text-lg">Unidad</TableColumn>
                        <TableColumn className="text-lg">Nombre</TableColumn>
                        <TableColumn className="text-lg">Valor Unidad</TableColumn>
                        <TableColumn className="text-lg">SubTotal</TableColumn>
                        <TableColumn className="text-lg">Eliminar</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No hay insumos registrados."}>
                        {rows.map((row, id) => {
                            return <TableRow key={id+1}>
                                <TableCell className="text-lg">{id+1}</TableCell>
                                <TableCell className="text-lg">{row.cantidad}</TableCell>
                                <TableCell className="text-lg">{row.unidad}</TableCell>
                                <TableCell className="text-lg">{row.nombre}</TableCell>
                                <TableCell className="text-lg">{row.valorUnidad}</TableCell>
                                <TableCell className="text-lg">${(parseInt(row.cantidad) * parseInt(row.valorUnidad))}</TableCell>
                                <TableCell onClick={() => deleteRow(id)}><DeleteIcon/></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                    {/* <tfoot>
                        <tr>
                            <td colSpan={5} className='txt-right'>SubTotal</td>
                            <td>$130,000</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className='txt-right'>Iva</td>
                            <td>$24,000.00</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className='txt-right'>Total, Recursos($)</td>
                            <td>$252,200.00</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className='txt-right'>Total, Hora Hombre($)</td>
                            <td>$130,000</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className='txt-right'>Costo Total Mantenimiento</td>
                            <td>$154,700.00</td>
                        </tr>
                    </tfoot> */}
                </Table>
            </div>
            <div className="btn-registrarIOT">
                <Button onPress={onOpen} className="mr-3">Agregar Insumo</Button>
            </div>
            

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registrar Insumo</ModalHeader>
                            <ModalBody className="modalIOT">
                                <div className="formInsumosIOT">
                                    <label htmlFor="nombre">Nombre</label>
                                    <select name="nombre" onChange={handleChange} className="select_insumosOT">
                                        {insumos.map(insumo => {
                                            return <option value={insumo.nombre} key={insumo.id_insumos}>{insumo.nombre}({insumo.cantidad_insumo})</option>
                                        })}
                                    </select>
                                </div>
                                <div className="formInsumosIOT">
                                    <label htmlFor="consumible">Insumo o herramienta</label>
                                    <select name="consumible" onChange={handleChange} className="select_insumosOT">
                                        <option value={'consumible'}>Consumible</option>
                                        <option value={'noConsumible'}>No consumible</option>
                                    </select>
                                </div>
                                <div className="formInsumosIOT">
                                    <label htmlFor="cantidad" className="text-lg">Cantidad</label>
                                    <Input type="number" name="cantidad" onChange={handleChange} />
                                </div>
                                <div className="formInsumosIOT">
                                    <label htmlFor="unidad">Unidad</label>
                                    <Input type="text" name="unidad" onChange={handleChange} />
                                </div>
                                <div className="formInsumosIOT">
                                    <label htmlFor="valorUnidad">Valor unitario</label>
                                    <Input type="number" placeholder="0.00" name="valorUnidad" onChange={handleChange} 
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                          <span className="text-default-400 text-small">$</span>
                                        </div>
                                      }/>
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
