import {Router} from 'express';
import { createMide, getMide, getMideById, updateMide } from '../../controllers/iot/controller.mide.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerMide = Router();

/**
 * @swagger
 * tags:
 *   name: Mediciones
 *   description: Endpoints para la gestion la tabla Mide
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
 * /mide:
 *   post:
 *     summary: Registra una nueva medición en una era con un sensor
 *     tags: [Mediciones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_sensor:
 *                 type: integer
 *                 description: ID del sensor que realiza la medición
 *                 example: 5
 *               fk_id_era:
 *                 type: integer
 *                 description: ID de la era donde se realiza la medición
 *                 example: 2
 *     responses:
 *       200:
 *         description: Medición registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Medición registrada con éxito"
 *       400:
 *         description: Error al registrar la medición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la medición"
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

routerMide.post ('/mide',validarToken, createMide);

/**
 * @swagger
 * /mide:
 *   get:
 *     summary: Obtiene todas las mediciones registradas con detalles de sensores y eras
 *     tags: [Mediciones]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mediciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mide:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la medición
 *                         example: 1
 *                       fk_id_sensor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del sensor
 *                             example: 5
 *                           nombre_sensor:
 *                             type: string
 *                             description: Nombre del sensor
 *                             example: "Sensor de Humedad"
 *                           tipo_sensor:
 *                             type: string
 *                             description: Tipo de sensor
 *                             example: "Humedad"
 *                           unidad_medida:
 *                             type: string
 *                             description: Unidad de medida
 *                             example: "%"
 *                           descripcion:
 *                             type: string
 *                             description: Descripción del sensor
 *                             example: "Mide la humedad del suelo"
 *                           medida_minima:
 *                             type: number
 *                             format: float
 *                             description: Valor mínimo medido
 *                             example: 10.5
 *                           medida_maxima:
 *                             type: number
 *                             format: float
 *                             description: Valor máximo medido
 *                             example: 90.0
 *                       fk_id_era:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID de la era
 *                             example: 2
 *                           descripcion:
 *                             type: string
 *                             description: Descripción de la era
 *                             example: "Era 1"
 *                           fk_id_lote:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: ID del lote
 *                                 example: 3
 *                               dimension:
 *                                 type: string
 *                                 description: Dimensión del lote
 *                                 example: "50x30"
 *                               nombre_lote:
 *                                 type: string
 *                                 description: Nombre del lote
 *                                 example: "Lote A"
 *                               fk_id_ubicacion:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     description: ID de la ubicación
 *                                     example: 1
 *                                   latitud:
 *                                     type: number
 *                                     format: float
 *                                     description: Latitud de la ubicación
 *                                     example: -1.23345
 *                                   longitud:
 *                                     type: number
 *                                     format: float
 *                                     description: Longitud de la ubicación
 *                                     example: -78.65432
 *                               estado:
 *                                 type: string
 *                                 description: Estado del lote
 *                                 example: "Activo"
 *       404:
 *         description: No hay mediciones registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay mediciones registradas"
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

routerMide.get ('/mide',validarToken, getMide);

/**
 * @swagger
 * /mide[id_mide]:
 *   get:
 *     summary: Obtiene todas las mediciones registradas con detalles de sensores y eras por ID
 *     tags: [Mediciones]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mediciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mide:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la medición
 *                         example: 1
 *                       fk_id_sensor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del sensor
 *                             example: 5
 *                           nombre_sensor:
 *                             type: string
 *                             description: Nombre del sensor
 *                             example: "Sensor de Humedad"
 *                           tipo_sensor:
 *                             type: string
 *                             description: Tipo de sensor
 *                             example: "Humedad"
 *                           unidad_medida:
 *                             type: string
 *                             description: Unidad de medida
 *                             example: "%"
 *                           descripcion:
 *                             type: string
 *                             description: Descripción del sensor
 *                             example: "Mide la humedad del suelo"
 *                           medida_minima:
 *                             type: number
 *                             format: float
 *                             description: Valor mínimo medido
 *                             example: 10.5
 *                           medida_maxima:
 *                             type: number
 *                             format: float
 *                             description: Valor máximo medido
 *                             example: 90.0
 *                       fk_id_era:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID de la era
 *                             example: 2
 *                           descripcion:
 *                             type: string
 *                             description: Descripción de la era
 *                             example: "Era 1"
 *                           fk_id_lote:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: ID del lote
 *                                 example: 3
 *                               dimension:
 *                                 type: string
 *                                 description: Dimensión del lote
 *                                 example: "50x30"
 *                               nombre_lote:
 *                                 type: string
 *                                 description: Nombre del lote
 *                                 example: "Lote A"
 *                               fk_id_ubicacion:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     description: ID de la ubicación
 *                                     example: 1
 *                                   latitud:
 *                                     type: number
 *                                     format: float
 *                                     description: Latitud de la ubicación
 *                                     example: -1.23345
 *                                   longitud:
 *                                     type: number
 *                                     format: float
 *                                     description: Longitud de la ubicación
 *                                     example: -78.65432
 *                               estado:
 *                                 type: string
 *                                 description: Estado del lote
 *                                 example: "Activo"
 *       404:
 *         description: No hay mediciones registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay mediciones registradas"
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
routerMide.get ('/mide/:id_mide',validarToken, getMideById);

/**
 * @swagger
 * /mide[id_mide]:
 *   put:
 *     summary: se actualiza los datos de la tabla de mediciones
 *     tags: [Mediciones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_sensor:
 *                 type: integer
 *                 description: ID del sensor que realiza la medición
 *                 example: 5
 *               fk_id_era:
 *                 type: integer
 *                 description: ID de la era donde se realiza la medición
 *                 example: 2
 *     responses:
 *       200:
 *         description: Medición actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Medición actualizada con éxito"
 *       400:
 *         description: Error al actualizada la medición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar la medición"
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

routerMide.put ('/mide/:id_mide',validarToken, updateMide);

export default routerMide;