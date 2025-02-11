import { Router } from "express";
import { postResiduos, getResiduos, IdResiduos, actualizarResiduos,  } from "../../controllers/trazabilidad/controller.residuos.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerResiduos = Router();

/**
 * @swagger
 * tags:
 *   name: residuos
 *   description: Endpoints para la gestion de residuos
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
 * /residuos:
 *   post:
 *     summary: Se registra un residuo con validacion de token JWT
 *     tags: [residuos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del residuo
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del registro de residuo
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion del residuo
 *               fk_id_tipo_residuo:
 *                 type: integer
 *                 description: Seleccion de tipo de residuo por medio de ID
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: Seleccion de cultivo por medio de ID
 *     responses:
 *       200:
 *         description: residuo registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "cascara de cafe"
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-07"
 *                 descripcion:
 *                   type: string
 *                   example: "Cascara de cafe residuo generado por despulpadora"
 *                 fk_id_tipo_residuo:
 *                   type: integer
 *                   example: 7
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: Error al registrar un residuo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar un residuo"
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
routerResiduos.post("/residuos",validarToken, postResiduos);

/**
 * @swagger
 * /residuos:
 *   get:
 *     summary: Se obtiene un residuo con validacion de token JWT
 *     tags: [residuos]
 *     responses:
 *       200:
 *         description: residuo obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "cascara de cafe"
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-07"
 *                 descripcion:
 *                   type: string
 *                   example: "Cascara de cafe residuo generado por despulpadora"
 *                 fk_id_tipo_residuo:
 *                   type: object
 *                   properties:
 *                     id_tipo_residuo:
 *                       type: integer
 *                       example: 1
 *                     nombre_residuo:
 *                       type: string
 *                       example: "Residuo agrario"
 *                     descripcion:
 *                       type: string
 *                       example: "son los desechos que se generan en las actividades del sector primario"
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
 *       404:
 *         description: Error al obtener un residuo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un residuo"
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
routerResiduos.get("/residuos",validarToken, getResiduos);

/**
 * @swagger
 * /residuos {id_residuo}:
 *   get:
 *     summary: Se obtiene un residuo por medio de ID con validacion de token JWT
 *     tags: [residuos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_residuo
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un residuo registrado en el sistema
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: residuo obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "cascara de cafe"
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-07"
 *                 descripcion:
 *                   type: string
 *                   example: "Cascara de cafe residuo generado por despulpadora"
 *                 fk_id_tipo_residuo:
 *                   type: object
 *                   properties:
 *                     id_tipo_residuo:
 *                       type: integer
 *                       example: 1
 *                     nombre_residuo:
 *                       type: string
 *                       example: "Residuo agrario"
 *                     descripcion:
 *                       type: string
 *                       example: "son los desechos que se generan en las actividades del sector primario"
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
 *       404:
 *         description: Error al obtener un residuo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un residuo"
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
routerResiduos.get("/residuos/:id_residuo",validarToken, IdResiduos);

/**
 * @swagger
 * /residuos {id_residuo}:
 *   put:
 *     summary: Se actualiza un residuo por medio de ID con validacion de token JWT
 *     tags: [residuos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_residuo
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualiar un residuo registrado en el sistema
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
 *               nombre:
 *                 type: string
 *                 description: Nombre del residuo
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del registro de residuo
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion del residuo
 *               fk_id_tipo_residuo:
 *                 type: integer
 *                 description: Seleccion de tipo de residuo por medio de ID
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: Seleccion de cultivo por medio de ID
 *     responses:
 *       200:
 *         description: residuo actualizado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "cascara de cafe"
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-07"
 *                 descripcion:
 *                   type: string
 *                   example: "Cascara de cafe residuo generado por despulpadora"
 *                 fk_id_tipo_residuo:
 *                   type: integer
 *                   example: 7
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: Error al actualizar un residuo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar un residuo"
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
routerResiduos.put("/residuos/:id_residuo",validarToken, actualizarResiduos)

export default routerResiduos;