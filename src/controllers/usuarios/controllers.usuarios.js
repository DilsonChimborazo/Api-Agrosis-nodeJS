import { configuracionBD } from "../../config/conexion.js";
import bycriptjs from 'bcryptjs';

export const createUsuarios = async (req, res) =>{
    try{
        const {identificacion, nombre, contrasena, email, fk_id_rol} = req.body;
        const hashedContrasena = await bycriptjs.hash(contrasena, 10)
        const sql = 'INSERT INTO usuarios (identificacion, nombre, contrasena, email, fk_id_rol) VALUES ($1, $2, $3, $4, $5)';
        const values = [identificacion, nombre, hashedContrasena, email, fk_id_rol];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Usuario registrado con exito'})
        }else{
            res.status(400).json({msg:'Error al registrar usuario'})
        }
    } catch(error){
        console.log(error)
        res.status(500).json({msg:'Error en el servidor'});
    }
};

export const getUsuarios = async (req, res) =>{
    try{
        const sql = `SELECT usuarios.identificacion, usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol, 
        rol.id_rol, rol.nombre_rol, rol.fecha_creacion 
    FROM rol
    JOIN usuarios on usuarios.fk_id_rol = rol.id_rol `;
    const result = await configuracionBD.query(sql);
    if(result.rows.length > 0){
        const usuarios = result.rows.map(usuarios =>({
            id: usuarios.identificacion,
            nombre: usuarios.nombre,
            contrasena: usuarios.contrasena,
            email: usuarios.email,
            fk_id_rol: {
                id: usuarios.id_rol,
                nombre_rol: usuarios.nombre_rol,
                fecha_creacion: usuarios.fecha_creacion
            }
  
        }));
        res.status(200).json({usuarios})
    }else{
        res.status(400).json({msg:'No hay usuarios registrados'})
    }
    } catch(error){
        console.log(error)
        res.status(500).json({msg:'Error en el servidor'})        
}   
};

export const getUsuariosById = async (req, res) =>{
    try{
        const {identificacion} = req.params;
        const sql = `SELECT usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol, 
        rol.id_rol, rol.nombre_rol, rol.fecha_creacion 
    FROM rol
    JOIN usuarios on usuarios.fk_id_rol = rol.id_rol WHERE identificacion = $1`;
    const result = await configuracionBD.query(sql, [identificacion]);
    if(result.rows.length > 0){
        const usuarios = result.rows.map(usuarios =>({
            id: usuarios.identificacion,
            nombre: usuarios.nombre,
            contrasena: usuarios.contrasena,
            email: usuarios.email,
            fk_id_rol: {
                id: usuarios.id_rol,
                nombre_rol: usuarios.nombre_rol,
                fecha_creacion: usuarios.fecha_creacion
            }
  
        }));
        res.status(200).json({usuarios})
    }else{
        res.status(400).json({msg:'No hay usuarios registrados'})
    }
    } catch(error){
        console.log(error)
        res.status(500).json({msg:'Error en el servidor'})        
}   
};

export const updateUsuarios = async (req, res)=>{
    try{
        const {nombre, contrasena, email, fk_id_rol} = req.body;
        const {identificacion} = req.params;
        let hashedContrasena;
        if (contrasena) {
            hashedContrasena = await bycriptjs.hash(contrasena, 10);
        }
        const sql = `UPDATE usuarios set nombre = $1 , contrasena = $2, email = $3, fk_id_rol = $4 where identificacion =$5`;
        const result = await configuracionBD.query(sql, [nombre, hashedContrasena, email, fk_id_rol, identificacion]);
        if(result.rowCount > 0){
            res.status(200).json(result)
        }else{
            res.status(400).json({msg:'Error al actualizar usuario'})
        }
    } catch(error){
            console.log(error)
            res.status(500).json({msg:'Error en el servidor'})        
    }   
};  