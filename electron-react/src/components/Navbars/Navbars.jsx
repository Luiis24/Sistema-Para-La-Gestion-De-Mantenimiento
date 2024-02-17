import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../../css/navbars.css'
import { Link } from 'react-router-dom'
import logoSena from '../../img/logo.png'
import menu from '../../img/menu.png'

export const Navbars = () => {

    const [maquinas, setMaquinas] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4002/maquinas')
            .then(datos => {
                setMaquinas(datos.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);


  return (
    <div>
        <div className="navVertical">
        <Link to={'/'}>
        <div className="principal">
          <img className="logoSena" src={logoSena} alt='Logo Sena'></img>
          <h2>Principal</h2>
        </div>
        </Link>
        <ul className='navList'>
          <li><Link to={'/tornos'}>Tornos</Link></li>
          {maquinas.map(maquina => {
            return <li key={maquina.id_maquina}><a href={`/ordenDeTrabajo/${maquina.id_maquina}`}>{maquina.nombre_maquina}</a></li>
          })}
          <li><Link to={'/sierras'}>Sierras</Link></li>
          
        </ul>
      </div>
    </div>
  )
}
