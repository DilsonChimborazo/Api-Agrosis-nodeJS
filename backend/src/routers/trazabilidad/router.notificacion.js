import {Router} from 'express';
import { createNotificacion, getNotificacion, getNotificacionById, updateNotificacion } from '../../controllers/trazabilidad/controller.notificacion.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerNotificacion = Router();

/**
 * @swagger
 * tags:
 *   name: notificacion
 *   description: Endpoints para la gestion de notificaciones
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
 * /notificacion:
 *   post:
 *     summary: Se registra una notificacion con validacion de token JWT
 *     tags: [notificacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Titulo de la notificacion
 *               mensaje:
 *                 type: string
 *                 description: Mensaje que genera de la notificacion
 *               fk_id_programacion:
 *                 type: integer
 *                 description: Seleccion de programacion por medio de ID
 *     responses:
 *       200:
 *         description: notificacion registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Recoleccion de cosecha"
 *                 mensaje:
 *                   type: string
 *                   example: "Hay que recolectar la cosecha"
 *                 fk_id_programacion:
 *                   type: integer
 *                   integer: 2
 *       404:
 *         description: Error al registrar una notificacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una notificacion"
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
routerNotificacion.post('/notificacion',validarToken,createNotificacion)

/**
 * @swagger
 * /notificacion:
 *   get:
 *     summary: Se obtiene una notificacion con validacion de token JWT
 *     tags: [notificacion]
 *     responses:
 *       200:
 *         description: notificacion obtenida correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Recoleccion de cosecha"
 *                 mensaje:
 *                   type: string
 *                   example: "Hay que recolectar la cosecha"
 *                 fk_id_programacion:
 *                   type: object
 *                   properties:
 *                     id_programacion:
 *                       type: integer
 *                       example: 2
 *                     estado:
 *                       type: string
 *                       example: "programado"
 *                     fecha_programada:
 *                       type: string
 *                       format: date
 *                       example: 2025-07-15
 *                     duracion:
 *                       type: integer
 *                       example: 4
 *                     fk_id_asignacion_actividad:
 *                       type: object
 *                       properties: 
 *                         id_asignacion_actividad:
 *                           type: integer
 *                           example: 2
 *                         fecha: 
 *                           type: string
 *                           format: date
 *                           example: "2025-02-11"
 *                         fk_id_actvidad:
 *                           type: object
 *                           properties:
 *                             id_actividad:
 *                               type: integer
 *                               example: 2
 *                             nombre_actividad:
 *                               type: string
 *                               example: "Regar las matas"
 *                             descripcion:
 *                               type: string
 *                               example: "Regas las plantas de forma moderada"
 *                         fk_identificacion:
 *                           type: object
 *                           properties:
 *                             identificacion:
 *                               type: integer
 *                               example: 1081728782
 *                             nombre:
 *                               type: string
 *                               example: "Wilson Eduardo Samboni"
 *                             contrasena:
 *                               type: string
 *                               example: "sdasdf-asdasd-sadadas-asdad"
 *                             email:
 *                               type: string
 *                               example: "samboniwilson09@gmail.com"
 *                             fk_id_rol:
 *                               type: object
 *                               properties: 
 *                                 id_rol:
 *                                   type: integer
 *                                   example: 1
 *                                 nombre_rol:
 *                                   type: string
 *                                   example: "aprendiz"
 *                                 fecha_creacion:
 *                                   type: string
 *                                   format: date
 *                                   example: "2024-01-01"
 *                     fk_id_calendario_lunar:
 *                       type: object
 *                       properties:
 *                         id_calendario_lunar:
 *                           type: integer
 *                           example: 5
 *                         fecha: 
 *                           type: string
 *                           format: date
 *                           example: "2024-08-08"
 *                         descripcion_evento:
 *                           type: string
 *                           example: "Luna nueva perfecto para sembrar"
 *                         evento:
 *                           type: string
 *                           example: "Luna nueva"
 *                      
 *       404:
 *         description: Error al registrar una notificacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una notificacion"
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
routerNotificacion.get('/notificacion',validarToken,getNotificacion)

/**
 * @swagger
 * /notificacion {id_notificacion}:
 *   get:
 *     summary: Se obtiene una notificacion por medio de ID con validacion de token JWT
 *     tags: [notificacion]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una notificacion
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: notificacion obtenida correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Recoleccion de cosecha"
 *                 mensaje:
 *                   type: string
 *                   example: "Hay que recolectar la cosecha"
 *                 fk_id_programacion:
 *                   type: object
 *                   properties:
 *                     id_programacion:
 *                       type: integer
 *                       example: 2
 *                     estado:
 *                       type: string
 *                       example: "programado"
 *                     fecha_programada:
 *                       type: string
 *                       format: date
 *                       example: 2025-07-15
 *                     duracion:
 *                       type: integer
 *                       example: 4
 *                     fk_id_asignacion_actividad:
 *                       type: object
 *                       properties: 
 *                         id_asignacion_actividad:
 *                           type: integer
 *                           example: 2
 *                         fecha: 
 *                           type: string
 *                           format: date
 *                           example: "2025-02-11"
 *                         fk_id_actvidad:
 *                           type: object
 *                           properties:
 *                             id_actividad:
 *                               type: integer
 *                               example: 2
 *                             nombre_actividad:
 *                               type: string
 *                               example: "Regar las matas"
 *                             descripcion:
 *                               type: string
 *                               example: "Regas las plantas de forma moderada"
 *                         fk_identificacion:
 *                           type: object
 *                           properties:
 *                             identificacion:
 *                               type: integer
 *                               example: 1081728782
 *                             nombre:
 *                               type: string
 *                               example: "Wilson Eduardo Samboni"
 *                             contrasena:
 *                               type: string
 *                               example: "sdasdf-asdasd-sadadas-asdad"
 *                             email:
 *                               type: string
 *                               example: "samboniwilson09@gmail.com"
 *                             fk_id_rol:
 *                               type: object
 *                               properties: 
 *                                 id_rol:
 *                                   type: integer
 *                                   example: 1
 *                                 nombre_rol:
 *                                   type: string
 *                                   example: "aprendiz"
 *                                 fecha_creacion:
 *                                   type: string
 *                                   format: date
 *                                   example: "2024-01-01"
 *                     fk_id_calendario_lunar:
 *                       type: object
 *                       properties:
 *                         id_calendario_lunar:
 *                           type: integer
 *                           example: 5
 *                         fecha: 
 *                           type: string
 *                           format: date
 *                           example: "2024-08-08"
 *                         descripcion_evento:
 *                           type: string
 *                           example: "Luna nueva perfecto para sembrar"
 *                         evento:
 *                           type: string
 *                           example: "Luna nueva"
 *                      
 *       404:
 *         description: Error al registrar una notificacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una notificacion"
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
routerNotificacion.get('/notificacion/:id_notificacion',validarToken,getNotificacionById)

/**
 * @swagger
 * /notificacion {id_notificacion}:
 *   put:
 *     summary: Se actualiza por medio de ID una notificacion con validacion de token JWT
 *     tags: [notificacion]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar una notificacion registrado en el sistema
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
 *               titulo:
 *                 type: string
 *                 description: Titulo de la notificacion
 *               mensaje:
 *                 type: string
 *                 description: Mensaje que genera de la notificacion
 *               fk_id_programacion:
 *                 type: integer
 *                 description: Seleccion de programacion por medio de ID
 *     responses:
 *       200:
 *         description: notificacion registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Regar plantas"
 *                 mensaje:
 *                   type: string
 *                   example: "Regar las plantas de forma adecuada sin incecticidas"
 *                 fk_id_programacion:
 *                   type: integer
 *                   integer: 2
 *       404:
 *         description: Error al actualizar una notificacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar una notificacion"
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
routerNotificacion.put('/notificacion/:id_notificacion',validarToken,updateNotificacion)

export default routerNotificacion;