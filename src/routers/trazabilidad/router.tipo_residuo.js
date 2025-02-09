import { Router } from "express";
import { actualizarTipoResiduo, getTipoResiduo, IdTipoCultivo, postTipoResiduo } from "../../controllers/trazabilidad/controller.tipo_residuo.js";
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerTipoResiduo = Router();

routerTipoResiduo.post("/tiporesiduo",validarToken,postTipoResiduo );
routerTipoResiduo.get("/tiporesiduo/:id_tipo_residuo",validarToken,getTipoResiduo);  
routerTipoResiduo.put("/tiporesiduo/:id_tipo_residuo",validarToken,actualizarTipoResiduo );
routerTipoResiduo.get("/tiporesiduo",validarToken,IdTipoCultivo);

export default routerTipoResiduo;
