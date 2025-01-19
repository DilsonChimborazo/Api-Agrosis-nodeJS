import {Router} from 'express'
import { createSensores, getSensorById, getSensores, updateSensor } from '../../controllers/iot/controller.sensores.js';


const routerSensores = Router();
routerSensores.post('/sensores',createSensores);
routerSensores.get('/sensores',getSensores);
routerSensores.post('/sensores/:id_sensor',updateSensor);
routerSensores.get('/sensores/:id_sensor',getSensorById)

export default routerSensores;

