import {Router} from 'express';
import { createMide, getMide, getMideById, updateMide } from '../../controllers/iot/controller.mide.js';

const routerMide = Router();
routerMide.post ('/mide', createMide);
routerMide.get ('/mide', getMide);
routerMide.get ('/mide/:id_mide', getMideById);
routerMide.post ('/mide/:id_mide', updateMide);

export default routerMide;