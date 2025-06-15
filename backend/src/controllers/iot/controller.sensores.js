import { configuracionBD } from '../../config/conexion.js';

const calcularEvapotranspiracion = (temperatura, humedad, luminiosidad) => {
  return (0.0023 * temperatura * (luminiosidad + 17.8) * (100 - humedad)) / 100;
};

export const createSensores = async (req, res) => {
  try {
    const { nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima } = req.body;
    const sql = 'INSERT INTO sensores (nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima];
    const result = await configuracionBD.query(sql, values);
    const newSensor = result.rows[0];
    console.log('Sensor creado en el backend:', newSensor);
    res.status(201).json({
      msg: 'Sensor registrado con éxito',
      sensor: newSensor,
    });
  } catch (err) {
    console.error('Error en createSensores:', err);
    res.status(500).json({
      error: 'Error al crear el sensor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

export const getSensores = async (req, res) => {
  try {
    const sql = 'SELECT * FROM sensores';
    const result = await configuracionBD.query(sql);
    const sensores = result.rows.map(sensor => ({
      ...sensor,
      evapotranspiracion: calcularEvapotranspiracion(
        sensor.temperatura || 25,
        sensor.humedad || 50,
        sensor.luminiosidad || 200
      ),
    }));
    res.status(200).json({ sensores });
  } catch (err) {
    console.error('Error en getSensores:', err);
    res.status(500).json({
      msg: 'Error en el servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
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
  } catch (err) {
    console.error('Error en getSensorById:', err);
    res.status(500).json({
      msg: 'Error al obtener el sensor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

export const updateSensor = async (req, res) => {
  try {
    const { id_sensor } = req.params;
    const { nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre_sensor || !tipo_sensor || !unidad_medida || !descripcion || medida_minima === undefined || medida_maxima === undefined) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Validar tipo_sensor
    const validTypes = [
      'TEMPERATURA',
      'HUMEDAD_AMBIENTAL',
      'ILUMINACION',
      'HUMEDAD_TERRENO',
      'VELOCIDAD_VIENTO',
      'NIVEL_DE_PH',
    ];
    if (!validTypes.includes(tipo_sensor.toUpperCase())) {
      return res.status(400).json({ error: 'Tipo de sensor no válido' });
    }

    // Validar que medida_minima y medida_maxima sean números válidos
    if (isNaN(Number(medida_minima)) || isNaN(Number(medida_maxima))) {
      return res.status(400).json({ error: 'Medida mínima y máxima deben ser números válidos' });
    }

    if (Number(medida_maxima) <= Number(medida_minima)) {
      return res.status(400).json({ error: 'La medida máxima debe ser mayor que la medida mínima' });
    }

    const sql = 'UPDATE sensores SET nombre_sensor=$1, tipo_sensor=$2, unidad_medida=$3, descripcion=$4, medida_minima=$5, medida_maxima=$6 WHERE id_sensor=$7 RETURNING *';
    const values = [nombre_sensor, tipo_sensor.toUpperCase(), unidad_medida, descripcion, Number(medida_minima), Number(medida_maxima), id_sensor];
    const result = await configuracionBD.query(sql, values);

    if (result.rowCount > 0) {
      const updatedSensor = result.rows[0];
      console.log('Sensor actualizado en el backend:', updatedSensor);
      res.status(200).json({
        msg: 'Sensor actualizado con éxito',
        sensor: updatedSensor,
      });
    } else {
      res.status(404).json({ msg: 'Sensor no encontrado' });
    }
  } catch (err) {
    console.error('Error en updateSensor:', err);
    res.status(500).json({
      error: 'Error al actualizar el sensor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

export const getReporteSensores = async (req, res) => {
  try {
    const sql = `
      SELECT 
        tipo_sensor,
        STRING_AGG(nombre_sensor, ', ') AS sensores,
        COUNT(*) AS total_sensores,
        MIN(medida_minima) AS min_medida,
        MAX(medida_maxima) AS max_medida
      FROM sensores
      GROUP BY tipo_sensor
      ORDER BY tipo_sensor;
    `;
    const result = await configuracionBD.query(sql);
    const sensoresPorTipo = result.rows.map(sensor => ({
      tipo_sensor: sensor.tipo_sensor,
      sensores: sensor.sensores,
      total_sensores: sensor.total_sensores,
      min_medida: sensor.min_medida,
      max_medida: sensor.max_medida,
    }));
    res.status(200).json({ sensoresPorTipo });
  } catch (err) {
    console.error('Error en getReporteSensores:', err);
    res.status(500).json({
      msg: 'Error en el servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};