import {Router} from 'express';
import { createNotificacion, getNotificacion, getNotificacionById, updateNotificacion } from '../../controllers/trazabilidad/controller.notificacion.js';

const routerNotificacion = Router();
routerNotificacion.post('/notificacion',createNotificacion)
routerNotificacion.get('/notificacion',getNotificacion)
routerNotificacion.get('/notificacion/:id_notificacion',getNotificacionById)
routerNotificacion.post('/notificacion/:id_notificacion',updateNotificacion)

export default routerNotificacion;