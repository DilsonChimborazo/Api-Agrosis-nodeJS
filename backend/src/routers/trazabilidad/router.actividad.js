import { Router } from "express";
import { postActividad, getActividad, IdActividad, actualizarActividad } from "../../controllers/trazabilidad/controller.actividad.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerActividad = Router();
/**
 * @swagger
 * tags:
 *   name: Actividad
 *   description: Endpoints para la gestion de actividades
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
 * /actividad:
 *   post:
 *     summary: Se registra una nueva actividad con validacion de token JWT
 *     tags: [Actividad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_actividad:
 *                 type: string
 *                 description: Nombre de la actividad que se esta realizando 
 *               descripcion:
 *                 type: string
 *                 description: Descripcion de la actividad a realizar
 *     responses:
 *       200:
 *         description: Actividad registrada correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_actividad:
 *                   type: string
 *                   example: "Riego"
 *                 descripcion:
 *                   type: string
 *                   example: "Regar las plantas"
 *       404:
 *         description: No se registra la actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar la actividad"
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
routerActividad.post("/actividad",validarToken,postActividad);

/**
 * @swagger
 * /actividad:
 *   get:
 *     summary: Se obtiene una actividad con validacion de token JWT
 *     tags: [Actividad]
 *     responses:
 *       200:
 *         description: Devuelve el contenido solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_actividad:
 *                   type: string
 *                   example: "Riego"
 *                 descripcion:
 *                   type: string
 *                   example: "Regar las plantas"
 *       404:
 *         description: No hay actividades registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay actividades registradas"
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
routerActividad.get("/actividad",validarToken, getActividad);

/**
 * @swagger
 * /actividad {id_actividad}:
 *   get:
 *     summary: Se obtiene una actividad por medio de ID con validacion de token JWT
 *     tags: [Actividad]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         na   me: id_actividad
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una actividad
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Devuelve el contenido solicitado por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_actividad:
 *                   type: string
 *                   example: "Riego"
 *                 descripcion:
 *                   type: string
 *                   example: "Regar las plantas"
 *       404:
 *         description: No hay actividades registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay actividades registradas"
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
routerActividad.get("/actividad/:id_actividad",validarToken, IdActividad);

/**
 * @swagger
 * /actividad {id_actividad}:
 *   put:
 *     summary: Se actualiza una actividad por medio de ID con validacion de token JWT
 *     tags: [Actividad]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_actividad
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar una actividad
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_actividad:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: actualiza el contenido solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_actividad:
 *                   type: string
 *                   example: "Riego"
 *                 descripcion:
 *                   type: string
 *                   example: "Regar las plantas"
 *       404:
 *         description: No hay actividades registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay actividades registradas"
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
routerActividad.put("/actividad/:id_actividad",validarToken, actualizarActividad);

export default routerActividad;