import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchIcon } from "../Aprendices/SearchIcon";
import { PlusIcon } from "../Aprendices/PlusIcon";
import logoSena from '../../img/OIG3.png'
import menu from '../../img/menu.png'
import "./Instructores.css";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
  Button,
} from "@nextui-org/react";
import { useLoading } from '../../estados/spinner';
import { Cargando } from '../Cargando/Cargando'

export const Instructores = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    nombre: "",
    estado: "all",
  });
  const { isLoading, setIsLoading } = useLoading();

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

  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const filterUsers = (users) => {
    return users.filter((user) => {
      return (
        (filters.estado === "all" ||
          user.estado_instructor === filters.estado) &&
        (filters.nombre === "" || user.nombre_instructor === filters.nombre)
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

  const programasFormacion = users.map((user) => user.programa_aprendiz);
  const noRepetidos = [...new Set(programasFormacion)];


  const filteredUsers = filterUsers(users);

  return (
    <div>
      {isLoading ? <Cargando /> : ''}
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
          <li id="">
            <Link to={"/aprendices"}>Aprendices</Link>
          </li>
          <li id="activeMaquina">
            Instructores
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
          <h2 id="active">Lista de instructores</h2>
        </div>

        <div className="containerUsuarios">
          <div className="filtersUsuarios">
            <Input
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              startContent={<SearchIcon className="text-default-300" />}
              placeholder="Buscar por nombre..."
              size="sm"
              onChange={handleNombre}
            />

            <Link to={"/Registroinstructores"}>
              <Button
                className="bg-foreground text-background h-12"
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
            </TableHeader>
            <TableBody emptyContent={"No se encontro."}>
              {filteredUsers.map((user) => {
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
                      <Chip
                        className="capitalize text-lg p-3 rounded-lg"
                        color={statusColorMap["active"]}
                        size="sm"
                        variant="flat"
                      >
                        Activo
                      </Chip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};