const { Pool } = require('pg');
const { CONFIG_BD } = require('../config/db');
const { rows } = require('pg/lib/defaults');
const express = require('express');
const pool = new Pool(CONFIG_BD)




// Instructor

// Registrar Un Instructor (Post):

const registerInstructor = (req, res) => {
    console.log(req.body);
    const { cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor } = req.body;

    if (!cc_instructor || !nombre_instructor || !email_instructor || !telefono_instructor || !password_instructor) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_instructor)) {
        return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
    }

    // Validar formato del número de teléfono
    const telefonoRegex = /^\d{10}$/; // 10 dígitos
    if (!telefonoRegex.test(telefono_instructor)) {
        return res.status(400).json({ error: 'Formato de número de teléfono inválido' });
    }

    // Convertir telefono_instructor a número entero
    const telefono_instructor_num = parseInt(telefono_instructor, 10);

    pool.query('SELECT * FROM instructores WHERE cc_instructor = $1 OR telefono_instructor = $2 OR email_instructor = $3', [cc_instructor, telefono_instructor_num, email_instructor], (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(501).json({ error: 'Error al registrar el Instructor', error });
        }

        if (result.rows.length > 0) {
            return res.status(409).json({ error: 'El Instructor ya existe' });
        }

        pool.query('INSERT INTO instructores (cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor) VALUES ($1, $2, $3, $4, $5)', [cc_instructor, nombre_instructor, email_instructor, telefono_instructor_num, password_instructor], (error) => {
            if (error) {
                console.error('Error al insertar el Instructor en la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el Instructor' });
            }

            res.status(201).json({ message: 'Instructor registrado exitosamente' });
        });
    });
};


// Ver Instructores (Get):

const getInstructores = (req, res) => {
    pool.query('SELECT * FROM instructores', (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(500).json({ error: 'Error al obtener la lista de instructores' });
        }

        res.status(200).json(result.rows);
    });
};



// Iniciar Sesion Instructor

const loginInstructor = (req, res) => {
    const { cc_instructor, password_instructor } = req.body;

    if (!cc_instructor || !password_instructor) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    pool.query('SELECT * FROM instructores WHERE cc_instructor = $1 AND password_instructor = $2', [cc_instructor, password_instructor], (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(500).json({ error: 'Error al intentar iniciar sesión de instructor' });
        }

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
};





// Aprendiz

// Registrar Un Aprendiz (Post):


const registerAprendiz = (req, res) => {
    console.log(req.body);
    const { tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, telefono_aprendiz, equipo_aprendiz, password_aprendiz } = req.body;

    if (!tipo_doc_aprendiz || !num_doc_aprendiz || !ficha_aprendiz || !programa_aprendiz || !nombre_aprendiz || !email_aprendiz || !telefono_aprendiz || !equipo_aprendiz || !password_aprendiz) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_aprendiz)) {
        return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
    }

    // Validar formato del número de teléfono
    const telefonoRegex = /^\d{10}$/; // 10 dígitos
    if (!telefonoRegex.test(telefono_aprendiz)) {
        return res.status(400).json({ error: 'Formato de número de teléfono inválido' });
    }

    // Convertir telefono_aprendiz a número entero
    const telefono_aprendiz_num = parseInt(telefono_aprendiz, 10);

    // Consultar si ya existe un aprendiz con el mismo número de documento, email o teléfono
    pool.query(
        'SELECT * FROM aprendices WHERE num_doc_aprendiz = $1 OR email_aprendiz = $2 OR telefono_aprendiz = $3',
        [num_doc_aprendiz, email_aprendiz, telefono_aprendiz_num],
        (error, result) => {
            if (error) {
                console.error('Error al consultar la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el Aprendiz' });
            }

            if (result.rows.length > 0) {
                return res.status(409).json({ error: 'El Aprendiz ya existe' });
            }

            // Si no hay conflictos, proceder con la inserción
            pool.query(
                'INSERT INTO aprendices (tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, telefono_aprendiz, equipo_aprendiz, password_aprendiz) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, telefono_aprendiz_num, equipo_aprendiz, password_aprendiz],
                (error) => {
                    if (error) {
                        console.error('Error al insertar el Aprendiz en la base de datos', error);
                        return res.status(500).json({ error: 'Error al registrar el Aprendiz' });
                    }

                    res.status(201).json({ message: 'Aprendiz registrado exitosamente' });
                }
            );
        }
    );
};


