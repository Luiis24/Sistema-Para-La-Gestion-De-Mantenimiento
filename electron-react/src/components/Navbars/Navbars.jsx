import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './navbars.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import { useDisclosure } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useAuth } from '../../estados/usuario';

export const Navbars = () => {

  const [maquinas, setMaquinas] = useState([]);
  const [tipoMaquina, setTipoMaquina] = useState([])
  const [maquinasPorTipo, setMaquinasPorTipo] = useState({});

  const { rol } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Registrar tipo de maquina

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

  // Traer maquinas y tipos de maquinas al navbar

  useEffect(() => {
    axios.get('http://localhost:4002/getMaquinas')
      .then(datos => {
        setMaquinas(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de máquinas:', error);
      });

    axios.get('http://localhost:4002/tipoMaquinas')
      .then(datos => {
        setTipoMaquina(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de tipos de máquinas:', error);
      });
  }, []);

  // Separar maquinas por tipo de maquina

  useEffect(() => {
    const maquinasPorTipo = {};
    maquinas.forEach(maquina => {
      if (!maquinasPorTipo[maquina.id_tipo_maquina]) {
        maquinasPorTipo[maquina.id_tipo_maquina] = [];
      }
      maquinasPorTipo[maquina.id_tipo_maquina].push(maquina);
    });
    setMaquinasPorTipo(maquinasPorTipo);
  }, [maquinas]);

  const hiddenMenu = (id) => {
    const clave = document.getElementById(id);
    clave.classList.toggle("hidden")
  }

  const selectTipoMaquina = (id) => {
    const clave = document.getElementById(id);
    clave.classList.remove("hidden")
  }



  return (
    <div>
      <div className="navVertical">
        <Link to={'/MenuPrincipal'}>
          <div className="principal">
            <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
            <h2>SGMI</h2>
          </div>
        </Link>
        <div className="containerSectionN">
          <div className="listMaquinas">
            <p className='text-sm text-gray-600 pl-4'>Maquinas</p>

            {tipoMaquina ? tipoMaquina.map(tipoM => {
              return <div className="tipoMaquina" key={tipoM.id_tipo_maquina}>
                <div className="tipoMaquinaN text-gray-800 hover:text-gray-200 focus:bg-gray-200" onClick={() => { hiddenMenu(tipoM.id_tipo_maquina) }}>
                  <h3 className='text-2xl'>{tipoM.nombre_tipo_maquina}</h3>
                  <svg className="w-4 h-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                  </svg>
                </div>

                <div className="listMaquinasN hidden" id={tipoM.id_tipo_maquina} onClick={() => { selectTipoMaquina(tipoM.id_tipo_maquina) }}>
                  {maquinasPorTipo[tipoM.id_tipo_maquina] ? maquinasPorTipo[tipoM.id_tipo_maquina].map(maquina => {
                    return (
                      <div className="maquinaN" key={maquina.id_maquina}>
                        <a href={`/checklistMaquina/${maquina.id_maquina}`}><h3 className='text-xl'>{maquina.nombre_maquina}</h3></a>
                      </div>
                    )
                  }) : <p className='p-4 text-sm text-gray-500'>No hay máquinas para este tipo</p>}

                </div>
              </div>
            }) : <p>No hay tipos de máquinas disponibles</p>}

          </div>
          {rol === 'Instructor' ? <div className="adminMaquina">
            <p className='text-sm text-gray-600 pl-4'>Admin tools</p>
            <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200" onClick={onOpen}>
              <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
              </svg>
              <h3 className='text-lg text-gray-600 '>Tipo maquina</h3>
            </div>
            <Link to={'/crearMaquina'}>
              <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
                <h3 className='text-lg text-gray-600 '>Maquina</h3>
              </div>
            </Link>
            {/* <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
            <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clipRule="evenodd" />
            </svg>
            <h3 className='text-lg text-gray-600 '>Maquinas</h3>
          </div> */}
          </div> : ''}

          <div>
            <Link to={'/MenuPrincipal'}>
              <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                </svg>
                <h3 className='text-lg'>Atras</h3>
              </div>
            </Link>
          </div>

        </div>
      </div>

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
              <ModalHeader className="flex flex-col gap-1 text-2xl mb-3">Crear un nuevo tipo de maquina</ModalHeader>
              <ModalBody className='flex justify-center'>
                <form className='flex flex-col gap-5'>
                  <div>
                    <Input
                      type="text"
                      placeholder="Tipo de Maquina"
                      value={nombreTipoMaquina}
                      onChange={(event) => setNombreTipoMaquina(event.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      type="textarea"
                      placeholder="Describe el tipo de Maquina que estás creando"
                      value={descripcionTipoMaquina}
                      onChange={(event) => setDescripcionTipoMaquina(event.target.value)}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <div className='button-cerrar'>
                  <Button className='text-slate-50 bg-red-500' variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                </div>
                <div className='button-2-inp'>
                  <Button className='text-white' type="submit" onPress={onClose} onClick={handleFormSubmit}>
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
