import { configuracionBD } from "../../config/conexion.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUsuarios = async (req, res) => {
    try {
        const { identificacion, nombre, contrasena, email, fk_id_rol } = req.body;

        const checkUsers = await configuracionBD.query(`SELECT COUNT(*) FROM usuarios`);
        const hayUsuarios = parseInt(checkUsers.rows[0].count) > 0;

        if (hayUsuarios) {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ msg: "Acceso no autorizado" });
            }

            const decoded = jwt.verify(token, process.env.AUTH_SECRET);
            if (decoded.rol !== 1) {
                return res.status(403).json({ msg: "No tienes permisos para crear usuarios" });
            }
        } else {
            // Si no hay usuarios, solo se permite crear uno con rol de administrador
            if (fk_id_rol !== 1) {
                return res.status(403).json({ msg: "El primer usuario debe ser un administrador" });
            }
        }

        const hashedContrasena = await bcrypt.hash(contrasena, 10);
        const sql = `INSERT INTO usuarios (identificacion, nombre, contrasena, email, fk_id_rol)
                     VALUES ($1, $2, $3, $4, $5)`;
        const values = [identificacion, nombre, hashedContrasena, email, fk_id_rol];

        const result = await configuracionBD.query(sql, values);

        if (result.rowCount > 0) {
            res.status(201).json({ msg: "Usuario registrado con éxito" });
        } else {
            res.status(400).json({ msg: "Error al registrar usuario" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
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
            identificacion: usuarios.identificacion,
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
        const sql = `SELECT usuarios.identificacion, usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol, 
        rol.id_rol, rol.nombre_rol, rol.fecha_creacion 
    FROM rol
    JOIN usuarios on usuarios.fk_id_rol = rol.id_rol WHERE identificacion = $1`;
    const result = await configuracionBD.query(sql, [identificacion]);
    if(result.rows.length > 0){
        const usuarios = result.rows.map(usuarios =>({
            identificacion: usuarios.identificacion,
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

export const updateUsuarios = async (req, res) => {
    try {
        const { nombre, contrasena, email, fk_id_rol } = req.body;
        const { identificacion } = req.params;

        const fields = [];
        const values = [];

        if (nombre !== undefined) {
            fields.push(`nombre = $${fields.length + 1}`);
            values.push(nombre);
        }

        if (contrasena !== undefined) {
            const hashed = await bcrypt.hash(contrasena, 10);
            fields.push(`contrasena = $${fields.length + 1}`);
            values.push(hashed);
        }

        if (email !== undefined) {
            fields.push(`email = $${fields.length + 1}`);
            values.push(email);
        }

        if (fk_id_rol !== undefined) {
            fields.push(`fk_id_rol = $${fields.length + 1}`);
            values.push(fk_id_rol);
        }

        if (fields.length === 0) {
            return res.status(400).json({ msg: 'No se proporcionaron campos para actualizar' });
        }

        values.push(identificacion); // WHERE identificacion = $n

        const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE identificacion = $${values.length}`;
        const result = await configuracionBD.query(sql, values);

        if (result.rowCount > 0) {
            res.status(200).json({ msg: "Usuario actualizado correctamente" });
        } else {
            res.status(400).json({ msg: 'Error al actualizar usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};  



export const getReporteUsuarios = async (req, res) => {
    try {
        const sql = `
            SELECT COUNT(identificacion) AS total_usuarios
            FROM usuarios;
        `;

        const result = await configuracionBD.query(sql);

        res.status(200).json({ reporte: result.rows[0] });
    } catch (error) {
        console.error('Error en getReporteUsuarios:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
