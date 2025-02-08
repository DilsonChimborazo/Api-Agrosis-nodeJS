import { Router } from "express";
import { createUsuarios, getUsuarios, getUsuariosById, updateUsuarios } from "../../controllers/usuarios/controllers.usuarios.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerUsuarios = Router()

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
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
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
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
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               fk_id_rol: 
 *                 type: integer
 *               
 *     responses:
 *       201:
 *         description: Usuario registrado con exito
 *       400:
 *         description: Error al registrar usuario
 *       403:
 *         description: Token es requerido, token no esta autorizado
 *       500:
 *         description: Error en el servidor
 */
routerUsuarios.post('/usuarios', validarToken, createUsuarios);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     tags: [Usuarios]
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
 *         description: "ok"
 *       400:
 *         description: No hay usuarios registrados
 *       403:
 *         description: Token es requerido, token no esta autorizado
 *       500:
 *         description: Error en el servidor
 */
routerUsuarios.get('/usuarios', validarToken, getUsuarios);

/**
 * @swagger
 * /usuarios/{identificacion}:
 *   get:
 *     summary: Obtiene un usuario por su identificación
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: identificacion
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificación del usuario
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *         description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: "ok"
 *       400:
 *         description: No hay usuarios registrados
 *       403:
 *         description: Token es requerido, token no esta autorizado
 *       500:
 *         description: Error en el servidor
 */
routerUsuarios.get('/usuarios/:identificacion', validarToken, getUsuariosById);

/**
 * @swagger
 * /usuarios/{identificacion}:
 *   put:
 *     summary: Actualiza un usuario por su identificación
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: identificacion
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificación del usuario
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
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               fk_id_rol: 
 *                 type: integer
 *     responses:
 *       200:
 *         description: "ok"
 *       400:
 *         description: Erro al actualizar usuario
 *       403:
 *         description: Token es requerido, token no esta autorizado
 *       500:
 *         description: Error en el servidor
 */
routerUsuarios.put('/usuarios/:identificacion', validarToken, updateUsuarios);

export default routerUsuarios;
