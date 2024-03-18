import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Registro_descripcion_equipo_hv.css";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'
import {Titulo_sena_cb} from '../Titulo_sena_cb/Titulo_sena_cb'

export const Registro_descripcion_equipo_hv = () => {
  const fechaActual = new Date().toISOString().split("T")[0];
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState("");
  const [ultimaMaquina, setUltimaMaquina] = useState('');

  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [fechaFabricacion, setFechaFabricacion] = useState(fechaActual);
  const [fabricante_equipo, setFabricante_equipo] = useState("");
  const [ubicacion_equipo, setUbicacion_equipo] = useState("");
  const [caracteristicas_equipo, setCaracteristicas_equipo] = useState("");
  const [codigo_equipo, setCodigo_equipo] = useState("");
  const [modelo_equipo, setModelo_equipo] = useState("");
  const [num_serie_equipo, setNum_serie_equipo] = useState("");
  const [prioridad_equipo, setPrioridad_equipo] = useState("");
  const [voltaje_equipo, setVoltaje_equipo] = useState("");
  const [corriente_equipo, setCorriente_equipo] = useState("");
  const [frecuencia_equipo, setFrecuencia_equipo] = useState("");
  const [capacidad_equipo, setCapacidad_equipo] = useState("");
  const [peso_equipo, setPeso_equipo] = useState("");
  const [alimentacion_equipo, setAlimentacion_equipo] = useState("");
  const [sistema_electrico_equipo, setSistema_electrico_equipo] = useState("");
  const [sistema_electronico_equipo, setSistema_electronico_equipo] = useState("");
  const [sistema_mecanico_equipo, setSistema_mecanico_equipo] = useState("");
  const [sistema_neumatico_equipo, setSistema_neumatico_equipo] = useState("");
  const [sistema_hidraulico_equipo, setSistema_hidraulico_equipo] = useState("");
  const [sistema_termico_equipo, setSistema_termico_equipo] = useState("");
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ultimaMaquina`);
      setUltimaMaquina(response.data.nombre_maquina);
      setSelectedMaquina(response.data.id_maquina)
    } catch (error) {
      console.error("Error al obtener las máquinas", error);
    }
  };

  const registrarEquipo = async (equipo) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/registrarEquipo`,
        equipo
      );

      setIsLoading(false)
      toast.success('Registro exitoso')
      window.location.href = '/crearCaracteristicasMaquina'
    } catch (error) {
      setIsLoading(false)
      toast.error('Error al registrar equipo')
      console.error("Error al registrar equipo", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipo = {
      nombre_equipo: nombre,
      marca_equipo: marca,
      fecha_fabricacion_equipo: fechaFabricacion,
      fabricante_equipo: fabricante_equipo,
      ubicacion_equipo: ubicacion_equipo,
      caracteristicas_equipo: caracteristicas_equipo,
      codigo_equipo: codigo_equipo,
      modelo_equipo: modelo_equipo,
      num_serie_equipo: num_serie_equipo,
      prioridad_equipo: prioridad_equipo,
      voltaje_equipo: voltaje_equipo,
      corriente_equipo: corriente_equipo,
      frecuencia_equipo: frecuencia_equipo,
      capacidad_equipo: capacidad_equipo,
      peso_equipo: peso_equipo,
      alimentacion_equipo: alimentacion_equipo,
      sistema_electrico_equipo: sistema_electrico_equipo,
      sistema_electronico_equipo: sistema_electronico_equipo,
      sistema_mecanico_equipo: sistema_mecanico_equipo,
      sistema_neumatico_equipo: sistema_neumatico_equipo,
      sistema_hidraulico_equipo: sistema_hidraulico_equipo,
      sistema_termico_equipo: sistema_termico_equipo,
      id_maquina: selectedMaquina,
    };

    await registrarEquipo(equipo);
  };

  return (
    <div className="container-rg-descripcionEquipo ">
      <ToastContainer />
      {isLoading ? <Cargando /> : ''}
      <div className="w-full flex justify-start"><Titulo_sena_cb/></div>

      <div className="Registro-descripcion-hv">
        <div className="titulo-registro">
          <h1>Descripción del equipo</h1>
        </div>
        <form className="form-equip" onSubmit={handleSubmit}>
          <div className="inputs-registro-hv">
            <div className="fila-1-responsive">
              <div>
                <Input
                  isDisabled
                  className="sel-equip"
                  value={ultimaMaquina}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Nombre equipo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Marca"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="date"
                  className="w-full mt-8"
                  value={fechaFabricacion}
                  onChange={(e) => setFechaFabricacion(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Fabricante del equipo"
                  value={fabricante_equipo}
                  onChange={(e) => setFabricante_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Ubicación del equipo"
                  value={ubicacion_equipo}
                  onChange={(e) => setUbicacion_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Textarea
                  className="mt-8"
                  placeholder="Características del equipo"
                  value={caracteristicas_equipo}
                  onChange={(e) => setCaracteristicas_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Codigo del equipo"
                  value={codigo_equipo}
                  onChange={(e) => setCodigo_equipo(e.target.value)}
                />
              </div>

              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Modelo del equipo"
                  value={modelo_equipo}
                  onChange={(e) => setModelo_equipo(e.target.value)}
                />
              </div>

              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Número de serie del equipo"
                  value={num_serie_equipo}
                  onChange={(e) => setNum_serie_equipo(e.target.value)}
                />
              </div>

              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Prioridad del equipo"
                  value={prioridad_equipo}
                  onChange={(e) => setPrioridad_equipo(e.target.value)}
                />
              </div>

              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Voltaje del equipo"
                  value={voltaje_equipo}
                  onChange={(e) => setVoltaje_equipo(e.target.value)}
                />
              </div>
            </div>
            {/*Segunda fila*/}
            <div className="fila-2-responsive">
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Corriente del equipo"
                  value={corriente_equipo}
                  onChange={(e) => setCorriente_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Frecuencia del equipo (HZ)"
                  value={frecuencia_equipo}
                  onChange={(e) => setFrecuencia_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Tamaño del equipo"
                  value={capacidad_equipo}
                  onChange={(e) => setCapacidad_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Peso del equipo"
                  value={peso_equipo}
                  onChange={(e) => setPeso_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="Tipo alimentación del equipo"
                  value={alimentacion_equipo}
                  onChange={(e) => setAlimentacion_equipo(e.target.value)}
                />
              </div>

              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="¿Tiene sistema eléctrico?"
                  value={sistema_electrico_equipo}
                  onChange={(e) => setSistema_electrico_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="¿Tiene sistema electrónico?"
                  value={sistema_electronico_equipo}
                  onChange={(e) =>
                    setSistema_electronico_equipo(e.target.value)
                  }
                />
              </div>

              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="¿Tiene sistema mecánico?"
                  value={sistema_mecanico_equipo}
                  onChange={(e) => setSistema_mecanico_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="¿Tiene sistema neumático?"
                  value={sistema_neumatico_equipo}
                  onChange={(e) => setSistema_neumatico_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="¿Tiene sistema hidráulico?"
                  value={sistema_hidraulico_equipo}
                  onChange={(e) => setSistema_hidraulico_equipo(e.target.value)}
                />
              </div>
              <div className="section-edp">
                <Input
                  type="text"
                  className="w-full mt-8"
                  placeholder="¿Tiene sistema térmico?"
                  value={sistema_termico_equipo}
                  onChange={(e) => setSistema_termico_equipo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="btn-hv">
            <Button type="submit" className="boton-registrar mb-[5%]">
              Siguiente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registro_descripcion_equipo_hv;