// Ver un Aprendiz (Get):

const getAprendices = (req, res) => {
    pool.query('SELECT * FROM aprendices', (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(500).json({ error: 'Error al obtener la lista de aprendices' });
        }

        res.status(200).json(result.rows);
    });
};



// Iniciar sesion aprendiz:

const loginAprendiz = (req, res) => {
    const { num_doc_aprendiz, password_aprendiz } = req.body;

    if (!num_doc_aprendiz || !password_aprendiz) {
        return res.status(400).json({ error: 'Falta información requerida de Aprendiz' });
    }

    // Consultar si existe un aprendiz con el número de documento y contraseña proporcionados
    pool.query(
        'SELECT * FROM aprendices WHERE num_doc_aprendiz = $1 AND password_aprendiz = $2',
        [num_doc_aprendiz, password_aprendiz],
        (error, result) => {
            if (error) {
                console.error('Error al consultar la base de datos', error);
                return res.status(500).json({ error: 'Error en el servidor de Aprendiz' });
            }

            if (result.rows.length === 1) {
                // Inicio de sesión exitoso
                return res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                // Credenciales inválidas
                return res.status(401).json({ error: 'Credenciales inválidas de Aprendiz' });
            }
        }
    );
};



// Hoja de inspeccion:


// Registro hoja de inspeccion (Post):





const registerHojaInspeccion = (req, res) => {
    console.log(req.body);
    const { fecha, hora_inicio, hora_fin } = req.body;

    if (!fecha || !hora_inicio || !hora_fin ) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }


    pool.query(
        'INSERT INTO hoja_inspeccion (fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3)',
        [fecha, hora_inicio, hora_fin],
        (error) => {
            if (error) {
                console.error('Error al insertar el Hoja de inspeccion en la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el Hoja de inspeccion' });
            }

            res.status(201).json({ message: 'Hoja de inspección registrado exitosamente' });
        }   
    );
};


// ComponentesChecklist (Post)


// Registrar un componente en la tabla componentes_checklist
const registerComponenteChecklist = (req, res) => {
    console.log(req.body);
    const { tipo_componente, nombre_componente } = req.body;

    if (!tipo_componente || !nombre_componente) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    pool.query(
        'INSERT INTO componentes_checklist (tipo_componente, nombre_componente) VALUES ($1, $2)',
        [tipo_componente, nombre_componente],
        (error) => {
            if (error) {
                console.error('Error al insertar el componente del checklist en la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el componente del checklist' });
            }

            res.status(201).json({ message: 'Componente del checklist registrado exitosamente' });
        }
    );
};


// Obtener la lista de componentes de la tabla componentes_checklist

   const getComponenteChecklist = (req, res) => {
    pool.query('SELECT * FROM componentes_checklist', (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(500).json({ error: 'Error al obtener la lista de componentes' });
        }

        res.status(200).json(result.rows);
    });
};
      
// Check List - Estado de los componentes (Post):

const registerCheckList = async (req, res) => {
    try {
        // Obtener la información del cuerpo del request
        const { checklistData } = req.body;

        // Validar si la información está presente
        if (!checklistData || !Array.isArray(checklistData)) {
            return res.status(400).json({ error: 'Datos de checklist no proporcionados correctamente' });
        }

        // Iterar sobre los datos y realizar la inserción en la base de datos
        for (const { id_componente, estado_componente } of checklistData) {
            await pool.query(
                'INSERT INTO checklist (id_componente, estado_componente) VALUES ($1, $2)',
                [id_componente, estado_componente]
            );
        }

        // Enviar respuesta exitosa
        res.status(201).json({ message: 'Estados de componentes registrados exitosamente' });
    } catch (error) {
        console.error('Error al registrar estados de componentes', error);
        res.status(500).json({ error: 'Error interno del servidor al registrar estados de componentes' });
    }
    
};










  
  module.exports = {
    registerInstructor,
    getInstructores,
    loginInstructor,
    registerAprendiz,
    getAprendices,
    loginAprendiz,
    registerHojaInspeccion,
    registerComponenteChecklist,
    getComponenteChecklist,
    registerCheckList,
  
    
    
   
    
  
  };
  
    