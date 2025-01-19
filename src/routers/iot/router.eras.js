import {Router} from 'express';
import { createEras, getEraById, getEras, updateEra } from '../../controllers/iot/controller.eras.js';

const routerEras = Router();
routerEras.post('/eras',createEras)
routerEras.get('/eras',getEras)
routerEras.get('/eras/:id_eras',getEraById)
routerEras.post('/eras/:id_eras',updateEra)

export default routerEras;