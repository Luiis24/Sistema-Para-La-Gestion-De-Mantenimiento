const { Pool } = require("pg");
const { CONFIG_BD } = require("../config/db");
const { rows } = require("pg/lib/defaults");
const express = require("express");
const pool = new Pool(CONFIG_BD);

// Instructor

// Registrar Un Instructor (Post):

const registerInstructor = (req, res) => {
  console.log(req.body);
  const {
    cc_instructor,
    nombre_instructor,
    email_instructor,
    telefono_instructor,
    password_instructor,
  } = req.body;

  if (
    !cc_instructor ||
    !nombre_instructor ||
    !email_instructor ||
    !telefono_instructor ||
    !password_instructor
  ) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  // Validar formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_instructor)) {
    return res
      .status(400)
      .json({ error: "Formato de correo electrónico inválido" });
  }

  // Validar formato del número de teléfono
  const telefonoRegex = /^\d{10}$/; // 10 dígitos
  if (!telefonoRegex.test(telefono_instructor)) {
    return res
      .status(400)
      .json({ error: "Formato de número de teléfono inválido" });
  }

  // Convertir telefono_instructor a número entero
  const telefono_instructor_num = parseInt(telefono_instructor, 10);

  pool.query(
    "SELECT * FROM instructores WHERE cc_instructor = $1 OR telefono_instructor = $2 OR email_instructor = $3",
    [cc_instructor, telefono_instructor_num, email_instructor],
    (error, result) => {
      if (error) {
        console.error("Error al consultar la base de datos", error);
        return res
          .status(501)
          .json({ error: "Error al registrar el Instructor", error });
      }

      if (result.rows.length > 0) {
        return res.status(409).json({ error: "El Instructor ya existe" });
      }

      pool.query(
        "INSERT INTO instructores (cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor) VALUES ($1, $2, $3, $4, $5)",
        [
          cc_instructor,
          nombre_instructor,
          email_instructor,
          telefono_instructor_num,
          password_instructor,
        ],
        (error) => {
          if (error) {
            console.error(
              "Error al insertar el Instructor en la base de datos",
              error
            );
            return res
              .status(500)
              .json({ error: "Error al registrar el Instructor" });
          }

          res
            .status(201)
            .json({ message: "Instructor registrado exitosamente" });
        }
      );
    }
  );
};

// Ver Instructores (Get):

const getInstructores = (req, res) => {
  pool.query("SELECT * FROM instructores", (error, result) => {
    if (error) {
      console.error("Error al consultar la base de datos", error);
      return res
        .status(500)
        .json({ error: "Error al obtener la lista de instructores" });
    }

    res.status(200).json(result.rows);
  });
};

// Iniciar Sesion Instructor

const loginInstructor = (req, res) => {
  const { cc_instructor, password_instructor } = req.body;

  if (!cc_instructor || !password_instructor) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  pool.query(
    "SELECT * FROM instructores WHERE cc_instructor = $1 AND password_instructor = $2",
    [cc_instructor, password_instructor],
    (error, result) => {
      if (error) {
        console.error("Error al consultar la base de datos", error);
        return res
          .status(500)
          .json({ error: "Error al intentar iniciar sesión de instructor" });
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      res.status(200).json({ message: "Inicio de sesión exitoso" });
    }
  );
};

// Aprendiz

// Registrar Un Aprendiz (Post):

const registerAprendiz = (req, res) => {
  console.log(req.body);
  const {
    tipo_doc_aprendiz,
    num_doc_aprendiz,
    ficha_aprendiz,
    programa_aprendiz,
    nombre_aprendiz,
    email_aprendiz,
    telefono_aprendiz,
    equipo_aprendiz,
    password_aprendiz,
  } = req.body;

  if (
    !tipo_doc_aprendiz ||
    !num_doc_aprendiz ||
    !ficha_aprendiz ||
    !programa_aprendiz ||
    !nombre_aprendiz ||
    !email_aprendiz ||
    !telefono_aprendiz ||
    !equipo_aprendiz ||
    !password_aprendiz
  ) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  // Validar formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_aprendiz)) {
    return res
      .status(400)
      .json({ error: "Formato de correo electrónico inválido" });
  }

  // Validar formato del número de teléfono
  const telefonoRegex = /^\d{10}$/; // 10 dígitos
  if (!telefonoRegex.test(telefono_aprendiz)) {
    return res
      .status(400)
      .json({ error: "Formato de número de teléfono inválido" });
  }

  // Convertir telefono_aprendiz a número entero
  const telefono_aprendiz_num = parseInt(telefono_aprendiz, 10);

  // Consultar si ya existe un aprendiz con el mismo número de documento, email o teléfono
  pool.query(
    "SELECT * FROM aprendices WHERE num_doc_aprendiz = $1 OR email_aprendiz = $2 OR telefono_aprendiz = $3",
    [num_doc_aprendiz, email_aprendiz, telefono_aprendiz_num],
    (error, result) => {
      if (error) {
        console.error("Error al consultar la base de datos", error);
        return res
          .status(500)
          .json({ error: "Error al registrar el Aprendiz" });
      }

      if (result.rows.length > 0) {
        return res.status(409).json({ error: "El Aprendiz ya existe" });
      }

      // Si no hay conflictos, proceder con la inserción
      pool.query(
        "INSERT INTO aprendices (tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, telefono_aprendiz, equipo_aprendiz, password_aprendiz) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          tipo_doc_aprendiz,
          num_doc_aprendiz,
          ficha_aprendiz,
          programa_aprendiz,
          nombre_aprendiz,
          email_aprendiz,
          telefono_aprendiz_num,
          equipo_aprendiz,
          password_aprendiz,
        ],
        (error) => {
          if (error) {
            console.error(
              "Error al insertar el Aprendiz en la base de datos",
              error
            );
            return res
              .status(500)
              .json({ error: "Error al registrar el Aprendiz" });
          }

          res.status(201).json({ message: "Aprendiz registrado exitosamente" });
        }
      );
    }
  );
};

