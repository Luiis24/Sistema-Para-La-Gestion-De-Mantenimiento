import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";


const CrearTipoMaquina = ({isOpen, onOpen, onOpenChange}) => {
    const [nombreTipoMaquina, setNombreTipoMaquina] = useState('');
    const [descripcionTipoMaquina, setDescripcionTipoMaquina] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4002/crearTipoMaquina', {
                nombre_tipo_maquina: nombreTipoMaquina,
                descripcion_tipo_maquina: descripcionTipoMaquina,
            });

            console.log('Tipo de máquina registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar el tipo de máquina', error);
        }
    };

    return (
        <div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody className='flex justify-center'>
                                <h1>Crear Un Nuevo Tipo De Maquina</h1>
                                <form onSubmit={handleFormSubmit}>
                                    <div>
                                        <label>Nombre del Tipo de Maquina:</label>
                                        <Input
                                            type="text"
                                            placeholder="Tipo de Maquina"
                                            value={nombreTipoMaquina}
                                            onChange={(event) => setNombreTipoMaquina(event.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Descripción del Tipo de Maquina:</label>
                                        <Input
                                            type="textarea"
                                            placeholder="Describe el tipo de Maquina que estás creando"
                                            value={descripcionTipoMaquina}
                                            onChange={(event) => setDescripcionTipoMaquina(event.target.value)}
                                        />
                                    </div>
                                    <Button type="submit">Registrar Tipo de Maquina</Button>
                                    <Button><Link to={'/tornos'}>Inicio</Link></Button>
                                </form>
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
    );
};

export default CrearTipoMaquina;