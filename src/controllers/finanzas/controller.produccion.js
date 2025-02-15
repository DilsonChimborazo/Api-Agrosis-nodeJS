import { configuracionBD } from '../../config/conexion.js';

export const createProduccion = async (req, res) => {
    try {
        const { cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha } = req.body;
        const sql = 'INSERT INTO produccion (cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha) VALUES($1, $2, $3, $4, $5, $6)';
        const values = [cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Producción registrada con éxito' });
        } else {
            res.status(400).json({ msg: 'Error al registrar la producción' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getProducciones = async (req, res) => {
    try {
        const sql = `
        SELECT 
            p.id_produccion,
            p.cantidad_producida,
            p.fecha_produccion,
            l.id_lote,
            l.dimension,
            l.nombre_lote,
            l.fk_id_ubicacion,
            l.estado,
            p.descripcion_produccion,
            p.estado,
            p.fecha_cosecha,
            u.id_ubicacion,
            u.latitud,
            u.longitud
        FROM produccion p
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
    `;

        const result = await configuracionBD.query(sql);
        res.status(200).json({ producciones: result.rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getProduccionById = async (req, res) => {
    try {
        const { id_produccion } = req.params;
        const sql = `
        SELECT 
            p.id_produccion,
            p.cantidad_producida,
            p.fecha_produccion,
            l.id_lote,
            l.dimension,
            l.nombre_lote,
            l.fk_id_ubicacion,
            l.estado,
            p.descripcion_produccion,
            p.estado,
            p.fecha_cosecha,
            u.id_ubicacion,
            u.latitud,
            u.longitud
        FROM produccion p
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
        WHERE id_produccion = $1`;
        const result = await configuracionBD.query(sql, [id_produccion]);
        res.status(200).json({ produccion: result.rows[0] || {} });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const updateProduccion = async (req, res) => {
    try {
        const { id_produccion } = req.params;
        const { cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha } = req.body;
        const sql = 'UPDATE produccion SET cantidad_producida=$1, fecha_produccion=$2, fk_id_lote=$3, descripcion_produccion=$4, estado=$5, fecha_cosecha=$6 WHERE id_produccion=$7';
        const values = [cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha, id_produccion];
        const result = await configuracionBD.query(sql, values);
        res.status(200).json({ msg: 'Producción actualizada con éxito' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getReporteProduccion = async (req, res) => {
    try {
        const sql = `
            SELECT 
                p.fk_id_lote,
                l.nombre_lote, 
                COALESCE(SUM(p.cantidad_producida), 0) AS total_producido
            FROM produccion p
            JOIN lote l ON p.fk_id_lote = l.id_lote
            GROUP BY p.fk_id_lote, l.nombre_lote
            ORDER BY l.nombre_lote;
        `;

        const result = await configuracionBD.query(sql);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ msg: 'No hay producciones registradas' });
        }

        const producciones = result.rows.map(produccion => ({
            fk_id_lote: {
                id: produccion.fk_id_lote,
                nombre_lote: produccion.nombre_lote
            },
            cantidad_producida: Number(produccion.total_producido) 
        }));

        res.status(200).json({ producciones });

    } catch (err) {
        console.error("Error en getReporteProduccion:", err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

