import { Router } from 'express';
import { getInsumo, addInsumo, IdInsumo, actualizarInsumo } from '../../controllers/inventario/Insumo.controllers.js';
const routerInsumo = Router();

// Definir las rutas
routerInsumo.get('/insumo', getInsumo);
routerInsumo.post('/insumo', addInsumo);
routerInsumo.get("/insumo /:id_insumo", IdInsumo);
routerInsumo.put("/iniumo /:id_insumo", actualizarInsumo);

export default routerInsumo;
