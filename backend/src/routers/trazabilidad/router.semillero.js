import {Router} from 'express';
import { createSemilleros, getSemilleros, getSemillerosById, updateSemilleros, getTotalSemilleros} from '../../controllers/trazabilidad/controller.semillero.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerSemillero = Router();

/**
 * @swagger
 * /semilleros/reporte:
 *   get:
 *     summary: Se obtiene un reporte semillero con validacion de token JWT
 *     tags: [Reporte de semilleros]
 *     responses:
 *       200:
 *         description: Reporte de Semillero obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_semilleros:
 *                   type: integer
 *                   example: 4
 *                 nombres_semilleros:
 *                   type: string
 *                   example: "maiz"
 *       404:
 *         description: No se obtuvo el reporte de semillero 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener el reporte semillero"
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
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerSemillero.get('/semilleros/reporte',validarToken,getTotalSemilleros)

/**
 * @swagger
 * tags:
 *   name: semilleros
 *   description: Endpoints para la gestion de semilleros
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
 * /semilleros:
 *   post:
 *     summary: Se registra un semillero con validacion de token JWT
 *     tags: [semilleros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_semilla:
 *                 type: string
 *                 description: nombre de la semilla a registrar
 *               fecha_siembra:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la siembra de la semilla
 *               fecha_estimada:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada de salida del semillero
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad de semillero
 *     responses:
 *       200:
 *         description: Semillero registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_semilla:
 *                   type: string
 *                   example: "maiz"
 *                 fecha_siembra:
 *                   type: string
 *                   format: date
 *                   example: "2024-03-08"
 *                 fecha_estimada:
 *                   type: string
 *                   format: date
 *                   example: "2024-04-08"
 *                 cantidad:
 *                   type: integer
 *                   example: 20
 *       404:
 *         description: No se registro el semillero 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar semillero"
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
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerSemillero.post('/semilleros',validarToken,createSemilleros)

/**
 * @swagger
 * /semilleros:
 *   get:
 *     summary: Se obtiene un semillero con validacion de token JWT
 *     tags: [semilleros]
 *     responses:
 *       200:
 *         description: Semillero obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_semilla:
 *                   type: string
 *                   example: "maiz"
 *                 fecha_siembra:
 *                   type: string
 *                   format: date
 *                   example: "2024-03-08"
 *                 fecha_estimada:
 *                   type: string
 *                   format: date
 *                   example: "2024-04-08"
 *                 cantidad:
 *                   type: integer
 *                   example: 20
 *       404:
 *         description: No se obtuvo el semillero 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener semillero"
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
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerSemillero.get('/semilleros',validarToken,getSemilleros)

/**
 * @swagger
 * /semilleros {id_semillero}:
 *   get:
 *     summary: Se obtiene un semillero por medio de ID con validacion de token JWT
 *     tags: [semilleros]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_semillero
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un semillero
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Semillero obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_semilla:
 *                   type: string
 *                   example: "maiz"
 *                 fecha_siembra:
 *                   type: string
 *                   format: date
 *                   example: "2024-03-08"
 *                 fecha_estimada:
 *                   type: string
 *                   format: date
 *                   example: "2024-04-08"
 *                 cantidad:
 *                   type: integer
 *                   example: 20
 *       404:
 *         description: No se obtuvo el semillero 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener semillero"
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
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerSemillero.get('/semilleros/:id_semilleros',validarToken,getSemillerosById)

/**
 * @swagger
 * /semilleros {id_semillero}:
 *   put:
 *     summary: Se actualiza un semillero con validacion de token JWT
 *     tags: [semilleros]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_semillero
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar un semillero
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_semilla:
 *                 type: string
 *                 description: nombre de la semilla a registrar
 *               fecha_siembra:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la siembra de la semilla
 *               fecha_estimada:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada de salida del semillero
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad de semillero
 *     responses:
 *       200:
 *         description: Semillero actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_semilla:
 *                   type: string
 *                   example: "maiz"
 *                 fecha_siembra:
 *                   type: string
 *                   format: date
 *                   example: "2024-03-08"
 *                 fecha_estimada:
 *                   type: string
 *                   format: date
 *                   example: "2024-04-08"
 *                 cantidad:
 *                   type: integer
 *                   example: 20
 *       404:
 *         description: No se actualizo el semillero 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo actualizo semillero"
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
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerSemillero.put('/semilleros/:id_semilleros',validarToken,updateSemilleros)

export default routerSemillero;  