import { Router } from "express";
import { validarUsuario } from "../../controllers/usuarios/controllers.autenticacion.js";

const router = Router();

router.post('/login',validarUsuario);

export default router;