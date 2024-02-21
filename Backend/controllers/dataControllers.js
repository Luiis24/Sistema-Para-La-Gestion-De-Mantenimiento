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
    const { fecha, hora_inicio, hora_fin, estadosComponentes } = req.body;

    if (!fecha || !hora_inicio || !hora_fin || !estadosComponentes || estadosComponentes.length === 0) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    // Iniciar transacción
    pool.query('BEGIN', async (error) => {
        if (error) {
            console.error('Error al iniciar la transacción', error);
            return res.status(500).json({ error: 'Error al registrar el Hoja de inspección y estados de componentes' });
        }

        try {
            // Insertar información en la tabla hoja_inspeccion
            await pool.query(
                'INSERT INTO hoja_inspeccion (fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3) RETURNING id_inspeccion',
                [fecha, hora_inicio, hora_fin],
                async (error, result) => {
                    if (error) {
                        console.error('Error al insertar la Hoja de inspección en la base de datos', error);
                        throw new Error('Error al registrar la Hoja de inspección');
                    }

                    const idInspeccion = result.rows[0].id_inspeccion;

                    // Insertar información en la tabla checklist
                    const estadosQuery = estadosComponentes.map(({ id_componente, estado_componente }) => (
                        pool.query(
                            'INSERT INTO checklist (estado_componente, id_inspeccion, id_componente) VALUES ($1, $2, $3)',
                            [estado_componente, idInspeccion, id_componente]
                        )
                    ));

                    // Ejecutar todas las consultas de inserción de estados de componentes en paralelo
                    await Promise.all(estadosQuery);

                    // Confirmar la transacción
                    pool.query('COMMIT', (error) => {
                        if (error) {
                            console.error('Error al confirmar la transacción', error);
                            return res.status(500).json({ error: 'Error al confirmar la transacción' });
                        }

                        res.status(201).json({ message: 'Hoja de inspección y estados de componentes registrados exitosamente' });
                    });
                }
            );
        } catch (error) {
            // Si hay algún error en el bloque try, realizar un rollback
            pool.query('ROLLBACK', (rollbackError) => {
                if (rollbackError) {
                    console.error('Error al realizar rollback', rollbackError);
                }
                console.error('Error en la transacción', error);
                res.status(500).json({ error: 'Error en la transacción' });
            });
        }
    });
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

// ...

const registerCheckList = async (req, res) => {
    try {
        const { checklistData, fecha, horaInicio, horaFin } = req.body;

        if (!checklistData || !Array.isArray(checklistData)) {
            return res.status(400).json({ error: 'Datos de checklist no proporcionados correctamente' });
        }

        for (const { id_componente, estado_componente } of checklistData) {
            await pool.query(
                'INSERT INTO checklist (id_componente, estado_componente, id_inspeccion) VALUES ($1, $2, (SELECT id_inspeccion FROM hoja_inspeccion WHERE fecha = $3 AND hora_inicio = $4))',
                [id_componente, estado_componente, fecha, horaInicio]
            );
        }

        res.status(201).json({ message: 'Estados de componentes registrados exitosamente' });
    } catch (error) {
        console.error('Error al registrar estados de componentes', error);
        res.status(500).json({ error: 'Error interno del servidor al registrar estados de componentes' });
    }
};

// ...

const getUltimosEstados = (req, res) => {
    pool.query(
        'SELECT c.id_componente, c.tipo_componente, c.nombre_componente, cl.estado_componente, hi.fecha, hi.hora_inicio, hi.hora_fin ' +
        'FROM checklist cl ' +
        'JOIN componentes_checklist c ON cl.id_componente = c.id_componente ' +
        'JOIN hoja_inspeccion hi ON cl.id_inspeccion = hi.id_inspeccion ' +
        'WHERE cl.id_checklist IN (' +
            'SELECT MAX(id_checklist) ' +
            'FROM checklist ' +
            'GROUP BY id_componente' +
        ')',
        (error, results) => {
            if (error) {
                console.error('Error al obtener los últimos estados', error);
                return res.status(500).json({ error: 'Error al obtener los últimos estados' });
            }

            const ultimosEstados = {};
            results.rows.forEach((row) => {
                const componenteInfo = {
                    tipo: row.tipo_componente,
                    nombre: row.nombre_componente,
                    estado: row.estado_componente,
                    fecha: row.fecha,
                    horaInicio: row.hora_inicio,
                    horaFin: row.hora_fin,  
                };

                ultimosEstados[row.id_componente] = componenteInfo;
            });

            res.status(200).json(ultimosEstados);
        }
    );
};







