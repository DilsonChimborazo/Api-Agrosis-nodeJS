import { Router } from "express";
import { postResiduos, getResiduos, IdResiduos, actualizarResiduos,  } from "../controller/controller.residuos.js";
const routerResiduos = Router();

routerResiduos.post("/residuos", postResiduos);
routerResiduos.get("/residuos", getResiduos);
routerResiduos.get("/residuos/:id_residuo", IdResiduos);
routerResiduos.put("/residuos/:id_residuo", actualizarResiduos)

export default routerResiduos;