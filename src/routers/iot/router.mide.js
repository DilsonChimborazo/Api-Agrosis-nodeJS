import {Router} from 'express';
import { createMide, getMide, getMideById, updateMide } from '../../controllers/iot/controller.mide.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerMide = Router();
routerMide.post ('/mide',validarToken, createMide);
routerMide.get ('/mide',validarToken, getMide);
routerMide.get ('/mide/:id_mide',validarToken, getMideById);
routerMide.post ('/mide/:id_mide',validarToken, updateMide);

export default routerMide;