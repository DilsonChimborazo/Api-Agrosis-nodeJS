import { Router } from "express";
import { postCultivo,IdCultivo,actualizarCultivo,getCultivo, getReporteCultivosActivos } from "../../controllers/trazabilidad/controller.cultivo.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerCultivo = Router();

routerCultivo.get("/cultivo/reporte",validarToken, getReporteCultivosActivos);

/**
 * @swagger
 * tags:
 *   name: cultivo
 *   description: Endpoints para la gestion de cultivos
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
 * /cultivo:
 *   post:
 *     summary: Se registra un cultivo con validacion de token JWT
 *     tags: [cultivo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_plantacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la plantacion del cultivo
 *               nombre_cultivo:
 *                 type: string
 *                 description: Descripcion del cultivo
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion del cultivo
 *               fk_id_especie:
 *                 type: integer
 *                 description: Seleccion de especie por medio de ID
 *               fk_id_semillero:
 *                 type: integer
 *                 description: Seleccion de semillero por medio de ID
 *     responses:
 *       200:
 *         description: Cultivo registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_plantacion:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-10"
 *                 nombre_cultivo:
 *                   type: string
 *                   example: "cebolla"
 *                 descripcion:
 *                   type: string
 *                   example: "Una cebolla muy grande y fuerte"
 *                 fk_id_especie:
 *                   type: integer
 *                   example: 2
 *                 fk_id_semillero:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Error al registrar un cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar un cultivo"
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
routerCultivo.post("/cultivo",validarToken, postCultivo);

/**
 * @swagger
 * /cultivo:
 *   get:
 *     summary: Se obtiene un cultivo con validacion de token JWT
 *     tags: [cultivo]
 *     responses:
 *       200:
 *         description: cultivo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_plantacion:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-10"
 *                 nombre_cultivo:
 *                   type: string
 *                   example: "cebolla"
 *                 descripcion:
 *                   type: string
 *                   example: "Una cebolla muy grande y fuerte"
 *                 fk_id_especie:
 *                   type: object
 *                   properties:
 *                     id_especie:
 *                       type: integer
 *                       example: 1
 *                     nombre_comun:
 *                       type: string
 *                       example: "hortaliza"
 *                     nombre_cientifico:
 *                       type: string
 *                       example: "hortalizus"
 *                     descripcion:
 *                       type: string
 *                       example: "Las hortalizas son un grupo de plantas cultivadas principalmente para el consumo humano, ya sea en estado fresco o procesado."
 *                     fk_id_tipo_cultivo:
 *                       type: object
 *                       properties:
 *                         id_tipo_cultivo:
 *                           type: integer
 *                           example: 2
 *                         nombre:
 *                           type: string
 *                           example: "Hortaliza"
 *                         descripcion:
 *                            type: string
 *                            example: "Son una fuente importante de vitaminas, minerales, fibra y antioxidantes, contribuyendo a una alimentación saludable. "
 *                 fk_id_semillero:
 *                   type: object
 *                   properties:
 *                     id_semillero:
 *                       type: integer
 *                       example: 3
 *                     nombre_semilla:
 *                       type: string
 *                       example: "Hortaliza de hoja"
 *                     fecha_siembra:
 *                       type: string
 *                       format: date
 *                       example: "2025-04-11"
 *                     fecha_estimada:
 *                       type: string
 *                       format: date
 *                       example: "2025-05-11"
 *                     cantidad: 
 *                       type: integer
 *                       example: 20
 *       404:
 *         description: Error al obtener un cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un cultivo"
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
routerCultivo.get("/cultivo/:id_cultivo",validarToken, IdCultivo);

/**
 * @swagger
 * /cultivo {id_cultivo}:
 *   put:
 *     summary: Se actualiza un cultivo por medio de ID con validacion de token JWT
 *     tags: [cultivo]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_cultivo
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un cultivo
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
 *               fecha_plantacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la plantacion del cultivo
 *               nombre_cultivo:
 *                 type: string
 *                 description: Descripcion del cultivo
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion del cultivo
 *               fk_id_especie:
 *                 type: integer
 *                 description: Seleccion de especie por medio de ID
 *               fk_id_semillero:
 *                 type: integer
 *                 description: Seleccion de semillero por medio de ID
 *     responses:
 *       200:
 *         description: cultivo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_plantacion:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-10"
 *                 nombre_cultivo:
 *                   type: string
 *                   example: "zanahoria"
 *                 descripcion:
 *                   type: string
 *                   example: "Una zanahoria muy grande y fuerte"
 *                 fk_id_especie:
 *                   type: integer
 *                   example: 3
 *                 fk_id_semillero:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: Error al actualizar un cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar un cultivo"
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
routerCultivo.put("/cultivo/:id_cultivo",validarToken,actualizarCultivo);

/**
 * @swagger
 * /cultivo {id_cultivo}:
 *   get:
 *     summary: Se obtiene un cultivo por medio de ID con validacion de token JWT
 *     tags: [cultivo]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_cultivo
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un cultivo
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: cultivo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_plantacion:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-10"
 *                 nombre_cultivo:
 *                   type: string
 *                   example: "cebolla"
 *                 descripcion:
 *                   type: string
 *                   example: "Una cebolla muy grande y fuerte"
 *                 fk_id_especie:
 *                   type: object
 *                   properties:
 *                     id_especie:
 *                       type: integer
 *                       example: 1
 *                     nombre_comun:
 *                       type: string
 *                       example: "hortaliza"
 *                     nombre_cientifico:
 *                       type: string
 *                       example: "hortalizus"
 *                     descripcion:
 *                       type: string
 *                       example: "Las hortalizas son un grupo de plantas cultivadas principalmente para el consumo humano, ya sea en estado fresco o procesado."
 *                     fk_id_tipo_cultivo:
 *                       type: object
 *                       properties:
 *                         id_tipo_cultivo:
 *                           type: integer
 *                           example: 2
 *                         nombre:
 *                           type: string
 *                           example: "Hortaliza"
 *                         descripcion:
 *                            type: string
 *                            example: "Son una fuente importante de vitaminas, minerales, fibra y antioxidantes, contribuyendo a una alimentación saludable. "
 *                 fk_id_semillero:
 *                   type: object
 *                   properties:
 *                     id_semillero:
 *                       type: integer
 *                       example: 3
 *                     nombre_semilla:
 *                       type: string
 *                       example: "Hortaliza de hoja"
 *                     fecha_siembra:
 *                       type: string
 *                       format: date
 *                       example: "2025-04-11"
 *                     fecha_estimada:
 *                       type: string
 *                       format: date
 *                       example: "2025-05-11"
 *                     cantidad: 
 *                       type: integer
 *                       example: 20
 *       404:
 *         description: Error al obtener un cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un cultivo"
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
routerCultivo.get("/cultivo",validarToken, getCultivo);
export default routerCultivo;