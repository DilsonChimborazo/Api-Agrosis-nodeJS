import {Router} from 'express';
import { createUbicacion, getUbicacionById, getUbicaciones, updateUbicacion } from '../../controllers/iot/controller.ubicacion.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerUbicacion = Router();

/**
 * @swagger
 * tags:
 *   name: Ubicación
 *   description: Endpoints para la gestion la tabla Ubicación
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
 * /ubicacion:
 *   post:
 *     summary: Crea una nueva ubicación
 *     tags: [Ubicación]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitud:
 *                 type: number
 *                 format: float
 *                 example: 4.6097
 *               longitud:
 *                 type: number
 *                 format: float
 *                 example: -74.0817
 *     responses:
 *       200:
 *         description: Ubicación creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Ubicación creada con éxito"
 *       400:
 *         description: Error al crear la ubicación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Ubicación no creada"
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
 *                   example: "Error al crear la ubicación"
 */

routerUbicacion.post('/ubicacion',validarToken, createUbicacion );

/**
 * @swagger
 * /ubicacion:
 *   get:
 *     summary: Obtiene todas las ubicaciones registradas
 *     tags: [Ubicación]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Ubicaciones obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Ubicaciones obtenidas con éxito"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_ubicacion:
 *                         type: integer
 *                         example: 1
 *                       latitud:
 *                         type: number
 *                         format: float
 *                         example: 4.6097
 *                       longitud:
 *                         type: number
 *                         format: float
 *                         example: -74.0817
 *       404:
 *         description: No hay ubicaciones registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay ubicaciones registradas"
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
 *                   example: "Error al obtener las ubicaciones"
 */

routerUbicacion.get('/ubicacion',validarToken, getUbicaciones);

/**
 * @swagger
 * /ubicacion[id_ubicacion]:
 *   get:
 *     summary: Obtiene todas las ubicaciones registradas por ID
 *     tags: [Ubicación]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Ubicaciones obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Ubicaciones obtenidas con éxito"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_ubicacion:
 *                         type: integer
 *                         example: 1
 *                       latitud:
 *                         type: number
 *                         format: float
 *                         example: 4.6097
 *                       longitud:
 *                         type: number
 *                         format: float
 *                         example: -74.0817
 *       404:
 *         description: No hay ubicaciones registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay ubicaciones registradas"
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
 *                   example: "Error al obtener las ubicaciones"
 */
routerUbicacion.get('/ubicacion/:id_ubicacion',validarToken, getUbicacionById);

/**
 * @swagger
 * /ubicacion[id_ubicacion]:
 *   put:
 *     summary: Actualiza los datos de la tabla ubicacion por ID
 *     tags: [Ubicación]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitud:
 *                 type: number
 *                 format: float
 *                 example: 4.6097
 *               longitud:
 *                 type: number
 *                 format: float
 *                 example: -74.0817
 *     responses:
 *       200:
 *         description: Ubicación actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Ubicación actualizada con éxito"
 *       400:
 *         description: Error al actualizar la ubicación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Ubicación no creada"
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
 *                   example: "Error al crear la ubicación"
 */
routerUbicacion.put('/ubicacion/:id_ubicacion',validarToken, updateUbicacion);

export default routerUbicacion;