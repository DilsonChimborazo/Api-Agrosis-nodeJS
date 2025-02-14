import {Router} from 'express'
import { createSensores, getSensorById, getSensores, updateSensor, getReporteSensores } from '../../controllers/iot/controller.sensores.js';
import { validarToken } from '../../controllers/usuarios/controllers.autenticacion.js';


const routerSensores = Router();

routerSensores.get('/sensores/reporte',validarToken, getReporteSensores);

/**
 * @swagger
 * tags:
 *   name: Sensores
 *   description: Endpoints para la gestion la tabla sensores
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
 * /sensores:
 *   post:
 *     summary: Registra un nuevo sensor en el sistema
 *     tags: [Sensores]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_sensor:
 *                 type: string
 *                 description: Nombre del sensor
 *                 example: "Sensor de Temperatura"
 *               tipo_sensor:
 *                 type: string
 *                 description: Tipo de sensor
 *                 example: "Temperatura"
 *               unidad_medida:
 *                 type: string
 *                 description: Unidad de medida del sensor
 *                 example: "°C"
 *               descripcion:
 *                 type: string
 *                 description: Breve descripción del sensor
 *                 example: "Sensor para medir la temperatura del suelo"
 *               medida_minima:
 *                 type: number
 *                 format: float
 *                 description: Valor mínimo que puede medir el sensor
 *                 example: -10.0
 *               medida_maxima:
 *                 type: number
 *                 format: float
 *                 description: Valor máximo que puede medir el sensor
 *                 example: 50.0
 *     responses:
 *       200:
 *         description: Sensor registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Sensor registrado con éxito"
 *       400:
 *         description: Error al registrar el sensor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al registrar el sensor"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear el sensor"
 */

routerSensores.post('/sensores',validarToken, createSensores);

/**
 * @swagger
 * /sensores:
 *   get:
 *     summary: Obtiene la lista de sensores registrados
 *     tags: [Sensores]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sensores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_sensor:
 *                     type: integer
 *                     example: 1
 *                   nombre_sensor:
 *                     type: string
 *                     example: "Sensor de Humedad"
 *                   tipo_sensor:
 *                     type: string
 *                     example: "Humedad"
 *                   unidad_medida:
 *                     type: string
 *                     example: "%"
 *                   descripcion:
 *                     type: string
 *                     example: "Sensor que mide la humedad del suelo"
 *                   medida_minima:
 *                     type: number
 *                     format: float
 *                     example: 10.0
 *                   medida_maxima:
 *                     type: number
 *                     format: float
 *                     example: 90.0
 *                   evapotranspiracion:
 *                     type: number
 *                     format: float
 *                     description: Cálculo de la evapotranspiración basado en los valores del sensor
 *                     example: 2.5
 *       404:
 *         description: No hay sensores registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay sensores registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
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

routerSensores.get('/sensores',validarToken, getSensores);

/**
 * @swagger
 * /sensores[id_sensores]:
 *   get:
 *     summary: Obtiene la lista de sensores registrados por ID
 *     tags: [Sensores]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sensores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_sensor:
 *                     type: integer
 *                     example: 1
 *                   nombre_sensor:
 *                     type: string
 *                     example: "Sensor de Humedad"
 *                   tipo_sensor:
 *                     type: string
 *                     example: "Humedad"
 *                   unidad_medida:
 *                     type: string
 *                     example: "%"
 *                   descripcion:
 *                     type: string
 *                     example: "Sensor que mide la humedad del suelo"
 *                   medida_minima:
 *                     type: number
 *                     format: float
 *                     example: 10.0
 *                   medida_maxima:
 *                     type: number
 *                     format: float
 *                     example: 90.0
 *                   evapotranspiracion:
 *                     type: number
 *                     format: float
 *                     description: Cálculo de la evapotranspiración basado en los valores del sensor
 *                     example: 2.5
 *       404:
 *         description: No hay sensores registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No hay sensores registrados"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
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
routerSensores.get('/sensores/:id_sensor',validarToken, getSensorById)

/**
 * @swagger
 * /sensores:
 *   put:
 *     summary: Actualiza los datos de la tabla de sensores por ID
 *     tags: [Sensores]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_sensor:
 *                 type: string
 *                 description: Nombre del sensor
 *                 example: "Sensor de Temperatura"
 *               tipo_sensor:
 *                 type: string
 *                 description: Tipo de sensor
 *                 example: "Temperatura"
 *               unidad_medida:
 *                 type: string
 *                 description: Unidad de medida del sensor
 *                 example: "°C"
 *               descripcion:
 *                 type: string
 *                 description: Breve descripción del sensor
 *                 example: "Sensor para medir la temperatura del suelo"
 *               medida_minima:
 *                 type: number
 *                 format: float
 *                 description: Valor mínimo que puede medir el sensor
 *                 example: -10.0
 *               medida_maxima:
 *                 type: number
 *                 format: float
 *                 description: Valor máximo que puede medir el sensor
 *                 example: 50.0
 *     responses:
 *       200:
 *         description: Sensor actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Sensor actualizado con éxito"
 *       400:
 *         description: Error al actualizar el sensor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al actualizar el sensor"
 *       401:
 *         description: Token requerido o token no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Token requerido o token no está autorizado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear el sensor"
 */
routerSensores.put('/sensores/:id_sensor',validarToken, updateSensor);

export default routerSensores;

