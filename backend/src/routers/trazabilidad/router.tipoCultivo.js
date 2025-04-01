import {Router} from 'express';
import { createTipoCultivo, getTipoCultivo, getTipoCultivoById, updateTipoCultivo, getReporteTiposCultivos } from '../../controllers/trazabilidad/controller.tipoCultivo.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerTipoCultivo = Router();

/**
 * @swagger
 * /tipo_cultivo/reporte:
 *   get:
 *     summary: Se obtiene un reporte tipo de cultivo con validacion de token JWT
 *     tags: [Reporte de tipo_cultivo]
 *     responses:
 *       200:
 *         description: Reporte de tipo_cultivo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_tipo_cultivos:
 *                   type: integer
 *                   example: 5
 *                 nombres_cultivos:
 *                   type: string
 *                   example: "Hortalizas"
 *       404:
 *         description: No se obtuvo el reporte tipo de cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener el reporte de tipo de cultivo"
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
routerTipoCultivo.get('/tipo_cultivo/reporte',validarToken,getReporteTiposCultivos)

/**
 * @swagger
 * tags:
 *   name: tipo_cultivo
 *   description: Endpoints para la gestion de tipos de cultivos
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
 * /tipo_cultivo:
 *   post:
 *     summary: Se registra un tipo de cultivo con validacion de token JWT
 *     tags: [tipo_cultivo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: nombre del tipo de cultivo a registrar
 *               descripcion:
 *                 type: string
 *                 description: Descripcion del tipo de cultivo
 *     responses:
 *       200:
 *         description: Semillero registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Hortalizas"
 *                 descripcion:
 *                   type: string
 *                   example: "son plantas cultivadas que se consumen como alimento"
 *       404:
 *         description: No se registro el tipo de cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar el tipo de cultivo"
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
routerTipoCultivo.post('/tipo_cultivo',validarToken,createTipoCultivo)

/**
 * @swagger
 * /tipo_cultivo:
 *   get:
 *     summary: Se obtiene un tipo de cultivo con validacion de token JWT
 *     tags: [tipo_cultivo]
 *     responses:
 *       200:
 *         description: Semillero obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Hortalizas"
 *                 descripcion:
 *                   type: string
 *                   example: "son plantas cultivadas que se consumen como alimento"
 *       404:
 *         description: No se obtuvo el tipo de cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener el tipo de cultivo"
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
routerTipoCultivo.get('/tipo_cultivo',validarToken,getTipoCultivo)

/**
 * @swagger
 * /tipo_cultivo {id_tipo_cultivo}:
 *   get:
 *     summary: Se obtiene un tipo de cultivo por medio de ID con validacion de token JWT
 *     tags: [tipo_cultivo]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_tipo_cultivo
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un tipo cultivo
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Semillero obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Hortalizas"
 *                 descripcion:
 *                   type: string
 *                   example: "son plantas cultivadas que se consumen como alimento"
 *       404:
 *         description: No se obtuvo el tipo de cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener el tipo de cultivo"
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
routerTipoCultivo.get('/tipo_cultivo/:id_tipo_cultivo',validarToken,getTipoCultivoById)

/**
 * @swagger
 * /tipo_cultivo {id_tipo_cultivo}:
 *   put:
 *     summary: Se actualiza un tipo de cultivo por medio de ID con validacion de token JWT
 *     tags: [tipo_cultivo]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_tipo_cultivo
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar un tipo cultivo
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
 *               nombre:
 *                 type: string
 *                 description: nombre del tipo de cultivo a registrar
 *               descripcion:
 *                 type: string
 *                 description: Descripcion del tipo de cultivo
 *     responses:
 *       200:
 *         description: Semillero actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Hortalizas"
 *                 descripcion:
 *                   type: string
 *                   example: "son plantas cultivadas que se consumen como alimento"
 *       404:
 *         description: No se actualizo el tipo de cultivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo actualizar el tipo de cultivo"
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
routerTipoCultivo.put('/tipo_cultivo/:id_tipo_cultivo',validarToken,updateTipoCultivo)

export default routerTipoCultivo;