import {Router} from 'express';
import { createUbicacion, getUbicacionById, getUbicaciones, updateUbicacion } from '../../controllers/iot/controller.ubicacion.js';

const routerUbicacion = Router();
routerUbicacion.post('/ubicacion',createUbicacion );
routerUbicacion.get('/ubicacion',getUbicaciones);
routerUbicacion.get('/ubicacion/:id_ubicacion',getUbicacionById);
routerUbicacion.post('/ubicacion/:id_ubicacion',updateUbicacion);

export default routerUbicacion;