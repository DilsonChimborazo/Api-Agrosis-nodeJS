// erasController.js
import {configuracionBD} from '../../config/conexion.js';

export const getEras = async (req, res) => {
    try {
        const sql = `
            SELECT eras.id_era, eras.descripcion, eras.fk_id_lote, eras.estado,
                   lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado AS lote_estado,
                   ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud
            FROM eras
            JOIN lote ON eras.fk_id_lote = lote.id_lote
            JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion;
        `;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const eras = result.rows.map(era => ({
                id: era.id_era,
                descripcion: era.descripcion,
                estado: era.estado,
                fk_id_lote: {
                    id: era.fk_id_lote,
                    dimension: era.dimension,
                    nombre_lote: era.nombre_lote,
                    fk_id_ubicacion: {
                        id: era.fk_id_ubicacion,
                        latitud: era.latitud,
                        longitud: era.longitud
                    },
                    estado: era.lote_estado
                }
            }));
            res.status(200).json({ eras });
        } else {
            res.status(404).json({ msg: 'No hay eras registradas' });
        }
    } catch (err) {
        console.error('Error en getEras:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
};

export const getEraById = async (req, res) => {
    try {
        const { id_eras } = req.params;
        const sql = `
            SELECT eras.id_era, eras.descripcion, eras.fk_id_lote, eras.estado,
                   lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado AS lote_estado,
                   ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud
            FROM eras
            JOIN lote ON eras.fk_id_lote = lote.id_lote
            JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
            WHERE eras.id_era = $1
        `;
        const result = await configuracionBD.query(sql, [id_eras]);
        if (result.rows.length > 0) {
            const era = result.rows.map(era => ({
                id: era.id_era,
                descripcion: era.descripcion,
                estado: era.estado,
                fk_id_lote: {
                    id: era.fk_id_lote,
                    dimension: era.dimension,
                    nombre_lote: era.nombre_lote,
                    fk_id_ubicacion: {
                        id: era.fk_id_ubicacion,
                        latitud: era.latitud,
                        longitud: era.longitud
                    },
                    estado: era.lote_estado
                }
            }))[0];
            res.status(200).json({ era });
        } else {
            res.status(404).json({ msg: 'No se encontró la era' });
        }
    } catch (err) {
        console.error('Error en getEraById:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
};

export const updateEra = async (req, res) => {
    try {
        const { id_eras } = req.params;
        const { descripcion, fk_id_lote, estado } = req.body;
        if (!['Activo', 'Inactivo'].includes(estado)) {
            return res.status(400).json({ msg: 'Estado inválido. Use "Activo" o "Inactivo".' });
        }
        const sql = 'UPDATE eras SET descripcion=$1, fk_id_lote=$2, estado=$3 WHERE id_era=$4';
        const values = [descripcion, fk_id_lote, estado, id_eras];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Era actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'No se encontró la era' });
        }
    } catch (err) {
        console.error('Error en updateEra:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
};

export const createEras = async (req, res) => {
    try {
        const { descripcion, fk_id_lote, estado } = req.body;
        if (!['Activo', 'Inactivo'].includes(estado)) {
            return res.status(400).json({ msg: 'Estado inválido. Use "Activo" o "Inactivo".' });
        }
        const sql = 'INSERT INTO eras (descripcion, fk_id_lote, estado) VALUES($1, $2, $3)';
        const values = [descripcion, fk_id_lote, estado || 'Activo'];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Era registrada con éxito' });
        } else {
            res.status(400).json({ msg: 'Error al registrar la era' });
        }
    } catch (err) {
        console.error('Error en createEras:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
};

export const getTotalEras = async (req, res) => {
    try {
        const sql = `
            SELECT 
                lote.id_lote, 
                lote.nombre_lote,
                COUNT(*) AS total_eras
            FROM eras
            JOIN lote ON eras.fk_id_lote = lote.id_lote
            WHERE eras.estado = 'Activo'
            GROUP BY lote.id_lote, lote.nombre_lote
            ORDER BY total_eras DESC;
        `;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            res.status(200).json({ totalEras: result.rows });
        } else {
            res.status(404).json({ msg: 'No hay eras registradas' });
        }
    } catch (err) {
        console.error('Error en getTotalEras:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
};