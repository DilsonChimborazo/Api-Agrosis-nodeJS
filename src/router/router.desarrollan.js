import { Router} from "express";
import { postDesarrollan,getDesarrollan,actualizarDesarrollan,IdDesarrollan } from "../controller/controller.desarrollan.js";

const routerDesarollan = Router();
routerDesarollan.post('/desarrollan',postDesarrollan);
routerDesarollan.get('/desarrollan',getDesarrollan);
routerDesarollan.put('/desarrollan/:id',actualizarDesarrollan);
routerDesarollan.get('/desarrollan/:id',IdDesarrollan);
export default routerDesarollan;