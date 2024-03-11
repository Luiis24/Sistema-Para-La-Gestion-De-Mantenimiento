import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logoSena from '../../img/logo.png'
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

export const Prueba = ({ ordenTrabajo, insumosUtilizados }) => {
    const styles = StyleSheet.create({
        sectionModalOT: {
            width: '50%',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
        },
        nombreEmpresa: {
            display: 'flex',
        },
        tituloSeccionOT: {
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '23px'
        },
        containerOT: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            gap: '10px',
            margin: '10px 0 20px 0',
        },
        sectionOT: {
            width: '40%',
            margin: '10px',
            display:' flex',
            flexDirection: 'column',
            gap: '25px',
        },
        valueOT: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '25px',
        },
        descripcionOT: {
            width: '80%',
            height: '150px',
            backgroundColor: 'rgb(231, 231, 231)',
            color: '#000',
            border: 'none',
            borderRadius: '16px',
            padding: '20px',
            fontSize: '20px',
            resize: 'none',
            margin: '20px 0 20px 0',
        },
        containerDOT: {
            width: '88%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px auto',
        },
        valueOT:{
            width: '50%',
            fontSize: '17px',
            textWrap: 'balance',
        },
        input: {
            width: "90%",
            backgroundColor: '#333',
            height: '50px'
        }
    })
    return (
        <Document>

            {ordenTrabajo.map(ot =>
                <Page key={ot.id_orden_de_trabajo}>

                    <View style={(styles.sectionLogoMOT)}>
                        <View style={(styles.nombreEmpresa)}>
                            <Image src={logoSena}></Image>
                            <View>
                                <Text>SGMI</Text>
                            </View>
                        </View>
                        <Text>Orden de trabajo: {ot.id_orden_de_trabajo}</Text>
                    </View>
                    <View style={(styles.tituloSeccionOT)}>
                        <Text>Orden de trabajo {ot.nombre_maquina}</Text>
                    </View>

                    <View style={(styles.containerOT)}>
                        <View style={(styles.sectionModalOT)}>

                            <View style={(styles.valueOT)}>
                                <Text>Fecha Inicio</Text>
                                <Text style={(styles.input)}>{format(new Date(ot.fecha_inicio_ot), "dd/MM/yyyy")}</Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Hora Inicio</Text>
                                <Text style={(styles.input)}>{ot.hora_inicio_ot}</Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Fecha Finalizacion</Text>
                                <Text style={(styles.input)}>{format(new Date(ot.fecha_fin_ot), "dd/MM/yyyy")}</Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Hora Finalizacion</Text>
                                <Text style={(styles.input)}>{ot.hora_fin_ot}</Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Programa de Formacion</Text>
                                <Text style={(styles.input)} >{ot.programa_formacion_ot} </Text>
                            </View>

                        </View>
                        <View style={(styles.sectionModalOT)}>

                            <View style={(styles.valueOT)}>
                                <Text>Total Horas Trabajadas</Text>
                                <Text style={(styles.input)}  >{ot.total_horas_ot}</Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Precio Hora-Hombre</Text>
                                <Text style={(styles.input)}>
                                    {ot.precio_hora}
                                </Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Total Mano De Obra</Text>
                                <Text style={(styles.input)}>
                                    {ot.total_mano_obra}
                                </Text>
                            </View>

                            <View style={(styles.valueOT)}>
                                <Text>Ficha</Text>
                                <Text style={(styles.input)}>{ot.ficha_ot} </Text>
                            </View>

                        </View>

                    </View>


                    <View style={(styles.tituloSeccionOT)}>
                        <Text>Mecanicos Responsables</Text>
                    </View>



                    <View style={(styles.containerOT)}>
                        <View style={(styles.sectionModalOT)}>
                            <View style={(styles.valueOT)}>
                                <Text>Ubicacion</Text>
                                <Text style={(styles.input)}>{ot.id_maquina} </Text>
                            </View>
                            <View style={(styles.valueOT)}>
                                <Text>Nombre de la maquina</Text>
                                <Text style={(styles.input)} >{ot.id_maquina} </Text>
                            </View>
                            <View style={(styles.valueOT)}>
                                <Text>Codigo de la maquina</Text>
                                <Text style={(styles.input)} > {ot.id_maquina} </Text>
                            </View>
                        </View>

                        <View style={(styles.sectionModalOT)}>
                            <View style={(styles.valueOT)}>
                                <Text>Tipo De Trabajo</Text>
                                <Text style={(styles.input)} >{ot.tipo_de_trabajo} </Text>

                            </View>
                            <View style={(styles.valueOT)}>
                                <Text>Tipo De Mantenimiento</Text>
                                <Text style={(styles.input)}>{ot.tipo_de_mantenimiento}</Text>
                            </View>
                            <View style={(styles.valueOT)}>
                                <Text>Tipo De Sistema</Text>
                                <Text style={(styles.input)} >{ot.tipo_de_sistema}</Text>
                            </View>
                        </View>
                    </View>

                    {/* <View style={(styles.containerOT)}>
                        <View style={(styles.sectionModalOT)}>
                            {operarios && operarios.map((operario, index) => (
                                <View key={index}>
                                    <View style={(styles.valueOT)}>
                                        <Text>Documento</Text>
                                        <Text style={(styles.input)}>{operario.documento}</Text>
                                    </View>
                                    <View style={(styles.valueOT)}>
                                        <Text>Nombre</Text>
                                        <Text style={(styles.input)}>{operario.nombre}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View> */}


                    <View style={(styles.tituloSeccionOT)}>
                        <Text>Descripcion del trabajo o actividad a realizar</Text>
                    </View>


                    <View style={(styles.containerDOT)}>
                        <View style={(styles.funcionModalOT)}>
                            {ot.descripcion_de_trabajo}
                        </View>
                    </View>


                    <View style={(styles.tituloSeccionOT)}>
                        <Text>Insumos utilizados</Text>
                    </View>


                    <Table>
                        <TableHeader>
                            <TableColumn>Nombre</TableColumn>
                            <TableColumn>Cantidad</TableColumn>
                            <TableColumn>Unidad</TableColumn>
                            <TableColumn>Valor unitario</TableColumn>
                            <TableColumn>Subtotal</TableColumn>
                            <TableColumn>id orden</TableColumn>
                        </TableHeader>
                        <TableBody>

                            {insumosUtilizados.map(insumo =>
                                <TableRow>
                                    <TableCell>{insumo.nombre_insumo_ot}</TableCell>
                                    <TableCell>{insumo.cantidad_insumo_ot}</TableCell>
                                    <TableCell>{insumo.unidad_insumo_ot}</TableCell>
                                    <TableCell>{insumo.valor_insumo_ot}</TableCell>
                                    <TableCell>{insumo.subtotal_insumo_ot}</TableCell>
                                    <TableCell>{insumo.id_orden_de_trabajo}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>

                    <View style={(styles.containerOT)}>
                        <View style={(styles.sectionModalOT)}>
                            <View style={(styles.valueOT)}>
                                <Text>Subtotal</Text>
                                <Text style={(styles.input)}>
                                    {ot.subtotal_ot}
                                </Text>
                            </View>
                            <View style={(styles.valueOT)}>
                                <Text>Total precio horas</Text>
                                <Text style={(styles.input)} >
                                    {ot.total_precio_horas}
                                </Text>
                            </View>
                        </View>

                        <View style={(styles.sectionModalOT)}>
                            <View style={(styles.valueOT)}>
                                <Text>Costo del mantenimiento</Text>
                                <Text style={(styles.input)} >
                                    {ot.costo_mantenimiento}
                                </Text>

                            </View>
                        </View>
                    </View>
                </Page>
            )}

        </Document>
    )
}
