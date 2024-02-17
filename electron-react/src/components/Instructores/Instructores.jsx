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
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";

export const Instructores = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    nombre: "",
    programa_de_formacion: "all",
    equipo: "all",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4002/aprendices")
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
        (filters.programa_de_formacion === "all" ||
          user.programa_aprendiz === filters.programa_de_formacion) &&
        (filters.equipo === "all" || user.equipo_aprendiz === filters.equipo) &&
        (filters.nombre === "" || user.nombre_aprendiz === filters.nombre)
      );
    });
  };

  const handlePF = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      programa_de_formacion: event.target.value,
    }));
  };

  const handleEquipo = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      equipo: event.target.value,
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

  const equipos = users.map((user) => user.equipo_aprendiz);
  const eqnoRepetidos = [...new Set(equipos)];

  const filteredUsers = filterUsers(users);

  return (
    <div>
      <div className="navVertical">
        <Link to={"/"}>
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

          <ul className="navListR">
            <li id="activeMaquina">Aprendices</li>
            <li>Nuevo Instructor</li>
          </ul>
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

            <select
              placeholder="Programas de formación"
              className="filterU"
              onChange={handlePF}
            >
              <option value="all">Todos</option>
              {noRepetidos.map((programaFormacion) => {
                return (
                  <option value={programaFormacion}>{programaFormacion}</option>
                );
              })}
            </select>

            <select
              placeholder="Equipos"
              className="filterU"
              onChange={handleEquipo}
            >
              <option value="all">Todos</option>
              {eqnoRepetidos.map((eq) => {
                return <option value={eq}>{eq}</option>;
              })}
            </select>

            <Link to={"/registroInstructor"}>
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
              <TableColumn className="text-lg">
                Programa de formación
              </TableColumn>
              <TableColumn className="text-lg">Equipo</TableColumn>
              <TableColumn className="text-lg">Teléfono</TableColumn>
              <TableColumn className="text-lg">Ficha</TableColumn>
              <TableColumn className="text-lg">Estado</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No se encontro."}>
              {filteredUsers.map((user) => {
                return (
                  <TableRow key={user.id_aprendiz}>
                    <TableCell className="text-lg">
                      {user.nombre_aprendiz}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.num_doc_aprendiz}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.programa_aprendiz}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.equipo_aprendiz}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.telefono_aprendiz}
                    </TableCell>
                    <TableCell className="text-lg">
                      {user.ficha_aprendiz}
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
