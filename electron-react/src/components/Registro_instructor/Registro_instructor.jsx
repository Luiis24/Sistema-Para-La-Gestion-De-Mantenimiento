import React, { useState } from 'react';
import './Registro_instructor.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Registro_instructor = () => {
  const [cc_instructor, setCc_instructor] = useState('');
  const [nombre_instructor, setNombre_instructor] = useState('');
  const [email_instructor, setEmail_instructor] = useState('');
  const [telefono_instructor, setTelefono_instructor] = useState('');
  const [password_instructor, setPassword_instructor] = useState('');

  const mensajeNoRegistrado = () => {
    toast.error('Error al registrar usuario', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
 const mensajeRegistrado = () => {
    toast.error('Un nuevo instructor fue registrado', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  const enviar = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/registerInstructor', {
        cc_instructor,
        nombre_instructor,
        email_instructor,
        telefono_instructor,
        password_instructor
      });

      if(response){
        mensajeRegistrado()
        // location.href = './sesion'
      }

    } catch (error) {
      mensajeNoRegistrado()
    }
  };
  return (
    
      <div className='Registro_instructor'>
      <form onSubmit={enviar}>
      <input className='' placeholder="cc" type="text" name="cc_instructor" onChange={(express) => setCc_instructor(express.target.value)} />
      <input className='' placeholder="Nombre completo" type="text" name="nombre_instructor" onChange={(express) => setNombre_instructor(express.target.value)} />
      <input className='' placeholder="Correo Electronico" type="text" name="email_instructor" onChange={(express) => setEmail_instructor(express.target.value)} />
      <input className='' placeholder="Numero de Telefono" type="text" name="telefono_intructor" onChange={(express) => setTelefono_instructor(express.target.value)} />
      <input className='' placeholder="password" type="password" name="password_instructor" onChange={(express) => setPassword_instructor(express.target.value)} />
         <button className='btn' type='submit'>
            Registrarse
          </button>
      </form>


      </div>
      
  )
}
