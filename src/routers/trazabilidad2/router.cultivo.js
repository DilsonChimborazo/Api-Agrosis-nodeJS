import { Router } from "express";
import { postCultivo,IdCultivo,actualizarCultivo,getCultivo } from "../controllers/trazabilidad2/controller.cultivo.js";


const routerCultivo = Router();
routerCultivo.post("/cultivo", postCultivo);
routerCultivo.get("/cultivo/:id_cultivo", IdCultivo);
routerCultivo.put("/cultivo/:id_cultivo",actualizarCultivo);
routerCultivo.get("/cultivo", getCultivo);
export default routerCultivo;