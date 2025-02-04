import { Router } from 'express';
import { createVenta, getVentas, getVentaById, updateVenta } from '../../controllers/finanzas/controller.venta.js';

const routerVenta = Router();

routerVenta.post('/venta', createVenta);
routerVenta.get('/venta', getVentas);
routerVenta.get('/venta/:id_venta', getVentaById); 
routerVenta.post('/venta/:id_venta', updateVenta); 

export default routerVenta;