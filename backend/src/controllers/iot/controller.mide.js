import { configuracionBD } from '../../config/conexion.js';
import { io } from '../../../index.js'; // Importar io desde index.js

export const createMide = async (req, res) => {
  try {
    const { fk_id_sensor, fk_id_era, valor_medicion, fecha_medicion } = req.body;
    console.log('Datos recibidos en createMide:', req.body);

    // Validar datos
    if (!fk_id_sensor || !fk_id_era || valor_medicion === undefined) {
      return res.status(400).json({ msg: 'Faltan datos requeridos' });
    }

    // Validar y convertir fecha_medicion
    let timestamp;
    if (fecha_medicion) {
      const parsedDate = new Date(fecha_medicion);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ msg: 'Formato de fecha inválido' });
      }
      timestamp = parsedDate.toISOString();
    } else {
      timestamp = new Date().toISOString();
    }

    // Insertar en la base de datos
    const sql = `
      INSERT INTO mide (fk_id_sensor, fk_id_era, valor_medicion, fecha_medicion)
      VALUES ($1, $2, $3, $4)
      RETURNING id_mide, fk_id_sensor, fk_id_era, valor_medicion, fecha_medicion
    `;
    const values = [fk_id_sensor, fk_id_era, valor_medicion, timestamp];
    const result = await configuracionBD.query(sql, values);
    console.log('Resultado de la inserción:', result.rows[0]);

    if (result.rowCount > 0) {
      // Obtener detalles completos
      const newMideId = result.rows[0].id_mide;
      const detailSql = `
        SELECT mide.id_mide, mide.fk_id_sensor, mide.fk_id_era, mide.valor_medicion, mide.fecha_medicion,
          eras.descripcion AS era_descripcion, eras.fk_id_lote,
          lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado AS lote_estado,
          ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud,
          sensores.nombre_sensor, sensores.tipo_sensor, sensores.unidad_medida, sensores.descripcion AS sensor_descripcion,
          sensores.medida_minima, sensores.medida_maxima
        FROM mide
        LEFT JOIN eras ON mide.fk_id_era = eras.id_era
        LEFT JOIN sensores ON mide.fk_id_sensor = sensores.id_sensor
        LEFT JOIN lote ON eras.fk_id_lote = lote.id_lote
        LEFT JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
        WHERE mide.id_mide = $1
      `;
      const detailResult = await configuracionBD.query(detailSql, [newMideId]);

      if (detailResult.rows.length > 0) {
        const newMide = {
          id_mide: detailResult.rows[0].id_mide,
          valor_medicion: detailResult.rows[0].valor_medicion,
          fecha_medicion: detailResult.rows[0].fecha_medicion,
          fk_id_sensor: {
            id_sensor: detailResult.rows[0].fk_id_sensor,
            nombre_sensor: detailResult.rows[0].nombre_sensor,
            tipo_sensor: detailResult.rows[0].tipo_sensor,
            unidad_medida: detailResult.rows[0].unidad_medida,
            descripcion: detailResult.rows[0].sensor_descripcion,
            medida_minima: detailResult.rows[0].medida_minima,
            medida_maxima: detailResult.rows[0].medida_maxima,
          },
          fk_id_era: {
            id: detailResult.rows[0].fk_id_era,
            descripcion: detailResult.rows[0].era_descripcion,
            fk_id_lote: {
              id: detailResult.rows[0].id_lote,
              dimension: detailResult.rows[0].dimension,
              nombre_lote: detailResult.rows[0].nombre_lote,
              fk_id_ubicacion: {
                id: detailResult.rows[0].id_ubicacion,
                latitud: detailResult.rows[0].latitud,
                longitud: detailResult.rows[0].longitud,
              },
              estado: detailResult.rows[0].lote_estado,
            },
          },
        };

        // Emitir la nueva medición
        if (io) {
          console.log('Emitiendo newMide:', newMide);
          io.emit('newMide', newMide);
        } else {
          console.warn('⚠ WebSocket no inicializado');
        }

        res.status(200).json({ msg: 'Medición registrada con éxito', mide: newMide });
      } else {
        res.status(400).json({ msg: 'Error al obtener detalles de la medición' });
      }
    } else {
      res.status(400).json({ msg: 'Error al registrar la medición' });
    }
  } catch (err) {
    console.error('Error en createMide:', err);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};

