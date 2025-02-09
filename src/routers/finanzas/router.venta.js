import { Router } from 'express';
import { createVenta, getVentas, getVentaById, updateVenta } from '../../controllers/finanzas/controller.venta.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerVenta = Router();

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Endpoints para la gestion la tabla Ventas
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /venta:
 *   post:
 *     summary: Registra una nueva venta en el sistema
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_produccion:
 *                 type: integer
 *                 description: ID de la producción asociada a la venta
 *                 example: 1
 *               cantidad:
 *                 type: number
 *                 description: Cantidad vendida
 *                 example: 50.5
 *               precio_unitario:
 *                 type: number
 *                 description: Precio unitario del producto vendido
 *                 example: 3.75
 *               fecha_venta:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se realizó la venta
 *                 example: "2024-02-07"
 *     responses:
 *       200:
 *         description: Venta registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Venta registrada con éxito"
 *       400:
 *         description: Error en los datos enviados o en el registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la venta"
 *       401:
 *         description: Token es requerido, el token no esta autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no esta autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerVenta.post('/venta',validarToken, createVenta);

/**
 * @swagger
 * /venta:
 *   get:
 *     summary: Obtiene todas las ventas registradas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ventas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_venta:
 *                         type: integer
 *                         description: ID de la venta
 *                         example: 1
 *                       fk_id_produccion:
 *                         type: object
 *                         properties:
 *                           id_produccion:
 *                             type: integer
 *                             description: ID de la producción asociada
 *                             example: 10
 *                           fk_id_cultivo:
 *                             type: object
 *                             properties:
 *                               id_cultivo:
 *                                 type: integer
 *                                 description: ID del cultivo asociado
 *                                 example: 5
 *                               fecha_plantacion:
 *                                 type: string
 *                                 format: date
 *                                 description: Fecha de plantación del cultivo
 *                                 example: "2024-01-15"
 *                               nombre_cultivo:
 *                                 type: string
 *                                 description: Nombre del cultivo
 *                                 example: "Tomate Cherry"
 *                               descripcion:
 *                                 type: string
 *                                 description: Descripción del cultivo
 *                                 example: "Cultivo en invernadero"
 *                               fk_id_especie:
 *                                 type: object
 *                                 properties:
 *                                   id_especie:
 *                                     type: integer
 *                                     description: ID de la especie
 *                                     example: 2
 *                                   nombre_comun:
 *                                     type: string
 *                                     description: Nombre común de la especie
 *                                     example: "Tomate"
 *                                   nombre_cientifico:
 *                                     type: string
 *                                     description: Nombre científico de la especie
 *                                     example: "Solanum lycopersicum"
 *                                   descripcion:
 *                                     type: string
 *                                     description: Descripción de la especie
 *                                     example: "Planta herbácea anual"
 *                                   fk_id_tipo_cultivo:
 *                                     type: object
 *                                     properties:
 *                                       id_tipo_cultivo:
 *                                         type: integer
 *                                         description: ID del tipo de cultivo
 *                                         example: 1
 *                                       nombre:
 *                                         type: string
 *                                         description: Nombre del tipo de cultivo
 *                                         example: "Hortalizas"
 *                                       descripcion:
 *                                         type: string
 *                                         description: Descripción del tipo de cultivo
 *                                         example: "Cultivo de hortalizas en suelos fértiles"
 *                           cantidad_producida:
 *                             type: number
 *                             description: Cantidad de producción obtenida
 *                             example: 2000.5
 *                           fecha_produccion:
 *                             type: string
 *                             format: date
 *                             description: Fecha de producción
 *                             example: "2024-02-07"
 *                           fk_id_lote:
 *                             type: object
 *                             properties:
 *                               id_lote:
 *                                 type: integer
 *                                 description: ID del lote
 *                                 example: 3
 *                               dimension:
 *                                 type: string
 *                                 description: Dimensión del lote
 *                                 example: "50m x 30m"
 *                               nombre_lote:
 *                                 type: string
 *                                 description: Nombre del lote
 *                                 example: "Lote A"
 *                               fk_id_ubicacion:
 *                                 type: object
 *                                 properties:
 *                                   id_ubicacion:
 *                                     type: integer
 *                                     description: ID de la ubicación
 *                                     example: 5
 *                                   latitud:
 *                                     type: number
 *                                     description: Latitud de la ubicación
 *                                     example: -2.12345
 *                                   longitud:
 *                                     type: number
 *                                     description: Longitud de la ubicación
 *                                     example: -78.98765
 *                       cantidad:
 *                         type: number
 *                         description: Cantidad de productos vendidos
 *                         example: 500
 *                       precio_unitario:
 *                         type: number
 *                         description: Precio unitario del producto vendido
 *                         example: 2.5
 *                       total_venta:
 *                         type: number
 *                         description: Total de la venta calculado
 *                         example: 1250
 *                       fecha_venta:
 *                         type: string
 *                         format: date
 *                         description: Fecha en la que se realizó la venta
 *                         example: "2024-03-10"
 *       401:
 *         description: Token es requerido, el token no esta autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no esta autorizado"
 *       404:
 *         description: No se encontraron ventas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay ventas registradas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerVenta.get('/venta',validarToken, getVentas);

/**
 * @swagger
 * /venta/[id_venta]:
 *   get:
 *     summary: Obtiene las ventas registradas por ID
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ventas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_venta:
 *                         type: integer
 *                         description: ID de la venta
 *                         example: 1
 *                       fk_id_produccion:
 *                         type: object
 *                         properties:
 *                           id_produccion:
 *                             type: integer
 *                             description: ID de la producción asociada
 *                             example: 10
 *                           fk_id_cultivo:
 *                             type: object
 *                             properties:
 *                               id_cultivo:
 *                                 type: integer
 *                                 description: ID del cultivo asociado
 *                                 example: 5
 *                               fecha_plantacion:
 *                                 type: string
 *                                 format: date
 *                                 description: Fecha de plantación del cultivo
 *                                 example: "2024-01-15"
 *                               nombre_cultivo:
 *                                 type: string
 *                                 description: Nombre del cultivo
 *                                 example: "Tomate Cherry"
 *                               descripcion:
 *                                 type: string
 *                                 description: Descripción del cultivo
 *                                 example: "Cultivo en invernadero"
 *                               fk_id_especie:
 *                                 type: object
 *                                 properties:
 *                                   id_especie:
 *                                     type: integer
 *                                     description: ID de la especie
 *                                     example: 2
 *                                   nombre_comun:
 *                                     type: string
 *                                     description: Nombre común de la especie
 *                                     example: "Tomate"
 *                                   nombre_cientifico:
 *                                     type: string
 *                                     description: Nombre científico de la especie
 *                                     example: "Solanum lycopersicum"
 *                                   descripcion:
 *                                     type: string
 *                                     description: Descripción de la especie
 *                                     example: "Planta herbácea anual"
 *                                   fk_id_tipo_cultivo:
 *                                     type: object
 *                                     properties:
 *                                       id_tipo_cultivo:
 *                                         type: integer
 *                                         description: ID del tipo de cultivo
 *                                         example: 1
 *                                       nombre:
 *                                         type: string
 *                                         description: Nombre del tipo de cultivo
 *                                         example: "Hortalizas"
 *                                       descripcion:
 *                                         type: string
 *                                         description: Descripción del tipo de cultivo
 *                                         example: "Cultivo de hortalizas en suelos fértiles"
 *                           cantidad_producida:
 *                             type: number
 *                             description: Cantidad de producción obtenida
 *                             example: 2000.5
 *                           fecha_produccion:
 *                             type: string
 *                             format: date
 *                             description: Fecha de producción
 *                             example: "2024-02-07"
 *                           fk_id_lote:
 *                             type: object
 *                             properties:
 *                               id_lote:
 *                                 type: integer
 *                                 description: ID del lote
 *                                 example: 3
 *                               dimension:
 *                                 type: string
 *                                 description: Dimensión del lote
 *                                 example: "50m x 30m"
 *                               nombre_lote:
 *                                 type: string
 *                                 description: Nombre del lote
 *                                 example: "Lote A"
 *                               fk_id_ubicacion:
 *                                 type: object
 *                                 properties:
 *                                   id_ubicacion:
 *                                     type: integer
 *                                     description: ID de la ubicación
 *                                     example: 5
 *                                   latitud:
 *                                     type: number
 *                                     description: Latitud de la ubicación
 *                                     example: -2.12345
 *                                   longitud:
 *                                     type: number
 *                                     description: Longitud de la ubicación
 *                                     example: -78.98765
 *                       cantidad:
 *                         type: number
 *                         description: Cantidad de productos vendidos
 *                         example: 500
 *                       precio_unitario:
 *                         type: number
 *                         description: Precio unitario del producto vendido
 *                         example: 2.5
 *                       total_venta:
 *                         type: number
 *                         description: Total de la venta calculado
 *                         example: 1250
 *                       fecha_venta:
 *                         type: string
 *                         format: date
 *                         description: Fecha en la que se realizó la venta
 *                         example: "2024-03-10"
 *       401:
 *         description: Token es requerido, el token no esta autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no esta autorizado"
 *       404:
 *         description: No se encontraron ventas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay ventas registradas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerVenta.get('/venta/:id_venta',validarToken, getVentaById); 

/**
 * @swagger
 * /venta/[id_venta]:
 *   put:
 *     summary: Actualiza las ventas registradas por ID
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_produccion:
 *                 type: integer
 *                 description: ID de la producción asociada a la venta
 *                 example: 1
 *               cantidad:
 *                 type: number
 *                 description: Cantidad vendida
 *                 example: 50.5
 *               precio_unitario:
 *                 type: number
 *                 description: Precio unitario del producto vendido
 *                 example: 3.75
 *               fecha_venta:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se realizó la venta
 *                 example: "2024-02-07"
 *     responses:
 *       200:
 *         description: Venta registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Venta registrada con éxito"
 *       400:
 *         description: Error en los datos enviados o en el registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la venta"
 *       401:
 *         description: Token es requerido, el token no esta autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no esta autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerVenta.put('/venta/:id_venta',validarToken, updateVenta); 

export default routerVenta;