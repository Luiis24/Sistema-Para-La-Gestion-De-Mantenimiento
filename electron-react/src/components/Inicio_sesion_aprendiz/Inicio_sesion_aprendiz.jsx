import React, { useState } from 'react';
import axios from 'axios';
import './Inicio_sesion_aprendiz.css';
import { Input } from '@nextui-org/react';
import { useAuth } from "../../estados/usuario";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        userRegister();
        toast.success('Inicio de sesión exitoso')
      }


      console.log(response.data);

    } catch (error) {
      toast.error('Usuario incorrecto')
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className='todo'>
      <ToastContainer/>
      <div className='complete'>
        <div className='inicio_sesion'>
          <div className='titulo-sesion'>Iniciar Sesión</div>
          <div className='numid'>Número de identificación:</div>
          <div className="inp-inicio_aprendiz">
            <Input
              placeholder="Usuario"
              type="Number"
              value={nId}
              onChange={(e) => setNId(e.target.value)}
              className='mt-3'
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
              className="max-w-xs mt-3"
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