// Ver un Aprendiz (Get):

const getAprendices = (req, res) => {
  pool.query("SELECT * FROM aprendices", (error, result) => {
    if (error) {
      console.error("Error al consultar la base de datos", error);
      return res
        .status(500)
        .json({ error: "Error al obtener la lista de aprendices" });
    }

    res.status(200).json(result.rows);
  });
};

// Iniciar sesion aprendiz:

const loginAprendiz = (req, res) => {
  const { num_doc_aprendiz, password_aprendiz } = req.body;

  if (!num_doc_aprendiz || !password_aprendiz) {
    return res
      .status(400)
      .json({ error: "Falta información requerida de Aprendiz" });
  }

  // Consultar si existe un aprendiz con el número de documento y contraseña proporcionados
  pool.query(
    "SELECT * FROM aprendices WHERE num_doc_aprendiz = $1 AND password_aprendiz = $2",
    [num_doc_aprendiz, password_aprendiz],
    (error, result) => {
      if (error) {
        console.error("Error al consultar la base de datos", error);
        return res
          .status(500)
          .json({ error: "Error en el servidor de Aprendiz" });
      }

      if (result.rows.length === 1) {
        // Inicio de sesión exitoso
        return res.status(200).json({ message: "Inicio de sesión exitoso" });
      } else {
        // Credenciales inválidas
        return res
          .status(401)
          .json({ error: "Credenciales inválidas de Aprendiz" });
      }
    }
  );
};

// Hoja de inspeccion:

// Registro hoja de inspeccion (Post):

