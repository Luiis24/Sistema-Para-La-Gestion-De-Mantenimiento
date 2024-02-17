import React, { useState, useEffect } from "react";
import "./Menu_principal.css";
import axios from 'axios'
import imagen_torno from "./Imagenes_Menu/Tornos.jpg";
import imagen_cnc from "./Imagenes_Menu/Cnc.jpg";
import imagen_esmeril from "./Imagenes_Menu/esmeril.jpg";
import imagen_fresadora from "./Imagenes_Menu/fresadora.jpg";
import imagen_sierra from "./Imagenes_Menu/sierra.jpg";
import imagen_aprendices from "./Imagenes_Menu/aprendices.jpg";
import imagen_informes from "./Imagenes_Menu/informes.jpg";
import imagen_almacen from "./Imagenes_Menu/almacen.jpg";
import imagen_compresor from "./Imagenes_Menu/compresor_de_tornillo.jpg";
import cerrarSesion from './Imagenes_Menu/cerrar-sesion.png';
import campana from './Imagenes_Menu/campana.png';
import informacion from './Imagenes_Menu/informacion.png';
import { Link } from "react-router-dom";
// import { useAuth } from "../../estados/usuario";
import { Avatar, AvatarIcon } from "@nextui-org/react";


export const Menu_principal = () => {

  // const { user, setUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersI, setUsersI] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4002/aprendices')
      .then(datos => {
        setUsers(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4002/instructores')
      .then(datos => {
        setUsersI(datos.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const user = [
    {
      cc_instructor: '456',
      password_aprendiz: '00'
    }
  ]

let userName;

//   if(user !== null){
//     for (let objeto of user) {
//       if(typeof objeto === 'object' && objeto !== null){
//         if(objeto.hasOwnProperty('num_doc_aprendiz')){
//           const userRowTabla = users.filter(u => {
//             return (u.num_doc_aprendiz == objeto.num_doc_aprendiz)})
//             console.log(userRowTabla)
//             const userName = userRowTabla[0].nombre_aprendiz
//             return userName
//         }else if(objeto.hasOwnProperty('cc_instructor')){
//           const userRowTabla = usersI.filter(u => {
//             return (u.cc_instructor == objeto.cc_instructor)
//           })
//           console.log(userRowTabla)
//           const userName = userRowTabla[0].nombre_instructor
//           return userName
//         }
//       }
//     }
//   }else{
// console.log('error')
//   }






  return (
    <div className="Menu_p">
      <div className="menu-principal">
        <div className="tarjetas">
          <div className="TCE-tarjetas">
            <div className="TFSA-tarjetas">
              <div className="tornos-tarjeta">
                <Link to={'/tornos'}>
                  <img src={imagen_torno} className="img-torno"></img>
                  <p className="parrafo">Tornos</p>
                </Link>
              </div>
              <div className="fresadoras-tarjeta">
                <Link to={'/fresadoras'}>
                  <img src={imagen_fresadora} className="img-fresadora"></img>
                  <div><p className="parrafo">Fresadoras</p></div>
                </Link>
              </div>
              <div className="sierra-tarjeta">
                <Link to={'/sierras'}>
                <img src={imagen_sierra} className="img-sierra"></img>
                <div><p className="parrafo">Sierras</p></div>
                </Link>
              </div>
              <div className="almacen-tarjeta">
                <Link to={'/almacen'}>
                  <img src={imagen_almacen} className="img-almacen"></img>
                  <div><p className="parrafo_almacen">Almacén</p></div>
                </Link>
              </div>
            </div>
            <div className="cnc-y-comp-tarjetas">
              <div className="cnc-tarjeta">
                <Link to={'/cnc'}>
                  <img src={imagen_cnc} className="img-cnc"></img>
                  <div><p className="parrafo">CNC</p></div>
                </Link>
              </div>
              <div className="compresor-tarjeta">
                <img src={imagen_compresor} className="img-compresor"></img>
                <div><p className="parrafo">Compresor de tornillo</p></div>
              </div>
            </div>
            <div className="EAI-tarjetas">
              <div className="esmeriles-tarjeta">
                <img src={imagen_esmeril} className="img-esmeril"></img>
                <div><p className="parrafo">Esmeriles</p></div>
              </div>
              <div className="aprendices-tarjeta">
                <Link to={'/aprendices'}>
                  <img src={imagen_aprendices} className="img-aprendices"></img>
                  <div><p className="parrafo">Aprendices</p></div>
                </Link>
              </div>
              <div className="informes-tarjeta">
                <img src={imagen_informes} className="img-informes"></img>
                <div><p className="parrafo">Informes</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* {userName && userName.length > 0 && (
          <div className="containerUserName">
            <p className="nombreUser">{userName[0].nombre_aprendiz}</p>
            <p className="rolUser">Aprendiz</p>
          </div>
        )} */}

        <div className="IconsPrincipal">
          <div className="iconP">
            <Avatar
              icon={<AvatarIcon />}
              classNames={{
                base: "bg-gradient-to-br from-[#34A853] to-[#30944B]",
                icon: "text-black/80",
              }}
            />
          </div>

          <div className="iconP">
            <Link onClick={() => {
              sessionStorage.clear();
              window.location.href = "/inicio_Aprendiz"
            }}>
              <img src={cerrarSesion} alt='Cerrar Sesion' />
            </Link>
          </div>
          <div className="iconP">
            <Link to={'/notificaciones'}>
              <img src={campana} alt='Notificaciones' />
            </Link>
          </div>
          <div className="iconP">
            <img src={informacion} alt='Mas Informacion' />
          </div>
        </div>


        <div className="animacion">
          <ul className="cuadros">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
