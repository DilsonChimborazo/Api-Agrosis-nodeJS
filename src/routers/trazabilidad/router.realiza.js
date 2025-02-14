import {Router} from 'express';
import { createRealiza, getRealiza, getRealizaById, updateRealiza, getReporte } from '../../controllers/trazabilidad/controller.realiza.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerRealiza = Router();

routerRealiza.get('/realiza/reporte',validarToken,getRealiza)


/**
 * @swagger
 * tags:
 *   name: realiza
 *   description: Endpoints para la gestion de realizaciones
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
 * /realiza:
 *   post:
 *     summary: Se registra una realizacion con validacion de token JWT
 *     tags: [realiza]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: Seleccion de un cultivo por medio de ID
 *               fk_id_actividad:
 *                 type: integer
 *                 description: Seleccion de una actvidad por medio de ID
 *     responses:
 *       200:
 *         description: realizacion registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 5
 *                 fk_id_actividad:
 *                   type: integer
 *                   example: 7
 *       404:
 *         description: Error al registrar una realizacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una realizacion"
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
routerRealiza.post('/realiza',validarToken,createRealiza)

/**
 * @swagger
 * /realiza:
 *   get:
 *     summary: Se obtiene una realizacion con validacion de token JWT
 *     tags: [realiza]
 *     responses:
 *       200:
 *         description: realizacion obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: object
 *                   properties:
 *                     id_cultivo:
 *                       type: integer
 *                       example: 4
 *                     fecha_plantacion:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     nombre_cultivo:
 *                       type: string
 *                       example: "cebolla"
 *                     descripcion: 
 *                       type: string
 *                       example: "Es muy bonita"
 *                     fk_id_especie:
 *                       type: object
 *                       properties:
 *                         id_especie:
 *                           type: integer
 *                           example: 5
 *                         nombre_comun:
 *                           type: string
 *                           example: "cebolla"
 *                         nombre_cientifico:
 *                           type: string
 *                           example: "cebollus"
 *                         descripcion:
 *                           type: string
 *                           example: "cebolla" 
 *                         fk_id_tipo_cultivo:
 *                           type: object
 *                           properties:
 *                             id_tipo_cultivo:
 *                               type: integer
 *                               example: 3
 *                             nombre:
 *                               type: string
 *                               example: "hortaliza"
 *                             descripcion:
 *                               type: string
 *                               example: "Es muy bonita y grande"
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
 *       404:
 *         description: Error al obtener     una realizacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una realizacion"
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
routerRealiza.get('/realiza',validarToken,getRealiza)

/**
 * @swagger
 * /realiza {id_realiza}:
 *   get:
 *     summary: Se obtiene una realizacion por medio de ID con validacion de token JWT
 *     tags: [realiza]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_realiza
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una realizacion
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: realizacion obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: object
 *                   properties:
 *                     id_cultivo:
 *                       type: integer
 *                       example: 4
 *                     fecha_plantacion:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     nombre_cultivo:
 *                       type: string
 *                       example: "cebolla"
 *                     descripcion: 
 *                       type: string
 *                       example: "Es muy bonita"
 *                     fk_id_especie:
 *                       type: object
 *                       properties:
 *                         id_especie:
 *                           type: integer
 *                           example: 5
 *                         nombre_comun:
 *                           type: string
 *                           example: "cebolla"
 *                         nombre_cientifico:
 *                           type: string
 *                           example: "cebollus"
 *                         descripcion:
 *                           type: string
 *                           example: "cebolla" 
 *                         fk_id_tipo_cultivo:
 *                           type: object
 *                           properties:
 *                             id_tipo_cultivo:
 *                               type: integer
 *                               example: 3
 *                             nombre:
 *                               type: string
 *                               example: "hortaliza"
 *                             descripcion:
 *                               type: string
 *                               example: "Es muy bonita y grande"
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
 *       404:
 *         description: Error al obtener     una realizacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una realizacion"
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
routerRealiza.get('/realiza/:id_realiza',validarToken,getRealizaById)

/**
 * @swagger
 * /realiza {id_realiza}:
 *   put:
 *     summary: Se actualiza una realizacion por medio de ID con validacion de token JWT
 *     tags: [realiza]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_realiza
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar una realizacion
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
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: Seleccion de un cultivo por medio de ID
 *               fk_id_actividad:
 *                 type: integer
 *                 description: Seleccion de una actvidad por medio de ID
 *     responses:
 *       200:
 *         description: realizacion actualizada correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 5
 *                 fk_id_actividad:
 *                   type: integer
 *                   example: 7
 *       404:
 *         description: Error al actualizar una realizacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar una realizacion"
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
routerRealiza.put('/realiza/:id_realiza',validarToken,updateRealiza)

export default routerRealiza;