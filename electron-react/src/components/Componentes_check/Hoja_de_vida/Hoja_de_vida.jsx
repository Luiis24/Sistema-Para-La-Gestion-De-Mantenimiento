import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbars } from "../Navbars/Navbars";
import axios from "axios";
import "./Hoja_de_vida.css";
import { Input } from "@nextui-org/react";

export const Hoja_de_vida = () => {
  const { id_maquina } = useParams();
  const [maquinaid, setMaquinaid] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4002/HojaVida/${id_maquina}`)
      .then((datos) => {
        const maquina = datos.data;
        setMaquinaid(maquina);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [id_maquina]);

  return (
    <div>
      <Navbars></Navbars>
      <div className="containerM">
        <div className="navHorizontal">
          <Link to={`/checklistMaquina/${id_maquina}`}>
            <h2>
              CheckList
              <svg
                class="w-6 h-6 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6"
                />
              </svg>
            </h2>
          </Link>
          <Link to={`/OrdenDeTrabajo/${id_maquina}`}>
            <h2>
              Orden de trabajo
              <svg
                class="w-6 h-6 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                  clip-rule="evenodd"
                />
              </svg>
            </h2>
          </Link>
          <h2 id="active">
            Hoja de vida
            <svg
              class="w-6 h-6 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                clip-rule="evenodd"
              />
            </svg>
          </h2>
        </div>
        <div className="tituloSeccionOT">
          <h2>Descripción del equipo</h2>
        </div>
        <hr />
        <div className="containerHv">
          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Nombre-hv">Nombre</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Nombre-hv"
                placeholder="Nombre del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Marca-hv">Marca</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Marca-hv"
                placeholder="Marca del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Frecuencia-hv">Año de fabricación</label>
              <Input
                type="Text"
                className="w-11/12 h-11"
                name="Frecuencia-hv"
                placeholder="Año fabricación del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Fabricante-hv">Fabricante</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Fabricante-hv"
                placeholder="Nombre del fabricante"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Ubicación-hv">Ubicación</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Ubicación-hv"
                placeholder="Ubicación del equipo"
                readOnly
              ></Input>
            </div>
          </div>
          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Características-hv">Características</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Características-hv"
                placeholder="Escribe sus características"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Código-hv">Código</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Código-hv"
                placeholder="Código del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Modelo-hv">Modelo</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Modelo-hv"
                placeholder="Modelo del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-mecánico-hv">Número de serie</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-mecánico-hv"
                placeholder="Número de serie del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Prioridad-hv">Prioridad</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Prioridad-hv"
                placeholder="Prioridad del equipo"
                readOnly
              ></Input>
            </div>
          </div>
        </div>
        <hr />
        {/*Descripción técnica*/}
        <div className="tituloSeccionOT">
          <h2>Descripción técnica</h2>
        </div>
        <hr />
        <div className="containerHv">
          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Voltaje-hv">Voltaje</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Voltaje-hv"
                placeholder="Escribe el voltaje del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Corriente-hv">Corriente</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Corriente-hv"
                placeholder="Escribe la corriente del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Frecuencia-hv">Frecuencia</label>
              <Input
                type="Text"
                className="w-11/12 h-11"
                name="Frecuencia-hv"
                placeholder="Escribe la frecuencia del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Capacidad-hv">Capacidad</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Capacidad-hv"
                placeholder="Escribe la capacidad del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Peso-hv">Peso</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Peso-hv"
                placeholder="Escribe el peso del equipo"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Alimentación-hv">Alimentación</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Alimentación-hv"
                placeholder="Tipo de alimentación del equipo"
                readOnly
              ></Input>
            </div>
          </div>

          <div className="sectionHv">
            <div className="valueHv">
              <label htmlFor="Sistema-eléctrico-hv">Sistema eléctrico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-eléctrico-hv"
                placeholder="¿Cuenta con sistema eléctrico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-electrónico-hv">
                Sistema electrónico
              </label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-electrónico-hv"
                placeholder="¿Cuenta con sistema electrónico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-mecánico-hv">Sistema mecánico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-mecánico-hv"
                placeholder="¿Cuenta con sistema mecánico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-neumático-hv">Sistema neumático</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-neumático-hv"
                placeholder="¿Cuenta con sistema neumático?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-hidráulico-hv">Sistema hidráulico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema-hidráulico-hv"
                placeholder="¿Cuenta con sistema hidráulico?"
                readOnly
              ></Input>
            </div>
            <div className="valueHv">
              <label htmlFor="Sistema-térmico-hv">Sistema térmico</label>
              <Input
                type="text"
                className="w-11/12 h-11"
                name="Sistema térmico-hv"
                placeholder="¿Cuenta con sistema térmico?"
                readOnly
              ></Input>
            </div>
          </div>
        </div>
        <hr />
        <div className="tituloSeccionOT">
          <h2>Datos del Equipo</h2>
        </div>
        <div className="tituloSeccionOT">
          <h2>Características</h2>
        </div>
        <hr />
        <hr />
        <div className="tituloSeccionOT">
          <h2>Función</h2>
        </div>
        <hr />
        <div className="crearCM">
          <Link to={"/crearCaracteristicasMotor"}>
            <h3>Crear Caracteristicas Motor</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
