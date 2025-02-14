import { Router} from 'express';
import { getHerramientas, addHerramientas, IdHerramientas, actualizarHerramientas, getHerramientasPrestadas, getTotalHerramientasPorEstado} from '../../controllers/inventario/Herramientas.controllers.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';
const routerHerramientas = Router();

routerHerramientas.get('/herramientas/reporte_prestadas', validarToken,getHerramientasPrestadas);
routerHerramientas.get('/herramientas/reporte_estado', validarToken, getTotalHerramientasPorEstado);

/**
 * @swagger
 * tags:
 *   name: Herramientas
 *   description: Endpoints para la gestion la tabla Herramientas
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
 * /herramientas:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla herramientas con validacion de token JWT
 *     tags: [Herramientas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_h:
 *                 type: string
 *                 description: nombre de la herramienta
 *                 example: palin
 *               fecha_prestamo:
 *                 type: string
 *                 format: date
 *                 description: la fecha que se realizo el pretamo de la herramienta
 *                 example: "2024-10-10"
 *               estado:
 *                 type: string
 *                 description: es el estado en el que se encuentra la herramienta
 *                 example: Buena
 *     responses:
 *       200:
 *         description: Herramienta registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Herramienta registrada con éxito"
 *       400:
 *         description: Error al registrar la herramienta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la herramienta"
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
routerHerramientas.get('/herramientas', validarToken, getHerramientas);

/**
 * @swagger
 * /herramientas:
 *   get:
 *     summary: Obtener todas las herramientas
 *     description: Devuelve una lista de todas las herramientas almacenadas en la base de datos.
 *     tags:
 *       - Herramientas
 *     responses:
 *       200:
 *         description: Lista de herramientas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 herramientas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_herramienta:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Pala"
 *                       descripcion:
 *                         type: string
 *                         example: "Herramienta de excavación con mango largo"
 *                       cantidad_disponible:
 *                         type: integer
 *                         example: 10
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
 *         description: No hay herramientas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Herramienta no encontrada"
 *       500:
 *         description: Error al obtener las herramientas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener la herramienta"
 */

routerHerramientas.post('/herramientas', validarToken, addHerramientas);

/**
 * @swagger
 * /herramientas/[id_herramienta]:
 *   get:
 *     summary: Obtener las herramientas por ID
 *     description: Devuelve una lista de todas las herramientas almacenadas en la base de datos.
 *     tags:
 *       - Herramientas
 *     responses:
 *       200:
 *         description: Lista de herramientas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 herramientas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_herramienta:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Pala"
 *                       descripcion:
 *                         type: string
 *                         example: "Herramienta de excavación con mango largo"
 *                       cantidad_disponible:
 *                         type: integer
 *                         example: 10
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
 *         description: No hay herramientas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Herramienta no encontrada"
 *       500:
 *         description: Error al obtener las herramientas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener la herramienta"
 */

routerHerramientas.get("/herramientas/:id_herramienta", validarToken, IdHerramientas);

/**
 * @swagger
 * /herramientas/[id_herramienta]:
 *   put:
 *     summary: Se actualiza un nuevo dato en la tabla herramientas por ID
 *     tags: [Herramientas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_h:
 *                 type: string
 *                 description: nombre de la herramienta
 *                 example: palin
 *               fecha_prestamo:
 *                 type: string
 *                 format: date
 *                 description: la fecha que se realizo el pretamo de la herramienta
 *                 example: "2024-10-10"
 *               estado:
 *                 type: string
 *                 description: es el estado en el que se encuentra la herramienta
 *                 example: Buena
 *     responses:
 *       200:
 *         description: Herramienta registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Herramienta registrada con éxito"
 *       400:
 *         description: Error al registrar la herramienta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar la herramienta"
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
routerHerramientas.put("/herramientas/:id_herramienta", validarToken, actualizarHerramientas);

export default routerHerramientas;