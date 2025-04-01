import { Router } from "express";
import { actualizarTipoResiduo, getTipoResiduo, IdTipoCultivo, postTipoResiduo, getReporteTiposResiduos } from "../../controllers/trazabilidad/controller.tipo_residuo.js";
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerTipoResiduo = Router();

/**
 * @swagger
 * /tiporesiduo/reporte:
 *   get:
 *     summary: Obtiene un reporte de tipos de residuos registrados
 *     tags: [Reporte de Tipo Residuo]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte de tipos de residuos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   total_tipos_residuos:
 *                     type: integer
 *                     example: 4
 *                   nombres_residuos:
 *                     type: string
 *                     example: "Orgánico"
 *       404:
 *         description: No hay reporte de tipos de residuos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay reporte de tipos de residuos registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerTipoResiduo.get("/tiporesiduo/reporte",validarToken,getReporteTiposResiduos );

/**
 * @swagger
 * tags:
 *   name: Tipo Residuo
 *   description: Endpoints para la gestion la tabla Tipo Residuo
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
 * /tiporesiduo:
 *   post:
 *     summary: Crea un nuevo tipo de residuo
 *     tags: [Tipo Residuo]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Plástico"
 *               descripcion:
 *                 type: string
 *                 example: "Residuos plásticos reciclables"
 *     responses:
 *       201:
 *         description: Tipo de residuo registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tipo de residuo registrado correctamente"
 *       400:
 *         description: No se pudo registrar el tipo de residuo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo registrar el tipo de residuo"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */

routerTipoResiduo.post("/tiporesiduo",validarToken,postTipoResiduo );

/**
 * @swagger
 * /tiporesiduo:
 *   get:
 *     summary: Obtiene la lista de tipos de residuos registrados
 *     tags: [Tipo Residuo]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de residuos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Orgánico"
 *                   descripcion:
 *                     type: string
 *                     example: "Residuos de origen vegetal y animal"
 *       404:
 *         description: No hay tipos de residuos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay tipos de residuos registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */


routerTipoResiduo.get("/tiporesiduo",validarToken,getTipoResiduo); 

/**
 * @swagger
 * /tiporesiduo[id_tipo_residuo]:
 *   get:
 *     summary: Obtiene la lista de tipos de residuos registrados por ID
 *     tags: [Tipo Residuo]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de residuos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Orgánico"
 *                   descripcion:
 *                     type: string
 *                     example: "Residuos de origen vegetal y animal"
 *       404:
 *         description: No hay tipos de residuos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay tipos de residuos registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerTipoResiduo.get("/tiporesiduo/:id_tipo_residuo",validarToken,IdTipoCultivo);

/**
 * @swagger
 * /tiporesiduo[id_tipo_residuo]:
 *   put:
 *     summary: Actualiza los datos de la tabla residuo
 *     tags: [Tipo Residuo]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Plástico"
 *               descripcion:
 *                 type: string
 *                 example: "Residuos plásticos reciclables"
 *     responses:
 *       201:
 *         description: Tipo de residuo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tipo de residuo actualizado correctamente"
 *       400:
 *         description: No se pudo actualizar el tipo de residuo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo actualizar el tipo de residuo"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerTipoResiduo.put("/tiporesiduo/:id_tipo_residuo",validarToken,actualizarTipoResiduo );

export default routerTipoResiduo;
