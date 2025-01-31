import { configuracionBD } from "../../config/conexion.js";
import jwt, { decode } from 'jsonwebtoken'

export const validarUsuario = async (req, resp)=>{
    try{
        const {login, password} = req.body;
        const sql = `SELECT identificacion, nombre, contrasena, email, fk_id_rol FROM usuarios WHERE identificacion = $1 and contrasena = $2 `;
        const result = await configuracionBD.query(sql,[login, password]);
        const rows = result.rows;
        if(rows.length>0){
            let token = jwt.sign({user:rows[0]}, process.env.AUTH_SECRET,{expiresIn:process.env.AUTH_EXPIRES});
            return resp.status(200).json({msg:'Usuario autorizado',result,token})
        }else{
            return resp.status(404).json({msg:'Usuario no autorizado'});
        }
    } catch(error){
        console.log(error)
        resp.status(500).json({msg:'Error al autorizar'});
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