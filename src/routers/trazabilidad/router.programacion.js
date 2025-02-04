import {Router} from 'express';
import { createProgramacion, getProgramacion, getProgramacionById, updateProgramacion } from '../../controllers/trazabilidad/controller.programacion.js';

const routerProgramacion = Router();
routerProgramacion.post('/programacion',createProgramacion)
routerProgramacion.get('/programacion',getProgramacion)
routerProgramacion.get('/programacion/:id_programacion',getProgramacionById)
routerProgramacion.post('/programacion/:id_programacion',updateProgramacion)

export default routerProgramacion;