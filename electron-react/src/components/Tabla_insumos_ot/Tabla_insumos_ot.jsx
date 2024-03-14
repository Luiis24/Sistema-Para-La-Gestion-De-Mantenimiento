import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem } from "@nextui-org/react";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Tabla_insumos_ot.css'
import { DeleteIcon } from "./DeleteIcon";

export const Tabla_insumos_ot = ({ formInsumos, setformInsumos, handleInsumosUsados, handleDeleteInsumos }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [rows, setRows] = useState([]);
    const [maxCantidad, setMaxCantidad] = useState();

    const [insumos, setInsumos] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/insumos`)
            .then(datos => {
                setInsumos(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const deleteRow = (id) => {
        setRows(rows.filter((_, idx) => idx !== id));

        handleDeleteInsumos(id);
    }

    const addRow = (newRow) => {
        setRows([...rows, newRow])
    }

    // Restablecer el formulario
    const resetForm = () => {
        setformInsumos({
            cantidad: "",
            consumible: "",
            id_insumo: null,
            nombre: "",
            subtotal: null,
            unidad: "",
            valorUnidad: "",
        });
        setMaxCantidad(null);
    }

    const validarformInsumos = () => {
        const { nombre, cantidad, unidad, valorUnidad, consumible } = formInsumos;
        // Verificar si todos los campos requeridos están llenos
        if (nombre && cantidad && unidad && valorUnidad && consumible) {
            return true;
        } else {
            return false;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "nombre") {
            // Buscar el insumo seleccionado
            const selectedInsumo = insumos.find(insumo => insumo.id_insumos === parseInt(value));
            // Calcular la cantidad máxima permitida
            const maxCantidad = selectedInsumo ? selectedInsumo.cantidad_insumo - (selectedInsumo.insumos_en_uso || 0) : 0;
            // Actualizar el estado con el nombre y el id_insumo seleccionados, y establecer el valor máximo para la cantidad
            setformInsumos({
                ...formInsumos,
                [name]: value,
                nombre: selectedInsumo ? selectedInsumo.nombre_insumo : '',
                id_insumo: selectedInsumo ? selectedInsumo.id_insumos : ''
            });

            setMaxCantidad(maxCantidad);
        } else {
            // Actualizar el estado con los demás campos y calcular el subtotal
            const cantidad = name === "cantidad" ? value : formInsumos.cantidad;
            const valorUnidad = name === "valorUnidad" ? value : formInsumos.valorUnidad;
            const subtotal = cantidad * valorUnidad;
            setformInsumos({
                ...formInsumos,
                [name]: value,
                subtotal: subtotal
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validarformInsumos()) {
            return;
        }

        addRow(formInsumos);
        handleInsumosUsados(formInsumos);
        resetForm();
    }
    return (
        <div>
            <div className="containerTIOT">
                <Table className="tablaOT">
                    <TableHeader>
                        <TableColumn className="md:text-lg">Cantidad</TableColumn>
                        <TableColumn className="md:text-lg">Nombre</TableColumn>
                        <TableColumn className="md:text-lg">Unidad</TableColumn>
                        <TableColumn className="md:text-lg">Valor unidad</TableColumn>
                        <TableColumn className="md:text-lg">Consumible</TableColumn>
                        <TableColumn className="md:text-lg">SubTotal</TableColumn>
                        <TableColumn className="md:text-lg">Eliminar</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No hay insumos registrados."}>
                        {rows.map((row, id) => {
                            return (
                                <TableRow key={id + 1}>
                                    <TableCell className="md:text-lg">{row.cantidad}</TableCell>
                                    <TableCell className="md:text-lg">{row.nombre}</TableCell>
                                    <TableCell className="md:text-lg">{row.unidad}</TableCell>
                                    <TableCell className="md:text-lg">{row.valorUnidad}</TableCell>
                                    <TableCell className="md:text-lg">{row.consumible}</TableCell>
                                    <TableCell className="md:text-lg">
                                        ${parseInt(row.cantidad) * parseInt(row.valorUnidad)}
                                    </TableCell>
                                    <TableCell onClick={() => deleteRow(id)}>
                                        <DeleteIcon className="cursor-pointer" />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="btn-registrarIOT">
                <Button onPress={onOpen} className="w-1/6">
                    Agregar Insumo
                </Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement={"center"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl">
                                Registrar Insumo
                            </ModalHeader>
                            <ModalBody className="modalIOT">
                                <div className="formInsumosIOT">
                                    <label htmlFor="nombre">Nombre</label>
                                    <Select
                                        name="nombre"
                                        onChange={handleChange}
                                        placeholder="Nombre"
                                    >
                                        {insumos.map((insumo) => {
                                            // Verificar si la cantidad disponible es mayor que 0
                                            if (insumo.cantidad_insumo - (insumo.insumos_en_uso || 0) > 0) {
                                                return (
                                                    <SelectItem value={insumo.id_insumos} key={insumo.id_insumos} endContent={<p>({insumo.cantidad_insumo - insumo.insumos_en_uso})</p>}>
                                                        {insumo.nombre_insumo}
                                                    </SelectItem>
                                                );
                                            } else {
                                                return null; // No agregar la opción al select si la cantidad es 0
                                            }
                                        })}
                                    </Select>
                                </div>
                                <div className="formInsumosIOT">
                                    <Select name="consumible" onChange={handleChange} placeholder="Es consumible">
                                        <SelectItem value={'consumible'} key={'consumible'}>Consumible</SelectItem>
                                        <SelectItem value={'No consumible'} key={'No consumible'}>No consumible</SelectItem>
                                    </Select>
                                </div>
                                <div className="formInsumosIOT">
                                    <Input
                                        id="cantidadInput"
                                        placeholder="Cantidad"
                                        type="number"
                                        name="cantidad"
                                        onChange={handleChange}
                                        min={1}
                                        max={maxCantidad}
                                    />
                                </div>
                                <div className="formInsumosIOT">
                                    <Input
                                        placeholder="Unidad"
                                        type="text"
                                        name="unidad"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="formInsumosIOT">
                                    <label htmlFor="valorUnidad">Valor unitario</label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        name="valorUnidad"
                                        onChange={handleChange}
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                        }
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className='button-cerrar'>
                                    <Button className='text-slate-50 bg-red-500' variant="flat" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </div>
                                <div className='botton-registrar-div'>
                                    <Button className='text-white' type="submit" onPress={onClose} onClick={handleSubmit}>
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
