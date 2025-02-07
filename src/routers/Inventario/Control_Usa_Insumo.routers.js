import { Router} from 'express';
import { getControlUsaInsumo, addControlUsaInsumo, IdControlUsaInsumo, actualizarControlUsaInsumo } from '../../controllers/inventario/Control_Usa_Insumo.controllers.js';
const routerControl_Usa_Insumo = Router();

// Definir las rutas
routerControl_Usa_Insumo.get('/Control_Usa_Insumo', getControlUsaInsumo);
routerControl_Usa_Insumo.post('/Control_Usa_Insumo', addControlUsaInsumo);
routerControl_Usa_Insumo.get("/Control_Usa_Insumo/:Control_Usa_Insumo", IdControlUsaInsumo);
routerControl_Usa_Insumo.put("/Control_Usa_Insumo/:id_control_usa_insumo", actualizarControlUsaInsumo);

export default routerControl_Usa_Insumo;