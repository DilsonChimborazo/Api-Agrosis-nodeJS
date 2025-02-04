import { Router } from "express";
import { createRol, getRol, getRolById, updateRol } from "../../controllers/usuarios/controllers.rol.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerRol = Router ();
routerRol.post('/rol',validarToken,createRol)
routerRol.get('/rol',validarToken,getRol)
routerRol.get('/rol/:id_rol',validarToken,getRolById)
routerRol.put('/rol/:id_rol',validarToken,updateRol) 

export default routerRol;

