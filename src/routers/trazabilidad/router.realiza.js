import {Router} from 'express';
import { createRealiza, getRealiza, getRealizaById, updateRealiza } from '../../controllers/trazabilidad/controller.realiza.js';

const routerRealiza = Router();
routerRealiza.post('/realiza',createRealiza)
routerRealiza.get('/realiza',getRealiza)
routerRealiza.get('/realiza/:id_realiza',getRealizaById)
routerRealiza.post('/realiza/:id_realiza',updateRealiza)

export default routerRealiza;