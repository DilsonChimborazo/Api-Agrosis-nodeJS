import { Router} from 'express';
import { getRequiere, addRequiere, IdRequiere, actualizarRequiere } from '../../controllers/inventario/Requiere.controllers.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';
const routerRequiere = Router();

/**
 * @swagger
 * tags:
 *   name: Requiere
 *   description: Endpoints para la gestion la tabla requiere
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
 * /requiere:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla requiere con validacion de token JWT
 *     tags: [Requiere]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_herramienta:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla herramientas
 *                 example: 1
 *               fk_id_asignacion_actividad:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla asignacion de actividades
 *                 example: 1
 *     responses:
 *       200:
 *         description: requiere registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "requiere registrada con éxito"
 *       400:
 *         description: Error al registrar requiere
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar requiere"
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
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerRequiere.post('/requiere',validarToken, addRequiere);
/**
 * @swagger
 * /requiere:
 *   get:
 *     summary: Obtener todos los registro de requiere 
 *     description: Devuelve la información de un registro en la tabla `requiere` con todas sus relaciones.
 *     tags:
 *       - Requiere
 *     parameters:
 *       - in: path
 *         name: id_requiere
 *         required: true
 *         description: ID del registro en la tabla `requiere`
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 fk_id_insumo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     nombre:
 *                       type: string
 *                       example: "Fertilizante"
 *                     tipo:
 *                       type: string
 *                       example: "Químico"
 *                     precio_unidad:
 *                       type: number
 *                       format: float
 *                       example: 15.75
 *                     cantidad:
 *                       type: integer
 *                       example: 50
 *                     unidad_medida:
 *                       type: string
 *                       example: "kg"
 *                 fk_id_asignacion_actividad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-07"
 *                     fk_id_actividad:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         nombre:
 *                           type: string
 *                           example: "Riego"
 *                         descripcion:
 *                           type: string
 *                           example: "Riego por goteo en la mañana"
 *                     fk_identificacion:
 *                       type: object
 *                       properties:
 *                         identificacion:
 *                           type: integer
 *                           example: 123456789
 *                         nombre:
 *                           type: string
 *                           example: "Juan Pérez"
 *                         contraseña:
 *                           type: string
 *                           example: "hashedpassword"
 *                         email:
 *                           type: string
 *                           example: "juan@example.com"
 *                         fk_id_rol:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 3
 *                             nombre_rol:
 *                               type: string
 *                               example: "Supervisor"
 *                             fecha_creacion:
 *                               type: string
 *                               format: date
 *                               example: "2024-01-15"
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
 *       404:
 *         description: No se encontró el registro de `requiere`
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay utilizaciones registradas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */

routerRequiere.get('/requiere',validarToken, getRequiere);

/**
 * @swagger
 * /requiere/[id_requiere]:
 *   get:
 *     summary: Obtener un registro de requiere por ID
 *     description: Devuelve la información de un registro en la tabla `requiere` con todas sus relaciones.
 *     tags:
 *       - Requiere
 *     parameters:
 *       - in: path
 *         name: id_requiere
 *         required: true
 *         description: ID del registro en la tabla `requiere`
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 fk_id_insumo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     nombre:
 *                       type: string
 *                       example: "Fertilizante"
 *                     tipo:
 *                       type: string
 *                       example: "Químico"
 *                     precio_unidad:
 *                       type: number
 *                       format: float
 *                       example: 15.75
 *                     cantidad:
 *                       type: integer
 *                       example: 50
 *                     unidad_medida:
 *                       type: string
 *                       example: "kg"
 *                 fk_id_asignacion_actividad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-07"
 *                     fk_id_actividad:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         nombre:
 *                           type: string
 *                           example: "Riego"
 *                         descripcion:
 *                           type: string
 *                           example: "Riego por goteo en la mañana"
 *                     fk_identificacion:
 *                       type: object
 *                       properties:
 *                         identificacion:
 *                           type: integer
 *                           example: 123456789
 *                         nombre:
 *                           type: string
 *                           example: "Juan Pérez"
 *                         contraseña:
 *                           type: string
 *                           example: "hashedpassword"
 *                         email:
 *                           type: string
 *                           example: "juan@example.com"
 *                         fk_id_rol:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 3
 *                             nombre_rol:
 *                               type: string
 *                               example: "Supervisor"
 *                             fecha_creacion:
 *                               type: string
 *                               format: date
 *                               example: "2024-01-15"
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
 *       404:
 *         description: No se encontró el registro de `requiere`
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay utilizaciones registradas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */

routerRequiere.get("/requiere/:id_requiere",validarToken, IdRequiere);

/**
 * @swagger
 * /requiere/[id_requiere]:
 *   put:
 *     summary: Se actualiza un nuevo dato en la tabla requiere por ID
 *     tags: [Requiere]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_herramienta:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla herramientas
 *                 example: 1
 *               fk_id_asignacion_actividad:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla asignacion de actividades
 *                 example: 1
 *     responses:
 *       200:
 *         description: requiere registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "requiere registrada con éxito"
 *       400:
 *         description: Error al registrar requiere
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar requiere"
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
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
routerRequiere.put("/requiere/:id_requiere",validarToken, actualizarRequiere);

export default routerRequiere;
