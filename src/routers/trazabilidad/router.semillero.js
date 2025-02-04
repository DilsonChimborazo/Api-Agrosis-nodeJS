import {Router} from 'express';
import { createSemilleros, getSemilleros, getSemillerosById, updateSemilleros } from '../../controllers/trazabilidad/controller.semillero.js';

const routerSemillero = Router();
routerSemillero.post('/semilleros',createSemilleros)
routerSemillero.get('/semilleros',getSemilleros)
routerSemillero.get('/semilleros/:id_semilleros',getSemillerosById)
routerSemillero.post('/semilleros/:id_semilleros',updateSemilleros)

export default routerSemillero;  