// Crear un nuevo tipo de máquina
const crearTipoMaquina = (req, res) => {
    const { nombre_tipo_maquina, descripcion_tipo_maquina } = req.body;

    if (!nombre_tipo_maquina || !descripcion_tipo_maquina) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    pool.query(
        'INSERT INTO tipo_maquina (nombre_tipo_maquina, descripcion_tipo_maquina) VALUES ($1, $2)',
        [nombre_tipo_maquina, descripcion_tipo_maquina],
        (error) => {
            if (error) {
                console.error('Error al insertar el tipo de máquina en la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el tipo de máquina' });
            }

            res.status(201).json({ message: 'Tipo de máquina registrado exitosamente' });
        }
    );
};


// Obtener todos los tipos de máquina
const getTiposMaquina = (req, res) => {
    pool.query('SELECT * FROM tipo_maquina', (error, results) => {
        if (error) {
            console.error('Error al obtener los tipos de máquina', error);
            return res.status(500).json({ error: 'Error al obtener los tipos de máquina' });
        }

        res.status(200).json(results.rows);
    });
};



// Crear maquina (Post):


const crearMaquina = async (req, res) => {
    const { nombre_maquina, manual_maquina } = req.body;

    try {
        // Verificar si ya existe una máquina con el mismo nombre
        const existeMaquina = await pool.query(
            'SELECT id_maquina FROM maquinas WHERE nombre_maquina = $1',
            [nombre_maquina]
        );

        if (existeMaquina.rows.length > 0) {
            // Si ya existe una máquina con el mismo nombre, devolver un error
            return res.status(400).json({ error: 'Ya existe una máquina con el mismo nombre' });
        }
        // Insertar la nueva máquina
        await pool.query(
            'INSERT INTO maquinas (nombre_maquina, manual_maquina) VALUES ($1, $2)',
            [nombre_maquina, manual_maquina]
        );

        res.status(201).json({ message: 'Máquina registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar la máquina', error);
        res.status(500).json({ error: 'Error al registrar la nueva máquina' });
    }
};



// Obtener todas las máquina
const getMaquinas = (req, res) => {
    pool.query('SELECT * FROM maquinas', (error, results) => {
        if (error) {
            console.error('Error al obtener las máquinas', error);
            return res.status(500).json({ error: 'Error al obtener máquinas' });
        }

        res.status(200).json(results.rows);
    });
};




// Registrar caracteristicas del motor (POST):


const crearCaracteristicasMotor = async (req, res) => {
    const {
        marca_motor,
        modelo_motor,
        descripcion_motor,
        serie_motor,
        tamaño_motor,
        potencia_motor,
        rpm_motor,
        voltaje_motor,
        amp_motor,
    } = req.body;

    try {
        await pool.query(
            'INSERT INTO caracteristicas_motor (marca_motor, modelo_motor, descripcion_motor, serie_motor, tamaño_motor, potencia_motor, rpm_motor, voltaje_motor, amp_motor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [marca_motor, modelo_motor, descripcion_motor, serie_motor, tamaño_motor, potencia_motor, rpm_motor, voltaje_motor, amp_motor]
        );

        res.status(201).json({ message: 'Características del motor registradas exitosamente' });
    } catch (error) {
        console.error('Error al registrar las características del motor', error);
        res.status(500).json({ error: 'Error al registrar las características del motor' });
    }
};



const GetCaracteristicasMotor = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM caracteristicas_motor');
        const caracteristicasMotor = response.rows;

        res.status(200).json(caracteristicasMotor);
    } catch (error) {
        console.error('Error al obtener las características del motor', error);
        res.status(500).json({ error: 'Error al obtener las características del motor' });
    }
};



