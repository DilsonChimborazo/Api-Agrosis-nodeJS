import {Router} from 'express';
import { createAsignacionActividad, getAsignacionActividadById, getAsignacionActividad, updateAsignacionActividad, getReporteAsignaciones } from '../../controllers/trazabilidad/controller.asignacionActividad.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerasignacion_actividad = Router();

/**
 * @swagger
 * /asignacion_actividad/reporte:
 *   get:
 *     summary: Se obtiene un reporte de asignacion de actividad con validacion de token JWT
 *     tags: [reporte de asignacion_actividad]
 *     responses:
 *       200:
 *         description: reporte de Asignacion actividad obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_actividades:
 *                   type: integer
 *                   example: 10
 *                 fk_id_actividad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2     
 *                     actividades_asignadas:
 *                        type: string
 *                        example: "Fumigacion"
 *                 fk_identificacion:
 *                   type: object
 *                   properties:
 *                     identificacion:
 *                       type: biginteger  
 *                       example: 1081728782 
 *                     nombre_usuario:
 *                       type: string
 *                       example: "Wilson Eduardo Samboni Rodriguez"
 *                     fk_id_rol:
 *                       type: object
 *                       properties:
 *                         id_rol:
 *                           type: integer
 *                           example: 2
 *                         rol:
 *                           type: string
 *                           example: "aprendiz"
 *       404:
 *         description: Error al obtner reporte de asignacion de actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener reporte de asignacion de actividad"
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
routerasignacion_actividad.get('/asignacion_actividad/reporte',validarToken, getReporteAsignaciones)

/**
 * @swagger
 * tags:
 *   name: asignacion_actividad
 *   description: Endpoints para la gestion de asignacion de actividades
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
 * /asignacion_actividad:
 *   post:
 *     summary: Se registra una nueva asignacion de actividad con validacion de token JWT
 *     tags: [asignacion_actividad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la asignacion de una actividad
 *               fk_id_actividad:
 *                 type: integer
 *                 description: Seleccion de la actividad por medio de un ID
 *               fk_identificacion:
 *                 type: integer
 *                 description: Seleccion del usuario por medio de su identificacion
 *     responses:
 *       200:
 *         description: Asignacion actividad registrada correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-07"
 *                 fk_id_actividad:
 *                   type: integer
 *                   example: 2
 *                 fk_identificacion:
 *                   type: integer
 *                   example: 1081728782
 *       404:
 *         description: Error al registrar la asignacion de actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la asignacion de actividad"
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
routerasignacion_actividad.post('/asignacion_actividad',validarToken,createAsignacionActividad)

/**
 * @swagger
 * /asignacion_actividad:
 *   get:
 *     summary: Se obtiene una asignacion de actividad con validacion de token JWT
 *     tags: [asignacion_actividad]
 *     responses:
 *       200:
 *         description: Asignacion actividad registrada correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-07"
 *                 fk_id_actividad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2     
 *                     nombre_actividad:
 *                        type: string
 *                        example: "Fumigacion"
 *                     descripcion:
 *                        type: string
 *                        example: "Fumigacion para eliminacion de plag"
 *                 fk_identificacion:
 *                   type: object
 *                   properties:
 *                     identificacion:
 *                       type: biginteger  
 *                       example: 1081728782 
 *                     nombre:
 *                       type: string
 *                       example: "Wilson Eduardo Samboni Rodriguez"
 *                     contrasena:
 *                       type: string
 *                       example: "wdsaf-asfa-sfafdwqf-dsfsdsdfg-sdg"
 *                     email:
 *                       type: string
 *                       example: "samboniwilson09@gmail.com"
 *                     fk_id_rol:
 *                       type: object
 *                       properties:
 *                         id_rol:
 *                           type: integer
 *                           example: 2
 *                         nombre_rol:
 *                           type: string
 *                           example: "aprendiz"
 *                         fecha_creacion:
 *                           type: string
 *                           format: date
 *                           example: "2025-02-08"
 *       404:
 *         description: Error al registrar la asignacion de actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la asignacion de actividad"
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
routerasignacion_actividad.get('/asignacion_actividad',validarToken,getAsignacionActividad)

/**
 * @swagger
 * /asignacion_actividad {id_asignacion_actividad}:
 *   get:
 *     summary: Se obtiene una asignacion de actividad por medio de ID con validacion de token JWT
 *     tags: [asignacion_actividad]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_asignacion_actividad
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
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-07"
 *                 fk_id_actividad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2     
 *                     nombre_actividad:
 *                        type: string
 *                        example: "Fumigacion"
 *                     descripcion:
 *                        type: string
 *                        example: "Fumigacion para eliminacion de plag"
 *                 fk_identificacion:
 *                   type: object
 *                   properties:
 *                     identificacion:
 *                       type: biginteger  
 *                       example: 1081728782 
 *                     nombre:
 *                       type: string
 *                       example: "Wilson Eduardo Samboni Rodriguez"
 *                     contrasena:
 *                       type: string
 *                       example: "wdsaf-asfa-sfafdwqf-dsfsdsdfg-sdg"
 *                     email:
 *                       type: string
 *                       example: "samboniwilson09@gmail.com"
 *                     fk_id_rol:
 *                       type: object
 *                       properties:
 *                         id_rol:
 *                           type: integer
 *                           example: 2
 *                         nombre_rol:
 *                           type: string
 *                           example: "aprendiz"
 *                         fecha_creacion:
 *                           type: string
 *                           format: date
 *                           example: "2025-02-08"
 *       404:
 *         description: No hay asignacion de actividades registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay asigancion de actividades registradas"
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
routerasignacion_actividad.get('/asignacion_actividad/:id_asignacion_actividad',validarToken,getAsignacionActividadById)

/**
 * @swagger
 * /asignacion_actividad {id_asignacion_actividad}:
 *   put:
 *     summary: Se actualiza una asignacion de actividad por medio de ID con validacion de token JWT
 *     tags: [asignacion_actividad]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_asiganacion_actividad
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
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la asignacion de una actividad
 *               fk_id_actividad:
 *                 type: integer
 *                 description: Seleccion de la actividad por medio de un ID
 *               fk_identificacion:
 *                 type: integer
 *                 description: Seleccion del usuario por medio de su identificacion
 *     responses:
 *       200:
 *         description: actualiza el contenido solicitado por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-07"
 *                 fk_id_actividad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2     
 *                     nombre_actividad:
 *                        type: string
 *                        example: "Recoleccion"
 *                     descripcion:
 *                        type: string
 *                        example: "Recoleccion de cosecha"
 *                 fk_identificacion:
 *                   type: object
 *                   properties:
 *                     identificacion:
 *                       type: biginteger  
 *                       example: 1081728782 
 *                     nombre:
 *                       type: string
 *                       example: "Wilson Eduardo Samboni Rodriguez"
 *                     contrasena:
 *                       type: string
 *                       example: "wdsaf-asfa-sfafdwqf-dsfsdsdfg-sdg"
 *                     email:
 *                       type: string
 *                       example: "samboniwilson09@gmail.com"
 *                     fk_id_rol:
 *                       type: object
 *                       properties:
 *                         id_rol:
 *                           type: integer
 *                           example: 2
 *                         nombre_rol:
 *                           type: string
 *                           example: "pasante"
 *                         fecha_creacion:
 *                           type: string
 *                           format: date
 *                           example: "2025-02-08"
 *       404:
 *         description: No hay asignacion de actividades registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay asignacion de actividades registradas"
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
routerasignacion_actividad.put('/asignacion_actividad/:id_asignacion_actividad',validarToken,updateAsignacionActividad)

export default routerasignacion_actividad;