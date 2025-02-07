import { Router} from 'express';
import { getHerramientas, addHerramientas, IdHerramientas, actualizarHerramientas } from '../../controllers/inventario/Herramientas.controllers.js';
const routerHerramientas = Router();

// Definir las rutas
routerHerramientas.get('herraminetas', getHerramientas);
routerHerramientas.post('herramientas', addHerramientas);
routerHerramientas.get("/herramientas /:id_herramienta", IdHerramientas);
routerHerramientas.put("/herramientas /:id_herramienta", actualizarHerramientas);

export default routerHerramientas;