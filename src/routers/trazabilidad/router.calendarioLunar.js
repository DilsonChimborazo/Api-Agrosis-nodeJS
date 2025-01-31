import {Router} from 'express';
import { createCalendarioLunar, getCalendarioLunar, getCalendarioLunarById, updateCalendarioLunar } from '../../controllers/trazabilidad/controller.calendarioLunar.js';

const routercalendario_lunar = Router();
routercalendario_lunar.post('/calendario_lunar',createCalendarioLunar)
routercalendario_lunar.get('/calendario_lunar',getCalendarioLunar)
routercalendario_lunar.get('/calendario_lunar/:id_calendario_lunar',getCalendarioLunarById)
routercalendario_lunar.post('/calendario_lunar/:id_calendario_lunar',updateCalendarioLunar)

export default routercalendario_lunar;

