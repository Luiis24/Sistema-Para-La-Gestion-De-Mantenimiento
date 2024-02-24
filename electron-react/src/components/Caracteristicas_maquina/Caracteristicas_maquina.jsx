import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Caracteristicas_maquina.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select ,SelectItem, Input, Textarea, Button, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from '@nextui-org/react';

const Caracteristicas_maquina = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [selectedMaquina, setSelectedMaquina] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([{ id: '', nombre: '', descripcion: '' }]);
  const [funcionMaquina, setFuncionMaquina] = useState('');
  const [caracteristicasMaquina, setCaracteristicasMaquina] = useState([]);

  useEffect(() => {
    fetchMaquinas();
    fetchCaracteristicasMaquina();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get('http://localhost:4002/getMaquinas');
      setMaquinas(response.data.reverse());
    } catch (error) {
      console.error('Error al obtener las máquinas', error);
    }
  };

  const fetchCaracteristicasMaquina = async () => {
    try {
      const response = await axios.get('http://localhost:4002/GetCaracteristicasMaquina');
      setCaracteristicasMaquina(response.data);
    } catch (error) {
      console.error('Error al obtener las características de la máquina', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Promise.all(
        caracteristicas.map(async (caracteristica) => {
          if (caracteristica.id !== '') {
            // Existing characteristic, update it
            await axios.put(`http://localhost:4002/Actualizar_Caracteristica_Maquina/${caracteristica.id}`, {
              nombre_caracteristica: caracteristica.nombre,
              descripcion_caracteristica: caracteristica.descripcion,
            });
          } else {
            // New characteristic, create it
            await axios.post('http://localhost:4002/Crear_Caracteristica_Maquina', {
              id_maquina: selectedMaquina,
              nombre_caracteristica: caracteristica.nombre,
              descripcion_caracteristica: caracteristica.descripcion,
            });
          }
        })
      );

      // Update or create function
      await axios.post('http://localhost:4002/Actualizar_Funcion_Maquina', {
        id_maquina: selectedMaquina,
        funcion_maquina: funcionMaquina,
      });

      toast.success('Características de máquina registradas exitosamente');
      fetchCaracteristicasMaquina();
      setCaracteristicas([{ id: '', nombre: '', descripcion: '' }]);
      setFuncionMaquina('');
    } catch (error) {
      console.error('Error al registrar las características de la máquina', error);
      toast.error('Error al registrar las características de la máquina');
    }
  };

  const handleDeleteCaracteristica = async (caracteristicaId) => {
    try {
      await axios.delete(`http://localhost:4002/Eliminar_Caracteristica_Maquina/${caracteristicaId}`);
      toast.success('Característica eliminada exitosamente');
      fetchCaracteristicasMaquina();
    } catch (error) {
      console.error('Error al eliminar la característica de la máquina', error);
      toast.error('Error al eliminar la característica de la máquina');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className='titulo-cm'>Registro de características de máquina</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Seleccionar máquina:</label>
          <Select
            value={selectedMaquina}
            onChange={(event) => setSelectedMaquina(event.target.value)}
          >
            <SelectItem disable selected hidden>Maquinas registradas</SelectItem>
            {maquinas.map((maquina) => (
              <SelectItem key={maquina.id_maquina} value={maquina.id_maquina}>
                {maquina.nombre_maquina}
              </SelectItem>
            ))}
          </Select>
        </div>
        {caracteristicas.map((caracteristica, index) => (
          <div key={index}>
            <label>Nombre de la característica:</label>
            <Input
              type="text"
              placeholder={`Nombre de la característica ${index + 1}`}
              value={caracteristica.nombre}
              onChange={(event) => {
                const updatedCaracteristicas = [...caracteristicas];
                updatedCaracteristicas[index].nombre = event.target.value;
                setCaracteristicas(updatedCaracteristicas);
              }}
            />
            <label>Descripción de la característica:</label>
            <Textarea
              placeholder={`Descripción de la característica ${index + 1}`}
              value={caracteristica.descripcion}
              onChange={(event) => {
                const updatedCaracteristicas = [...caracteristicas];
                updatedCaracteristicas[index].descripcion = event.target.value;
                setCaracteristicas(updatedCaracteristicas);
              }}
            />
            <div className='button-cm'>
            {caracteristica.id !== '' && (
               <Button type="button" onClick={() => handleDeleteCaracteristica(caracteristica.id)}>
                Eliminar Característica
              </Button>
            )}
            </div>
          </div>
        ))}
        <div className='button-cm'>
        <Button
          type="button"
          onClick={() => setCaracteristicas([...caracteristicas, { id: '', nombre: '', descripcion: '' }])}
        >
          Agregar otra característica
        </Button>
        </div>
        <div>
          <label>Función de la máquina:</label>
          <Textarea
            type="text"
            placeholder="Función de la máquina"
            value={funcionMaquina}
            onChange={(event) => setFuncionMaquina(event.target.value)}
          />
        </div>
        <div className='button-cm'>
        <Button type="submit">Registrar características</Button>
        </div>
      </form>

      <div>
        <h2 className='titulo-cm'>Características de máquina registradas:</h2>
        <Table className='w-full'>
            <TableHeader>
                <TableColumn className='text-lg"'>Nombre</TableColumn>
                <TableColumn className='text-lg"'>Descripción</TableColumn>
            </TableHeader>
            <TableBody>
          {caracteristicasMaquina.map((caracteristica) => (
            
            <TableRow key={caracteristica.id}>
              <TableCell className='text-lg text-slate-400'> {caracteristica.nombre_caracteristica}</TableCell>
              <TableCell className='text-lg text-slate-400'> {caracteristica.descripcion_caracteristica}</TableCell>
             
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <h3>Función de la máquina:</h3>
        <p>{funcionMaquina}</p>
      </div>
    </div>
  );
};

export default Caracteristicas_maquina;