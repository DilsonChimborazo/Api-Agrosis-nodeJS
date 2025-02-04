import { Router } from 'express';
import { createGenera, getGeneras, getGeneraById, updateGenera } from '../../controllers/finanzas/controller.genera.js';

const routerGenera = Router();

routerGenera.post('/genera', createGenera); 
routerGenera.get('/genera', getGeneras); 
routerGenera.get('/genera/:id_genera', getGeneraById); 
routerGenera.post('/genera/:id_genera', updateGenera); 

export default routerGenera;