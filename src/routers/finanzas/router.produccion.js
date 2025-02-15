import { Router } from 'express';
import { createProduccion, getProducciones, getReporteProduccion, getProduccionById, updateProduccion } from '../../controllers/finanzas/controller.produccion.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerProduccion = Router();

routerProduccion.get('/produccion/reporte', validarToken, getReporteProduccion);

/**
 * @swagger
 * tags:
 *   name: Producción
 *   description: Endpoints para la gestion la tabla Producción
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
 * /produccion:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla producción con validación de token JWT
 *     tags: [Producción]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad_producida:
 *                 type: number
 *                 description: Cantidad producida en la cosecha
 *                 example: 1500.5
 *               fecha_produccion:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se registró la producción
 *                 example: "2024-02-07"
 *               fk_id_lote:
 *                 type: integer
 *                 description: Llave foránea que viene desde lote
 *                 example: 3
 *               descripcion_produccion:
 *                 type: string
 *                 description: Descripción de la producción
 *                 example: "Cosecha de tomates en invernadero"
 *               estado:
 *                 type: string
 *                 description: "Estado de la producción (ejemplo: 'En proceso', 'Finalizado')"
 *                 example: "Finalizado"
 *               fecha_cosecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada o real de cosecha
 *                 example: "2024-03-01"
 *     responses:
 *       200:
 *         description: Registro de producción exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producción registrada con éxito"
 *       400:
 *         description: Error al registrar la producción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la producción"
 *       401:
 *         description: Token requerido o no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
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
routerProduccion.post('/produccion',validarToken, createProduccion);
/**
 * @swagger
 * /produccion:
 *   get:
 *     summary: Obtiene todas las producciones registradas
 *     tags: [Producción]
 *     responses:
 *       200:
 *         description: Lista de producciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 producciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la producción
 *                         example: 1
 *                       cantidad_producida:
 *                         type: number
 *                         description: Cantidad de producción obtenida
 *                         example: 2000.5
 *                       fecha_produccion:
 *                         type: string
 *                         format: date
 *                         description: Fecha de producción
 *                         example: "2024-02-07"
 *                       fk_id_lote:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del lote
 *                             example: 3
 *                           dimension:
 *                             type: string
 *                             description: Dimensión del lote
 *                             example: "50m x 30m"
 *                           nombre_lote:
 *                             type: string
 *                             description: Nombre del lote
 *                             example: "Lote A"
 *                           fk_id_ubicacion:
 *                             type: object
 *                             properties:
 *                               id_ubicacion:
 *                                 type: integer
 *                                 description: ID de la ubicación
 *                                 example: 5
 *                               latitud:
 *                                 type: number
 *                                 description: Latitud de la ubicación
 *                                 example: -2.12345
 *                               longitud:
 *                                 type: number
 *                                 description: Longitud de la ubicación
 *                                 example: -78.98765
 *                           estado:
 *                             type: string
 *                             description: Estado del lote
 *                             example: "Activo"
 *                       descripcion_produccion:
 *                         type: string
 *                         description: Descripción de la producción
 *                         example: "Producción de tomates de alta calidad"
 *                       estado:
 *                         type: string
 *                         description: "Estado de la producción (ejemplo: 'En proceso', 'Finalizado')"
 *                         example: "Finalizado"
 *                       fecha_cosecha:
 *                         type: string
 *                         format: date
 *                         description: Fecha estimada o real de cosecha
 *                         example: "2024-03-01"
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
 *         description: No se encontraron producciones registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay producciones registradas"
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
routerProduccion.get('/produccion',validarToken, getProducciones); 
/**
 * @swagger
 * /produccion/[id_produccion]:
 *   get:
 *     summary: Obtiene las producciones registradas por ID
 *     tags: [Producción]
 *     responses:
 *       200:
 *         description: Lista de producciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 producciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la producción
 *                         example: 1
 *                       cantidad_producida:
 *                         type: number
 *                         description: Cantidad de producción obtenida
 *                         example: 2000.5
 *                       fecha_produccion:
 *                         type: string
 *                         format: date
 *                         description: Fecha de producción
 *                         example: "2024-02-07"
 *                       fk_id_lote:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del lote
 *                             example: 3
 *                           dimension:
 *                             type: string
 *                             description: Dimensión del lote
 *                             example: "50m x 30m"
 *                           nombre_lote:
 *                             type: string
 *                             description: Nombre del lote
 *                             example: "Lote A"
 *                           fk_id_ubicacion:
 *                             type: object
 *                             properties:
 *                               id_ubicacion:
 *                                 type: integer
 *                                 description: ID de la ubicación
 *                                 example: 5
 *                               latitud:
 *                                 type: number
 *                                 description: Latitud de la ubicación
 *                                 example: -2.12345
 *                               longitud:
 *                                 type: number
 *                                 description: Longitud de la ubicación
 *                                 example: -78.98765
 *                           estado:
 *                             type: string
 *                             description: Estado del lote
 *                             example: "Activo"
 *                       descripcion_produccion:
 *                         type: string
 *                         description: Descripción de la producción
 *                         example: "Producción de tomates de alta calidad"
 *                       estado:
 *                         type: string
 *                         description: "Estado de la producción (ejemplo: 'En proceso', 'Finalizado')"
 *                         example: "Finalizado"
 *                       fecha_cosecha:
 *                         type: string
 *                         format: date
 *                         description: Fecha estimada o real de cosecha
 *                         example: "2024-03-01"
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
 *         description: No se encontró la producción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se encontró la producción"
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
routerProduccion.get('/produccion/:id_produccion',validarToken, getProduccionById); 
/**
 * @swagger
 * /produccion/[id_produccion]:
 *   put:
 *     summary: Se actualizan los datos en la tabla producción por ID
 *     tags: [Producción]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad_producida:
 *                 type: number
 *                 description: Cantidad producida en la cosecha
 *                 example: 1500.5
 *               fecha_produccion:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se registró la producción
 *                 example: "2024-02-07"
 *               fk_id_lote:
 *                 type: integer
 *                 description: Llave foránea que viene desde lote
 *                 example: 3
 *               descripcion_produccion:
 *                 type: string
 *                 description: Descripción de la producción
 *                 example: "Cosecha de tomates en invernadero"
 *               estado:
 *                 type: string
 *                 description: "Estado de la producción (ejemplo: 'En proceso', 'Finalizado')"
 *                 example: "Finalizado"
 *               fecha_cosecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada o real de cosecha
 *                 example: "2024-03-01"
 *     responses:
 *       200:
 *         description: Registro de producción exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producción registrada con éxito"
 *       400:
 *         description: No se encontró la producción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se encontró la producción"
 *       401:
 *         description: Token requerido o no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
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
routerProduccion.put('/produccion/:id_produccion',validarToken, updateProduccion);


export default routerProduccion;
