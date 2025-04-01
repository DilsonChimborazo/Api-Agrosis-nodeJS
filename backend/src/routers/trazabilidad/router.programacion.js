import {Router} from 'express';
import { createProgramacion, getProgramacion, getProgramacionById, updateProgramacion } from '../../controllers/trazabilidad/controller.programacion.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerProgramacion = Router();

/**
 * @swagger
 * tags:
 *   name: programacion
 *   description: Endpoints para la gestion de programacion
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
 * /programacion:
 *   post:
 *     summary: Se registra una programacion con validacion de token JWT
 *     tags: [programacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 description: estado en el que se encuentra el programa
 *               fecha_programada:
 *                 type: string
 *                 format: date
 *                 description: Fecha en el que se hace la programacion
 *               duracion:
 *                 type: integer
 *                 description: Duracion de la programacion
 *               fk_id_asignacion_actividad:
 *                 type: integer
 *                 description: Seleccion de asignacion de actividad por medio de ID
 *               fk_id_calendario_lunar:
 *                 type: integer
 *                 description: Seleccion de evento del calendario lunar por medio de ID
 *     responses:
 *       200:
 *         description: programacion registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Programado"
 *                 fecha_programada:
 *                   type: string
 *                   format: date
 *                   example: "2024-06-24"
 *                 duracion:
 *                   type: integer
 *                   example: 7
 *                 fk_id_asignacion_actividad:
 *                   type: integer
 *                   example: 5
 *                 fk_id_calendario_lunar:
 *                   type: integer
 *                   example: 6
 *       404:
 *         description: Error al registrar una programacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una programacion"
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
routerProgramacion.post('/programacion',validarToken,createProgramacion)

/**
 * @swagger
 * /programacion:
 *   get:
 *     summary: Se obtiene una programacion con validacion de token JWT
 *     tags: [programacion]
 *     responses:
 *       200:
 *         description: programacion obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Programado"
 *                 fecha_programada:
 *                   type: string
 *                   format: date
 *                   example: "2024-06-24"
 *                 duracion:
 *                   type: integer
 *                   example: 7
 *                 fk_id_asignacion_actividad:
 *                   type: object
 *                   properties:
 *                     id_asignacion_actividad:
 *                       type: integer
 *                       example: 3
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-07"
 *                     fk_id_actividad:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2     
 *                         nombre_actividad:
 *                           type: string
 *                           example: "Fumigacion"
 *                         descripcion:
 *                           type: string
 *                           example: "Fumigacion para eliminacion de plag"
 *                         fk_identificacion:
 *                           type: object
 *                           properties:
 *                             identificacion:
 *                               type: biginteger  
 *                               example: 1081728782 
 *                             nombre:
 *                               type: string
 *                               example: "Wilson Eduardo Samboni Rodriguez"
 *                             contrasena:
 *                               type: string
 *                               example: "wdsaf-asfa-sfafdwqf-dsfsdsdfg-sdg"
 *                             email:
 *                               type: string
 *                               example: "samboniwilson09@gmail.com"
 *                             fk_id_rol:
 *                               type: object
 *                               properties:
 *                                 id_rol:
 *                                   type: integer
 *                                   example: 2
 *                                 nombre_rol:
 *                                   type: string
 *                                   example: "aprendiz"
 *                                 fecha_creacion:
 *                                   type: string
 *                                   format: date
 *                                   example: "2025-02-08"
 *                 fk_id_calendario_lunar:
 *                   properties:
 *                     id_calendario_lunar:
 *                       type: integer
 *                       example: 5
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     descripcion_evento:
 *                       type: string
 *                       example: "Dia 31 luna nueva perefecto para sembrar"
 *                     evento:
 *                       type: string
 *                       example: "Luna nueva"
 *       404:
 *         description: Error al registrar una programacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una programacion"
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
routerProgramacion.get('/programacion',validarToken,getProgramacion)

/**
 * @swagger
 * /programacion {id_programacion}:
 *   get:
 *     summary: Se obtiene una programacion por medio de ID con validacion de token JWT
 *     tags: [programacion]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_programacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una programacion registrada en el sistema
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: programacion obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Programado"
 *                 fecha_programada:
 *                   type: string
 *                   format: date
 *                   example: "2024-06-24"
 *                 duracion:
 *                   type: integer
 *                   example: 7
 *                 fk_id_asignacion_actividad:
 *                   type: object
 *                   properties:
 *                     id_asignacion_actividad:
 *                       type: integer
 *                       example: 3
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-07"
 *                     fk_id_actividad:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2     
 *                         nombre_actividad:
 *                           type: string
 *                           example: "Fumigacion"
 *                         descripcion:
 *                           type: string
 *                           example: "Fumigacion para eliminacion de plag"
 *                         fk_identificacion:
 *                           type: object
 *                           properties:
 *                             identificacion:
 *                               type: biginteger  
 *                               example: 1081728782 
 *                             nombre:
 *                               type: string
 *                               example: "Wilson Eduardo Samboni Rodriguez"
 *                             contrasena:
 *                               type: string
 *                               example: "wdsaf-asfa-sfafdwqf-dsfsdsdfg-sdg"
 *                             email:
 *                               type: string
 *                               example: "samboniwilson09@gmail.com"
 *                             fk_id_rol:
 *                               type: object
 *                               properties:
 *                                 id_rol:
 *                                   type: integer
 *                                   example: 2
 *                                 nombre_rol:
 *                                   type: string
 *                                   example: "aprendiz"
 *                                 fecha_creacion:
 *                                   type: string
 *                                   format: date
 *                                   example: "2025-02-08"
 *                 fk_id_calendario_lunar:
 *                   properties:
 *                     id_calendario_lunar:
 *                       type: integer
 *                       example: 5
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     descripcion_evento:
 *                       type: string
 *                       example: "Dia 31 luna nueva perefecto para sembrar"
 *                     evento:
 *                       type: string
 *                       example: "Luna nueva"
 *       404:
 *         description: Error al registrar una programacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una programacion"
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
routerProgramacion.get('/programacion/:id_programacion',validarToken,getProgramacionById)

/**
 * @swagger
 * /programacion {id_programacion}:
 *   put:
 *     summary: Se actualiza una programacion con validacion de token JWT
 *     tags: [programacion]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_programacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar una programacion registrada en el sistema
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
 *               estado:
 *                 type: string
 *                 description: estado en el que se encuentra el programa
 *               fecha_programada:
 *                 type: string
 *                 format: date
 *                 description: Fecha en el que se hace la programacion
 *               duracion:
 *                 type: integer
 *                 description: Duracion de la programacion
 *               fk_id_asignacion_actividad:
 *                 type: integer
 *                 description: Seleccion de asignacion de actividad por medio de ID
 *               fk_id_calendario_lunar:
 *                 type: integer
 *                 description: Seleccion de evento del calendario lunar por medio de ID
 *     responses:
 *       200:
 *         description: programacion actualizado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Programado"
 *                 fecha_programada:
 *                   type: string
 *                   format: date
 *                   example: "2024-06-24"
 *                 duracion:
 *                   type: integer
 *                   example: 7
 *                 fk_id_asignacion_actividad:
 *                   type: integer
 *                   example: 5
 *                 fk_id_calendario_lunar:
 *                   type: integer
 *                   example: 6
 *       404:
 *         description: Error al actualizar una programacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar una programacion"
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
routerProgramacion.put('/programacion/:id_programacion',validarToken,updateProgramacion)

export default routerProgramacion;