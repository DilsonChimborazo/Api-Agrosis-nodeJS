import { configuracionBD } from "../../config/conexion.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'; 

export const validarUsuario = async (req, resp) => {
    try {
        const { login, password } = req.body;
        const sql = `SELECT identificacion, nombre, contrasena, email, fk_id_rol FROM usuarios WHERE identificacion = $1`;
        const result = await configuracionBD.query(sql, [login]);
        const rows = result.rows;

        if (rows.length > 0) {
            const passwordValida = await bcrypt.compare(password, rows[0].contrasena);
            if (!passwordValida) {
                throw new Error('Contraseña incorrecta');
            }

            let token = jwt.sign(
                { user: rows[0] },
                process.env.AUTH_SECRET,
                { expiresIn: process.env.AUTH_EXPIRES }
            );
            return resp.status(200).json({ msg: 'Usuario autorizado', token });
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ msg: error.message });
    }
};



export const validarToken = (req, resp, next) => {
    let token_usuario = req.headers['authorization']?.split(" ")[1];

    if (!token_usuario) {
        return resp.status(403).json({ msg: 'Token es requerido' });
    }

    jwt.verify(token_usuario, process.env.AUTH_SECRET, (error, decoded) => {
        if (error) {
            return resp.status(403).json({ msg: 'El token no está autorizado' });
        } else {
            req.user = decoded;
            next();
        }
    });
};