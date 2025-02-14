import {Router} from 'express';
import { createLotes, getLoteById, getLotes, updateLote, getReporteLotes } from '../../controllers/iot/controller.lotes.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerLotes = Router();

routerLotes.get('/lotes/reporte',validarToken, getReporteLotes);

/**
 * @swagger
 * tags:
 *   name: Lotes
 *   description: Endpoints para la gestion la tabla lotes
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
 * /lotes:
 *   post:
 *     summary: Crea un nuevo lote
 *     tags: [Lotes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dimension:
 *                 type: integer
 *                 description: Dimensión del lote
 *                 example: 100
 *               nombre_lote:
 *                 type: string
 *                 description: Nombre del lote
 *                 example: "Lote A"
 *               fk_id_ubicacion:
 *                 type: integer
 *                 description: ID de la ubicación asociada al lote
 *                 example: 3
 *               estado:
 *                 type: string
 *                 description: Estado del lote
 *                 example: "Activo"
 *     responses:
 *       200:
 *         description: Lote registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Lote registrado con éxito"
 *       400:
 *         description: Error al registrar el lote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar el lote"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
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

routerLotes.post('/lotes',validarToken, createLotes);

/**
 * @swagger
 * /lotes:
 *   get:
 *     summary: Obtiene la lista de lotes con su ubicación
 *     tags: [Lotes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lotes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lote:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del lote
 *                         example: 1
 *                       dimension:
 *                         type: integer
 *                         description: Dimensión del lote
 *                         example: 100
 *                       nombre_lote:
 *                         type: string
 *                         description: Nombre del lote
 *                         example: "Lote A"
 *                       fk_id_ubicacion:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID de la ubicación asociada
 *                             example: 3
 *                           latitud:
 *                             type: number
 *                             format: float
 *                             description: Latitud de la ubicación
 *                             example: -2.34567
 *                           longitud:
 *                             type: number
 *                             format: float
 *                             description: Longitud de la ubicación
 *                             example: -78.45678
 *                       estado:
 *                         type: string
 *                         description: Estado del lote
 *                         example: "Activo"
 *       404:
 *         description: No hay lotes registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay lotes registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
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

routerLotes.get('/lotes',validarToken, getLotes);

/**
 * @swagger
 * /lotes[id_lote]:
 *   get:
 *     summary: Obtiene la lista de lotes con su ubicación por ID
 *     tags: [Lotes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lotes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lote:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del lote
 *                         example: 1
 *                       dimension:
 *                         type: integer
 *                         description: Dimensión del lote
 *                         example: 100
 *                       nombre_lote:
 *                         type: string
 *                         description: Nombre del lote
 *                         example: "Lote A"
 *                       fk_id_ubicacion:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID de la ubicación asociada
 *                             example: 3
 *                           latitud:
 *                             type: number
 *                             format: float
 *                             description: Latitud de la ubicación
 *                             example: -2.34567
 *                           longitud:
 *                             type: number
 *                             format: float
 *                             description: Longitud de la ubicación
 *                             example: -78.45678
 *                       estado:
 *                         type: string
 *                         description: Estado del lote
 *                         example: "Activo"
 *       404:
 *         description: No hay lotes registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay lotes registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
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
routerLotes.get('/lotes/:id_lote',validarToken, getLoteById);

/**
 * @swagger
 * /lotes[id_lote]:
 *   put:
 *     summary: se actualiza un nuevo dato en la tabla lotes por ID
 *     tags: [Lotes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dimension:
 *                 type: integer
 *                 description: Dimensión del lote
 *                 example: 100
 *               nombre_lote:
 *                 type: string
 *                 description: Nombre del lote
 *                 example: "Lote A"
 *               fk_id_ubicacion:
 *                 type: integer
 *                 description: ID de la ubicación asociada al lote
 *                 example: 3
 *               estado:
 *                 type: string
 *                 description: Estado del lote
 *                 example: "Activo"
 *     responses:
 *       200:
 *         description: Lote actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Lote actualizado con éxito"
 *       400:
 *         description: Error al actualizar el lote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar el lote"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
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
routerLotes.put('/lotes/:id_lote',validarToken, updateLote);

export default routerLotes;
