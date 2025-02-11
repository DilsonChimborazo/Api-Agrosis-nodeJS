import { Router } from "express";
import { postPea, IdPea, actualizarPea, getPea } from "../../controllers/trazabilidad/controller.pea.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerPea = Router();

/**
 * @swagger
 * tags:
 *   name: pea
 *   description: Endpoints para la gestion de PEA
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
 * /pea:
 *   post:
 *     summary: Se registra un PEA con validacion de token JWT
 *     tags: [pea]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del pea
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion de la pea
 *     responses:
 *       200:
 *         description: PEA registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Araña roja"
 *                 descripcion:
 *                   type: string
 *                   example: "Es un acaro que se alimenta de plantas"
 *       404:
 *         description: Error al registrar un PEA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar un PEA"
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
routerPea.post("/pea",validarToken, postPea);

/**
 * @swagger
 * /pea:
 *   get:
 *     summary: Se obtiene un PEA con validacion de token JWT
 *     tags: [pea]
 *     responses:
 *       200:
 *         description: PEA obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Araña roja"
 *                 descripcion:
 *                   type: string
 *                   example: "Es un acaro que se alimenta de plantas"
 *       404:
 *         description: Error al obtener un PEA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un PEA"
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
routerPea.get("/pea/:id_pea",validarToken, IdPea);

/**
 * @swagger
 * /pea {id_pea}:
 *   get:
 *     summary: Se obtiene un PEA por medio de ID con validacion de token JWT
 *     tags: [pea]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especie
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener un PEA
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: PEA obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Araña roja"
 *                 descripcion:
 *                   type: string
 *                   example: "Es un acaro que se alimenta de plantas"
 *       404:
 *         description: Error al obtener un PEA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener un PEA"
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
routerPea.put("/pea/:id_pea",validarToken, actualizarPea);

/**
 * @swagger
 * /put:
 *   put:
 *     summary: Se actualiza por medio de ID un PEA con validacion de token JWT
 *     tags: [pea]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pea
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para actualizar una pea registrado en el sistema
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
 *                 description: Nombre del pea
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion de la pea
 *     responses:
 *       200:
 *         description: PEA actualizado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Araña roja"
 *                 descripcion:
 *                   type: string
 *                   example: "Es un acaro que se alimenta de plantas"
 *       404:
 *         description: Error al actualizar un PEA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar un PEA"
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
routerPea.get("/pea",validarToken, getPea);

export default routerPea;
