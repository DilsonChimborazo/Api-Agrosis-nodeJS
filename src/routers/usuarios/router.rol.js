import { Router } from "express";
import { createRol, getRol, getRolById, updateRol } from "../../controllers/usuarios/controllers.rol.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerRol = Router ();
/**
 * @swagger
 * tags:
 *   name: Rol
 *   description: Endpoints para la gestión de roles
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
 * /rol:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Rol]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *               fecha_creacion: 
 *                 type: string
 *                 format: date
 *               
 *     responses:
 *       200:
 *         description: Rol registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_rol:
 *                   type: string
 *                   example: "aprendiz"
 *                 fecha_creacion: 
 *                   type: string
 *                   format: date
 *                   example: "2025-02-11"
 *       404:
 *         description: No se registro ningun rol en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar un rol en el sistema"
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
routerRol.post('/rol',createRol)

/**
 * @swagger
 * /rol:
 *   get:
 *     summary: Obtiene la lista de rol registrados
 *     tags: [Rol]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Rol registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_rol:
 *                   type: string
 *                   example: "aprendiz"
 *                 fecha_creacion: 
 *                   type: string
 *                   format: date
 *                   example: "2025-02-11"
 *       404:
 *         description: No se registro ningun rol en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar un rol en el sistema"
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
routerRol.get('/rol',getRol)

/**
 * @swagger
 * /rol/{id_rol}:
 *   get:
 *     summary: Obtiene un rol por id
 *     tags: [Rol]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         schema:
 *           type: string
 *         required: true
 *         description: id para obtener rol
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: Rol registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_rol:
 *                   type: string
 *                   example: "aprendiz"
 *                 fecha_creacion: 
 *                   type: string
 *                   format: date
 *                   example: "2025-02-11"
 *       404:
 *         description: No se registro ningun rol en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar un rol en el sistema"
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
routerRol.get('/rol/:id_rol',getRolById)

/**
 * @swagger
 * /rol/{id_rol}:
 *   put:
 *     summary: Actualiza un rol por su id
 *     tags: [Rol]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         schema:
 *           type: string
 *         required: true
 *         description: id para actualizar rol
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
 *               nombre_rol:
 *                 type: string
 *               fecha_creacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Rol registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_rol:
 *                   type: string
 *                   example: "aprendiz"
 *                 fecha_creacion: 
 *                   type: string
 *                   format: date
 *                   example: "2025-02-11"
 *       404:
 *         description: No se registro ningun rol en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar un rol en el sistema"
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
routerRol.put('/rol/:id_rol',updateRol) 

export default routerRol;