const registerHojaInspeccion = async (req, res) => {
  console.log(req.body);
  const { fecha, hora_inicio, hora_fin, estadosComponentes, id_maquina } =
    req.body;

  if (
    !fecha ||
    !hora_inicio ||
    !hora_fin ||
    !estadosComponentes ||
    estadosComponentes.length === 0
  ) {
    return res.status(400).json({ error: "Falta información requerida" });
  }
  pool.query("BEGIN", async (error) => {
    if (error) {
      console.error("Error al iniciar la transacción", error);
      return res.status(500).json({
        error:
          "Error al registrar el Hoja de inspección y estados de componentes",
      });
    }

    try {
      const result = await pool.query(
        "INSERT INTO hoja_inspeccion (fecha, hora_inicio, hora_fin, id_maquina) VALUES ($1, $2, $3, $4) RETURNING id_inspeccion",
        [fecha, hora_inicio, hora_fin, id_maquina]
      );

      const idInspeccion = result.rows[0].id_inspeccion;

      const estadosQuery = estadosComponentes.map(
        ({ id_componente, estado_componente }) =>
          pool.query(
            "INSERT INTO checklist (estado_componente, id_inspeccion, id_componente) VALUES ($1, $2, $3)",
            [estado_componente, idInspeccion, id_componente]
          )
      );

      await Promise.all(estadosQuery);

      pool.query("COMMIT", (error) => {
        if (error) {
          console.error("Error al confirmar la transacción", error);
          return res
            .status(500)
            .json({ error: "Error al confirmar la transacción" });
        }

        res.status(201).json({
          message:
            "Hoja de inspección y estados de componentes registrados exitosamente",
        });
      });
    } catch (error) {
      pool.query("ROLLBACK", (rollbackError) => {
        if (rollbackError) {
          console.error("Error al revertir la transacción", rollbackError);
        }

        console.error(
          "Error al registrar el Hoja de inspección y estados de componentes",
          error
        );
        res.status(500).json({
          error:
            "Error al registrar el Hoja de inspección y estados de componentes",
        });
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
    return res.status(400).json({ error: "Falta información requerida" });
  }

  // Obtener la id de la última máquina creada
  pool.query(
    "SELECT id_maquina FROM maquinas ORDER BY id_maquina DESC LIMIT 1",
    (selectError, selectResult) => {
      if (selectError) {
        console.error("Error al obtener la última máquina", selectError);
        return res.status(500).json({ error: "Error al registrar el componente del checklist" });
      }

      const idMaquina = selectResult.rows[0].id_maquina;

      // Insertar el componente del checklist con la id de la última máquina
      pool.query(
        "INSERT INTO componentes_checklist (tipo_componente, nombre_componente, id_maquina) VALUES ($1, $2, $3)",
        [tipo_componente, nombre_componente, idMaquina],
        (insertError) => {
          if (insertError) {
            console.error(
              "Error al insertar el componente del checklist en la base de datos",
              insertError
            );
            return res
              .status(500)
              .json({ error: "Error al registrar el componente del checklist" });
          }

          res
            .status(201)
            .json({ message: "Componente del checklist registrado exitosamente" });
        }
      );
    }
  );
};


// Obtener la lista de componentes de la tabla componentes_checklist

const getComponenteChecklist = (req, res) => {
  pool.query("SELECT * FROM componentes_checklist", (error, result) => {
    if (error) {
      console.error("Error al consultar la base de datos", error);
      return res
        .status(500)
        .json({ error: "Error al obtener la lista de componentes" });
    }

    res.status(200).json(result.rows);
  });
};

// Check List - Estado de los componentes (Post):

const registerChecklist = async (req, res) => {
  try {
    const { id_maquina, fecha, hora_inicio, hora_fin, estadosComponentes } = req.body;

    console.log('Datos recibidos en el controlador:', {
      id_maquina,
      fecha,
      hora_inicio,
      hora_fin,
      estadosComponentes,
    });

    // Obtener el número de inspección actual para esa máquina
    const { rows } = await pool.query(
      'SELECT COALESCE(MAX(num_inspeccion), 0) + 1 AS nuevo_num_inspeccion FROM checklist WHERE id_maquina = $1',
      [id_maquina]
    );

    const nuevoNumInspeccion = rows[0].nuevo_num_inspeccion;

    // Construir la consulta SQL para insertar en la tabla checklist
    const query = `
      INSERT INTO checklist (id_maquina, num_inspeccion, fecha, hora_inicio, hora_fin, estado_componente, id_componente)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    // Ejecutar la consulta para cada estadoComponente
    for (const estadoComponente of estadosComponentes) {
      const values = [
        id_maquina,
        nuevoNumInspeccion,
        fecha,
        hora_inicio,
        hora_fin,
        estadoComponente.estado_componente,
        estadoComponente.id_componente,
      ];

      await pool.query(query, values);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error al registrar en checklist:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};





// ...

const getUltimosEstados = (req, res) => {
  pool.query(
    "SELECT c.id_componente, c.tipo_componente, c.nombre_componente, cl.estado_componente, hi.fecha, hi.hora_inicio, hi.hora_fin " +
      "FROM checklist cl " +
      "JOIN componentes_checklist c ON cl.id_componente = c.id_componente " +
      "JOIN hoja_inspeccion hi ON cl.id_inspeccion = hi.id_inspeccion " +
      "WHERE cl.id_checklist IN (" +
      "SELECT MAX(id_checklist) " +
      "FROM checklist " +
      "GROUP BY id_componente" +
      ")",
    (error, results) => {
      if (error) {
        console.error("Error al obtener los últimos estados", error);
        return res
          .status(500)
          .json({ error: "Error al obtener los últimos estados" });
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
    return res.status(400).json({ error: "Falta información requerida" });
  }

  pool.query(
    "INSERT INTO tipo_maquina (nombre_tipo_maquina, descripcion_tipo_maquina) VALUES ($1, $2)",
    [nombre_tipo_maquina, descripcion_tipo_maquina],
    (error) => {
      if (error) {
        console.error(
          "Error al insertar el tipo de máquina en la base de datos",
          error
        );
        return res
          .status(500)
          .json({ error: "Error al registrar el tipo de máquina" });
      }

      res
        .status(201)
        .json({ message: "Tipo de máquina registrado exitosamente" });
    }
  );
};

// Obtener todos los tipos de máquina
const getTiposMaquina = (req, res) => {
  pool.query("SELECT * FROM tipo_maquina", (error, results) => {
    if (error) {
      console.error("Error al obtener los tipos de máquina", error);
      return res
        .status(500)
        .json({ error: "Error al obtener los tipos de máquina" });
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
      "SELECT id_maquina FROM maquinas WHERE nombre_maquina = $1",
      [nombre_maquina]
    );

    if (existeMaquina.rows.length > 0) {
      // Si ya existe una máquina con el mismo nombre, devolver un error
      return res
        .status(400)
        .json({ error: "Ya existe una máquina con el mismo nombre" });
    }
    // Insertar la nueva máquina
    const resultado = await pool.query(
      "INSERT INTO maquinas (nombre_maquina, manual_maquina) VALUES ($1, $2) RETURNING id_maquina",
      [nombre_maquina, manual_maquina]
    );

    const idMaquina = resultado.rows[0].id_maquina;

    // Llamar al controlador para crear la hoja de vida

    res.status(201).json({ message: "Máquina registrada exitosamente" });
  } catch (error) {
    console.error("Error al registrar la máquina", error);
    res.status(500).json({ error: "Error al registrar la nueva máquina" });
  }
};

// Obtener todas las máquina
const getMaquinas = (req, res) => {
  pool.query("SELECT * FROM maquinas", (error, results) => {
    if (error) {
      console.error("Error al obtener las máquinas", error);
      return res.status(500).json({ error: "Error al obtener máquinas" });
    }

    res.status(200).json(results.rows);
  });
};

const getHojas_de_vida = (req, res) => {
  pool.query("SELECT * FROM hoja_de_vida", (error, results) => {
    if (error) {
      console.error("Error al obtener las hojas de vida", error);
      return res.status(500).json({ error: "Error al obtener hojas de vida" });
    }

    res.status(200).json(results.rows);
  });
};

// Registrar caracteristicas del motor (POST):

const crearCaracteristicasMotor = async (req, res) => {
  const {
    id_maquina,
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
      "INSERT INTO caracteristicas_motor (id_maquina, marca_motor, modelo_motor, descripcion_motor, serie_motor, tamaño_motor, potencia_motor, rpm_motor, voltaje_motor, amp_motor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        id_maquina,
        marca_motor,
        modelo_motor,
        descripcion_motor,
        serie_motor,
        tamaño_motor,
        potencia_motor,
        rpm_motor,
        voltaje_motor,
        amp_motor,
      ]
    );

    res
      .status(201)
      .json({ message: "Características del motor registradas exitosamente" });
  } catch (error) {
    console.error("Error al registrar las características del motor", error);
    res
      .status(500)
      .json({ error: "Error al registrar las características del motor" });
  }
};

const GetCaracteristicasMotor = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM caracteristicas_motor");
    const caracteristicasMotor = response.rows;

    res.status(200).json(caracteristicasMotor);
  } catch (error) {
    console.error("Error al obtener las características del motor", error);
    res
      .status(500)
      .json({ error: "Error al obtener las características del motor" });
  }
};

// Historial de reparaciones
// Guardar historial (Post):

const crearHistorialReparaciones = async (req, res) => {
  const {
    id_maquina,
    procedimiento_historial,
    insumos_usados_historial,
    observaciones_historial,
    fecha_historial,
  } = req.body;

  try {
    await pool.query(
      "INSERT INTO historial_reparaciones (id_maquina, procedimiento_historial, insumos_usados_historial, observaciones_historial, fecha_historial) VALUES ($1, $2, $3, $4, $5)",
      [
        id_maquina,
        procedimiento_historial,
        insumos_usados_historial,
        observaciones_historial,
        fecha_historial,
      ]
    );

    res
      .status(201)
      .json({ message: "Registro en el historial de reparaciones exitoso" });
  } catch (error) {
    console.error("Error al registrar en el historial de reparaciones", error);
    res
      .status(500)
      .json({ error: "Error al registrar en el historial de reparaciones" });
  }
};

const GetHistorialReparaciones = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM historial_reparaciones ORDER BY fecha_historial DESC"
    );
    const historialReparaciones = response.rows;

    res.status(200).json(historialReparaciones);
  } catch (error) {
    console.error("Error al obtener el historial de reparaciones", error);
    res
      .status(500)
      .json({ error: "Error al obtener el historial de reparaciones" });
  }
};

// Descripcion del equipo (Post)

const registrarEquipo = async (req, res) => {
  const {
    id_maquina,
    nombre_equipo,
    marca_equipo,
    fecha_fabricacion_equipo,
    fabricante_equipo,
    ubicacion_equipo,
    caracteristicas_equipo,
    codigo_equipo,
    modelo_equipo,
    num_serie_equipo,
    prioridad_equipo,
    voltaje_equipo,
    corriente_equipo,
    frecuencia_equipo,
    capacidad_equipo,
    peso_equipo,
    alimentacion_equipo,
    sistema_electrico_equipo,
    sistema_electronico_equipo,
    sistema_mecanico_equipo,
    sistema_neumatico_equipo,
    sistema_hidraulico_equipo,
    sistema_termico_equipo,
  } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO descripcion_del_equipo_hv (id_maquina, nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)",
      [
        id_maquina,
        nombre_equipo,
        marca_equipo,
        fecha_fabricacion_equipo,
        fabricante_equipo,
        ubicacion_equipo,
        caracteristicas_equipo,
        codigo_equipo,
        modelo_equipo,
        num_serie_equipo,
        prioridad_equipo,
        voltaje_equipo,
        corriente_equipo,
        frecuencia_equipo,
        capacidad_equipo,
        peso_equipo,
        alimentacion_equipo,
        sistema_electrico_equipo,
        sistema_electronico_equipo,
        sistema_mecanico_equipo,
        sistema_neumatico_equipo,
        sistema_hidraulico_equipo,
        sistema_termico_equipo,
      ]
    );

    res.json({ mensaje: "Equipo registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error registrando equipo");
  }
};

// Descripcion del equipo (Get)

const GetDescripcion_equio = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM descripcion_del_equipo_hv"
    );
    const Descripcion_equioi = response.rows;

    res.status(200).json(Descripcion_equioi);
  } catch (error) {
    console.error("Error al obtener el historial de reparaciones", error);
    res
      .status(500)
      .json({ error: "Error al obtener el historial de reparaciones" });
  }
};

// Caracteristicas maquina (Post)

const crear_caracteristica_maquina = (req, res) => {
  const { id_maquina, nombre_caracteristica, descripcion_caracteristica } =
    req.body;

  if (!id_maquina || !nombre_caracteristica || !descripcion_caracteristica) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  pool.query(
    "INSERT INTO caracteristicas_maquina (id_maquina, nombre_caracteristica, descripcion_caracteristica) VALUES ($1, $2, $3)",
    [id_maquina, nombre_caracteristica, descripcion_caracteristica],
    (error) => {
      if (error) {
        console.error(
          "Error al insertar la característica de la máquina en la base de datos",
          error
        );
        return res.status(500).json({
          error: "Error al registrar la característica de la máquina",
        });
      }

      res.status(201).json({
        message: "Característica de la máquina registrada exitosamente",
      });
    }
  );
};

const actualizar_funcion_maquina = (req, res) => {
  const { id_maquina, funcion_maquina } = req.body;

  if (!id_maquina || !funcion_maquina) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  pool.query(
    "UPDATE caracteristicas_maquina SET funcion_maquina = $1 WHERE id_maquina = $2",
    [funcion_maquina, id_maquina],
    (error) => {
      if (error) {
        console.error(
          "Error al actualizar la función de la máquina en la base de datos",
          error
        );
        return res
          .status(500)
          .json({ error: "Error al actualizar la función de la máquina" });
      }

      res
        .status(200)
        .json({ message: "Función de la máquina actualizada exitosamente" });
    }
  );
};

// Caracteristicas maquina (Get)

const GetCaracteristicasMaquina = (req, res) => {
  pool.query("SELECT * FROM caracteristicas_maquina", (error, results) => {
    if (error) {
      console.error("Error al obtener los tipos de máquina", error);
      return res
        .status(500)
        .json({ error: "Error al obtener los tipos de máquina" });
    }

    res.status(200).json(results.rows);
  });
};

// Obtener la descripción del equipo por id_maquina
const getDescripcionEquipoById = async (id_maquina) => {
  try {
    const response = await pool.query(
      "SELECT * FROM descripcion_del_equipo_hv WHERE id_maquina = $1",
      [id_maquina]
    );
    return response.rows;
  } catch (error) {
    console.error("Error al obtener la descripción del equipo", error);
    throw error;
  }
};

// Obtener las características de la máquina por id_maquina
const getCaracteristicasMaquinaById = async (id_maquina) => {
  try {
    const response = await pool.query(
      "SELECT * FROM caracteristicas_maquina WHERE id_maquina = $1",
      [id_maquina]
    );
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las características de la máquina", error);
    throw error;
  }
};

// Obtener las características del motor por id_maquina
const getCaracteristicasMotorById = async (id_maquina) => {
  try {
    const response = await pool.query(
      "SELECT * FROM caracteristicas_motor WHERE id_maquina = $1",
      [id_maquina]
    );
    return response.rows;
  } catch (error) {
    console.error("Error al obtener las características del motor", error);
    throw error;
  }
};

// Obtener el historial de reparaciones por id_maquina
const getHistorialReparacionesById = async (id_maquina) => {
  try {
    const response = await pool.query(
      "SELECT * FROM historial_reparaciones WHERE id_maquina = $1 ORDER BY fecha_historial DESC",
      [id_maquina]
    );
    return response.rows;
  } catch (error) {
    console.error("Error al obtener el historial de reparaciones", error);
    throw error;
  }
};

//Insumos (Post)

const RegistrarInsumo = (req, res) => {
  const {
    nombre_insumo,
    fecha_llegada_insumo,
    cantidad_insumo,
    proveedor_insumo,
  } = req.body;

  if (
    !nombre_insumo ||
    !fecha_llegada_insumo ||
    !cantidad_insumo ||
    !proveedor_insumo
  ) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  // Verificar si ya existe un insumo con el mismo nombre
  pool.query(
    "SELECT * FROM insumos WHERE nombre_insumo = $1",
    [nombre_insumo],
    (error, result) => {
      if (error) {
        console.error("Error al buscar el insumo en la base de datos", error);
        return res.status(500).json({ error: "Error al registrar insumos" });
      }

      if (result.rows.length > 0) {
        // Si ya existe, actualiza la cantidad y la fecha
        pool.query(
          "UPDATE insumos SET cantidad_insumo = cantidad_insumo + $1, fecha_llegada_insumo = $2 WHERE nombre_insumo = $3",
          [cantidad_insumo, fecha_llegada_insumo, nombre_insumo],
          (updateError) => {
            if (updateError) {
              console.error(
                "Error al actualizar la cantidad y la fecha del insumo existente",
                updateError
              );
              return res
                .status(500)
                .json({ error: "Error al registrar insumos" });
            }

            res.status(200).json({
              message:
                "La cantidad y la fecha del insumo existente fueron actualizadas exitosamente",
            });
          }
        );
      } else {
        // Si no existe, inserta un nuevo insumo
        pool.query(
          "INSERT INTO insumos (nombre_insumo, fecha_llegada_insumo, cantidad_insumo, proveedor_insumo) VALUES ($1, $2, $3, $4)",
          [
            nombre_insumo,
            fecha_llegada_insumo,
            cantidad_insumo,
            proveedor_insumo,
          ],
          (insertError) => {
            if (insertError) {
              console.error(
                "Error al insertar los insumos en la base de datos",
                insertError
              );
              return res
                .status(500)
                .json({ error: "Error al registrar insumos" });
            }

            res.status(201).json({
              message: "Los insumos fueron registrados exitosamente",
            });
          }
        );
      }
    }
  );
};

//Insumos (Get)

const GetInsumos = (req, res) => {
  pool.query("SELECT * FROM insumos", (error, results) => {
    if (error) {
      console.error("Error al obtener la lista de los insumos", error);
      return res
        .status(500)
        .json({ error: "Error al obtener la lista de los insumos" });
    }

    res.status(200).json(results.rows);
  });
};

// Usar insumo

const UsarInsumo = async (req, res) => {
  const { id_insumo, nombre_insumo, cantidad } = req.body;
  console.log("Recibido: ", id_insumo, cantidad);
  try {
    console.log("ID del insumo:", id_insumo);
    console.log("Nombre del insumo:", nombre_insumo);
    console.log("Cantidad:", cantidad);
    const result = await pool.query(
      "SELECT * FROM insumos WHERE id_insumos = $1",
      [id_insumo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }

    const cantidadActual = result.rows[0].insumos_en_uso || 0;

    await pool.query(
      "UPDATE insumos SET insumos_en_uso = $1 WHERE id_insumos = $2",
      [cantidadActual + parseInt(cantidad), id_insumo]
    );

    console.log("Insumo usado exitosamente");
    res.status(200).json({ message: "Insumo usado exitosamente" });
  } catch (error) {
    console.error("Error al usar insumo", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Ver insumo con la id

const getInsumoById = async (req, res) => {
  const id_insumo = req.params.id_insumo;

  try {
    const result = await pool.query(
      "SELECT * FROM insumos WHERE id_insumos = $1",
      [id_insumo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener insumo por ID", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Devolver insumo

const devolverInsumo = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  try {
    // Verificar si el insumo existe
    const insumoExistente = await pool.query(
      "SELECT * FROM insumos WHERE id_insumos = $1",
      [id]
    );

    if (insumoExistente.rows.length === 0) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }

    const insumo = insumoExistente.rows[0];
    const cantidadEnUso = insumo.insumos_en_uso || 0;

    // Verificar si la cantidad a devolver no supera la cantidad en uso
    if (cantidad > cantidadEnUso) {
      return res
        .status(400)
        .json({ message: "La cantidad ingresada supera la cantidad en uso" });
    }

    // Realizar la devolución de insumo
    await pool.query(
      "UPDATE insumos SET insumos_en_uso = $1 WHERE id_insumos = $2",
      [cantidadEnUso - cantidad, id]
    );

    res.status(200).json({ message: "Insumo devuelto exitosamente" });
  } catch (error) {
    console.error("Error al devolver insumo", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const ultimaMaquina = (req, res) => {
  pool.query(
    "SELECT * FROM maquinas ORDER BY id_maquina DESC LIMIT 1",
    (error, result) => {
      if (error) {
        console.error("Error al obtener la última máquina registrada", error);
        return res
          .status(500)
          .json({ error: "Error al obtener la última máquina registrada" });
      }

      res.status(200).json(result.rows[0]);
    }
  );
};


const getComponentesByMaquina = async (req, res) => {
  const idMaquina = req.params.idMaquina;

  try {
    // Realiza la consulta a la base de datos para obtener los componentes de la máquina específica
    const response = await pool.query(
      'SELECT * FROM componentes_checklist WHERE id_maquina = $1',
      [idMaquina]
    );

    res.json(response.rows);
  } catch (error) {
    console.error('Error al obtener los componentes de la máquina', error);
    res.status(500).json({ error: 'Error al obtener los componentes de la máquina' });
  }
};


const getHistorialRegistros = async (req, res) => {
  const { idMaquina } = req.params;

  try {
    const response = await pool.query(
      'SELECT * FROM checklist WHERE id_maquina = $1 ORDER BY num_inspeccion DESC',
      [idMaquina]
    );

    res.json(response.rows);
  } catch (error) {
    console.error('Error al obtener el historial de registros', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const getUltimoRegistro = async (req, res) => {
  const { idMaquina } = req.params;

  try {
    const response = await pool.query(
      'SELECT * FROM checklist WHERE id_maquina = $1 ORDER BY num_inspeccion DESC LIMIT 1',
      [idMaquina]
    );

    res.json(response.rows[0]);
  } catch (error) {
    console.error('Error al obtener el último registro', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
  registerChecklist,
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
  actualizar_funcion_maquina,
  GetCaracteristicasMaquina,
  getHojas_de_vida,
  getDescripcionEquipoById,
  getCaracteristicasMaquinaById,
  getCaracteristicasMotorById,
  getHistorialReparacionesById,
  RegistrarInsumo,
  GetInsumos,
  UsarInsumo,
  getInsumoById,
  devolverInsumo,
  ultimaMaquina,
  getComponentesByMaquina,
  getHistorialRegistros,
  getUltimoRegistro



};
