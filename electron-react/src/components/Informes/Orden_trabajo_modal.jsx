import React, { useState, useEffect } from 'react'
import logoSena from '../../img/logo.png'
import logo from '../../img/OIG3.png'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react'
import { format, isAfter } from "date-fns";
import axios from 'axios'
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Orden_trabajo_modal = ({ ordenTrabajo, insumosUtilizados }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isLoading, setIsLoading } = useLoading();
    const [date, setDate] = useState();
    const [fechaFin, setFechaFin] = useState();

    const downloadPDF = () => {
        const capture = document.querySelector('.info-ot');
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');

            // Establecer el tamaño de la página a tamaño carta (Letter size)
            const doc = new jsPDF('p', 'mm', 'letter'); // 'letter' representa el tamaño carta

            // Obtener las dimensiones de la página
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();

            // Definir márgenes (por ejemplo, 10 mm)
            const marginLeft = 10;
            const marginTop = 10;

            // Calcular el ancho y el alto de la imagen dentro del área del margen
            const imgWidth = componentWidth - (marginLeft * 2);
            const imgHeight = componentHeight - (marginTop * 2);

            // Añadir la imagen al PDF con los márgenes
            doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);

            // Guardar el PDF con el nombre especificado
            doc.save('ordenDeTrabajo.pdf');
        });
    }

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        setDate(formattedDate);
    }, []);

    useEffect(() => {
        if (ordenTrabajo && ordenTrabajo[0] && ordenTrabajo[0].fecha_fin_ot) {
            setFechaFin(new Date(ordenTrabajo[0].fecha_fin_ot));
        }
    }, [ordenTrabajo])

    const operariosJSON = ordenTrabajo && ordenTrabajo[0].operarios_ot ? ordenTrabajo[0].operarios_ot : [];
    const operarios = [];

    operariosJSON.forEach(function (jsonString) {
        var operario = JSON.parse(jsonString);
        operarios.push(operario);
    });

    const terminarOT = async () => {
        try {
            setIsLoading(true)
            const fecha_fin = new Date()
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/terminarOrdenTrabajo`,
                {
                    id_orden_de_trabajo: ordenTrabajo[0].id_orden_de_trabajo,
                    fecha_fin
                }
            )

            setIsLoading(false)
            window.location.href = '/informes'
        } catch (error) {
            setIsLoading(false)
            console.log('error')
        }
    }


    return (
        <div className='modal-ot'>
            {isLoading ? <Cargando /> : ''}
            <div className="container-modal-ot">
                <div className="accionesModalOT flex items-center">

                    {fechaFin && isAfter(fechaFin, new Date()) ? ( // Comprueba si la fecha de finalización es posterior a la fecha actual
                        <button onClick={onOpen} title='Terminar'>
                            <svg className="w-6 h-6 text-gray-800 hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    ) : null}
                    <button onClick={downloadPDF} title='Imprimir'>
                        <svg className="w-6 h-6 text-gray-800 hover:text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5c0 1.1.9 2 2 2h1v-4c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4c0 .6-.4 1-1 1H9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <Button isIconOnly radius="full" onClick={() => window.location.href = `/informes`} className='bg-white hover:bg-default'>
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                    </Button>

                </div>

                <section className="info-ot">

                    {ordenTrabajo.map(ot =>
                        <div key={ot.id_orden_de_trabajo}>

                            <div className="section-logo-MOT">
                                <div className=" w-full flex flex-col justify-center items-center">
                                    <h2 className='font-medium text-xl text-green-600 text-center'>Centro de Biotecnologia Industrial</h2>
                                    <h2>Mantenimiento Industrial</h2>
                                </div>
                                <img src={logoSena}></img>
                                <div className="infoEmpresa w-full flex flex-col justify-center mb-2">
                                    <p>Número: {ot.id_orden_de_trabajo}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="tituloSeccionOT">
                                <h2>Formato orden de trabajo {ot.nombre_maquina}</h2>
                            </div>
                            <hr />
                            <div className="containerOT">
                                <div className="section-modal-ot">

                                    <div className="valueOT">
                                        <label htmlFor='fecha_inicio_ot'>Fecha Inicio</label>
                                        <h3 className='w-11/12 h-11'>{format(new Date(ot.fecha_inicio_ot), "dd/MM/yyyy")}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='hora_inicio_ot'>Hora Inicio</label>
                                        <h3 className='w-11/12 h-11'>{ot.hora_inicio_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='fecha_fin_ot'>Fecha Finalizacion</label>
                                        <h3 className='w-11/12 h-11'>{format(new Date(ot.fecha_fin_ot), "dd/MM/yyyy")}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='hora_fin_ot'>Hora Finalizacion</label>
                                        <h3 className='w-11/12 h-11'>{ot.hora_fin_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='p_formacion'>Programa de Formacion</label>
                                        <h3 className='w-11/12 h-11' >{ot.programa_formacion_ot} </h3>
                                    </div>

                                </div>
                                <div className="section-modal-ot">

                                    <div className="valueOT">
                                        <label htmlFor='total_horas_ot'>Total Horas Trabajadas</label>
                                        <h3 className='w-11/12 h-11'  >{ot.total_horas_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='precio_hora'>Precio Hora-Hombre</label>
                                        <h3 className='w-11/12 h-11'>
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                            {ot.precio_hora}
                                        </h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='total_mano_obra'>Total Mano De Obra</label>
                                        <h3 className='w-11/12 h-11'>
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                            {ot.total_mano_obra}
                                        </h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='ficha_ot'>Ficha</label>
                                        <h3 className='w-11/12 h-11'>{ot.ficha_ot} </h3>
                                    </div>

                                </div>

                            </div>

                            <hr />
                            <div className="tituloSeccionOT">
                                <h3>Mecanicos Responsables</h3>
                            </div>
                            <hr />


                            <div className="containerOT">
                                <div className="section-modal-ot">
                                    <div className="valueOT">
                                        <label htmlFor='nombre_maquina_ot'>Nombre de la maquina</label>
                                        <h3 className='w-11/12 h-11' >{ot.nombre_maquina} </h3>
                                    </div>
                                    <div className="valueOT">
                                        <label htmlFor='ubicacion_ot'>Subtotal</label>
                                        <h3 className='w-11/12 h-11'>

                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                            {ot.subtotal_ot}
                                        </h3>
                                    </div>
                                    <div className="valueOT">
                                        <label>Costo del mantenimiento</label>
                                        <h3 className='w-11/12 h-11' >
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                            {ot.costo_mantenimiento}
                                        </h3>
                                    </div>
                                </div>

                                <div className="section-modal-ot">
                                    <div className="valueOT">
                                        <label>Tipo De Trabajo</label>
                                        <h3 className='w-11/12 h-11' >{ot.tipo_de_trabajo} </h3>

                                    </div>
                                    <div className="valueOT">
                                        <label>Tipo De Mantenimiento</label>
                                        <h3 className='w-11/12 h-11'>{ot.tipo_de_mantenimiento}</h3>
                                    </div>
                                    <div className="valueOT">
                                        <label>Tipo De Sistema</label>
                                        <h3 className='w-11/12 h-11' >{ot.tipo_de_sistema}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="containerOT">
                                {operarios && operarios.length > 0 ?
                                    <Table className='w-[50%] m-auto'>
                                        <TableHeader>
                                            <TableColumn className='text-base'>Nombre</TableColumn>
                                            <TableColumn className='text-base'>Documento</TableColumn>
                                        </TableHeader>
                                        <TableBody>

                                            {operarios.map((operario, index) =>
                                                <TableRow key={index}>
                                                    <TableCell className='text-lg'>{operario.nombre}</TableCell>
                                                    <TableCell className='text-lg'>{operario.documento}</TableCell>
                                                </TableRow>
                                            )}

                                        </TableBody>
                                    </Table>
                                    : <p className='text-lg w-full text-center'>No se registraron operarios</p>}

                            </div>

                            <hr />
                            <div className="tituloSeccionOT">
                                <h3>Descripcion del trabajo o actividad a realizar</h3>
                            </div>
                            <hr />

                            <div className="containerDOT">
                                <div className='funcionModalOT'>
                                    {ot.descripcion_de_trabajo}
                                </div>
                            </div>

                            <hr />
                            <div className="tituloSeccionOT">
                                <h3>Insumos utilizados</h3>
                            </div>
                            <hr />
                            {insumosUtilizados && insumosUtilizados.length > 0 ?
                                <Table className='w-[80%] m-auto mb-10'>
                                    <TableHeader>
                                        <TableColumn className='text-base'>Nombre</TableColumn>
                                        <TableColumn className='text-base'>Cantidad</TableColumn>
                                        <TableColumn className='text-base'>Unidad</TableColumn>
                                        <TableColumn className='text-base'>Valor unitario</TableColumn>
                                        <TableColumn className='text-base'>Subtotal</TableColumn>
                                        <TableColumn className='text-base'>id orden</TableColumn>
                                    </TableHeader>
                                    <TableBody>

                                        {insumosUtilizados.map(insumo =>
                                            <TableRow>
                                                <TableCell className='text-lg'>{insumo.nombre_insumo_ot}</TableCell>
                                                <TableCell className='text-lg'>{insumo.cantidad_insumo_ot}</TableCell>
                                                <TableCell className='text-lg'>{insumo.unidad_insumo_ot}</TableCell>
                                                <TableCell className='text-lg'>{insumo.valor_insumo_ot}</TableCell>
                                                <TableCell className='text-lg'>{insumo.subtotal_insumo_ot}</TableCell>
                                                <TableCell className='text-lg'>{insumo.id_orden_de_trabajo}</TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>
                                : <p className='text-lg w-full text-center'>No se utilizaron insumo o herramientas</p>}

                            <hr />
                            <div className="flex justify-between items-center w-[88%] m-auto mt-5">
                                <div className="nombreEmpresa flex flex-col md:flex-row items-center gap-5">
                                    <img src={logo} className='logoOTM'></img>
                                    <div className="infoEmpresa w-full flex flex-col justify-center">
                                        <h2>Sistema Gestion Mantenimiento Industrial</h2>
                                        <p className='text-base'>Orden de trabajo: {ot.id_orden_de_trabajo}</p>
                                    </div>
                                </div>
                                <div>Fecha: {date}</div>
                            </div>
                        </div>

                    )}

                </section>
            </div>

            <Modal
                backdrop="blur"
                placement='center'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Alerta</ModalHeader>
                            <ModalBody>
                                <p>
                                    Estas seguro que deseas terminar la orden de trabajo,
                                    se actualizara la fecha de finalizacion {date}.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button className='boton-registrar' onPress={terminarOT}>
                                    terminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
