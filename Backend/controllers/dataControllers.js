const { Pool } = require('pg');
const { CONFIG_BD } = require('../config/db');
const { rows } = require('pg/lib/defaults');
const express = require('express');
const pool = new Pool(CONFIG_BD)


// Posts:


// Registrar Un Instructor:

const registerInstructor = (req, res) => {
    console.log(req.body);
    const { cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor } = req.body;

    if (!cc_instructor || !nombre_instructor || !email_instructor || !telefono_instructor || !password_instructor) {
        return res.status(400).json({ error: 'Falta informacion requerida' });
    }

    pool.query('SELECT * FROM instructores WHERE cc_instructor = $1 OR telefono_instructor = $2 OR email_instructor = $3', [cc_instructor, telefono_instructor, email_instructor], (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(500).json({ error: 'Error al registrar el Instructor', error });
        }

        if (result.rows.length > 0) {
            return res.status(409).json({ error: 'El Instructor ya existe' });
        }

        pool.query('INSERT INTO instructores (cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor) VALUES ($1, $2, $3, $4, $5)', [cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor], (error) => {
            if (error) {
                console.error('Error al insertar el Instructor en la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el Instructor' });
            }

            res.status(201).json({ message: 'Instructor registrado exitosamente' });
        });
    });
};


// Registrar Un Aprendiz:


const getProducts = (req, res)=> {
    pool.query('SELECT * FROM public."productos"', (error, result) => {
        if (error){
            console.error('Error al obtener los datos', error);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.json(result.rows);
        }
        });
    };


    const usuarios = (req, res)=> {
        pool.query('SELECT * FROM public."usuarios"', (error, result) => {
            if (error){
                console.error('Error al obtener los datos', error);
                res.status(500).send('Error al obtener los datos');
            } else {
                res.json(result.rows);
            }
            });
        };





    



    
    const loginUser = async (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ error: 'Falta informacion requerida' });
        }
    
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    
            if (result.rows.length === 0) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }
    
            const user = result.rows[0];
    
            if (password === user.password) {
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } catch (error) {
            console.error('Error al consultar la base de datos', error);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };
    
    const registerProdutcs = (req, res) => {
        const { nombre, precio, descripcion, tipo, imagen, marca, color, talla, stock } = req.body;
    
        if (!nombre || !precio || !descripcion || !tipo || !imagen || !marca || !color || !talla || !stock) {
            return res.status(400).json({ error: 'Falta información requerida' });
        }
    
        pool.query('SELECT * FROM productos WHERE nombre = $1', [nombre], (error, result) => {
            if (error) {
                console.error('Error al consultar la base de datos', error);
                return res.status(500).json({ error: 'Error al registrar el Producto', error });
            }
    
            if (result.rows.length > 0) {
                return res.status(409).json({ error: 'El Producto ya existe' });
            }
    
            pool.query(
                'INSERT INTO productos (nombre, precio, descripcion, tipo, imagen, marca, color, talla, stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [nombre, precio, descripcion, tipo, imagen, marca, color, talla, stock],
                (error) => {
                    if (error) {
                        console.error('Error al insertar el producto en la base de datos', error);
                        return res.status(500).json({ error: 'Error al registrar el producto' });
                    }
                    res.status(201).json({ message: 'Producto registrado exitosamente' });
                }
            );
        });
    };
    

    // const detalles = async(req, res) =>{

    //     const id = parseInt(req.params.id);

    //     const traer = await pool.query('SELECT * FROM productos WHERE idproducto = $1', [id]);

    //     if(traer){
            
    //         res.status(200).json(JSON.stringify(traer.rows[0]))
    //     }else{
    //         res.status(404).json({ error: 'Product not found'})
    //     }
    // }
   
    const getProductById = (req, res) => {
        const idproducto = req.params.idproducto;
      
        
        pool.query('SELECT * FROM productos WHERE idproducto = $1', [idproducto], (error, result) => {
          if (error) {
            console.error('Error al obtener el producto', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
          } else {
            if (result.rows.length === 1) {
              const producto = result.rows[0];
              res.status(200).json(producto); 
            } else {
              res.status(404).json({ error: 'Producto no encontrado' });
            }
          }
        });
      };
      
      const formularioEnvio = (req, res) => {
        const {departamento, ciudad, direccion, telefono, descripcion} = req.body;

        if(!departamento || !ciudad || !direccion || !telefono || !descripcion){
            return res.status(400).json({ error: 'Falta informacion requerida' });
        }

        pool.query('INSERT INTO "formulario_Envio" (departamento, ciudad, direccion, telefono, descripcion) values ($1, $2, $3, $4, $5)', [departamento, ciudad, direccion, telefono, descripcion], (error) => {
            if(error){
                console.error('Error al llenar el formulario', error)
                return res.status(500).json({error: 'Error al llenar formulario'})
            }
            res.status(201).json({message: 'Formulario de envio, enviado'})
        });
    }

    const compra = (req, res) => {
        const {productos, cantidadProductos, total, date, cliente, cantidad} = req.body;

        // if(!productos || !cantidadProductos || !total || !fecha){
        //     return res.status(400).json({ error: 'Falta informacion requerida' });
        // }

        pool.query('INSERT INTO public."Venta" (productos, "cantidaProductos", total, date, cliente, cantidad) values ($1, $2, $3, $4, $5, $6)', [productos, cantidadProductos, total, date, cliente, cantidad], (error) => {
            if(error){
                console.error('Error al comprar', error)
                return res.status(500).json({error: 'Error al comprar'})
            }
            res.status(201).json({message: 'Compra realizada'})
        });
    }

    const ventasBike = (req, res)=> {
        pool.query('SELECT * FROM "Venta"', (error, result) => {
            if (error){
                console.error('Error al obtener los datos', error);
                res.status(500).send('Error al obtener los datos');
            } else {
                res.json(result.rows);
            }
            });
        };

    const updateStock = (req, res) => {
        const {newStock, idproducto} = req.body;

        pool.query('UPDATE productos SET stock = $1 WHERE idproducto = $2', [newStock, idproducto], (error) => {
            if(error){
                console.log("error al actualizar el stock");
                res.status(500).send("error al actualizar el stock")
            } else {
                res.status(201).json({message: 'stock actualizado'})
            }
        } );
    };
   
      
    
   


  
  module.exports = {
    registerInstructor,
    getProducts,
    usuarios,
    loginUser,
    registerProdutcs,
    getProductById,
    formularioEnvio,
    compra,
    ventasBike,
    updateStock
  };
  
    