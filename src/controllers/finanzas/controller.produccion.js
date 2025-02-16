import { configuracionBD } from '../../config/conexion.js';

export const createProduccion = async (req, res) => {
    try {
        const { cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha } = req.body;
        const sql = `
            INSERT INTO produccion (cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha];
        
        const result = await configuracionBD.query(sql, values);

        if (result.rowCount > 0) {
            res.status(201).json({
                msg: 'Producción registrada con éxito',
                produccion: result.rows[0]
            });
        } else {
            res.status(400).json({ msg: 'Error al registrar la producción' });
        }
    } catch (err) {
        console.error("Error en createProduccion:", err);
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
                p.descripcion_produccion,
                p.estado,
                p.fecha_cosecha,
                l.id_lote,
                l.nombre_lote,
                l.dimension,
                l.fk_id_ubicacion,
                u.id_ubicacion,
                u.latitud,
                u.longitud
            FROM produccion p
            JOIN lote l ON p.fk_id_lote = l.id_lote
            JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
            ORDER BY p.fecha_produccion DESC;
        `;

        const result = await configuracionBD.query(sql);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ msg: 'No hay producciones registradas' });
        }

        const producciones = result.rows.map(produccion => ({
            id_produccion: produccion.id_produccion,
            cantidad_producida: produccion.cantidad_producida,
            fecha_produccion: produccion.fecha_produccion,
            descripcion_produccion: produccion.descripcion_produccion,
            estado: produccion.estado,
            fecha_cosecha: produccion.fecha_cosecha,
            lote: {
                id: produccion.id_lote,
                nombre: produccion.nombre_lote,
                dimension: produccion.dimension,
                ubicacion: {
                    id: produccion.id_ubicacion,
                    latitud: produccion.latitud,
                    longitud: produccion.longitud
                }
            }
        }));

        res.status(200).json({ producciones });

    } catch (err) {
        console.error("Error en getProducciones:", err);
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
                p.descripcion_produccion,
                p.estado,
                p.fecha_cosecha,
                l.id_lote,
                l.nombre_lote,
                l.dimension,
                l.fk_id_ubicacion,
                u.id_ubicacion,
                u.latitud,
                u.longitud
            FROM produccion p
            JOIN lote l ON p.fk_id_lote = l.id_lote
            JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
            WHERE p.id_produccion = $1;
        `;

        const result = await configuracionBD.query(sql, [id_produccion]);

        if (!result.rows.length) {
            return res.status(404).json({ msg: 'Producción no encontrada' });
        }

        const produccion = result.rows[0];

        res.status(200).json({
            produccion: {
                id_produccion: produccion.id_produccion,
                cantidad_producida: produccion.cantidad_producida,
                fecha_produccion: produccion.fecha_produccion,
                descripcion_produccion: produccion.descripcion_produccion,
                estado: produccion.estado,
                fecha_cosecha: produccion.fecha_cosecha,
                lote: {
                    id: produccion.id_lote,
                    nombre: produccion.nombre_lote,
                    dimension: produccion.dimension,
                    ubicacion: {
                        id: produccion.id_ubicacion,
                        latitud: produccion.latitud,
                        longitud: produccion.longitud
                    }
                }
            }
        });

    } catch (err) {
        console.error("Error en getProduccionById:", err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const updateProduccion = async (req, res) => {
    try {
        const { id_produccion } = req.params;
        const { cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha } = req.body;

        const sql = `
            UPDATE produccion 
            SET cantidad_producida = $1, fecha_produccion = $2, fk_id_lote = $3, 
                descripcion_produccion = $4, estado = $5, fecha_cosecha = $6 
            WHERE id_produccion = $7
            RETURNING *;
        `;

        const values = [cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha, id_produccion];
        const result = await configuracionBD.query(sql, values);

        if (!result.rowCount) {
            return res.status(404).json({ msg: 'Producción no encontrada o sin cambios' });
        }

        res.status(200).json({
            msg: 'Producción actualizada con éxito',
            produccion: result.rows[0]
        });

    } catch (err) {
        console.error("Error en updateProduccion:", err);
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

