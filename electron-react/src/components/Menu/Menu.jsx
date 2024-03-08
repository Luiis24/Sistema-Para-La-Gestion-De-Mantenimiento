import React from "react";
import "./Menu.css";

import cerrarSesion from './Imagenes_Menu/cerrar-sesion.png';
import campana from './Imagenes_Menu/campana.png';
import informacion from './Imagenes_Menu/informacion.png';

import { Link } from "react-router-dom";
import { useAuth } from "../../estados/usuario";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Titulo_sena_cb } from "../Titulo_sena_cb/Titulo_sena_cb";


export const Menu = () => {

    const { rol, nombre, programaFormacion } = useAuth();


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
                        <Link to={'/tornos'} className="a-menu">
                            <p className="text-menu">Maquinas</p>
                        </Link>
                    </div>
                    <div className="informesMenu">
                        <Link to={'/informes'} className="a-menu">
                            <p className="text-menu">Informes</p>
                        </Link>
                    </div>
                    <div className="almacenMenu">
                        <Link to={'/almacen'} className="a-menu">
                            <p className="text-menu">Almacen</p>
                        </Link>
                    </div>
                    <div className="usuariosMenu">
                        {rol === 'Instructor' ? <Link to={'/aprendices'} className="a-menu">
                            <p className="text-menu">Usuarios</p>
                        </Link> : <div className="a-menu cursor-not-allowed">
                            <p className="text-menu">Usuarios</p>
                        </div>}
                    </div>
                </div>


                <div className="containerUserName">
                    <p className="nombreUser">{nombre ? nombre : ''}</p>
                    <p className="rolUser flex-col text-center hidden md:flex">{rol ? rol : ''}  {programaFormacion ? `- ${programaFormacion}` : ''}</p>
                </div>


                <div className="IconsPrincipal">
                    <div className="iconP" onMouseOver={() => hiddenHerramientas()} onMouseOut={() => { hiddenActive() }}>
                        <Avatar
                            icon={<AvatarIcon />}
                            classNames={{
                                base: "bg-gradient-to-br from-[#30944B] to-[#34A853] w-12 h-12",
                                icon: "text-white",
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
                            <Link>
                                <img src={campana} alt='Notificaciones'/>
                            </Link>
                        </div>
                        <div className="iconP">
                            <img src={informacion} alt='Mas Informacion'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
