import React, { useState } from "react";
import axios from "axios";
import "./Inicio_sesion_instructor.css";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EyeFilledIcon } from "../Inicio_sesion_aprendiz/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Inicio_sesion_aprendiz/EyeSlashFilledIcon";

export const Inicio_sesion_instructor = () => {
  const [cc, setCc] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const Iniciar_Sesion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4002/loginInstructor",
        {
          cc_instructor: cc,
          password_instructor: password,
        }
      );

      if ((response.status = 200)) {
        window.location.href = "/";
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className="todo">
      <div className="complete">
        <div className="inicio_sesion">
          <div className="titulo-sesion">Iniciar Sesión</div>
          <div className="cambiarUsuario">
            <Button className="w-32">Instructor</Button>
            <Link to={"/inicio_Aprendiz"}>
              <Button className="btn_active_inicio w-32">Aprendiz</Button>
            </Link>
          </div>
          <div className="numid">Número de identificación:</div>
          <div className="inp-inicio_aprendiz">
            <Input
              placeholder="Usuario"
              type="number"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
            <div className="cont">Contraseña:</div>
            <Input
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
          </div>
          <div className="btn-iniciar-ses">
            <button
              className="boton-iniciar"
              type="button"
              onClick={Iniciar_Sesion}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
