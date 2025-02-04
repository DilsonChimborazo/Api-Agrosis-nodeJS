import { Router } from 'express';
import { createProduccion, getProducciones, getProduccionById, updateProduccion } from '../../controllers/finanzas/controller.produccion.js';

const routerProduccion = Router();

routerProduccion.post('/produccion', createProduccion);
routerProduccion.get('/produccion', getProducciones); 
routerProduccion.get('/produccion/:id_produccion', getProduccionById); 
routerProduccion.post('/produccion/:id_produccion', updateProduccion); 

export default routerProduccion;
