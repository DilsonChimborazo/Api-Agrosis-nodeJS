import { Router} from 'express';
import { getRequiere, addRequiere, IdRequiere, actualizarRequiere } from '../../controllers/inventario/Requiere.controllers.js';
const routerRequiere = Router();

// Definir las rutas
routerRequiere.get('/requiere', getRequiere);
routerRequiere.post('/requiere', addRequiere);
routerRequiere.get("/requiere/:id_requiere", IdRequiere);
routerRequiere.put("/requiere/:id_requiere", actualizarRequiere);

export default routerRequiere;