// Historial de reparaciones
// Guardar historial (Post):

const crearHistorialReparaciones = async (req, res) => {
    const { procedimiento_historial, repuestos_involucrados, observaciones_historial, fecha_historial } = req.body;

    try {
        await pool.query(
            'INSERT INTO historial_reparaciones (procedimiento_historial, repuestos_involucrados, observaciones_historial, fecha_historial) VALUES ($1, $2, $3, $4)',
            [procedimiento_historial, repuestos_involucrados, observaciones_historial, fecha_historial]
        );

        res.status(201).json({ message: 'Registro en el historial de reparaciones exitoso' });
    } catch (error) {
        console.error('Error al registrar en el historial de reparaciones', error);
        res.status(500).json({ error: 'Error al registrar en el historial de reparaciones' });
    }
};



const GetHistorialReparaciones = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM historial_reparaciones ORDER BY fecha_historial DESC');
        const historialReparaciones = response.rows;

        res.status(200).json(historialReparaciones);
    } catch (error) {
        console.error('Error al obtener el historial de reparaciones', error);
        res.status(500).json({ error: 'Error al obtener el historial de reparaciones' });
    }
};


// Descripcion del equipo (Post)

const registrarEquipo = async (req, res) => {

    const { nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo} = req.body;
  
    try {
      
      const resultado = await pool.query(
        'INSERT INTO descripcion_del_equipo_hv (nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)',
        [nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo]
      );
  
      res.json({mensaje: 'Equipo registrado correctamente'});
  
    } catch (error) {
      console.log(error);
      res.status(500).json('Error registrando equipo'); 
    }
  
  }
  
 // Descripcion del equipo (Get)

 const GetDescripcion_equio = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM descripcion_del_equipo_hv');
        const Descripcion_equioi = response.rows;

        res.status(200).json(Descripcion_equioi);
    } catch (error) {
        console.error('Error al obtener el historial de reparaciones', error);
        res.status(500).json({ error: 'Error al obtener el historial de reparaciones' });
    }
};

  

// Caracteristicas maquina (Post)

const crear_caracteristica_maquina = (req, res) => {
    const { nombre_caracteristica, funcion_maquina } = req.body;

    if (!nombre_caracteristica || !funcion_maquina) {
        return res.status(400).json({ error: 'Falta información requerida' });
    }

    pool.query(
        'INSERT INTO caracteristicas_maquina (nombre_caracteristica, funcion_maquina) VALUES ($1, $2)',
        [nombre_caracteristica, funcion_maquina],
        (error) => {
            if (error) {
                console.error('Error al insertar el tipo de máquina en la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el tipo de máquina' });
            }

            res.status(201).json({ message: 'Tipo de máquina registrado exitosamente' });
        }
    );
};


// Caracteristicas maquina (Get)

const GetCaracteristicasMaquina = (req, res) => {
    pool.query('SELECT * FROM caracteristicas_maquina', (error, results) => {
        if (error) {
            console.error('Error al obtener los tipos de máquina', error);
            return res.status(500).json({ error: 'Error al obtener los tipos de máquina' });
        }

        res.status(200).json(results.rows);
    });
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
    getUltimosEstados,
    getTiposMaquina,
    crearTipoMaquina,
    crearMaquina,
    getMaquinas,
    crearCaracteristicasMotor,
    GetCaracteristicasMotor,
    crearHistorialReparaciones,
    GetHistorialReparaciones,
    registrarEquipo,
    GetDescripcion_equio,
    crear_caracteristica_maquina,
    GetCaracteristicasMaquina,
    
    
   
    
  
  };
  
    