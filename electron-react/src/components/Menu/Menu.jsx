import React, { useState, useEffect } from "react";
import "./Menu.css";
import axios from 'axios'

import imagen_aprendices from "./Imagenes_Menu/aprendices.jpg";
import imagen_informes from "./Imagenes_Menu/informes.jpg";
import imagen_almacen from "./Imagenes_Menu/almacen.jpg";
import imagen_maquinas from "./Imagenes_Menu/maquinas.jpg"

import cerrarSesion from './Imagenes_Menu/cerrar-sesion.png';
import campana from './Imagenes_Menu/campana.png';
import informacion from './Imagenes_Menu/informacion.png';

import { Link } from "react-router-dom";
import { useAuth } from "../../estados/usuario";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Titulo_sena_cb } from "../Titulo_sena_cb/Titulo_sena_cb";


export const Menu = () => {

    const { user } = useAuth();
    const [userEnTabla, setUserEnTabla] = useState([])
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


    useEffect(() => {
        if (user.hasOwnProperty('num_doc_aprendiz')) {
            setUserEnTabla(users.filter(u => u.num_doc_aprendiz === user.num_doc_aprendiz));
        } else if (user.hasOwnProperty('cc_instructor')) {
            setUserEnTabla(usersI.filter(u => u.cc_instructor === user.cc_instructor));
        }
        setUserEnTabla(users.filter(usuario => usuario.num_doc_aprendiz == user.num_doc_aprendiz))
    }, []);



    const hiddenHerramientas = () => {
        const HM = document.getElementById('HM');
        HM.classList.remove('hidden')
    }

    const hiddenActive = () => {
        const HM = document.getElementById('HM');
        HM.classList.add('hidden')
    }



    return (
        <div>
            <Titulo_sena_cb />
            <div className="menu-principal">


                <div className="containerMenu">
                    <div className="maquinasMenu">
                        <Link to={'/tornos'}>
                            <img src={imagen_maquinas} className="imgSectionMenu"></img>
                            <p className="text-menu">Maquinas</p>
                        </Link>
                    </div>
                    <div className="informesMenu">
                        <Link to={'/informes'}>
                            <img src={imagen_informes} className="imgSectionMenu"></img>
                            <p className="text-menu">Informes</p>
                        </Link>
                    </div>
                    <div className="almacenMenu">
                        <Link to={'/almacen'}>
                            <img src={imagen_almacen} className="imgSectionMenu"></img>
                            <p className="text-menu-almacen">Almacen</p>
                        </Link>
                    </div>
                    <div className="usuariosMenu">
                        <Link to={'/aprendices'}>
                            <img src={imagen_aprendices} className="imgSectionMenu"></img>
                            <p className="text-menu">Usuarios</p>
                        </Link>
                    </div>
                </div>



                {/* <div className="containerUserName">
          <p className="nombreUser">{userEnTabla}</p>
          <p className="rolUser">Aprendiz</p>
        </div> */}


                <div className="IconsPrincipal">
                    <div className="iconP" onMouseOver={() => hiddenHerramientas()} onMouseOut={() => { hiddenActive() }}>
                        <Avatar
                            icon={<AvatarIcon />}
                            classNames={{
                                base: "bg-gradient-to-br from-[#34A853] to-[#30944B]",
                                icon: "text-black/80",
                            }}
                        />
                    </div>

                    <div className="herramientasMenu hidden" id="HM" onMouseOver={() => hiddenHerramientas()} onMouseOut={() => hiddenActive()}>
                        <div className="iconP">
                            <Link onClick={() => {
                                sessionStorage.clear();
                                window.location.href = "/"
                            }}>
                                <img src={cerrarSesion} alt='Cerrar Sesion' />
                            </Link>
                        </div>
                        <div className="iconP">
                            <Link to={'/'}>
                                <img src={campana} alt='Notificaciones' />
                            </Link>
                        </div>
                        <div className="iconP">
                            <img src={informacion} alt='Mas Informacion' />
                        </div>
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
