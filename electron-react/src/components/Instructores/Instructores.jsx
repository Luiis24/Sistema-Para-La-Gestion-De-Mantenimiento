import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchIcon } from "../Aprendices/SearchIcon";
import { PlusIcon } from "../Aprendices/PlusIcon";
import logoSena from '../../img/OIG3.png'
import menu from '../../img/menu.png'
import "./Instructores.css";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Button, Pagination, Spinner, getKeyValue, SelectItem, Select, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeFilledIcon } from '../Inicio_sesion_aprendiz/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../Inicio_sesion_aprendiz/EyeSlashFilledIcon'

export const Instructores = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [estado, setEstado] = useState();
  const [instructorSelected, setInstructorSelected] = useState();
  const [instructorSelectedName, setInstructorSelectedName] = useState()
  const [filters, setFilters] = useState({
    nombre: "",
    estado: "all",
  });
  const [instructor, setInstructor] = useState();
  const { isLoading, setIsLoading } = useLoading();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // paginador
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 15;

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/instructores`)
      .then((datos) => {
        setUsers(datos.data);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleInstructor = async () => {
    setIsLoading(true)
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/actualizarInstructor`, { instructorSelected, estado });
      setIsLoading(false)
      toast.success('Estado instructor actualizado')
      setModalVisible(false);
    } catch (error) {
      setIsLoading(false)
      toast.error('Error al actualizar estado del instructor')
      console.log(error);
    }
  }

  const statusColorMap = {
    activo: "success",
    inactivo: "danger",
    vacation: "warning",
  };

  const filterUsers = (users) => {
    return users.filter((user) => {
      return (
        (filters.estado === "all" ||
          user.estado_instructor === filters.estado) &&
        (filters.nombre === "" ||
          user.nombre_instructor.toLowerCase().includes(filters.nombre.toLowerCase())
        )
      );
    });
  };

  const handleEstado = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      estado: event.target.value,
    }));
  };

  const handleNombre = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      nombre: event.target.value,
    }));
  };


  const filteredUsers = filterUsers(users);

  const handleModalInstructor = (user) => {
    setInstructor(user);
    onOpen()
  }

  // cambiar de pagina

  const totalPaginas = Math.ceil(filteredUsers.length / itemsPorPagina);
  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  }
  const startIndex = (paginaActual - 1) * itemsPorPagina;
  const endIndex = startIndex + itemsPorPagina;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // validar campo buscar por nombre

  const soloLetras = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      charCode !== 32 && // Espacio
      (charCode < 65 || charCode > 90) && // Letras mayúsculas
      (charCode < 97 || charCode > 122) && // Letras minúsculas
      charCode !== 209 && charCode !== 241 // Letra Ñ y letra ñ
    ) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <div>
      {isLoading ? <Cargando /> : ''}
      <ToastContainer />
      <div className="navVertical">
        <Link to={"/MenuPrincipal"}>
          <div className="principal">
            <img className="logoSena" src={logoSena} alt="Logo Sena"></img>
            <h2>SGMI</h2>
          </div>
        </Link>
        <input type="checkbox" id="navbar-toggle"></input>
        <label htmlFor="navbar-toggle" className="menu-responsive"><img className='menuR' src={menu} alt='menu'></img></label>
        <ul className="navList">
          <li id="activeMaquina">
            Usuarios
          </li>
          <div className='atrasN-alm'>
            <Link to={'/MenuPrincipal'} onClick={() => { localStorage.removeItem('formValues') }}>
              <div className="herramientaMaquinaN text-gray-800 hover:text-gray-200">
                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                </svg>
                <h3 className='text-lg'>Atrás</h3>
              </div>
            </Link>
          </div>
        </ul>
      </div>

      <div className="containerM">

        <div className="navHorizontal">
          <Link to={"/aprendices"}><h2>Lista de aprendices</h2></Link>
          <h2 id="active">Lista de instructores</h2>
        </div>

        <div className="containerUsuarios">
          <div className="filtersUsuarios">
            <Input
              classNames={{
                base: "w-full",
                inputWrapper: "border-1",
              }}
              placeholder="Buscar por nombre..."
              startContent={<SearchIcon className="text-default-300" />}
              onChange={handleNombre}
              onKeyPress={soloLetras}
            />

            <Link to={"/Registroinstructores"}>
              <Button
                className="bg-foreground text-background h-14 w-full"
                endContent={<PlusIcon style={{ fontSize: "large" }} />}
                a
                size="sm"
              >
                Nuevo Instructor
              </Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableColumn className="text-lg">Nombre</TableColumn>
              <TableColumn className="text-lg">Documento</TableColumn>
              <TableColumn className="text-lg">Email</TableColumn>
              <TableColumn className="text-lg">Teléfono</TableColumn>
              <TableColumn className="text-lg">Estado</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No se encontro."}>
              {paginatedUsers.map((user) => {
                return (
                  <TableRow key={user.id_aprendiz}>
                    <TableCell className="text-lg">
                      {user.nombre_instructor}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.cc_instructor}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.email_instructor}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.telefono_instructor}
                    </TableCell>
                    <TableCell>
                      <Chip className="capitalize text-lg p-3 rounded-lg" color={statusColorMap[user.estado]} size="sm" variant="flat">
                        <p className='w-20 text-center'>{user.estado}</p>
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <svg className="w-6 h-6 text-gray-800 hover:text-lime-500 dark:text-white" aria-hidden="true" fill="none" focusable="false" role="presentation" viewBox="0 0 24 24">
                              <path
                                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                fill="currentColor"
                              />
                            </svg>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem onClick={() => handleModalInstructor(user)}>Informacion</DropdownItem>
                          <DropdownItem onClick={() => { setModalVisible(true); setInstructorSelected(user.id_instructor); setInstructorSelectedName(user.nombre_instructor) }} >Editar</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="paginador">
          <Pagination showControls total={totalPaginas} initialPage={paginaActual} onChange={cambiarPagina} color="default" />
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl' placement={'center'}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Informacion instructor</ModalHeader>
              <ModalBody>
                <div className='infoAprendiz'>
                  <div className='flex items-center gap-5'>
                    <label>Nombre:</label>
                    <Input value={instructor.nombre_instructor} />
                  </div>
                  <div>
                    <label>Correo:</label>
                    <Input value={instructor.email_instructor} />
                  </div>
                  <div>
                    <label>Telefono:</label>
                    <Input value={instructor.telefono_instructor} />
                  </div>
                  <div>
                    <label>Numero identidad:</label>
                    <Input value={instructor.cc_instructor} />
                  </div>
                  <div>
                    <label>Contraseña:</label>
                    <Input
                      value={instructor.password_instructor}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                  </div>
                  <div>
                    <label>Estado:</label>
                    <Input value={instructor.estado} />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {modalVisible && (
        <div className="modal-insumos">
          <form className='form-modal-insumos' onSubmit={handleInstructor}>
            <div className="titulo-form-MI">
              <h3>Actualizar estado instructor</h3>
            </div>
            <Input value={instructorSelectedName} />
            <Select name='estado' onChange={(e) => setEstado(e.target.value)} placeholder='Cambiar estado'>
              <SelectItem key={'inactivo'} value={'inactivo'}>Inactivo</SelectItem>
              <SelectItem key={'activo'} value={'activo'}>Activo</SelectItem>
            </Select>
            <div className='btn-terminar-registro'>
              <a className='boton-cancelar-registroR'>
                <Button className="boton-cancelarR" onClick={() => setModalVisible(false)}>
                  <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.5 7H12v-.9a2.1 2.1 0 0 0-1.2-2 1.8 1.8 0 0 0-2 .4L3.8 9a2.2 2.2 0 0 0 0 3.2l5 4.5a1.8 1.8 0 0 0 2 .3 2.1 2.1 0 0 0 1.2-2v-.9h1a2 2 0 0 1 2 2V19a1 1 0 0 0 1.3 1 6.6 6.6 0 0 0-1.8-13Z" />
                  </svg> Atrás
                </Button>
              </a>
              <Button type="submit" className='boton-registrarR'>Actualizar</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};