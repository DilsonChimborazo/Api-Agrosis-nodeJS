import {Router} from 'express';
import { createEspecie, getEspecieById, getEspecie, updateEspecie, getReporteEspeciesPorTipoCultivo } from '../../controllers/trazabilidad/controller.especie.js';
import { validarToken } from "../../controllers/usuarios/controllers.autenticacion.js";

const routerEspecie = Router();

routerEspecie.get('/especie/reporte',getReporteEspeciesPorTipoCultivo)

/**
 * @swagger
 * tags:
 *   name: especie
 *   description: Endpoints para la gestion de especies
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
 * /especie:
 *   post:
 *     summary: Se registra una especie con validacion de token JWT
 *     tags: [especie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_comun:
 *                 type: string
 *                 description: Nombre comun de la especie
 *               nombre_cientifico:
 *                 type: string
 *                 description: Nombre cientifico de la especie
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion de la especie
 *               fk_id_tipo_cultivo:
 *                 type: integer
 *                 description: Seleccion de tipo de cultivo por medio de ID
 *     responses:
 *       200:
 *         description: especie registrado correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_comun:
 *                   type: string
 *                   example: "Daucus carota"
 *                 nombre_cientifico:
 *                   type: string
 *                   example: "Daucus carota"
 *                 descripcion:
 *                   type: string
 *                   example: "Los cultivos agrícolas son plantas cultivadas por el ser humano con el propósito de obtener alimentos, materias primas, forraje para animales o productos industriales."
 *                 fk_id_tipo_cultivo:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Error al registrar una especie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar una especie"
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
routerEspecie.post('/especie',createEspecie)

/**
 * @swagger
 * /especie {id_especie}:
 *   get:
 *     summary: Se obtiene una especie por medio de ID con validacion de token JWT
 *     tags: [especie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especie
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una especie
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     responses:
 *       200:
 *         description: especie obtenido correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_comun:
 *                   type: string
 *                   example: "Daucus carota"
 *                 nombre_cientifico:
 *                   type: string
 *                   example: "Daucus carota"
 *                 descripcion:
 *                   type: string
 *                   example: "Los cultivos agrícolas son plantas cultivadas por el ser humano con el propósito de obtener alimentos, materias primas, forraje para animales o productos industriales."
 *                 fk_id_tipo_cultivo:
 *                   type: object
 *                   properties:
 *                     id_tipo_cultivo:
 *                       type: integer
 *                       example: 2
 *                     nombre:
 *                       type: string
 *                       example: "Hortaliza"
 *                     descripcion:
 *                       type: string
 *                       example: "Son una fuente importante de vitaminas, minerales, fibra y antioxidantes, contribuyendo a una alimentación saludable. "
 *       404:
 *         description: Error al obtener una especie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener una especie"
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
routerEspecie.get('/especie',getEspecie)

/**
 * @swagger
 * /especie:
 *   get:
 *     summary: Se obtiene una especie con validacion de token JWT
 *     tags: [especie]
 *     responses:
 *       200:
 *         description: especie obtenida correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_comun:
 *                   type: string
 *                   example: "Daucus carota"
 *                 nombre_cientifico:
 *                   type: string
 *                   example: "Daucus carota"
 *                 descripcion:
 *                   type: string
 *                   example: "Los cultivos agrícolas son plantas cultivadas por el ser humano con el propósito de obtener alimentos, materias primas, forraje para animales o productos industriales."
 *                 fk_id_tipo_cultivo:
 *                   type: object
 *                   properties:
 *                     id_tipo_cultivo:
 *                       type: integer
 *                       example: 2
 *                     nombre:
 *                       type: string
 *                       example: "Hortaliza"
 *                     descripcion:
 *                       type: string
 *                       example: "Son una fuente importante de vitaminas, minerales, fibra y antioxidantes, contribuyendo a una alimentación saludable. "
 *       404:
 *         description: Error al obtener una especie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al obtener una especie"
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
routerEspecie.get('/especie/:id_especie',getEspecie)

/**
 * @swagger
 * /especie:
 *   put:
 *     summary: Se actualiza una especie por medio de ID con validacion de token JWT
 *     tags: [especie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especie
 *         schema:
 *           type: integer
 *         required: true
 *         description: id para obtener una especie
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your_token_here
 *           description: Token de autenticación JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_comun:
 *                 type: string
 *                 description: Nombre comun de la especie
 *               nombre_cientifico:
 *                 type: string
 *                 description: Nombre cientifico de la especie
 *               descripcion:
 *                 type: string
 *                 description: Una descripcion de la especie
 *               fk_id_tipo_cultivo:
 *                 type: integer
 *                 description: Seleccion de tipo de cultivo por medio de ID
 *     responses:
 *       200:
 *         description: especie actualizada correctamente 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_comun:
 *                   type: string
 *                   example: "Daucus carota"
 *                 nombre_cientifico:
 *                   type: string
 *                   example: "Daucus carota"
 *                 descripcion:
 *                   type: string
 *                   example: "Los cultivos agrícolas son plantas cultivadas por el ser humano con el propósito de obtener alimentos, materias primas, forraje para animales o productos industriales."
 *                 fk_id_tipo_cultivo:
 *                   type: object
 *                   properties:
 *                     id_tipo_cultivo:
 *                       type: integer
 *                       example: 2
 *                     nombre:
 *                       type: string
 *                       example: "Hortaliza"
 *                     descripcion:
 *                       type: string
 *                       example: "Son una fuente importante de vitaminas, minerales, fibra y antioxidantes, contribuyendo a una alimentación saludable. "
 *       404:
 *         description: Error al actualizar una especie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar una especie"
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

routerEspecie.put('/especie/:id_especie',updateEspecie)

export default routerEspecie;