import { configuracionBD } from '../../config/conexion.js';

export const createLotes = async (req, res) => {
  try {
    const { dimension, nombre_lote, fk_id_ubicacion, estado } = req.body;
    if (!dimension || !nombre_lote || !fk_id_ubicacion || !estado) {
      return res.status(400).json({ msg: 'Faltan campos' });
    }
    const dimensionNumber = Number(dimension);
    if (isNaN(dimensionNumber) || dimensionNumber <= 0) {
      return res.status(400).json({ msg: 'Dimensión inválida' });
    }
    const ubicacionCheck = await configuracionBD.query(
      'SELECT id_ubicacion FROM ubicacion WHERE id_ubicacion = $1',
      [fk_id_ubicacion]
    );
    if (ubicacionCheck.rowCount === 0) {
      return res.status(400).json({ msg: `Ubicación ${fk_id_ubicacion} no existe` });
    }
    const sql = `
      INSERT INTO lote (dimension, nombre_lote, fk_id_ubicacion, estado)
      VALUES ($1, $2, $3, $4)
      RETURNING id_lote, dimension, nombre_lote, fk_id_ubicacion, estado
    `;
    const values = [dimensionNumber, nombre_lote.trim(), fk_id_ubicacion, estado];
    const result = await configuracionBD.query(sql, values);
    res.status(200).json({ msg: 'Lote registrado', lote: result.rows[0] });
  } catch (e) {
    console.error('Error:', e.message);
    res.status(500).json({ msg: `Error: ${e.message}` });
  }
};

export const getLotes = async (req, res) => {
  try {
    console.log('Solicitud recibida en getLotes');
    const sql = `
      SELECT 
        lote.id_lote, 
        lote.dimension, 
        lote.nombre_lote, 
        lote.fk_id_ubicacion, 
        lote.estado,
        ubicacion.id_ubicacion, 
        ubicacion.latitud, 
        ubicacion.longitud
      FROM lote
      JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
    `;
    const result = await configuracionBD.query(sql);
    if (result.rows.length > 0) {
      const lotes = result.rows.map(row => ({
        id: row.id_lote,
        dimension: row.dimension,
        nombre_lote: row.nombre_lote,
        fk_id_ubicacion: {
          id: row.fk_id_ubicacion,
          latitud: row.latitud,
          longitud: row.longitud,
        },
        estado: row.estado,
      }));
      res.status(200).json({ msg: 'Lotes obtenidos con éxito', lote: lotes });
    } else {
      res.status(404).json({ msg: 'No hay lotes registrados' });
    }
  } catch (err) {
    console.log('Error en getLotes:', err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export const getLoteById = async (req, res) => {
  try {
    const { id_lote } = req.params;
    console.log('Solicitud recibida en getLoteById:', { id_lote });
    const sql = `
      SELECT 
        lote.id_lote, 
        lote.dimension, 
        lote.nombre_lote, 
        lote.fk_id_ubicacion, 
        lote.estado,
        ubicacion.id_ubicacion, 
        ubicacion.latitud, 
        ubicacion.longitud
      FROM lote 
      JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
      WHERE lote.id_lote = $1
    `;
    const result = await configuracionBD.query(sql, [id_lote]);
    if (result.rows.length > 0) {
      const lote = {
        id: result.rows[0].id_lote,
        dimension: result.rows[0].dimension,
        nombre_lote: result.rows[0].nombre_lote,
        fk_id_ubicacion: {
          id: result.rows[0].fk_id_ubicacion,
          latitud: result.rows[0].latitud,
          longitud: result.rows[0].longitud,
        },
        estado: result.rows[0].estado,
      };
      res.status(200).json({ msg: 'Lote encontrado', lote });
    } else {
      res.status(404).json({ msg: 'Lote no encontrado' });
    }
  } catch (err) {
    console.log('Error en getLoteById:', err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export const updateLote = async (req, res) => {
  try {
    const { id_lote } = req.params;
    const { dimension, nombre_lote, fk_id_ubicacion, estado } = req.body;
    console.log('Solicitud recibida en updateLote:', { id_lote, dimension, nombre_lote, fk_id_ubicacion, estado });
    const sql = `
      UPDATE lote 
      SET dimension=$1, nombre_lote=$2, fk_id_ubicacion=$3, estado=$4 
      WHERE id_lote=$5
      RETURNING id_lote, dimension, nombre_lote, fk_id_ubicacion, estado
    `;
    const values = [dimension, nombre_lote, fk_id_ubicacion, estado, id_lote];
    const result = await configuracionBD.query(sql, values);
    if (result.rowCount > 0) {
      res.status(200).json({ msg: 'Lote actualizado con éxito', lote: result.rows[0] });
    } else {
      res.status(404).json({ msg: 'Lote no encontrado' });
    }
  } catch (err) {
    console.log('Error en updateLote:', err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

export const getReporteLotes = async (req, res) => {
  try {
    console.log('Solicitud recibida en getReporteLotes');
    const sql = `
      SELECT 
        estado, 
        STRING_AGG(nombre_lote, ', ') AS lotes
      FROM lote
      GROUP BY estado
      ORDER BY estado
    `;
    const result = await configuracionBD.query(sql);
    if (result.rows.length > 0) {
      const lotes = result.rows.map(row => ({
        estado: row.estado,
        lotes: row.lotes,
      }));
      res.status(200).json({ msg: 'Reporte generado con éxito', lote: lotes });
    } else {
      res.status(404).json({ msg: 'No hay lotes registrados' });
    }
  } catch (err) {
    console.log('Error en getReporteLotes:', err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};