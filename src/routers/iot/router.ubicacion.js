import {Router} from 'express';
import { createUbicacion, getUbicacionById, getUbicaciones, updateUbicacion } from '../../controllers/iot/controller.ubicacion.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerUbicacion = Router();
routerUbicacion.post('/ubicacion',validarToken, createUbicacion );
routerUbicacion.get('/ubicacion',validarToken, getUbicaciones);
routerUbicacion.get('/ubicacion/:id_ubicacion',validarToken, getUbicacionById);
routerUbicacion.post('/ubicacion/:id_ubicacion',validarToken, updateUbicacion);

export default routerUbicacion;