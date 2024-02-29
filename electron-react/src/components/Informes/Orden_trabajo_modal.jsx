import React from 'react'
import logoSena from '../../img/logo.png'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const Orden_trabajo_modal = ({ ordenTrabajo }) => {

    const downloadPDF = () => {
        const capture = document.querySelector('.info-ot');
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            console.log(componentHeight, componentWidth);
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('ordenDeTrabajo.pdf');
        })
    }
    return (
        <div className='modal-ot'>
            <div className="container-modal-ot">
                <div className="accionesModalOT">
                    <button onClick={downloadPDF}>
                        <svg className="w-6 h-6 text-gray-800 hover:text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5c0 1.1.9 2 2 2h1v-4c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4c0 .6-.4 1-1 1H9Z" clipRule="evenodd" />
                        </svg>

                    </button>
                    <a href={'/informes'}><p>cerrar</p></a>
                </div>

                <section className="info-ot">

                    {ordenTrabajo.map(ot =>
                        <div key={ot.id_orden_de_trabajo}>

                            <div className="section-logo-MOT">
                                <div className="nombreEmpresa flex items-center">
                                    <img src={logoSena}></img>
                                    <div className="infoEmpresa">
                                        <h2>SGMI</h2>
                                    </div>
                                </div>
                                <p>Orden de trabajo: {ot.id_orden_de_trabajo}</p>
                            </div>
                            <div className="tituloSeccionOT">
                                <h2>Orden de trabajo "maquina" {ot.id_maquina}</h2>
                            </div>
                            <hr />
                            <div className="containerOT">
                                <div className="section-modal-ot">

                                    <div className="valueOT">
                                        <label htmlFor='fecha_inicio_ot'>Fecha Inicio</label>
                                        <h3 className='w-11/12 h-11'>{ot.fecha_inicio_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='hora_inicio_ot'>Hora Inicio</label>
                                        <h3 className='w-11/12 h-11'>{ot.hora_inicio_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='fecha_fin_ot'>Fecha Finalizacion</label>
                                        <h3 className='w-11/12 h-11'>{ot.fecha_fin_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='hora_fin_ot'>Hora Finalizacion</label>
                                        <h3 className='w-11/12 h-11'>{ot.hora_fin_ot}</h3>
                                    </div>

                                    <div className="valueOT">
                                        <label htmlFor='p_formacion'>Programa de Formacion</label>
                                        <h3 className='w-11/12 h-11' >{ot.id_aprendiz} </h3>
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
                                        <h3 className='w-11/12 h-11'>{ot.id_aprendiz} </h3>
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
                                        <label htmlFor='ubicacion_ot'>Ubicacion</label>
                                        <h3 className='w-11/12 h-11'>{ot.id_maquina} </h3>
                                    </div>
                                    <div className="valueOT">
                                        <label htmlFor='nombre_maquina_ot'>Nombre de la maquina</label>
                                        <h3 className='w-11/12 h-11' >{ot.id_maquina} </h3>
                                    </div>
                                    <div className="valueOT">
                                        <label htmlFor='id_maquina'>Codigo de la maquina</label>
                                        <h3 className='w-11/12 h-11' > {ot.id_maquina} </h3>
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
                        </div>
                    )}

                </section>
            </div>
        </div>
    )
}