export const getMide = async (req, res) => {
  try {
    const sql = `
      SELECT mide.id_mide, mide.fk_id_sensor, mide.fk_id_era, mide.valor_medicion, mide.fecha_medicion,
        eras.descripcion AS era_descripcion, eras.fk_id_lote,
        lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado AS lote_estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud,
        sensores.nombre_sensor, sensores.tipo_sensor, sensores.unidad_medida, sensores.descripcion AS sensor_descripcion,
        sensores.medida_minima, sensores.medida_maxima
      FROM mide
      LEFT JOIN eras ON mide.fk_id_era = eras.id_era
      LEFT JOIN sensores ON mide.fk_id_sensor = sensores.id_sensor
      LEFT JOIN lote ON eras.fk_id_lote = lote.id_lote
      LEFT JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
      ORDER BY mide.fecha_medicion DESC
      LIMIT 50
    `;
    const result = await configuracionBD.query(sql);

    if (result.rows.length > 0) {
      const mide = result.rows.map((m) => ({
        id_mide: m.id_mide,
        valor_medicion: m.valor_medicion,
        fecha_medicion: m.fecha_medicion,
        fk_id_sensor: {
          id_sensor: m.fk_id_sensor,
          nombre_sensor: m.nombre_sensor,
          tipo_sensor: m.tipo_sensor,
          unidad_medida: m.unidad_medida,
          descripcion: m.sensor_descripcion,
          medida_minima: m.medida_minima,
          medida_maxima: m.medida_maxima,
        },
        fk_id_era: {
          id: m.fk_id_era,
          descripcion: m.era_descripcion,
          fk_id_lote: {
            id: m.id_lote,
            dimension: m.dimension,
            nombre_lote: m.nombre_lote,
            fk_id_ubicacion: {
              id: m.id_ubicacion,
              latitud: m.latitud,
              longitud: m.longitud,
            },
            estado: m.lote_estado,
          },
        },
      }));
      res.status(200).json({ mide });
    } else {
      res.status(200).json({ mide: [] });
    }
  } catch (err) {
    console.error('Error en getMide:', err);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};

export const getMideById = async (req, res) => {
  try {
    const { id_mide } = req.params;
    const sql = `
      SELECT mide.id_mide, mide.fk_id_sensor, mide.fk_id_era, mide.valor_medicion, mide.fecha_medicion,
        eras.descripcion AS era_descripcion, eras.fk_id_lote,
        lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado AS lote_estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud,
        sensores.nombre_sensor, sensores.tipo_sensor, sensores.unidad_medida, sensores.descripcion AS sensor_descripcion,
        sensores.medida_minima, sensores.medida_maxima
      FROM mide
      LEFT JOIN eras ON mide.fk_id_era = eras.id_era
      LEFT JOIN sensores ON mide.fk_id_sensor = sensores.id_sensor
      LEFT JOIN lote ON eras.fk_id_lote = lote.id_lote
      LEFT JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
      WHERE mide.id_mide = $1
    `;
    const result = await configuracionBD.query(sql, [id_mide]);

    if (result.rows.length > 0) {
      const m = result.rows[0];
      const mide = {
        id_mide: m.id_mide,
        valor_medicion: m.valor_medicion,
        fecha_medicion: m.fecha_medicion,
        fk_id_sensor: {
          id_sensor: m.fk_id_sensor,
          nombre_sensor: m.nombre_sensor,
          tipo_sensor: m.tipo_sensor,
          unidad_medida: m.unidad_medida,
          descripcion: m.sensor_descripcion,
          medida_minima: m.medida_minima,
          medida_maxima: m.medida_maxima,
        },
        fk_id_era: {
          id: m.fk_id_era,
          descripcion: m.era_descripcion,
          fk_id_lote: {
            id: m.id_lote,
            dimension: m.dimension,
            nombre_lote: m.nombre_lote,
            fk_id_ubicacion: {
              id: m.id_ubicacion,
              latitud: m.latitud,
              longitud: m.longitud,
            },
            estado: m.lote_estado,
          },
        },
      };
      res.status(200).json({ mide });
    } else {
      res.status(404).json({ msg: 'No se encontró esa medición' });
    }
  } catch (err) {
    console.error('Error en getMideById:', err);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};

export const updateMide = async (req, res) => {
  try {
    const { id_mide } = req.params;
    const { fk_id_sensor, fk_id_era, valor_medicion, fecha_medicion } = req.body;
    console.log('Datos recibidos en updateMide:', { id_mide, fk_id_sensor, fk_id_era, valor_medicion, fecha_medicion });

    // Validar datos
    if (!fk_id_sensor || !fk_id_era || valor_medicion === undefined) {
      return res.status(400).json({ msg: 'Faltan datos requeridos' });
    }

    // Validar y convertir fecha_medicion
    let timestamp = fecha_medicion;
    if (fecha_medicion) {
      const parsedDate = new Date(fecha_medicion);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ msg: 'Formato de fecha inválido' });
      }
      timestamp = parsedDate.toISOString();
    } else {
      timestamp = new Date().toISOString();
    }

    const sql = `
      UPDATE mide
      SET fk_id_sensor = $1, fk_id_era = $2, valor_medicion = $3, fecha_medicion = $4
      WHERE id_mide = $5
      RETURNING id_mide, fk_id_sensor, fk_id_era, valor_medicion, fecha_medicion
    `;
    const values = [fk_id_sensor, fk_id_era, valor_medicion, timestamp, id_mide];
    const result = await configuracionBD.query(sql, values);

    if (result.rowCount > 0) {
      const updatedMide = result.rows[0];
      res.status(200).json({ msg: 'Medición actualizada con éxito', mide: updatedMide });
    } else {
      res.status(404).json({ msg: 'No se encontró la medición' });
    }
  } catch (err) {
    console.error('Error en updateMide:', err);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};