
import {Router} from 'express';
import { getUtiliza, addUtiliza, IdUtiliza, actualizarUtiliza  } from '../../controllers/inventario/Utiliza.controllers.js';


const routerUtiliza = Router();
routerUtiliza.get('/utiliza', getUtiliza);
routerUtiliza.post('/utiliza', addUtiliza);
routerUtiliza.get("/utiliza/:id_utiliza", IdUtiliza);
routerUtiliza.put("/utiliza/:id_utiliza", actualizarUtiliza);

export default routerUtiliza;
