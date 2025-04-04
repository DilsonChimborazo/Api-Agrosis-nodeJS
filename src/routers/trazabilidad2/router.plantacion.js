import { Router } from "express";
import { postplantacion,IdPlantacion,actualizarPlantacion, getPlantacion } from "../controllers/trazabilidad2/controller.plantacion.js";

const routerPlantacion = Router();
routerPlantacion.post("/plantacion", postplantacion);
routerPlantacion.get("/plantacion/:id_plantacion", IdPlantacion);
routerPlantacion.put("/plantacion/:id_plantacion",actualizarPlantacion);
routerPlantacion.get("/plantacion", getPlantacion)
export default routerPlantacion;