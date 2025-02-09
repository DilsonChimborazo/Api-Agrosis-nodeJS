import {Router} from 'express';
import { createLotes, getLoteById, getLotes, updateLote } from '../../controllers/iot/controller.lotes.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerLotes = Router();
routerLotes.post('/lotes',validarToken, createLotes);
routerLotes.get('/lotes',validarToken, getLotes);
routerLotes.get('/lotes/:id_lote',validarToken, getLoteById);
routerLotes.post('/lotes/:id_lote',validarToken, updateLote);

export default routerLotes;
