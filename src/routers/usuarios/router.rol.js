import { Router } from "express";
import { createRol, getRol, getRolById, updateRol } from "../../controllers/usuarios/controllers.rol.js";

const routerRol = Router ();
routerRol.post('/rol',createRol)
routerRol.get('/rol',getRol)
routerRol.get('/rol/:id_rol',getRolById)
routerRol.put('/rol/:id_rol',updateRol) 

export default routerRol;

