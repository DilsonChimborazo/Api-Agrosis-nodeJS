import { Router} from "express";
import { postDesarrollan,getDesarrollan,actualizarDesarrollan,IdDesarrollan, getReporteCultivosPEA } from "../../controllers/trazabilidad/controller.desarrollan.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerDesarollan = Router();

routerDesarollan.get('/desarrollan/reporte',validarToken,getReporteCultivosPEA);

/**
 * @swagger
 * tags:
 *   name: desarrollan
 *   description: Endpoints para la gestion de desarrollos 
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
 * /desarrollan:
 *   post:
 *     summary: Se registra un desarrollo con validacion de token JWT
 *     tags: [desarrollan]
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
 *               fk_id_pea:
 *                 type: integer
 *                 description: Seleccion de un pea por medio de ID
 *     responses:
 *       200:
 *         description: desarrollo registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 2
 *                 fk_id_pea:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: Error al registrar un desarrollo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar un desarrollo"
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
routerDesarollan.post('/desarrollan',validarToken,postDesarrollan);

/**
 * @swagger
 * /desarrollan:
 *   get:
 *     summary: Se obtiene un desarrollo con validacion de token JWT
 *     tags: [desarrollan]
 *     responses:
 *       200:
 *         description: desarrollo obtenido correctamente 
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
 *                 fk_id_pea:
 *                   type: object
 *                   properties:
 *                     id_pea: 
 *                       type: integer
 *                       example: 3
 *                     nombre:
 *                       type: string
 *                       example: "Mariposas"
 *       404:
 *         description: Error al obtener un desarrollo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un desarrollo"
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
routerDesarollan.get('/desarrollan',validarToken,getDesarrollan);

/**
 * @swagger
 * /desarrollan {id_desarrollan}:
 *   put:
 *     summary: Se actualiza un desarrollo por medio de ID con validacion de token JWT
 *     tags: [desarrollan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_desarrollan
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar un desarrollo
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
 *               fk_id_pea:
 *                 type: integer
 *                 description: Seleccion de un pea por medio de ID
 *     responses:
 *       200:
 *         description: desarrollo actualizado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 2
 *                 fk_id_pea:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: Error al actualizar un desarrollo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar un desarrollo"
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
routerDesarollan.put('/desarrollan/:id_desarrollan',validarToken,actualizarDesarrollan);

/**
 * @swagger
 * /desarrollan {id_desarrollan}:
 *   get:
 *     summary: Se obtiene un desarrollo por medio de ID con validacion de token JWT
 *     tags: [desarrollan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_desarrollan
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un desarrollo registrado en el sistema
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: desarrollo obtenido correctamente 
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
 *                 fk_id_pea:
 *                   type: object
 *                   properties:
 *                     id_pea: 
 *                       type: integer
 *                       example: 3
 *                     nombre:
 *                       type: string
 *                       example: "Mariposas"
 *       404:
 *         description: Error al obtener un desarrollo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un desarrollo"
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
routerDesarollan.get('/desarrollan/:id_desarrollan',validarToken,IdDesarrollan);
export default routerDesarollan;