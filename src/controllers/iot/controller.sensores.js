import { configuracionBD } from "../../config/conexion.js";

const calcularEvapotranspiracion = (temperatura, humedad, luminiosidad) => {
    return (0.0023 * temperatura * (luminiosidad + 17.8) * (100 - humedad)) / 100;
};

export const createSensores = async (req, res) => {
    try {
        const { nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima } = req.body;
        const sql = 'INSERT INTO sensores (nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Sensor registrado con éxito' });
        } else {
            res.status(400).json({ msg: 'Error al registrar el sensor' });
        }
    } catch {
        res.status(500).json({ error: 'Error al crear el sensor' });
    }
};

export const getSensores = async (req, res) => {
    try {
        const sql = 'SELECT * FROM sensores';
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const sensores = result.rows.map(sensor => ({
                ...sensor,
                evapotranspiracion: calcularEvapotranspiracion(
                    sensor.temperatura || 25, 
                    sensor.humedad || 50, 
                    sensor.luminiosidad || 200 
                ),
            }));
            res.status(200).json(sensores);
        } else {
            res.status(404).json({ msg: 'No hay sensores registrados' });
        }
    } catch (err) {
        console.error(err); 
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getSensorById = async (req, res) => {
    try {
        const { id_sensor } = req.params;
        const sql = 'SELECT * FROM sensores WHERE id_sensor = $1';
        const values = [id_sensor];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            const sensor = result.rows[0];
            sensor.evapotranspiracion = calcularEvapotranspiracion(
                sensor.temperatura || 25,
                sensor.humedad || 50,
                sensor.luminiosidad || 200
            );
            res.status(200).json({ msg: 'Sensor obtenido con éxito', result: sensor });
        } else {
            res.status(404).json({ msg: 'Sensor no encontrado' });
        }
    } catch {
        res.status(500).json({ msg: 'Error al obtener el sensor' });
    }
};

export const updateSensor = async (req, res) => {
    try {
        const { id_sensor } = req.params;
        const { nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima } = req.body;
        const sql = 'UPDATE sensores SET nombre_sensor=$1, tipo_sensor=$2, unidad_medida=$3, descripcion=$4, medida_minima=$5, medida_maxima=$6 WHERE id_sensor=$7';
        const values = [nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima, id_sensor];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Sensor actualizado con éxito' });
        } else {
            res.status(404).json({ msg: 'Sensor no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el sensor' });
    }
};
