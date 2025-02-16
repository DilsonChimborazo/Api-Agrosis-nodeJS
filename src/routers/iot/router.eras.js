import {Router} from 'express';
import { createEras, getEraById, getEras, updateEra, getTotalEras} from '../../controllers/iot/controller.eras.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerEras = Router();


/**
 * @swagger
 * tags:
 *   name: Eras
 *   description: Endpoints para la gestion la tabla Eras
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
 * /eras:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla Eras con validacion de token JWT
 *     tags: [Eras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: descripcion de las eras
 *                 example: era especial para hortalizas
 *               fk_id_lote:
 *                 type: integer
 *                 description: llave foranea que viene desde lote
 *                 example: 1
 *     responses:
 *       200:
 *         description: Era registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Era registrada con éxito"
 *       400:
 *         description: Error al registrar la era
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la era"
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
routerEras.post('/eras', validarToken, createEras)

/**
 * @swagger
 * /eras:
 *   get:
 *     summary: Obtiene todas las eras registradas
 *     tags: [Eras]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eras obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la era
 *                         example: 1
 *                       descripcion:
 *                         type: string
 *                         description: Descripción de la era
 *                         example: "Era de prueba"
 *                       fk_id_lote:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del lote al que pertenece la era
 *                             example: 5
 *                           dimension:
 *                             type: string
 *                             description: Dimensión del lote
 *                             example: "100x100m"
 *                           nombre_lote:
 *                             type: string
 *                             description: Nombre del lote
 *                             example: "Lote 1"
 *                           fk_id_ubicacion:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: ID de la ubicación del lote
 *                                 example: 2
 *                               latitud:
 *                                 type: number
 *                                 format: float
 *                                 description: Latitud de la ubicación
 *                                 example: -2.12345
 *                               longitud:
 *                                 type: number
 *                                 format: float
 *                                 description: Longitud de la ubicación
 *                                 example: -79.12345
 *                           estado:
 *                             type: string
 *                             description: Estado del lote
 *                             example: "Activo"
 *       404:
 *         description: No hay eras registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay eras registradas"
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
routerEras.get('/eras', validarToken, getEras)

/**
 * @swagger
 * /eras[id_eras]:
 *   get:
 *     summary: Obtiene todas las eras registradas
 *     tags: [Eras]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eras obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la era
 *                         example: 1
 *                       descripcion:
 *                         type: string
 *                         description: Descripción de la era
 *                         example: "Era de prueba"
 *                       fk_id_lote:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del lote al que pertenece la era
 *                             example: 5
 *                           dimension:
 *                             type: string
 *                             description: Dimensión del lote
 *                             example: "100x100m"
 *                           nombre_lote:
 *                             type: string
 *                             description: Nombre del lote
 *                             example: "Lote 1"
 *                           fk_id_ubicacion:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: ID de la ubicación del lote
 *                                 example: 2
 *                               latitud:
 *                                 type: number
 *                                 format: float
 *                                 description: Latitud de la ubicación
 *                                 example: -2.12345
 *                               longitud:
 *                                 type: number
 *                                 format: float
 *                                 description: Longitud de la ubicación
 *                                 example: -79.12345
 *                           estado:
 *                             type: string
 *                             description: Estado del lote
 *                             example: "Activo"
 *       404:
 *         description: No hay eras registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay eras registradas"
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

routerEras.get('/eras/:id_eras', validarToken, getEraById)

/**
 * @swagger
 * /eras[id_eras]:
 *   put:
 *     summary: Se actualiza un nuevo dato en la tabla eras con ID
 *     tags: [Eras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: descripcion de las eras
 *                 example: era especial para hortalizas
 *               fk_id_lote:
 *                 type: integer
 *                 description: llave foranea que viene desde lote
 *                 example: 1
 *     responses:
 *       200:
 *         description: Era actualizar con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Era actualizar con éxito"
 *       400:
 *         description: Error al actualizar la era
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar la era"
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
routerEras.put('/eras/:id_eras', validarToken, updateEra)

/**
 * @swagger
 * /eras/reporte:
 *   get:
 *     summary: Obtiene todos los reportes de las eras registradas
 *     tags: [Reporte de eras]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eras obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la era
 *                         example: 1
 *                       fk_id_lote:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del lote al que pertenece la era
 *                             example: 5
 *                           nombre_lote:
 *                             type: string
 *                             description: Nombre del lote
 *                             example: "Lote 1"
 *                       total_eras:
 *                         type: integer
 *                         example: 5
 *       404:
 *         description: No hay reporte de eras registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay reporte de eras registradas"
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
routerEras.get('/eras/reporte', validarToken, getTotalEras)


export default routerEras;