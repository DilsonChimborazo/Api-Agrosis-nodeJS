import { Router } from "express";
import { createUsuarios, getUsuarios, getUsuariosById, updateUsuarios } from "../../controllers/usuarios/controllers.usuarios.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";


const routerUsuarios = Router();
routerUsuarios.post('/usuarios',validarToken,createUsuarios)
routerUsuarios.get('/usuarios',validarToken,getUsuarios)
routerUsuarios.get('/usuarios/:identificacion',validarToken,getUsuariosById)
routerUsuarios.put('/usuarios/:identificacion',validarToken,updateUsuarios)

export default routerUsuarios;
