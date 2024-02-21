import React, { useState } from 'react';
import axios from 'axios';
import './Inicio_sesion_aprendiz.css';
import { Button, Input } from '@nextui-org/react';
import { Link } from 'react-router-dom'
import { useAuth } from "../../estados/usuario";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export const Inicio_sesion_aprendiz = () => {
  const [nId, setNId] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const Iniciar_Sesion = async () => {
    try {
      const response = await axios.post('http://localhost:4002/login', {
        nId: nId,
        password: password
      });

      const userData = response.data

      const userRegister = () => {
        setUser(userData)
        window.location.href = '/MenuPrincipal'
      }

      if (response.status === 200) {
        userRegister()
      }


      console.log(response.data);

    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className='todo'>
      <div className='complete'>
        <div className='inicio_sesion'>
          <div className='titulo-sesion'>Iniciar Sesión</div>
          <div className="cambiarUsuario">
            <Link to={'/registerInstructor'}><Button className='btn_active_inicio w-32'>Instructor</Button></Link>
            <Button className="w-32" >Aprendiz</Button>
          </div>
          <div className='numid'>Número de identificación:</div>
          <div className="inp-inicio_aprendiz">
            <Input
              placeholder="Usuario"
              type="text"
              value={nId}
              onChange={(e) => setNId(e.target.value)}
            />
            <div className='cont'>Contraseña:</div>
            <Input
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              className="max-w-xs"
            />
          </div>
          <div className='btn-iniciar-ses'>
            <button className='boton-iniciar' type='button' onClick={Iniciar_Sesion}>
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
