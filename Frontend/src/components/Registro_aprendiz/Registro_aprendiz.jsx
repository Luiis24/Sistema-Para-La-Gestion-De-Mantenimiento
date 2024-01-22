import React from 'react';
import './Registro_aprendiz.css';

export const Registro_aprendiz = () => {
  return (
    
      <div className='registro-aprendiz-componente'>
      {/*<div className=''></div>*/}
      <div className='registrar-nuevo-aprendiz'>
        <h2 className='titulo-registro'>Registrar Nuevos Aprendices.</h2>
        <div className='inputs-registro-aprendiz'>
        <div className='inputs-primer-fila-registro-aprendiz'>
        <h3>Nombre</h3>
        <input className='inpt-rg-nombre' placeholder="Nombre completo" type="text" id="" name="" />
        <h3 className='h3-fila-2'>Tipo de documento</h3>
        <select className='inpt-rg-tipo-doc' id='tipo-de-documento-aprendiz'>
        <option disable selected hidden>Tipo de documento</option>
        <option>Cédula de Ciudadania</option>
        <option>Tarjeta de Identidad</option>
        <option>Cédula de Extranjeria</option>
        <option>Otro</option>
        </select>
        <h3 className='h3-fila-3'>Programa</h3>
         <select className='inpt-rg-programa' id='tipo-de-documento-aprendiz'>
        <option disable selected hidden>Programa de formación</option>
        <option>Mantenimiento electromecanico</option>
        <option>Tecnólogo en mantenimiento</option>
        <option>Tecnico en mantenimiento mecanico</option>
        <option>Tecnico de mecanizado</option>
        </select>

        </div>
        <div className='inputs-segunda-fila-registro-aprendiz'>
        <h3>Correo Electronico</h3>
        <input className='inpt-rg-email' placeholder="Ingresa tú email " type="email" id="" name="" />
        <h3 className='h3-fila-2'>Numero de documento</h3>
        <input className='inpt-rg-num-doc' placeholder="Numero de documento" type="text" id="" name="" />
        <h3 className='h3-fila-3'>Equipo</h3>
        <input className='inpt-rg-equipo-trbj' placeholder="Equipo de trabajo" type="text" id="" name="" />
        </div>  
        <div className='inputs-tercera-fila-registro-aprendiz'>
        <h3>Telefono</h3>
        <input className='inpt-rg-num-telefono' placeholder="Numero de telefono" type="text" id="" name="" />
        <h3 className='h3-fila-2'>Ficha</h3>
        <input className='inpt-rg-ficha' placeholder="Ficha" type="text" id="" name="" />
        <h3 className='h3-fila-3'>Contraseña</h3>
        <input className='inpt-rg-contraseña' placeholder="Contraseña" type="password" id="" name="" />
      </div>  
       </div>
        <div className='btn-terminar-registro'>
            <button className='boton-cancelar-registro' type='submit'>⮜ ‎ Atrás</button>
             <button className='boton-registrar' type='submit'>Registrar</button>
             </div>
      </div>





      

      </div>
      
  )
}
