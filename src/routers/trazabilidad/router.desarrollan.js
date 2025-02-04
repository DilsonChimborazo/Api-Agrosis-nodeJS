import { Router} from "express";
import { postDesarrollan,getDesarrollan,actualizarDesarrollan,IdDesarrollan } from "../../controllers/trazabilidad/controller.desarrollan.js";

const routerDesarollan = Router();
routerDesarollan.post('/desarrollan',postDesarrollan);
routerDesarollan.get('/desarrollan',getDesarrollan);
routerDesarollan.put('/desarrollan/:id_desarrollan',actualizarDesarrollan);
routerDesarollan.get('/desarrollan/:id_desarrollan',IdDesarrollan);
export default routerDesarollan;