import { Router } from "express";
import { postActividad, getActividad, IdActividad, actualizarActividad } from "../controllers/trazabilidad2/controller.actividad.js";
const routerActividad = Router();

routerActividad.post("/actividad", postActividad);
routerActividad.get("/actividad", getActividad);
routerActividad.get("/actividad/:id_actividad", IdActividad);
routerActividad.put("/actividad/:id_actividad", actualizarActividad);

export default routerActividad;