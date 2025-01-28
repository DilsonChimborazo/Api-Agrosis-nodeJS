import {Router} from 'express';
import { createEspecie, getEspecieById, getEspecie, updateEspecie } from '../../controllers/trazabilidad/controller.especie';

const routerEspecie = Router();
routerEspecie.post('/especie',createEspecie)
routerEspecie.get('/especie',getEspecieById)
routerEspecie.get('/especie/:id_especie',getEspecie)
routerEspecie.post('/especie/:id_especie',updateEspecie)

export default routerEspecie;