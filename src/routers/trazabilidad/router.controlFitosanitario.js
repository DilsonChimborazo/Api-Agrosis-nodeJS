import { Router } from "express";
import { postControlFitosanitario, getControlFitosanitario, IdControlFitosanitario, actualizarControlFitosanitario } from "../../controllers/trazabilidad/controller.controlFitosanitario.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const RouterCF = Router();

/**
 * @swagger
 * tags:
 *   name: controlFitosanitario
 *   description: Endpoints para la gestion de control fitosanitario
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
 * /controlFitosanitario:
 *   post:
 *     summary: Se registra un control fitosanitario con validacion de token JWT
 *     tags: [controlFitosanitario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_control:
 *                 type: string
 *                 format: date
 *                 description: Fecha del control fitosanitario
 *               descripcion:
 *                 type: string
 *                 description: Descripcion del control al realizar
 *               fk_id_desarrollan:
 *                 type: integer
 *                 description: seleccion de desarrollo por medio de un ID
 *     responses:
 *       200:
 *         description: Asignacion control fitosanitario registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_control:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-08"
 *                 descripcion:
 *                   type: string
 *                   example: "Prevenir la introduccion de plagas y enfermedades"
 *                 fk_id_desarrollan:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Error al registrar un control fitosanitario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar un control fitosanitario"
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
RouterCF.post("/controlfitosanitario",validarToken, postControlFitosanitario);


/**
 * @swagger
 * /controlFitosanitario:
 *   get:
 *     summary: Se obtiene un control fitosanitario con validacion de token JWT
 *     tags: [controlFitosanitario]
 *     responses:
 *       200:
 *         description: Control fitosanitario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_control:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-07"
 *                 descripcion:
 *                   type: string
 *                   example: "Prevenir la introduccion de plagas y enfermedades"
 *                 fk_id_desarrollan:
 *                   type: object
 *                   properties:
 *                     id_desarrollan:
 *                       type: integer
 *                       example: 2     
 *                     fk_id_cultivo:
 *                       type: object
 *                       properties:
 *                         id_cultivo:
 *                           type: integer
 *                           example: 4
 *                         fecha_plantacion:
 *                           type: string
 *                           format: date
 *                           example: "2024-12-31"
 *                         nombre_cultivo:
 *                           type: string
 *                           example: "cebolla"
 *                         descripcion: 
 *                           type: string
 *                           example: "Es muy bonita"
 *                         fk_id_especie:
 *                           type: object
 *                           properties:
 *                             id_especie:
 *                               type: integer
 *                               example: 5
 *                             nombre_comun:
 *                               type: string
 *                               example: "cebolla"
 *                             nombre_cientifico:
 *                               type: string
 *                               example: "cebollus"
 *                             descripcion:
 *                               type: string
 *                               example: "cebolla" 
 *                             fk_id_tipo_cultivo:
 *                               type: object
 *                               properties:
 *                                 id_tipo_cultivo:
 *                                   type: integer
 *                                   example: 3
 *                                 nombre:
 *                                   type: string
 *                                   example: "hortaliza"
 *                                 descripcion:
 *                                   type: string
 *                                   example: "Es muy bonita y grande"
 *                     fk_id_pea:
 *                       type: object
 *                       properties:
 *                         id_pea: 
 *                           type: integer
 *                           example: 3
 *                         nombre:
 *                           type: string
 *                           example: "Mariposas"
 *       404:
 *         description: Error al registrar el control fitosanitario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar el control fitosanitario"
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
RouterCF.get("/controlfitosanitario",validarToken, getControlFitosanitario);

/**
 * @swagger
 * /controlFitosanitario {id_control_fitosanitario}:
 *   get:
 *     summary: Se obtiene un control fitosanitario con validacion de token JWT
 *     tags: [controlFitosanitario]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_control_fitosanitario
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un control fitosanitario 
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Control fitosanitario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_control:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-07"
 *                 descripcion:
 *                   type: string
 *                   example: "Prevenir la introduccion de plagas y enfermedades"
 *                 fk_id_desarrollan:
 *                   type: object
 *                   properties:
 *                     id_desarrollan:
 *                       type: integer
 *                       example: 2     
 *                     fk_id_cultivo:
 *                       type: object
 *                       properties:
 *                         id_cultivo:
 *                           type: integer
 *                           example: 4
 *                         fecha_plantacion:
 *                           type: string
 *                           format: date
 *                           example: "2024-12-31"
 *                         nombre_cultivo:
 *                           type: string
 *                           example: "cebolla"
 *                         descripcion: 
 *                           type: string
 *                           example: "Es muy bonita"
 *                         fk_id_especie:
 *                           type: object
 *                           properties:
 *                             id_especie:
 *                               type: integer
 *                               example: 5
 *                             nombre_comun:
 *                               type: string
 *                               example: "cebolla"
 *                             nombre_cientifico:
 *                               type: string
 *                               example: "cebollus"
 *                             descripcion:
 *                               type: string
 *                               example: "cebolla" 
 *                             fk_id_tipo_cultivo:
 *                               type: object
 *                               properties:
 *                                 id_tipo_cultivo:
 *                                   type: integer
 *                                   example: 3
 *                                 nombre:
 *                                   type: string
 *                                   example: "hortaliza"
 *                                 descripcion:
 *                                   type: string
 *                                   example: "Es muy bonita y grande"
 *                     fk_id_pea:
 *                       type: object
 *                       properties:
 *                         id_pea: 
 *                           type: integer
 *                           example: 3
 *                         nombre:
 *                           type: string
 *                           example: "Mariposas"
 *       404:
 *         description: Error al registrar el control fitosanitario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar el control fitosanitario"
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
RouterCF.get("/controlfitosanitario/:id_control_fitosanitario",validarToken, IdControlFitosanitario);

/**
 * @swagger
 * /controlFitosanitario {id_control_fitosanitario}:
 *   put:
 *     summary: Se actualiza un control fitosanitario por medio de ID con validacion de token JWT
 *     tags: [controlFitosanitario]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_control_fitosanitario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID para actualizar un control fitosanitario 
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
 *               fecha_control:
 *                 type: string
 *                 format: date
 *                 description: Fecha del control fitosanitario
 *               descripcion:
 *                 type: string
 *                 description: Descripcion del control al realizar
 *               fk_id_desarrollan:
 *                 type: integer
 *                 description: seleccion de desarrollo por medio de un ID
 *     responses:
 *       200:
 *         description: Asignacion control fitosanitario actualizado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               fecha_control:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               descripcion:
 *                 type: string
 *                 example: "Prevenir la introduccion de plagas y enfermedades"
 *               fk_id_desarrollan:
 *                 type: integer
 *                 example: 2
 *       404:
 *         description: Error al actualizar un control fitosanitario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar un control fitosanitario"
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
RouterCF.put("/controlfitosanitario/:id_control_fitosanitario",validarToken,actualizarControlFitosanitario)
export default RouterCF;