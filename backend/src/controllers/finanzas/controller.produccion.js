import { configuracionBD } from '../../config/conexion.js';

export const createProduccion = async (req, res) => {
    try {
        const {
            cantidad_producida,
            nombre_produccion,
            fecha_produccion,
            fk_id_lote,
            fk_id_cultivo,
            descripcion_produccion,
            estado,
            fecha_cosecha,
        } = req.body;

        const sql = `
        INSERT INTO produccion (
          cantidad_producida, 
          nombre_produccion,
          fecha_produccion, 
          fk_id_lote, 
          fk_id_cultivo, 
          descripcion_produccion, 
          estado, 
          fecha_cosecha
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `;

        const values = [
            cantidad_producida,
            nombre_produccion,
            fecha_produccion,
            fk_id_lote,
            fk_id_cultivo,
            descripcion_produccion,
            estado,
            fecha_cosecha,
        ];

        const result = await configuracionBD.query(sql, values);

        if (result.rowCount > 0) {
            res.status(201).json({
                msg: "Producción registrada con éxito",
                produccion: result.rows[0],
            });
        } else {
            res.status(400).json({ msg: "Error al registrar la producción" });
        }
    } catch (err) {
        console.error("Error en createProduccion:", err);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


export const getProducciones = async (req, res) => {
    try {
        const sql = `
        SELECT 
          p.id_produccion,
          p.cantidad_producida,
          p.nombre_produccion,
          p.fecha_produccion,
          p.descripcion_produccion,
          p.estado,
          p.fecha_cosecha,
          -- Lote
          l.id_lote,
          l.nombre_lote,
          l.dimension,
          -- Ubicación
          u.id_ubicacion,
          u.latitud,
          u.longitud,
          -- Cultivo
          c.id_cultivo,
          c.fecha_plantacion,
          c.nombre_cultivo,
          c.descripcion AS descripcion_cultivo
        FROM produccion p
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
        LEFT JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
        ORDER BY p.fecha_produccion DESC;
      `;

        const result = await configuracionBD.query(sql);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ msg: "No hay producciones registradas" });
        }

        const producciones = result.rows.map((p) => ({
            id_produccion: p.id_produccion,
            cantidad_producida: p.cantidad_producida,
            nombre_produccion: p.nombre_produccion,
            fecha_produccion: p.fecha_produccion,
            descripcion_produccion: p.descripcion_produccion,
            estado: p.estado,
            fecha_cosecha: p.fecha_cosecha,
            lote: {
                id: p.id_lote,
                nombre: p.nombre_lote,
                dimension: p.dimension,
                ubicacion: {
                    id: p.id_ubicacion,
                    latitud: p.latitud,
                    longitud: p.longitud,
                },
            },
            cultivo: p.id_cultivo
                ? {
                    id: p.id_cultivo,
                    nombre_cultivo: p.nombre_cultivo,
                    fecha_plantacion: p.fecha_plantacion,
                    descripcion: p.descripcion_cultivo,
                }
                : null,
        }));

        res.status(200).json({ producciones });
    } catch (err) {
        console.error("Error en getProducciones:", err);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


export const getProduccionById = async (req, res) => {
    try {
        const { id_produccion } = req.params;

        const sql = `
        SELECT 
          p.id_produccion,
          p.cantidad_producida,
          p.nombre_produccion,
          p.fecha_produccion,
          p.descripcion_produccion,
          p.estado,
          p.fecha_cosecha,
          -- Lote
          l.id_lote,
          l.nombre_lote,
          l.dimension,
          u.id_ubicacion,
          u.latitud,
          u.longitud,
          -- Cultivo
          c.id_cultivo,
          c.nombre_cultivo,
          c.fecha_plantacion,
          c.descripcion AS descripcion_cultivo
        FROM produccion p
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
        LEFT JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
        WHERE p.id_produccion = $1;
      `;

        const result = await configuracionBD.query(sql, [id_produccion]);

        if (!result.rows.length) {
            return res.status(404).json({ msg: "Producción no encontrada" });
        }

        const p = result.rows[0];

        res.status(200).json({
            produccion: {
                id_produccion: p.id_produccion,
                cantidad_producida: p.cantidad_producida,
                nombre_produccion: p.nombre_produccion,
                fecha_produccion: p.fecha_produccion,
                descripcion_produccion: p.descripcion_produccion,
                estado: p.estado,
                fecha_cosecha: p.fecha_cosecha,
                lote: {
                    id: p.id_lote,
                    nombre: p.nombre_lote,
                    dimension: p.dimension,
                    ubicacion: {
                        id: p.id_ubicacion,
                        latitud: p.latitud,
                        longitud: p.longitud,
                    },
                },
                cultivo: p.id_cultivo
                    ? {
                        id: p.id_cultivo,
                        nombre_cultivo: p.nombre_cultivo,
                        fecha_plantacion: p.fecha_plantacion,
                        descripcion: p.descripcion_cultivo,
                    }
                    : null,
            },
        });
    } catch (err) {
        console.error("Error en getProduccionById:", err);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


export const updateProduccion = async (req, res) => {
    try {
        const { id_produccion } = req.params;
        const {
            nombre_produccion,
            cantidad_producida,
            fecha_produccion,
            fk_id_lote,
            fk_id_cultivo,
            descripcion_produccion,
            estado,
            fecha_cosecha,
        } = req.body;

        const sql = `
            UPDATE produccion 
            SET nombre_produccion = $1,
                cantidad_producida = $2,
                fecha_produccion = $3, 
                fk_id_lote = $4,
                fk_id_cultivo = $5,
                descripcion_produccion = $6, 
                estado = $7, 
                fecha_cosecha = $8
            WHERE id_produccion = $9
            RETURNING *;
            `;

        const values = [
            nombre_produccion,
            cantidad_producida,
            fecha_produccion,
            fk_id_lote,
            fk_id_cultivo,
            descripcion_produccion,
            estado,
            fecha_cosecha,
            id_produccion,
        ];

        const result = await configuracionBD.query(sql, values);

        if (!result.rowCount) {
            return res
                .status(404)
                .json({ msg: "Producción no encontrada o sin cambios" });
        }

        res.status(200).json({
            msg: "Producción actualizada con éxito",
            produccion: result.rows[0],
        });
    } catch (err) {
        console.error("Error en updateProduccion:", err);
        res.status(500).json({ msg: "Error en el servidor" });
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
            return res.status(404).json({ msg: "No hay producciones registradas" });
        }

        const producciones = result.rows.map((p) => ({
            fk_id_lote: {
                id: p.fk_id_lote,
                nombre_lote: p.nombre_lote,
            },
            cantidad_producida: Number(p.total_producido),
        }));

        res.status(200).json({ producciones });
    } catch (err) {
        console.error("Error en getReporteProduccion:", err);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


