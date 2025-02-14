import { Router } from "express";
import { postplantacion,IdPlantacion,actualizarPlantacion, getPlantacion, getReportePlantaciones } from "../../controllers/trazabilidad/controller.plantacion.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerPlantacion = Router();

routerPlantacion.get("/plantacion/reporte",validarToken, getReportePlantaciones);

/**
 * @swagger
 * tags:
 *   name: plantacion
 *   description: Endpoints para la gestion de plantaciones
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
 * /plantacion:
 *   post:
 *     summary: Se registra una plantacion con validacion de token JWT
 *     tags: [plantacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: ID para seleccionar el cultivo
 *               fk_id_era:
 *                 type: integer
 *                 description: ID para seleccionar la era
 *     responses:
 *       200:
 *         description: plantacion registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 2
 *                 fk_id_era:
 *                   type: integer
 *                   example: 3   
 *       404:
 *         description: Error al registrar una plantacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar un plantacion"
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
routerPlantacion.post("/plantacion",validarToken, postplantacion);

/**
 * @swagger
 * /plantacion {id_plantacion}:
 *   get:
 *     summary: Se obtiene una plantacion por medio de ID con validacion de token JWT
 *     tags: [plantacion]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_plantacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una plantacion registrado en el sistema
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: plantacion obtenida correctamente 
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
 *                 fk_id_era:
 *                   type: object
 *                   properties:
 *                     id_eras:
 *                       type: integer
 *                       example: 1
 *                     descripcion:
 *                       type: string
 *                       example: "era 1 ubicado en el lote 1"
 *                     fk_id_lote:
 *                       type: object
 *                       properties: 
 *                         id_lote:
 *                           type: integer
 *                           example: 1
 *                         dimension:
 *                           type: integer
 *                           example: 24
 *                         nombre_lote:
 *                           type: string
 *                           example: "lote 1"
 *                         estado:
 *                           type: string
 *                           example: "activo"
 *                         fk_id_ubicacion:
 *                           type: object
 *                           properties: 
 *                             id_ubicacion:
 *                               type: integer
 *                               example: 1
 *                             latitud: 
 *                               type: string
 *                               example: "23.5"
 *                             longitud:
 *                                type: integer
 *                                example: 20
 *       404:
 *         description: Error al obtener una plantacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un plantacion"
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
routerPlantacion.get("/plantacion/:id_plantacion",validarToken, IdPlantacion);

/**
 * @swagger
 * /plantacion {id_plantacion}:
 *   put:
 *     summary: Se actualiza una plantacion por medio de ID con validacion de token JWT
 *     tags: [plantacion]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_plantacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar una plantacion registrado en el sistema
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
 *                 description: ID para seleccionar el cultivo
 *               fk_id_era:
 *                 type: integer
 *                 description: ID para seleccionar la era
 *     responses:
 *       200:
 *         description: plantacion actualizado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                   example: 5
 *                 fk_id_era:
 *                   type: integer
 *                   example: 2 
 *       404:
 *         description: Error al actualizar una plantacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar un plantacion"
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
routerPlantacion.put("/plantacion/:id_plantacion",validarToken,actualizarPlantacion);

/**
 * @swagger
 * /plantacion:
 *   get:
 *     summary: Se obtiene una plantacion con validacion de token JWT
 *     tags: [plantacion]
 *     responses:
 *       200:
 *         description: plantacion obtenida correctamente 
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
 *                 fk_id_era:
 *                   type: object
 *                   properties:
 *                     id_eras:
 *                       type: integer
 *                       example: 1
 *                     descripcion:
 *                       type: string
 *                       example: "era 1 ubicado en el lote 1"
 *                     fk_id_lote:
 *                       type: object
 *                       properties: 
 *                         id_lote:
 *                           type: integer
 *                           example: 1
 *                         dimension:
 *                           type: integer
 *                           example: 24
 *                         nombre_lote:
 *                           type: string
 *                           example: "lote 1"
 *                         estado:
 *                           type: string
 *                           example: "activo"
 *                         fk_id_ubicacion:
 *                           type: object
 *                           properties: 
 *                             id_ubicacion:
 *                               type: integer
 *                               example: 1
 *                             latitud: 
 *                               type: string
 *                               example: "23.5"
 *                             longitud:
 *                                type: integer
 *                                example: 20
 *       404:
 *         description: Error al obtener una plantacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un plantacion"
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
routerPlantacion.get("/plantacion",validarToken, getPlantacion)
export default routerPlantacion;