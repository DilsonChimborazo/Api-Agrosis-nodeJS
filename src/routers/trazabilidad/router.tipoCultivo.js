import {Router} from 'express';
import { createTipoCultivo, getTipoCultivo, getTipoCultivoById, updateTipoCultivo } from '../../controllers/trazabilidad/controller.tipoCultivo.js';

const routerTipoCultivo = Router();
routerTipoCultivo.post('/tipo_cultivo',createTipoCultivo)
routerTipoCultivo.get('/tipo_cultivo',getTipoCultivo)
routerTipoCultivo.get('/tipo_cultivo/:id_tipo_cultivo',getTipoCultivoById)
routerTipoCultivo.post('/tipo_cultivo/:id_tipo_cultivo',updateTipoCultivo)

export default routerTipoCultivo;