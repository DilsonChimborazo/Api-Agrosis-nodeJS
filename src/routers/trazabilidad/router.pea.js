import { Router } from "express";
import { postPea, IdPea, actualizarPea, getPea } from "../controller/controller.pea.js";

const routerPea = Router();
routerPea.post("/pea", postPea);
routerPea.get("/pea/:id_pea", IdPea);
routerPea.put("/pea/:id_pea", actualizarPea);
routerPea.get("/pea", getPea);

export default routerPea;
