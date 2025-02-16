import { Router } from 'express';
import { getInsumo, addInsumo, IdInsumo, actualizarInsumo, getTotalInsumosPorTipo } from '../../controllers/inventario/Insumo.controllers.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';
const routerInsumo = Router();

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: Endpoints para la gestion la tabla Insumos
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
 * /insumo:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla insumos con validacion de token JWT
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: nombre del insumo
 *                 example: veneno
 *               tipo:
 *                 type: string
 *                 description: el tipo de insumo
 *                 example: "pesticida"
 *               precio_unidad:
 *                 type: integer
 *                 description: es el precio por unidad de insumo
 *                 example: 15000
 *               cantidad:
 *                 type: integer
 *                 description: es la cantidad de insumo utilizada
 *                 example: 700
 *               unidad_medida:
 *                 type: string
 *                 description: es la unidad de medida de cada uno de los insumos
 *                 example: "gramos"
 *     responses:
 *       200:
 *         description: Insumo registrado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Insumo registrado con exito"
 *       400:
 *         description: Error al registrar insumo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar insumo"
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
routerInsumo.post('/insumo',validarToken, addInsumo);

/**
 * @swagger
 * /insumos:
 *   get:
 *     summary: Obtener todos los insumos
 *     description: Devuelve una lista de todos los insumos almacenados en la base de datos.
 *     tags:
 *       - Insumos
 *     responses:
 *       200:
 *         description: Lista de insumos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insumos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_insumo:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Fertilizante NPK"
 *                       tipo:
 *                         type: string
 *                         example: "Fertilizante"
 *                       precio_unidad:
 *                         type: number
 *                         format: float
 *                         example: 25.50
 *                       cantidad:
 *                         type: integer
 *                         example: 100
 *                       unidad_medida:
 *                         type: string
 *                         example: "kg"
 *       400:
 *         description: Error al obtener el insumo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener el insumo"
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
 *                 message:
 *                   type: string
 *                   example: "Error al obtener la lista de insumos"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */

routerInsumo.get('/insumo',validarToken, getInsumo);
/**
 * @swagger
 * /insumos/[id_insumo]:
 *   get:
 *     summary: Obtener los insumos por ID
 *     description: Devuelve una lista de todos los insumos almacenados en la base de datos.
 *     tags:
 *       - Insumos
 *     responses:
 *       200:
 *         description: Lista de insumos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insumos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_insumo:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Fertilizante NPK"
 *                       tipo:
 *                         type: string
 *                         example: "Fertilizante"
 *                       precio_unidad:
 *                         type: number
 *                         format: float
 *                         example: 25.50
 *                       cantidad:
 *                         type: integer
 *                         example: 100
 *                       unidad_medida:
 *                         type: string
 *                         example: "kg"
 *       400:
 *         description: Error al obtener el insumo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener el insumo"
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
 *                 message:
 *                   type: string
 *                   example: "Error al obtener la lista de insumos"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */

routerInsumo.get("/insumo/:id_insumo",validarToken, IdInsumo);

/**
 * @swagger
 * /insumo/[id_insumo]:
 *   put:
 *     summary: Se actualiza un nuevo dato en la tabla insumos por ID
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: nombre del insumo
 *                 example: veneno
 *               tipo:
 *                 type: string
 *                 description: el tipo de insumo
 *                 example: "pesticida"
 *               precio_unidad:
 *                 type: integer
 *                 description: es el precio por unidad de insumo
 *                 example: 15000
 *               cantidad:
 *                 type: integer
 *                 description: es la cantidad de insumo utilizada
 *                 example: 700
 *               unidad_medida:
 *                 type: string
 *                 description: es la unidad de medida de cada uno de los insumos
 *                 example: "gramos"
 *     responses:
 *       200:
 *         description: Insumo actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Insumo actualizado con exito"
 *       400:
 *         description: Error al actualizar insumo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar insumo"
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
routerInsumo.put("/insumo/:id_insumo",validarToken, actualizarInsumo);

/**
 * @swagger
 * /insumos/reporte:
 *   get:
 *     summary: Reporte de todos los insumos
 *     description: Devuelve un reporte de todos los insumos almacenados en la base de datos.
 *     tags:
 *       - Reporte de insumos
 *     responses:
 *       200:
 *         description: Reporte de insumos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insumos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_insumo:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Fertilizante NPK"
 *                       tipo:
 *                         type: string
 *                         example: "Fertilizante"
 *                       cantidad:
 *                         type: integer
 *                         example: 100
 *       400:
 *         description: Error al obtener reporte de insumo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener reporte de insumo"
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
 *                 message:
 *                   type: string
 *                   example: "Error al obtener la lista de insumos"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */
routerInsumo.get('/insumo/reporte', validarToken, getTotalInsumosPorTipo);

export default routerInsumo;
