import { configuracionBD } from "../../config/conexion.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Valores por defecto si las variables de entorno no están definidas
const AUTH_SECRET = process.env.AUTH_SECRET || "clave_secreta_super_segura";
const AUTH_EXPIRES = process.env.AUTH_EXPIRES || "1h"; // Expira en 1 hora

export const validarUsuario = async (req, resp) => {
    try {
        console.log("Cuerpo de la petición:", req.body);

        const { login, contrasena } = req.body;
        if (!contrasena) {
            return resp.status(400).json({ msg: "Contraseña no proporcionada" });
        }
        const sql = `
            SELECT u.identificacion, u.nombre, u.contrasena, u.email, u.fk_id_rol,
                   r.nombre_rol
            FROM usuarios u
            JOIN rol r ON u.fk_id_rol = r.id_rol
            WHERE u.identificacion = $1
        `;
        const result = await configuracionBD.query(sql, [login]);

        if (result.rows.length === 0) {
            return resp.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const usuario = result.rows[0];
        console.log("Contraseña ingresada:", contrasena);
        console.log("Contraseña en la BD:", usuario.contrasena);

        if (!usuario.contrasena || typeof usuario.contrasena !== "string") {
            return resp.status(500).json({ msg: "Error: La contraseña almacenada es inválida" });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!contrasenaValida) {
            return resp.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { identificacion: usuario.identificacion, nombre: usuario.nombre, rol: usuario.fk_id_rol },
            AUTH_SECRET,
            { expiresIn: AUTH_EXPIRES }
        );

        return resp.status(200).json({ msg: 'Usuario autorizado', 
            access: token,
            usuario: {
                identificacion: usuario.identificacion,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: {
                    id: usuario.fk_id_rol,
                    nombre: usuario.nombre_rol
                }
  } });
    } catch (error) {
        console.error("Error en validarUsuario:", error);
        resp.status(500).json({ msg: "Error en el servidor" });
    }
};


export const validarToken = (req, resp, next) => {
    try {
        const token_usuario = req.headers['authorization']?.split(" ")[1];

        if (!token_usuario) {
            return resp.status(403).json({ msg: 'Token es requerido' });
        }

        jwt.verify(token_usuario, AUTH_SECRET, (error, decoded) => {
            if (error) {
                console.error(error);
                return resp.status(403).json({ msg: 'El token ha expirado o no es válido' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ msg: "Error en la validación del token" });
    }
};
