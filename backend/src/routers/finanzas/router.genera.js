import { Router } from 'express';
import { createGenera, getGeneras, getGeneraById, updateGenera } from '../../controllers/finanzas/controller.genera.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';

const routerGenera = Router();

/**
 * @swagger
 * tags:
 *   name: Genera
 *   description: Endpoints para la gestion la tabla genera
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
 * /genera:
 *   post:
 *     summary: Se registra un nuevo dato en la tabla genera con validacion de token JWT
 *     tags: [Genera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: llave foranea que viene desde cultivo
 *                 example: 1
 *               fk_id_produccion:
 *                 type: integer
 *                 description: llave foranea que viene desde produccion
 *                 example: 1
 *     responses:
 *       200:
 *         description: Registro de genera exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fk_id_cultivo:
 *                   type: integer
 *                 fk_id_produccion:
 *                   type: integer
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

routerGenera.post('/genera',validarToken, createGenera); 

/**
 * @swagger
 * /generas:
 *   get:
 *     summary: Obtener todas las relaciones de genera
 *     description: Devuelve una lista de todas las relaciones de genera con sus respectivas entidades relacionadas.
 *     tags:
 *       - Genera
 *     responses:
 *       200:
 *         description: Lista de generas obtenida exitosamente.
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
 *                       id_genera:
 *                         type: integer
 *                         example: 1
 *                       fk_id_cultivo:
 *                         type: object
 *                         properties:
 *                           id_cultivo:
 *                             type: integer
 *                             example: 1
 *                           fecha_plantacion:
 *                             type: string
 *                             format: date
 *                             example: "2023-05-10"
 *                           nombre_cultivo:
 *                             type: string
 *                             example: "Maíz amarillo"
 *                           descripcion:
 *                             type: string
 *                             example: "Cultivo de maíz de ciclo corto"
 *                           fk_id_especie:
 *                             type: object
 *                             properties:
 *                               id_especie:
 *                                 type: integer
 *                                 example: 1
 *                               nombre_comun:
 *                                 type: string
 *                                 example: "Maíz"
 *                               nombre_cientifico:
 *                                 type: string
 *                                 example: "Zea mays"
 *                               descripcion:
 *                                 type: string
 *                                 example: "Planta de cultivo ampliamente utilizada en alimentación"
 *                               fk_id_tipo_cultivo:
 *                                 type: object
 *                                 properties:
 *                                   id_tipo_cultivo:
 *                                     type: integer
 *                                     example: 1
 *                                   nombre:
 *                                     type: string
 *                                     example: "Cereal"
 *                                   descripcion:
 *                                     type: string
 *                                     example: "Cultivo de granos comestibles"
 *                           fk_id_semillero:
 *                             type: object
 *                             properties:
 *                               id_semillero:
 *                                 type: integer
 *                                 example: 1
 *                               nombre_semilla:
 *                                 type: string
 *                                 example: "Híbrido "
 *                               fecha_siembra:
 *                                 type: string
 *                                 format: date
 *                                 example: "2023-03-15"
 *                               fecha_estimada:
 *                                 type: string
 *                                 format: date
 *                                 example: "2023-06-20"
 *                               cantidad:
 *                                 type: integer
 *                                 example: 5000
 *                       fk_id_produccion:
 *                         type: object
 *                         properties:
 *                           id_produccion:
 *                             type: integer
 *                             example: 1
 *                           cantidad_producida:
 *                             type: integer
 *                             example: 2000
 *                           fecha_produccion:
 *                             type: string
 *                             format: date
 *                             example: "2023-07-05"
 *                           fk_id_lote:
 *                             type: object
 *                             properties:
 *                               id_lote:
 *                                 type: integer
 *                                 example: 1
 *                               dimension:
 *                                 type: string
 *                                 example: "50x30 metros"
 *                               nombre_lote:
 *                                 type: string
 *                                 example: "Lote Norte"
 *                               fk_id_ubicacion:
 *                                 type: object
 *                                 properties:
 *                                   id_ubicacion:
 *                                     type: integer
 *                                     example: 1
 *                                   latitud:
 *                                     type: number
 *                                     example: -1.234567
 *                                   longitud:
 *                                     type: number
 *                                     example: -78.123456
 *                           descripcion_produccion:
 *                             type: string
 *                             example: "Cosecha con alta calidad"
 *                           estado:
 *                             type: string
 *                             example: "Finalizado"
 *                           fecha_cosecha:
 *                             type: string
 *                             format: date
 *                             example: "2023-07-10"
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
 *         description: No hay registros de genera
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay registros de genera"
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
routerGenera.get('/genera',validarToken, getGeneras); 

/**
 * @swagger
 * /generas/[id_genera]:
 *   get:
 *     summary: Obtener los datos de genera por ID
 *     description: Devuelve una lista de todas las relaciones de genera con sus respectivas entidades relacionadas.
 *     tags:
 *       - Genera
 *     responses:
 *       200:
 *         description: Lista de generas obtenida exitosamente.
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
 *                       id_genera:
 *                         type: integer
 *                         example: 1
 *                       fk_id_cultivo:
 *                         type: object
 *                         properties:
 *                           id_cultivo:
 *                             type: integer
 *                             example: 1
 *                           fecha_plantacion:
 *                             type: string
 *                             format: date
 *                             example: "2023-05-10"
 *                           nombre_cultivo:
 *                             type: string
 *                             example: "Maíz amarillo"
 *                           descripcion:
 *                             type: string
 *                             example: "Cultivo de maíz de ciclo corto"
 *                           fk_id_especie:
 *                             type: object
 *                             properties:
 *                               id_especie:
 *                                 type: integer
 *                                 example: 1
 *                               nombre_comun:
 *                                 type: string
 *                                 example: "Maíz"
 *                               nombre_cientifico:
 *                                 type: string
 *                                 example: "Zea mays"
 *                               descripcion:
 *                                 type: string
 *                                 example: "Planta de cultivo ampliamente utilizada en alimentación"
 *                               fk_id_tipo_cultivo:
 *                                 type: object
 *                                 properties:
 *                                   id_tipo_cultivo:
 *                                     type: integer
 *                                     example: 1
 *                                   nombre:
 *                                     type: string
 *                                     example: "Cereal"
 *                                   descripcion:
 *                                     type: string
 *                                     example: "Cultivo de granos comestibles"
 *                           fk_id_semillero:
 *                             type: object
 *                             properties:
 *                               id_semillero:
 *                                 type: integer
 *                                 example: 1
 *                               nombre_semilla:
 *                                 type: string
 *                                 example: "Híbrido "
 *                               fecha_siembra:
 *                                 type: string
 *                                 format: date
 *                                 example: "2023-03-15"
 *                               fecha_estimada:
 *                                 type: string
 *                                 format: date
 *                                 example: "2023-06-20"
 *                               cantidad:
 *                                 type: integer
 *                                 example: 5000
 *                       fk_id_produccion:
 *                         type: object
 *                         properties:
 *                           id_produccion:
 *                             type: integer
 *                             example: 1
 *                           cantidad_producida:
 *                             type: integer
 *                             example: 2000
 *                           fecha_produccion:
 *                             type: string
 *                             format: date
 *                             example: "2023-07-05"
 *                           fk_id_lote:
 *                             type: object
 *                             properties:
 *                               id_lote:
 *                                 type: integer
 *                                 example: 1
 *                               dimension:
 *                                 type: string
 *                                 example: "50x30 metros"
 *                               nombre_lote:
 *                                 type: string
 *                                 example: "Lote Norte"
 *                               fk_id_ubicacion:
 *                                 type: object
 *                                 properties:
 *                                   id_ubicacion:
 *                                     type: integer
 *                                     example: 1
 *                                   latitud:
 *                                     type: number
 *                                     example: -1.234567
 *                                   longitud:
 *                                     type: number
 *                                     example: -78.123456
 *                           descripcion_produccion:
 *                             type: string
 *                             example: "Cosecha con alta calidad"
 *                           estado:
 *                             type: string
 *                             example: "Finalizado"
 *                           fecha_cosecha:
 *                             type: string
 *                             format: date
 *                             example: "2023-07-10"
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
 *         description: No se encontró ese registro de genera
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se encontró el registro de genera"
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
routerGenera.get('/genera/:id_genera',validarToken, getGeneraById); 

/**
 * @swagger
 * /genera/[id_genera]:
 *   put:
 *     summary: Se actualizan los datos de la tabla genera por ID
 *     tags: [Genera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_cultivo:
 *                 type: integer
 *                 description: llave foranea que viene desde cultivo
 *                 example: 1
 *               fk_id_produccion:
 *                 type: integer
 *                 description: llave foranea que viene desde produccion
 *                 example: 1
 *     responses:
 *       200:
 *         description: Genera actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Genera actualizada con éxito"
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
 *         description: No se encontró el registro de genera
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se encontró el registro de genera"
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

routerGenera.put('/genera/:id_genera',validarToken, updateGenera); 

export default routerGenera;