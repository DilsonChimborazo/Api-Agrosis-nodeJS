import {Router} from 'express';
import { createCalendarioLunar, getCalendarioLunar, getCalendarioLunarById, updateCalendarioLunar } from '../../controllers/trazabilidad/controller.calendarioLunar.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routercalendario_lunar = Router();

/**
 * @swagger
 * tags:
 *   name: calendario_lunar
 *   description: Endpoints para la gestion del calendario lunar
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
 * /calendario_lunar:
 *   post:
 *     summary: Se registra un evento en el calendario lunar con validacion de token JWT
 *     tags: [calendario_lunar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se registra este evento
 *               descripcion_evento:
 *                 type: string
 *                 description: Descripcion del evento a registrar en el calendario
 *               evento:
 *                 type: string
 *                 description: Evento al registrar en el calendario lunar
 *     responses:
 *       200:
 *         description: Evento en el calendario lunar registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 descripcion_evento:
 *                   type: string
 *                   example: "Dia 31 luna nueva perefecto para sembrar"
 *                 evento:
 *                   type: string
 *                   example: "Luna nueva"
 *       404:
 *         description: No se registro el evento en el calendario lunar 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar el evento en el calendario lunar"
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
routercalendario_lunar.post('/calendario_lunar',validarToken,createCalendarioLunar)

/**
 * @swagger
 * /calendario_lunar:
 *   get:
 *     summary: Se obtiene los eventos registrados en el calendario lunar con validacion de token JWT
 *     tags: [calendario_lunar]
 *     responses:
 *       200:
 *         description: Devuelve el contenido solicitado de los eventos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 descripcion_evento:
 *                   type: string
 *                   example: "Dia 31 luna nueva perefecto para sembrar"
 *                 evento:
 *                   type: string
 *                   example: "Luna nueva"
 *       404:
 *         description: No hay eventos en el calendario lunar registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay eventos en el calendario lunar registrados"
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
routercalendario_lunar.get('/calendario_lunar',validarToken,getCalendarioLunar)

/**
 * @swagger
 * /calendario_lunar {id_calendario_lunar}:
 *   get:
 *     summary: Se obtiene los eventos registrados en el calendario lunar por medio del ID con validacion de token JWT
 *     tags: [calendario_lunar]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_calendario_lunar
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un evento registrado en el calendario lunar
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Devuelve el contenido solicitado de los eventos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 descripcion_evento:
 *                   type: string
 *                   example: "Dia 31 luna nueva perefecto para sembrar"
 *                 evento:
 *                   type: string
 *                   example: "Luna nueva"
 *       404:
 *         description: No hay eventos en el calendario lunar registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay eventos en el calendario lunar registrados"
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
routercalendario_lunar.get('/calendario_lunar/:id_calendario_lunar',validarToken,getCalendarioLunarById)

/**
 * @swagger
 * /calendario_lunar {id_calendario_lunar}:
 *   put:
 *     summary: Se obtiene los eventos registrados en el calendario lunar por medio del ID con validacion de token JWT
 *     tags: [calendario_lunar]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_calendario_lunar
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un evento registrado en el calendario lunar
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
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se registra este evento
 *               descripcion_evento:
 *                 type: string
 *                 description: Descripcion del evento a registrar en el calendario
 *               evento:
 *                 type: string
 *                 description: Evento al registrar en el calendario lunar
 *     responses:
 *       200:
 *         description: Devuelve el contenido solicitado de los eventos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-31"
 *                 descripcion_evento:
 *                   type: string
 *                   example: "Dia 31 luna nueva perefecto para fumigar"
 *                 evento:
 *                   type: string
 *                   example: "Luna nueva"
 *       404:
 *         description: No hay eventos en el calendario lunar registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay eventos en el calendario lunar registrados"
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
routercalendario_lunar.put('/calendario_lunar/:id_calendario_lunar',validarToken,updateCalendarioLunar)

export default routercalendario_lunar;


