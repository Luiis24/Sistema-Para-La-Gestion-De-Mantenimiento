import React, { useState, useEffect } from 'react'
import './Orden_trabajo_maquina.css'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { Tabla_insumos_ot } from '../Tabla_insumos_ot/Tabla_insumos_ot'
import { Input, Select, SelectItem, Textarea, Button } from '@nextui-org/react'
import { Tabla_mecanicos_ot } from '../Tabla_mecanicos_ot/Tabla_mecanicos'
import { useAuth } from "../../estados/usuario";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Orden_trabajo_maquina = () => {
  const [maquinaid, setMaquinaid] = useState();
  const [formOT, setFormOT] = useState({
    fecha_inicio_ot: "",
    hora_inicio_ot: "",
    fecha_fin_ot: "",
    hora_fin_ot: "",
    total_horas_ot: "",
    precio_hora: "",
    descripcion_de_trabajo: "",
  });

  const [formMecanicos, setFormMecanicos] = useState()
  const [formInsumos, setformInsumos] = useState([])
  const [formInsumosUtilizados, setformInsumosUtilizados] = useState([])

  const [tipoTrabajo, setTipoTrabajo] = useState()
  const [tipoMantenimiento, setTipoMantenimiento] = useState()
  const [tipoSistema, setTipoSistema] = useState()

  const { id_maquina } = useParams();
  const { user } = useAuth();

  const [formValues, setFormValues] = useState({
    fecha_inicio_ot: "",
    hora_inicio_ot: "",
    fecha_fin_ot: "",
    hora_fin_ot: "",
    total_horas_ot: "",
    precio_hora: "",
    descripcion_de_trabajo: "",
  });

  useEffect(() => {
    // Cargar valores del formulario desde el almacenamiento local o una base de datos
    const storedFormValues = JSON.parse(localStorage.getItem('formValues'));
    if (storedFormValues) {
      setFormOT(storedFormValues); // Actualizar formOT con los valores del localStorage
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/ordenDeTrabajo/${id_maquina}`)
      .then((datos) => {
        const maquina = datos.data;
        setMaquinaid(maquina);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [id_maquina]);

  const registrarOrdenDeTrabajo = async () => {
    const userId = user.id_aprendiz ? user.id_aprendiz : user.id_instructor;
    try {

      // Calcular el total de insumos
      let totalInsumos = 0;
      formInsumosUtilizados.forEach(insumo => {
        totalInsumos += insumo.subtotal; // Sumar el subtotal de cada insumo
      });

      const response = await axios.post('http://localhost:4002/registerOrdenTrabajo', {
        fecha_inicio_ot: formOT.fecha_inicio_ot,
        hora_inicio_ot: formOT.hora_inicio_ot,
        fecha_fin_ot: formOT.fecha_fin_ot,
        hora_fin_ot: formOT.hora_fin_ot,
        // p_formacion: user.programa_aprendiz, 
        total_horas_ot: formOT.total_horas_ot,
        precio_hora: formOT.precio_hora,
        total_mano_obra: parseInt(formOT.total_horas_ot) * parseInt(formOT.precio_hora),
        // ficha_ot: user.ficha_aprendiz, 
        tipo_de_trabajo: tipoTrabajo,
        tipo_de_mantenimiento: tipoMantenimiento,
        tipo_de_sistema: tipoSistema,
        descripcion_de_trabajo: formOT.descripcion_de_trabajo,
        // ubicacion_ot: formOT.ubicacion_ot, 
        // nombre_maquina_ot: maquinaid.nombre_maquina, 
        // mecanicos_responsables: formMecanicos,
        subtotal_ot: totalInsumos,
        iva: 1,
        total_precio_horas: parseInt(formOT.total_horas_ot) * parseInt(formOT.precio_hora),
        costo_mantenimiento: totalInsumos + (parseInt(formOT.total_horas_ot) * parseInt(formOT.precio_hora)),
        id_maquina: maquinaid.id_maquina,
        id_aprendiz: userId
      });

      const ordenDeTrabajoId = response.data.id_orden_de_trabajo;

      await Promise.all(formInsumosUtilizados.map(async (insumo) => {
        // Verificar si el insumo tiene un nombre definido
        if (!insumo.id_insumo) {
          console.error('ID del insumo no definida');
          return;
        }

        // Realizar la solicitud para registrar el uso del insumo
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/UsarInsumo/${insumo.id_insumo}`, {
          id_insumo: insumo.id_insumo,
          cantidad: insumo.cantidad
        });

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/registerInsumosUtilizados`, {
          nombre_insumo_ot: insumo.nombre,
          cantidad_insumo_ot: insumo.cantidad,
          unidad_insumo_ot: insumo.unidad,
          valor_insumo_ot: insumo.valorUnidad,
          subtotal_insumo_ot: insumo.subtotal,
          total_precio_insumo_ot: 1,
          origen_insumo_ot: 1,
          id_orden_de_trabajo: ordenDeTrabajoId,
          id_insumos: insumo.id_insumo
        })
      }));

      console.log(formOT)
      toast.success('Orden de trabajo registrada')
      window.location.href = '/informes'
    } catch (error) {
      toast.error('Error al registrar en la orden de trabajo. Por favor, inténtelo nuevamente.')
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormOT({
      ...formOT,
      [name]: value
    });

    localStorage.setItem('formValues', JSON.stringify({
      ...formOT,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    registrarOrdenDeTrabajo(formOT);
  }

  const handleInsumosUsados = async (insumo) => {
    // Crea una copia del array actual y luego agrega el nuevo insumo
    const updatedInsumos = [...formInsumosUtilizados, insumo];
    // Actualiza el estado con la nueva copia del array
    setformInsumosUtilizados(updatedInsumos);
  }

  return (
    <div>
      <div className="containerM">
        <div className="navHorizontal">
          <Link to={`/checklistMaquina/${id_maquina}`}>
            <h2><p className='hidden md:flex'>CheckList</p>
              <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6" />
              </svg>
            </h2>
          </Link>
          <h2 id='active'><p className='hidden md:flex'>Orden de trabajo</p>
            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
            </svg>
          </h2>
          <Link to={`/hojaVida/${id_maquina}`}>
            <h2><p className='hidden md:flex'>Hoja de vida</p>
              <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
              </svg>
            </h2>
          </Link>
        </div>
        <ToastContainer />
        <div className="tituloSeccionOT">
          <h2>Formato Orden de trabajo {maquinaid ? maquinaid.nombre_maquina : ''}</h2>
        </div>
        <hr />

        <form onSubmit={handleSubmit} name='OrdenDeTrabajo'>
          <div className="containerOT">
            <div className="sectionOT">

              <div className="valueOT">
                <label htmlFor='fecha_inicio_ot'>Fecha Inicio</label>
                <Input type='date' className='w-11/12 h-11' name='fecha_inicio_ot' onChange={handleChange} placeholder={formOT? formOT.fecha_inicio_ot : ''}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='hora_inicio_ot'>Hora Inicio</label>
                <Input type='time' className='w-11/12 h-11' name='hora_inicio_ot' onChange={handleChange} placeholder={formOT ? formOT.hora_inicio_ot : ''}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='fecha_fin_ot'>Fecha Finalizacion</label>
                <Input type='date' className='w-11/12 h-11' name='fecha_fin_ot' onChange={handleChange} placeholder={formOT ? formOT.fecha_fin_ot : ''}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='hora_fin_ot'>Hora Finalizacion</label>
                <Input type='time' className='w-11/12 h-11' name='hora_fin_ot' onChange={handleChange} placeholder={formOT ? formOT.hora_fin_ot : ''}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='p_formacion'>Programa de Formacion</label>
                <Input type='search' className='w-11/12 h-11 text-2xl' name='p_formacion' value={user.programa_aprendiz} disabled></Input>
              </div>

            </div>
            <div className="sectionOT">

              <div className="valueOT">
                <label htmlFor='total_horas_ot'>Total Horas Trabajadas</label>
                <Input type='number' className='w-11/12 h-11' name='total_horas_ot' onChange={handleChange} placeholder={formOT ? formOT.total_horas_ot : ''}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='precio_hora'>Precio Hora-Hombre</label>
                <Input type="number" className='w-11/12 h-11' name='precio_hora' onChange={handleChange} placeholder={formOT ? formOT.precio_hora : ''}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>

              <div className="valueOT">
                <label htmlFor='total_mano_obra'>Total Mano De Obra</label>
                <Input type="number" name='total_mano_obra' placeholder="0.00" className='w-11/12 h-11' isDisabled value={formOT?.precio_hora * formOT?.total_horas_ot}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>

              <div className="valueOT">
                <label htmlFor='ficha_ot'>Ficha</label>
                <Input type='search' className='w-11/12 h-11' name='ficha_ot' value={user.ficha_aprendiz} disabled></Input>
              </div>

            </div>

          </div>

          <hr />
          <div className="tituloSeccionOT">
            <h3>Mecanicos Responsables</h3>
          </div>
          <hr />


          <div className="containerOT">
            <div className="sectionOT">
              <div className="valueOT">
                <label htmlFor='ubicacion_ot'>Ubicacion (lugar donde se realiza el trabajo)</label>
                <Input type='text' className='w-11/12 h-11' name='ubicacion_ot' onChange={handleChange} />
              </div>
              <div className="valueOT">
                <label htmlFor='nombre_maquina_ot'>Nombre de la maquina o equipo al intervenir</label>
                <Input type='text' name='nombre_maquina_ot' className='w-11/12 h-11' value={maquinaid ? maquinaid.nombre_maquina : ''} disabled onChange={handleChange} />
              </div>
              <div className="valueOT">
                <label htmlFor='id_maquina'>Codigo de la maquina o equipo</label>
                <Input type='number' name='id_maquina' className='w-11/12 h-11' value={maquinaid ? maquinaid.id_maquina : ''} disabled onChange={handleChange} />
              </div>
            </div>

            <div className="sectionOT">
              <div className="valueOT">
                <label>Tipo De Trabajo</label>
                <Select className='w-11/12 h-11' placeholder='Tipo de trabajo' onChange={(e) => { setTipoTrabajo(e.target.value) }}>
                  <SelectItem value='inspeccion' key='inspeccion'>Inspeccion</SelectItem>
                  <SelectItem value='servicio' key='servicio'>Servicio</SelectItem>
                  <SelectItem value='reparacion' key='reparacion'>Reparacion</SelectItem>
                  <SelectItem value='modificacion' key='modificacion'>Modificacion</SelectItem>
                  <SelectItem value='fabricacion' key='fabricacion'>Fabricacion</SelectItem>
                  <SelectItem value='montaje' key='montaje'>Montaje</SelectItem>
                  <SelectItem value='desmontaje' key='desmontaje'>Desmontaje</SelectItem>
                  <SelectItem value='cambio' key='cambio'>Cambio</SelectItem>
                </Select>
              </div>
              <div className="valueOT">
                <label>Tipo De Mantenimiento</label>
                <Select className='w-11/12 h-11' placeholder='Correctivo no planificado' onChange={(e) => { setTipoMantenimiento(e.target.value) }}>
                  <SelectItem value='correctivo no planificado' key='correctivo no planificado'>Correctivo no planificado</SelectItem>
                  <SelectItem value='correctivo palificado' key='correctivo palificado'>Correctivo planificado</SelectItem>
                  <SelectItem value='mantenimiento preventivo' key='mantenimiento preventivo'>Mantenimiento preventivo</SelectItem>
                  <SelectItem value='basado en el tiempo' key='basado en el tiempo'>Basado en el tiempo</SelectItem>
                  <SelectItem value='basado en el uso o contador' key='basado en el uso o contador'>Basado en el uso o contador</SelectItem>
                  <SelectItem value='basado en condicion' key='basado en condicion'>Basado en condicion</SelectItem>
                  <SelectItem value='predictivo' key='predictivo'>Predictivo</SelectItem>
                  <SelectItem value='proactivo' key='proactivo'>Proactivo</SelectItem>
                  <SelectItem value='detectivo' key='detectivo'>Detectivo</SelectItem>
                  <SelectItem value='de emergencia' key='de emergencia'>De emergencia</SelectItem>
                  <SelectItem value='autonomo' key='autonomo'>Autonomo</SelectItem>
                  <SelectItem value='de reacondicionamiento' key='de reacondicionamiento'>De reacondicionamiento</SelectItem>
                  <SelectItem value='de reemplazo' key='de reemplazo'>De reemplazo</SelectItem>
                </Select>
              </div>
              <div className="valueOT">
                <label>Tipo De Sistema</label>
                <Select className='w-11/12 h-11' placeholder='Mecanico' onChange={(e) => { setTipoSistema(e.target.value) }}>
                  <SelectItem value='mecanico' key='mecanico'>Mecanico</SelectItem>
                  <SelectItem value='electrico' key='electrico'>Electrico</SelectItem>
                  <SelectItem value='hidraulico' key='hidraulico'>Hidraulico</SelectItem>
                  <SelectItem value='neumatico' key='neumatico'>Neumatico</SelectItem>
                  <SelectItem value='de control' key='de control'>De control</SelectItem>
                  <SelectItem value='de refrigeracion' key='de refrigeracion'>De refrigeracion</SelectItem>
                  <SelectItem value='de lubricacion' key='de lubricacion'>De lubricacion</SelectItem>
                  <SelectItem value='de alimentacion' key='de alimentacion'>De alimentacion</SelectItem>
                  <SelectItem value='de seguridad' key='de seguridad'>De seguridad</SelectItem>
                  <SelectItem value='de comunicacion' key='de comunicacion'>De comunicacion</SelectItem>
                </Select>
              </div>
            </div>
          </div>

          <Tabla_mecanicos_ot formMecanicos={formMecanicos} setFormMecanicos={setFormMecanicos} />

          <hr />
          <div className="tituloSeccionOT">
            <h3>Descripcion del trabajo o actividad a realizar</h3>
          </div>
          <hr />

          <div className="containerDOT">
            <Textarea
              placeholder={formOT ? formOT.descripcion_de_trabajo : 'Describe el trabajo o acividad a realizar'}
              className="col-span-8 md:col-span-6 mb-6 md:mb-0"
              name='descripcion_de_trabajo'
              onChange={handleChange}
            />
          </div>

          <hr />
          <div className="tituloSeccionOT">
            <h3>Recursos</h3>
          </div>
          <hr />

          <Tabla_insumos_ot formInsumos={formInsumos} setformInsumos={setformInsumos} handleInsumosUsados={handleInsumosUsados} />
          <hr></hr>
          {/* <Button type='submit'>Registrar orden de trabajo</Button> */}
          <div className="button-inp flex justify-center btn-registrarIOT">
            <Button className='rgCheckList' type='submit'>Terminar orden</Button>
          </div>

        </form>


      </div>
    </div>
  )
}
