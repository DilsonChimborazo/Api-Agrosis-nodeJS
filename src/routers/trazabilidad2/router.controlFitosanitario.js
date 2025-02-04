import { Router } from "express";
import { postControlFitosanitario, getControlFitosanitario, IdControlFitosanitario, actualizarControlFitosanitario } from "../controllers/trazabilidad2/controller.controlFitosanitario.js";
const RouterCF = Router();

RouterCF.post("/controlfitosanitario", postControlFitosanitario);
RouterCF.get("/controlfitosanitario", getControlFitosanitario);
RouterCF.get("/controlfitosanitario/:id_control_fitosanitario", IdControlFitosanitario);
RouterCF.put("/controlfitosanitario/:id_control_fitosanitario",actualizarControlFitosanitario)
export default RouterCF;