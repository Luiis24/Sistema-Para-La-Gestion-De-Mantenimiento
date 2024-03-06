import React, { useState, useEffect } from 'react'
import './Orden_trabajo_maquina.css'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { Tabla_insumos_ot } from '../Tabla_insumos_ot/Tabla_insumos_ot'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { Tabla_mecanicos_ot } from '../Tabla_mecanicos_ot/Tabla_mecanicos'
import { useAuth } from "../../estados/usuario";

export const Orden_trabajo_maquina = () => {
  const [maquinaid, setMaquinaid] = useState();
  const [formOT, setFormOT] = useState();
  const [formMecanicos, setFormMecanicos] = useState()
  const [formInsumos, setformInsumos] = useState()
  const { id_maquina } = useParams();
  const { user } = useAuth();

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
    try {
      // const response = await axios.post('http://localhost:4002/registerOrdenTrabajo', {
      //   id_orden_de_trabajo: 1, 
      //   fecha_inicio_ot: formOT.fecha_inicio_ot, 
      //   hora_inicio_ot: formOT.hora_inicio_ot, 
      //   fecha_fin_ot: formOT.fecha_fin_ot, 
      //   hora_fin_ot: formOT.hora_fin_ot, 
      //   p_formacion:, 
      //   total_horas_ot: formOT.total_horas_ot, 
      //   precio_hora: formOT.precio_hora, 
      //   total_mano_obra: formOT.total_mano_obra, 
      //   ficha_ot:, 
      //   ubicacion_ot: formOT.ubicacion_ot, 
      //   nombre_maquina_ot: maquinaid.nombre_maquina, 
      //   id_maquina: maquinaid.id_maquina, 
      //   tipo_de_trabajo: formOT.tipo_de_trabajo, 
      //   tipo_de_mantenimiento: formOT.tipo_de_mantenimiento, 
      //   tipo_de_sistema: formOT.tipo_de_sistema,
      //   mecanicos_responsables: formMecanicos, 
      //   descripcion_de_trabajo: formOT.descripcion_de_trabajo, 
      //   insumos_utilizados: formInsumos, 
      //   subtotal, 
      //   iva, 
      //   costo_mantenimiento
      // });

      // console.log(response.data)

      console.log(formOT)

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormOT({
      ...formOT,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    registrarOrdenDeTrabajo(formOT);
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

        <div className="tituloSeccionOT">
          <h2>Formato Orden de trabajo {maquinaid ? maquinaid.nombre_maquina : ''}</h2>
        </div>
        <hr />

        <form onSubmit={handleSubmit} name='OrdenDeTrabajo'>
          <div className="containerOT">
            <div className="sectionOT">

              <div className="valueOT">
                <label htmlFor='fecha_inicio_ot'>Fecha Inicio</label>
                <Input type='date' className='w-11/12 h-11' name='fecha_inicio_ot' onChange={handleChange}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='hora_inicio_ot'>Hora Inicio</label>
                <Input type='time' className='w-11/12 h-11' placeholder='00:00' name='hora_inicio_ot' onChange={handleChange}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='fecha_fin_ot'>Fecha Finalizacion</label>
                <Input type='date' className='w-11/12 h-11' name='fecha_fin_ot' onChange={handleChange}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='hora_fin_ot'>Hora Finalizacion</label>
                <Input type='time' className='w-11/12 h-11' name='hora_fin_ot' onChange={handleChange}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='p_formacion'>Programa de Formacion</label>
                <Input type='search' className='w-11/12 h-11 text-2xl' name='p_formacion' value={user.programa_aprendiz} disabled></Input>
              </div>

            </div>
            <div className="sectionOT">

              <div className="valueOT">
                <label htmlFor='total_horas_ot'>Total Horas Trabajadas</label>
                <Input type='number' className='w-11/12 h-11' name='total_horas_ot' onChange={handleChange}></Input>
              </div>

              <div className="valueOT">
                <label htmlFor='precio_hora'>Precio Hora-Hombre</label>
                <Input type="number" placeholder="0.00" className='w-11/12 h-11' name='precio_hora' onChange={handleChange}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>

              <div className="valueOT">
                <label htmlFor='total_mano_obra'>Total Mano De Obra</label>
                <Input type="number" name='total_mano_obra' placeholder="0.00" className='w-11/12 h-11' disabled  value={formOT?.precio_hora * formOT?.total_horas_ot} onChange={handleChange}
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
                <Select className='w-11/12 h-11' placeholder='Inspeccion' name='tipo_de_trabajo' onChange={handleChange}>
                  <SelectItem>Inspeccion</SelectItem>
                  <SelectItem>Servicio</SelectItem>
                  <SelectItem>Reparacion</SelectItem>
                  <SelectItem>Modificacion</SelectItem>
                  <SelectItem>Fabricacion</SelectItem>
                  <SelectItem>Montaje</SelectItem>
                  <SelectItem>Desmontaje</SelectItem>
                  <SelectItem>Cambio</SelectItem>
                </Select>
              </div>
              <div className="valueOT">
                <label>Tipo De Mantenimiento</label>
                <Select className='w-11/12 h-11' placeholder='Correctivo no planificado' name='tipo_de_mantenimiento' onChange={handleChange}>
                  <SelectItem>Correctivo no planificado</SelectItem>
                  <SelectItem>Correctivo planificado</SelectItem>
                  <SelectItem>Mantenimiento preventivo</SelectItem>
                  <SelectItem>Basado en el tiempo</SelectItem>
                  <SelectItem>Basado en el uso o contador</SelectItem>
                  <SelectItem>Basado en condicion</SelectItem>
                  <SelectItem>Predictivo</SelectItem>
                  <SelectItem>Proactivo</SelectItem>
                  <SelectItem>Detectivo</SelectItem>
                  <SelectItem>De emergencia</SelectItem>
                  <SelectItem>Autonomo</SelectItem>
                  <SelectItem>De reacondicionamiento</SelectItem>
                  <SelectItem>De reemplazo</SelectItem>
                </Select>
              </div>
              <div className="valueOT">
                <label>Tipo De Sistema</label>
                <Select className='w-11/12 h-11' placeholder='Mecanico' name='tipo_de_sistema' onChange={handleChange}>
                  <SelectItem>Mecanico</SelectItem>
                  <SelectItem>Electrico</SelectItem>
                  <SelectItem>Hidraulico</SelectItem>
                  <SelectItem>Neumatico</SelectItem>
                  <SelectItem>De control</SelectItem>
                  <SelectItem>De refrigeracion</SelectItem>
                  <SelectItem>De lubricacion</SelectItem>
                  <SelectItem>De alimentacion</SelectItem>
                  <SelectItem>De seguridad</SelectItem>
                  <SelectItem>De comunicacion</SelectItem>
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
              placeholder="Describe el trabajo o acividad a realizar"
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

          <Tabla_insumos_ot formInsumos={formInsumos} setformInsumos={setformInsumos} />

          {/* <Button type='submit'>Registrar orden de trabajo</Button> */}

        </form>


      </div>
    </div>
  )
}
