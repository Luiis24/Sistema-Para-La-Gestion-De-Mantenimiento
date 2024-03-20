import React from 'react';
import './Titulo_sena_cb.css';
import logo from '../../img/OIG3.png';
import { motion } from 'framer-motion';

export const Titulo_sena_cb = () => {
  return (

    <div className='logo-sena'>
      <img src={logo} className="img-logo-sena" alt='Logo Sena'></img>
      <motion.div className='titulo-completo hidden md:flex flex-col' initial={{x: 50}} animate={{x: 0}} transition={{duration: 0.5}}>
        <div className='titulo-sena'>Centro De Biotecnologia Industrial</div>
        <div className='titulo-taller'> Taller Maquinas Y Herramientas</div>
      </motion.div>

    </div>

  )
}
