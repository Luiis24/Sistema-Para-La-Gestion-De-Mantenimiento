import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const UsuariosContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      })

      useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
      }, [user])

    return (
        <UsuariosContext.Provider value={{user, setUser}}>
            {children}
        </UsuariosContext.Provider>
    )
};
export const useAuth = () => {
    return useContext(UsuariosContext)
};