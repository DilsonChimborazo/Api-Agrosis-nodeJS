import {Router} from 'express';
import { createAsignacionActividad, getAsignacionActividadById, getAsignacionActividad, updateAsignacionActividad } from '../../controllers/trazabilidad/controller.asignacionActividad';

const routerasignacion_actividad = Router();
routerasignacion_actividad.post('/asignacion_actividad',createAsignacionActividad)
routerasignacion_actividad.get('/asignacion_actividad',getAsignacionActividad)
routerasignacion_actividad.get('/asignacion_actividad/:id_asignacion_actividad',getAsignacionActividadById)
routerasignacion_actividad.post('/asignacion_actividad/:id_asignacion_actividad',updateAsignacionActividad)

export default routerasignacion_actividad;