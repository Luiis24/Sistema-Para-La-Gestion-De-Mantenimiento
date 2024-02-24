import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const UsuariosContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      })

      const [nombre, setNombre] = useState('');
      const [rol, setRol] = useState('');
      const [programaFormacion, setProgramaFormacion] = useState('');

      useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));

        // Extraer valores de rol y programaFormacion si el usuario está disponible
        if (user) {
            if (user.hasOwnProperty('num_doc_aprendiz')) {
                setRol('Aprendiz');
                setProgramaFormacion(user.programa_aprendiz || '');
                setNombre(user.nombre_aprendiz || '');
            } else if (user.hasOwnProperty('cc_instructor')) {
                setRol('Instructor');
                setProgramaFormacion('');
                setNombre(user.nombre_instructor || '');
            }
        }
      }, [user])

    return (
        <UsuariosContext.Provider value={{ user, setUser, rol, programaFormacion, nombre }}>
            {children}
        </UsuariosContext.Provider>
    )
};
export const useAuth = () => {
    return useContext(UsuariosContext)
};