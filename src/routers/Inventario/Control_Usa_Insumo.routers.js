import { Router} from 'express';
import { getControlUsaInsumo, addControlUsaInsumo, IdControlUsaInsumo, getTotalInsumosPorControl, actualizarControlUsaInsumo } from '../../controllers/inventario/Control_Usa_Insumo.controllers.js';
import {  validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';
const routerControl_Usa_Insumo = Router();

/**
 * @swagger
 * tags:
 *   name: Control_Usa_Insumo
 *   description: Endpoints para la gestion la tabla control_Usa_Insumo
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
 * /Control_Usa_Insumo:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla /Control_Usa_Insumo con validacion de token JWT
 *     tags: [Control_Usa_Insumo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_control_fitosanitario:
 *                 type: integer
 *                 description: llave foranea que viene desde control fitosanitario
 *                 example: 1
 *               fk_id_insumo:
 *                 type: integer
 *                 description: llave foranea que viene desde insumos
 *                 example: 1
 *               cantidad:
 *                 type: integer
 *                 description: cantidad usada durante el control
 *                 example: 170
 *     responses:
 *       200:
 *         description: Registro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Registro creado exitosamente"
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
routerControl_Usa_Insumo.post('/Control_Usa_Insumo',  validarToken, addControlUsaInsumo);


/**
 * @swagger
 * /Control_Usa_Insumo:
 *   get:
 *     summary: Obtener todas las relaciones de Control_Usa_Insumo
 *     description: Devuelve una lista de todas las relaciones de Control_Usa_Insumo con sus respectivas entidades relacionadas.
 *     tags:
 *       - Control_Usa_Insumo
 *     responses:
 *       200:
 *         description: Lista de Control_Usa_Insumo obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_Control_Usa_Insumo:
 *                         type: integer
 *                         example: 1
 *                       cantidad:
 *                         type: integer
 *                         example: 170
 *                       fk_id_insumo:
 *                         type: object
 *                         properties:
 *                           id_insumo:
 *                             type: integer
 *                             example: 1
 *                           nombre:
 *                             type: string
 *                             example: "Aleman"
 *                           tipo:
 *                             type: string
 *                             example: "pesticida"
 *                           precio_unidad:
 *                             type: number
 *                             example: 2700.50
 *                           cantidad:
 *                             type: integer
 *                             example: 270
 *                           unidad_medida:
 *                             type: string
 *                             example: "Mililitros"
 *                       fk_id_control_fitosanitario:
 *                         type: object
 *                         properties:
 *                           id_control_fitosanitario:
 *                             type: integer
 *                             example: 1
 *                           fecha_control:
 *                             type: string
 *                             format: date
 *                             example: "2024-10-10"
 *                           descripcion:
 *                             type: string
 *                             example: "Se le realizó un control a un cultivo"
 *                           fk_id_desarrollan:
 *                             type: object
 *                             properties:
 *                               id_desarrollan:
 *                                 type: integer
 *                                 example: 1
 *                               fk_id_cultivo:
 *                                 type: object
 *                                 properties:
 *                                   id_cultivo:
 *                                     type: integer
 *                                     example: 1
 *                                   fecha_plantacion:
 *                                     type: string
 *                                     format: date
 *                                     example: "2024-10-10"
 *                                   nombre:
 *                                     type: string
 *                                     example: "Tomate"
 *                                   descripcion:
 *                                     type: string
 *                                     example: "Tomate fresco"
 *                                   fk_id_especie:
 *                                     type: object
 *                                     properties:
 *                                       id_especie:
 *                                         type: integer
 *                                         example: 1
 *                                       nombre_comun:
 *                                         type: string
 *                                         example: "Tomate"
 *                                       nombre_cientifico:
 *                                         type: string
 *                                         example: "Solanum lycopersicum"
 *                                       descripcion:
 *                                         type: string
 *                                         example: "La mejor especie"
 *                                       fk_id_tipo_cultivo:
 *                                         type: object
 *                                         properties:
 *                                           id_tipo_cultivo:
 *                                             type: integer
 *                                             example: 1
 *                                           nombre:
 *                                             type: string
 *                                             example: "Hortalizas"
 *                                           descripcion:
 *                                             type: string
 *                                             example: "El mejor tipo de cultivo"
 *                                   fk_id_semillero:
 *                                     type: object
 *                                     properties:
 *                                       id_semillero:
 *                                         type: integer
 *                                         example: 1
 *                                       nombre_semilla:
 *                                         type: string
 *                                         example: "Tomate"
 *                                       fecha_siembra:
 *                                         type: string
 *                                         format: date
 *                                         example: "2024-10-10"
 *                                       fecha_estimada:
 *                                         type: string
 *                                         format: date
 *                                         example: "2024-12-10"
 *                                       cantidad:
 *                                         type: integer
 *                                         example: 100
 *                               fk_id_pea:
 *                                 type: object
 *                                 properties:
 *                                   id_pea:
 *                                     type: integer
 *                                     example: 1
 *                                   nombre:
 *                                     type: string
 *                                     example: "Arvences"
 *                                   descripcion:
 *                                     type: string
 *                                     example: "Planta invasora en el cultivo"
 *       400:
 *         description: No hay un control de uso de insumos registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay un control de uso de insumos registrado"
 *       401:
 *         description: Token es requerido, el token no está autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
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

routerControl_Usa_Insumo.get('/Control_Usa_Insumo',  validarToken, getControlUsaInsumo);

/**
 * @swagger
 * /Control_Usa_Insumo/[id_control_usa_insumo]:
 *   get:
 *     summary: Obtener las relaciones de Control_Usa_Insumo por ID
 *     description: Devuelve una lista de todas las relaciones de Control_Usa_Insumo con sus respectivas entidades relacionadas.
 *     tags:
 *       - Control_Usa_Insumo
 *     responses:
 *       200:
 *         description: Lista de Control_Usa_Insumo obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_Control_Usa_Insumo:
 *                         type: integer
 *                         example: 1
 *                       cantidad:
 *                         type: integer
 *                         example: 170
 *                       fk_id_insumo:
 *                         type: object
 *                         properties:
 *                           id_insumo:
 *                             type: integer
 *                             example: 1
 *                           nombre:
 *                             type: string
 *                             example: "Aleman"
 *                           tipo:
 *                             type: string
 *                             example: "pesticida"
 *                           precio_unidad:
 *                             type: number
 *                             example: 2700.50
 *                           cantidad:
 *                             type: integer
 *                             example: 270
 *                           unidad_medida:
 *                             type: string
 *                             example: "Mililitros"
 *                       fk_id_control_fitosanitario:
 *                         type: object
 *                         properties:
 *                           id_control_fitosanitario:
 *                             type: integer
 *                             example: 1
 *                           fecha_control:
 *                             type: string
 *                             format: date
 *                             example: "2024-10-10"
 *                           descripcion:
 *                             type: string
 *                             example: "Se le realizó un control a un cultivo"
 *                           fk_id_desarrollan:
 *                             type: object
 *                             properties:
 *                               id_desarrollan:
 *                                 type: integer
 *                                 example: 1
 *                               fk_id_cultivo:
 *                                 type: object
 *                                 properties:
 *                                   id_cultivo:
 *                                     type: integer
 *                                     example: 1
 *                                   fecha_plantacion:
 *                                     type: string
 *                                     format: date
 *                                     example: "2024-10-10"
 *                                   nombre:
 *                                     type: string
 *                                     example: "Tomate"
 *                                   descripcion:
 *                                     type: string
 *                                     example: "Tomate fresco"
 *                                   fk_id_especie:
 *                                     type: object
 *                                     properties:
 *                                       id_especie:
 *                                         type: integer
 *                                         example: 1
 *                                       nombre_comun:
 *                                         type: string
 *                                         example: "Tomate"
 *                                       nombre_cientifico:
 *                                         type: string
 *                                         example: "Solanum lycopersicum"
 *                                       descripcion:
 *                                         type: string
 *                                         example: "La mejor especie"
 *                                       fk_id_tipo_cultivo:
 *                                         type: object
 *                                         properties:
 *                                           id_tipo_cultivo:
 *                                             type: integer
 *                                             example: 1
 *                                           nombre:
 *                                             type: string
 *                                             example: "Hortalizas"
 *                                           descripcion:
 *                                             type: string
 *                                             example: "El mejor tipo de cultivo"
 *                                   fk_id_semillero:
 *                                     type: object
 *                                     properties:
 *                                       id_semillero:
 *                                         type: integer
 *                                         example: 1
 *                                       nombre_semilla:
 *                                         type: string
 *                                         example: "Tomate"
 *                                       fecha_siembra:
 *                                         type: string
 *                                         format: date
 *                                         example: "2024-10-10"
 *                                       fecha_estimada:
 *                                         type: string
 *                                         format: date
 *                                         example: "2024-12-10"
 *                                       cantidad:
 *                                         type: integer
 *                                         example: 100
 *                               fk_id_pea:
 *                                 type: object
 *                                 properties:
 *                                   id_pea:
 *                                     type: integer
 *                                     example: 1
 *                                   nombre:
 *                                     type: string
 *                                     example: "Arvences"
 *                                   descripcion:
 *                                     type: string
 *                                     example: "Planta invasora en el cultivo"
 *       400:
 *         description: No hay un control de uso de insumos registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay un control de uso de insumos registrado"
 *       401:
 *         description: Token es requerido, el token no está autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
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

routerControl_Usa_Insumo.get("/Control_Usa_Insumo/:Control_Usa_Insumo",  IdControlUsaInsumo);

/**
 * @swagger
 * /Control_Usa_Insumo/[id_control_usa_insumo]:
 *   put:
 *     summary: Se actualiza un nuevo dato en la tabla Control_Usa_Insumo por ID
 *     tags: [Control_Usa_Insumo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_control_fitosanitario:
 *                 type: integer
 *                 description: llave foranea que viene desde control fitosanitario
 *                 example: 1
 *               fk_id_insumo:
 *                 type: integer
 *                 description: llave foranea que viene desde insumos
 *                 example: 1
 *               cantidad:
 *                 type: integer
 *                 description: cantidad usada durante el control
 *                 example: 170
 *     responses:
 *       200:
 *         description: Registro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Registro creado exitosamente"
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
routerControl_Usa_Insumo.put("/Control_Usa_Insumo/:id_control_usa_insumo",  actualizarControlUsaInsumo);

/**
 * @swagger
 * /Control_Usa_Insumo/reporte:
 *   get:
 *     summary: Se genera reporte de un control de usos de insumos
 *     description: Devuelve un reporte de todas las relaciones de Control_Usa_Insumo con sus respectivas entidades relacionadas.
 *     tags:
 *       - Reporte de control de usos de insumos
 *     responses:
 *       200:
 *         description: Lista de Control_Usa_Insumo obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_Control_Usa_Insumo:
 *                         type: integer
 *                         example: 1
 *                       fk_id_control_fitosanitario:
 *                         type: object
 *                         properties:
 *                           id_control_fitosanitario:
 *                             type: integer
 *                             example: 1
 *                           fecha_control:
 *                             type: string
 *                             format: date
 *                             example: "2024-10-10"
 *                           descripcion:
 *                             type: string
 *                             example: "Se le realizó un control de plagas cultivo de maiz"
 *                           total_insumos_usados:
 *                             type: integer
 *                             example: 10

 *       400:
 *         description: No hay un reporte de control de uso de insumos registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay un reporte de control de uso de insumos registrado"
 *       401:
 *         description: Token es requerido, el token no está autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no autorizado"
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
routerControl_Usa_Insumo.get('/Control_Usa_Insumo/reporte', validarToken, getTotalInsumosPorControl);

export default routerControl_Usa_Insumo;