import { Router } from "express";
import { createUsuarios, getUsuarios, getUsuariosById, updateUsuarios, getReporteUsuarios} from "../../controllers/usuarios/controllers.usuarios.js";
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerUsuarios = Router()

routerUsuarios.get('/usuarios/reporte', validarToken, getReporteUsuarios);


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
 *               identificacion:
 *                 type: integer
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
 *       200:
 *         description: usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Wilson Eduardo Samboni Rodriguez"
 *                 email: 
 *                   type: string
 *                   example: "samboniwilson09@gmail.com"
 *                 contrasena:
 *                   type: string
 *                   example: "fksdgfashdfjasf-sdasd-sdasd"
 *                 fk_id_rol: 
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: No se registro ningun usuario en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo registrar un usuario en el sistema"
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
routerUsuarios.post('/usuarios', createUsuarios);

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
 *         description: usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Wilson Eduardo Samboni Rodriguez"
 *                 email: 
 *                   type: string
 *                   example: "samboniwilson09@gmail.com"
 *                 contrasena:
 *                   type: string
 *                   example: "fksdgfashdfjasf-sdasd-sdasd"
 *                 fk_id_rol: 
 *                   type: object
 *                   properties:
 *                     id_rol:
 *                       type: integer
 *                       example: 1
 *                     nombre_rol:
 *                       type: string
 *                       example: "aprendiz"
 *                     fecha_creacion:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-11"
 *       404:
 *         description: No se obtuvo ningun usuario en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener un usuario en el sistema"
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
routerUsuarios.get('/usuarios', getUsuarios);

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
 *         description: usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Wilson Eduardo Samboni Rodriguez"
 *                 email: 
 *                   type: string
 *                   example: "samboniwilson09@gmail.com"
 *                 contrasena:
 *                   type: string
 *                   example: "fksdgfashdfjasf-sdasd-sdasd"
 *                 fk_id_rol: 
 *                   type: object
 *                   properties:
 *                     id_rol:
 *                       type: integer
 *                       example: 1
 *                     nombre_rol:
 *                       type: string
 *                       example: "aprendiz"
 *                     fecha_creacion:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-11"
 *       404:
 *         description: No se registro ningun usuario en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo obtener un usuario en el sistema"
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
 *         description: usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "karina danitza arteaga"
 *                 email: 
 *                   type: string
 *                   example: "karina@gmail.com"
 *                 contrasena:
 *                   type: string
 *                   example: "fksdgfashdfjasf-sdasd-sdasd"
 *                 fk_id_rol: 
 *                   type: object
 *                   properties:
 *                     id_rol:
 *                       type: integer
 *                       example: 1
 *                     nombre_rol:
 *                       type: string
 *                       example: "aprendiz"
 *                     fecha_creacion:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-11"
 *       404:
 *         description: No se actualizo ningun usuario en el sistema 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se pudo actualizar un usuario en el sistema"
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
routerUsuarios.put('/usuarios/:identificacion', updateUsuarios);

export default routerUsuarios;
