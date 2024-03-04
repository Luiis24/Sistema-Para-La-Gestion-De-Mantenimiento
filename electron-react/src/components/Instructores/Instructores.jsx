import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchIcon } from "../Aprendices/SearchIcon";
import { PlusIcon } from "../Aprendices/PlusIcon";
import logoSena from "../../img/logo.png";
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

export const Instructores = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    nombre: "",
    estado: "all",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/instructores`)
      .then((datos) => {
        setUsers(datos.data);
      })
      .catch((error) => {
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
      <div className="navVertical">
        <Link to={"/MenuPrincipal"}>
          <div className="principal">
            <img className="logoSena" src={logoSena} alt="Logo Sena"></img>
            <h2>Principal</h2>
          </div>
        </Link>
        <ul className="navList">
          <li id="">
            <Link to={"/aprendices"}>Aprendices</Link>
          </li>
          <li id="activeMaquina">
            Instructores
          </li>
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