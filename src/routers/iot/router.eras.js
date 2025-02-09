import {Router} from 'express';
import { createEras, getEraById, getEras, updateEra } from '../../controllers/iot/controller.eras.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerEras = Router();
routerEras.post('/eras',validarToken, createEras)
routerEras.get('/eras',validarToken, getEras)
routerEras.get('/eras/:id_eras',validarToken, getEraById)
routerEras.put('/eras/:id_eras',validarToken, updateEra)

export default routerEras;