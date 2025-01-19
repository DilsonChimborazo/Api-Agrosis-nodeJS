import {Router} from 'express';
import { createLotes, getLoteById, getLotes, updateLote } from '../../controllers/iot/controller.lotes.js';

const routerLotes = Router();
routerLotes.post('/lotes', createLotes);
routerLotes.get('/lotes', getLotes);
routerLotes.get('/lotes/:id_lote',getLoteById);
routerLotes.post('/lotes/:id_lote',updateLote);

export default routerLotes;
