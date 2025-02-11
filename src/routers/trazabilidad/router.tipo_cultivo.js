import { Router } from "express";
import { postTipoCultivo, IdTipoCultivo, actualizarTipoCultivo, getTipoCultivo } from "../../controllers/trazabilidad/controller.tipoCultivo.js";


const routerTipoCultivo = Router();

routerTipoCultivo.post("/tipocultivo", postTipoCultivo);
routerTipoCultivo.get("/tipocultivo/:id_tipo_cultivo", IdTipoCultivo);  
routerTipoCultivo.put("/tipocultivo/:id_tipo_cultivo", actualizarTipoCultivo);
routerTipoCultivo.get("/tipocultivo", getTipoCultivo);

export default routerTipoCultivo;
