import { configuracionBD } from "../../config/conexion.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 


export const validarUsuario = async (req, resp) => {
    try {
        const { login, password } = req.body;
        const sql = `SELECT identificacion, nombre, contrasena, email, fk_id_rol FROM usuarios WHERE identificacion = $1`;
        const result = await configuracionBD.query(sql, [login]);

        if (result.rows.length === 0) {
            return resp.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const usuario = result.rows[0];
        const passwordValida = await bcrypt.compare(password, usuario.contrasena);

        if (!passwordValida) {
            return resp.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { identificacion: usuario.identificacion, nombre: usuario.nombre, rol: usuario.fk_id_rol },
            process.env.AUTH_SECRET,
            { expiresIn: process.env.AUTH_EXPIRES }
        );

        return resp.status(200).json({ msg: 'Usuario autorizado', token });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ msg: "Error en el servidor" });
    }
};


export const validarToken = (req, resp, next) => {
    try {
        const token_usuario = req.headers['authorization']?.split(" ")[1];

        if (!token_usuario) {
            return resp.status(403).json({ msg: 'Token es requerido' });
        }

        jwt.verify(token_usuario, process.env.AUTH_SECRET, (error, decoded) => {
            if (error) {
                console.error(error);
                return resp.status(403).json({ msg: 'El token no está autorizado' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ msg: "Error en la validación del token" });
    }
};
