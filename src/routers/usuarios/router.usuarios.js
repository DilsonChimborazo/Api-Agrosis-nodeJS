import { Router } from "express";
import { createUsuarios, getUsuarios, getUsuariosById, updateUsuarios } from "../../controllers/usuarios/controllers.usuarios.js";



const routerUsuarios = Router();
routerUsuarios.post('/usuarios',createUsuarios)
routerUsuarios.get('/usuarios',getUsuarios)
routerUsuarios.get('/usuarios/:identificacion',getUsuariosById)
routerUsuarios.put('/usuarios/:identificacion',updateUsuarios)

export default routerUsuarios;
