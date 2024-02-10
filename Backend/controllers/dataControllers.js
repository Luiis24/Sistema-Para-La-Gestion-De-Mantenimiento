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
            return res.status(500).json({ error: 'Error al intentar iniciar sesión' });
        }

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
};

















// Aprendiz

// Registrar Un Aprendiz (Post):


const registerAprendiz = (req, res) => {
    console.log(req.body);
    const { tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, telefono_aprendiz, equipo_aprendiz, password_aprendiz } = req.body;

    if (!tipo_doc_aprendiz || !num_doc_aprendiz || !ficha_aprendiz || !programa_aprendiz || !nombre_aprendiz || !telefono_aprendiz || !equipo_aprendiz || !password_aprendiz) {
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












   
      
    

  
  module.exports = {
    registerInstructor,
    getInstructores,
    loginInstructor,
    registerAprendiz,
    getAprendices,
    
    
    
  
  };
  
    
