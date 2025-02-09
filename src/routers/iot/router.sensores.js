import {Router} from 'express'
import { createSensores, getSensorById, getSensores, updateSensor } from '../../controllers/iot/controller.sensores.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';


const routerSensores = Router();
routerSensores.post('/sensores',validarToken, createSensores);
routerSensores.get('/sensores',validarToken, getSensores);
routerSensores.post('/sensores/:id_sensor',validarToken, updateSensor);
routerSensores.get('/sensores/:id_sensor',validarToken, getSensorById)

export default routerSensores;

