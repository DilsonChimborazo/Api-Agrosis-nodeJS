
import {Router} from 'express';
import { getUtiliza, addUtiliza, IdUtiliza, actualizarUtiliza  } from '../../controllers/inventario/Utiliza.controllers.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerUtiliza = Router();

/**
 * @swagger
 * tags:
 *   name: Utiliza
 *   description: Endpoints para la gestion la tabla Utiliza
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
 * /utiliza:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla Utiliza con validacion de token JWT
 *     tags: [Utiliza]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_insumo:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla herramientas
 *                 example: 1
 *               fk_id_asignacion_actividad:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla asignacion de actividades
 *                 example: 1
 *     responses:
 *       200:
 *         description: utilizacion registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "utilizacion registrada con éxito"
 *       400:
 *         description: Error al registrar utiliza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar utiliza"
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
routerUtiliza.post('/utiliza',validarToken, addUtiliza);

/**
 * @swagger
 * /utiliza:
 *   get:
 *     summary: Obtener todas las utilizaciones de insumos
 *     description: Devuelve la lista de utilizaciones de insumos junto con la asignación de actividades y detalles de usuarios.
 *     tags:
 *       - Utiliza
 *     responses:
 *       200:
 *         description: Lista de utilizaciones obtenida exitosamente.
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
 *                   fk_id_insumo:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       nombre:
 *                         type: string
 *                         example: "Fertilizante"
 *                       tipo:
 *                         type: string
 *                         example: "Químico"
 *                       precio_unidad:
 *                         type: number
 *                         format: float
 *                         example: 15.75
 *                       cantidad:
 *                         type: integer
 *                         example: 50
 *                       unidad_medida:
 *                         type: string
 *                         example: "kg"
 *                   fk_id_asignacion_actividad:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       fecha:
 *                         type: string
 *                         format: date
 *                         example: "2025-02-07"
 *                       fk_id_actividad:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           nombre:
 *                             type: string
 *                             example: "Riego"
 *                           descripcion:
 *                             type: string
 *                             example: "Riego por goteo en la mañana"
 *                       fk_identificacion:
 *                         type: object
 *                         properties:
 *                           identificacion:
 *                             type: integer
 *                             example: 123456789
 *                           nombre:
 *                             type: string
 *                             example: "Juan Pérez"
 *                           contraseña:
 *                             type: string
 *                             example: "hashedpassword"
 *                           email:
 *                             type: string
 *                             example: "juan@example.com"
 *                           fk_id_rol:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 3
 *                               nombre_rol:
 *                                 type: string
 *                                 example: "Supervisor"
 *                               fecha_creacion:
 *                                 type: string
 *                                 format: date
 *                                 example: "2024-01-15"
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
 *         description: No se encontraron utilizaciones registradas
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
routerUtiliza.get('/utiliza',validarToken, getUtiliza);

/**
 * @swagger
 * /utiliza/[id_utiliza]:
 *   get:
 *     summary: Obtener las utilizaciones de insumos por ID
 *     description: Devuelve la lista de utilizaciones de insumos junto con la asignación de actividades y detalles de usuarios.
 *     tags:
 *       - Utiliza
 *     responses:
 *       200:
 *         description: Lista de utilizaciones obtenida exitosamente.
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
 *                   fk_id_insumo:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       nombre:
 *                         type: string
 *                         example: "Fertilizante"
 *                       tipo:
 *                         type: string
 *                         example: "Químico"
 *                       precio_unidad:
 *                         type: number
 *                         format: float
 *                         example: 15.75
 *                       cantidad:
 *                         type: integer
 *                         example: 50
 *                       unidad_medida:
 *                         type: string
 *                         example: "kg"
 *                   fk_id_asignacion_actividad:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       fecha:
 *                         type: string
 *                         format: date
 *                         example: "2025-02-07"
 *                       fk_id_actividad:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           nombre:
 *                             type: string
 *                             example: "Riego"
 *                           descripcion:
 *                             type: string
 *                             example: "Riego por goteo en la mañana"
 *                       fk_identificacion:
 *                         type: object
 *                         properties:
 *                           identificacion:
 *                             type: integer
 *                             example: 123456789
 *                           nombre:
 *                             type: string
 *                             example: "Juan Pérez"
 *                           contraseña:
 *                             type: string
 *                             example: "hashedpassword"
 *                           email:
 *                             type: string
 *                             example: "juan@example.com"
 *                           fk_id_rol:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 3
 *                               nombre_rol:
 *                                 type: string
 *                                 example: "Supervisor"
 *                               fecha_creacion:
 *                                 type: string
 *                                 format: date
 *                                 example: "2024-01-15"
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
 *         description: No se encontraron utilizaciones registradas
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

routerUtiliza.get("/utiliza/:id_utiliza",validarToken, IdUtiliza);

/**
 * @swagger
 * /utiliza[id_utiliza]:
 *   put:
 *     summary: Se actualiza un nuevo dato en la tabla Utiliza por ID
 *     tags: [Utiliza]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_insumo:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla herramientas
 *                 example: 1
 *               fk_id_asignacion_actividad:
 *                 type: integer
 *                 description: llave foranea que viene de la tabla asignacion de actividades
 *                 example: 1
 *     responses:
 *       200:
 *         description: utilizacion registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "utilizacion registrada con éxito"
 *       400:
 *         description: Error al registrar utiliza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar utiliza"
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
routerUtiliza.put("/utiliza/:id_utiliza",validarToken, actualizarUtiliza);

export default routerUtiliza;
