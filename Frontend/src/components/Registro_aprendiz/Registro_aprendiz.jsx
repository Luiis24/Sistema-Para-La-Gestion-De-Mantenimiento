import React, { useState } from 'react';
import './Registro_aprendiz.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Registro_aprendiz = () => {
  
  const [tipo_doc_aprendiz, setTipo_doc_aprendiz] = useState('');
  const [num_doc_aprendiz, setNum_doc_aprendiz] = useState('');
  const [ficha_aprendiz, setFicha_aprendiz] = useState('');
  const [programa_aprendiz, setPrograma_aprendiz] = useState('');
  const [nombre_aprendiz, setNombre_aprendiz] = useState('');
  const [email_aprendiz, setEmail_aprendiz] = useState('');
  const [telefono_aprendiz, setTelefono_aprendiz] = useState('');
  const [equipo_aprendiz, setEquipo_aprendiz] = useState('');
  const [password_aprendiz, setPassword_aprendiz] = useState('');

  const mensajeNoRegistrado = () => {
    toast.error('Error al registrar', {
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
    toast.error('Un nuevo Aprendiz fue registrado', {
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
  
  const enviarAP = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4002/registerAprendiz', {
        tipo_doc_aprendiz,
        num_doc_aprendiz,
        ficha_aprendiz,
        programa_aprendiz,
        nombre_aprendiz,
        email_aprendiz,
        telefono_aprendiz,
        equipo_aprendiz,
        password_aprendiz
      });

      console.log(response.data);
      toast.success('Aprendiz Registrado Exitosamente')
    } catch (error) {
      console.error('Error al registrar el Aprendiz', error);
      toast.error('Error de registro')
    }
  };

  return (
    
      <div className='registro-aprendiz-componente'>
      
      <div className='registrar-nuevo-aprendiz'>
      <form onSubmit={enviarAP}>
        <h2 className='titulo-registro'>Registrar Nuevos Aprendices.</h2>
        <div className='inputs-registro-aprendiz'>
        <div className='inputs-primer-fila-registro-aprendiz'>
          
        <h3>Nombre</h3>
        <input className='inpt-rg-nombre' placeholder="Nombre completo" type="text" name="nombre_aprendiz" onChange={(express)=> setNombre_aprendiz(express.target.value)}/>
        <h3 className='h3-fila-2'>Tipo de documento</h3>
        <select className='inpt-rg-tipo-doc' id='tipo-de-documento-aprendiz' onChange={(express)=> setTipo_doc_aprendiz(express.target.value)}>
        <option disable selected hidden>Tipo de documento</option>
        <option>Cédula de Ciudadania</option>
        <option>Tarjeta de Identidad</option>
        <option>Cédula de Extranjeria</option>
        <option>Otro</option>
        </select>
        <h3 className='h3-fila-3'>Programa</h3>
         <select className='inpt-rg-programa' id='tipo-de-documento-aprendiz' onChange={(express)=> setPrograma_aprendiz(express.target.value)}>
        <option disable selected hidden>Programa de formación</option>
        <option>Mantenimiento electromecanico</option>
        <option>Tecnólogo en mantenimiento</option>
        <option>Tecnico en mantenimiento mecanico</option>
        <option>Tecnico de mecanizado</option>
        </select>

        </div>
        <div className='inputs-segunda-fila-registro-aprendiz'>
        <h3>Correo Electronico</h3>
        <input className='inpt-rg-email' placeholder="Ingresa tú email " type="email" name="" onChange={(express)=> setEmail_aprendiz(express.target.value)}/>
        <h3 className='h3-fila-2'>Numero de documento</h3>
        <input className='inpt-rg-num-doc' placeholder="Numero de documento" type="number" name="" onChange={(express)=> setNum_doc_aprendiz(express.target.value)}/>
        <h3 className='h3-fila-3'>Equipo</h3>
        <input className='inpt-rg-equipo-trbj' placeholder="Equipo de trabajo" type="number" name="" onChange={(express)=> setEquipo_aprendiz(express.target.value)}/>
        </div>  
        <div className='inputs-tercera-fila-registro-aprendiz'>
        <h3>Telefono</h3>
        <input className='inpt-rg-num-telefono' placeholder="Numero de telefono" type="number" name="" onChange={(express)=> setTelefono_aprendiz(express.target.value)}/>
        <h3 className='h3-fila-2'>Ficha</h3>
        <input className='inpt-rg-ficha' placeholder="Ficha" type="number" name="" onChange={(express)=> setFicha_aprendiz(express.target.value)}/>
        <h3 className='h3-fila-3'>Contraseña</h3>
        <input className='inpt-rg-contraseña' placeholder="Contraseña" type="password" name="" onChange={(express)=> setPassword_aprendiz(express.target.value)}/>
      </div>  
       </div>
        <div className='btn-terminar-registro'>
            <button className='boton-cancelar-registro' type='submit'>⮜ ‎ Atrás</button>
             <button className='boton-registrar' type='submit'>Registrar</button>
             </div>
             </form>
      </div>





      

      </div>
      
  )
}