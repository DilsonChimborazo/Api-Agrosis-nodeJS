import { configuracionBD } from '../../config/conexion.js';

// Crear especie
export const createEspecie = async (req, res) => {
    const {
        nombre_comun,
        nombre_cientifico,
        descripcion,
        fk_id_tipo_cultivo,
        id_tipo_cultivo // <- aceptar también esta forma
    } = req.body;

    // Prioriza fk_id_tipo_cultivo, pero si no existe usa id_tipo_cultivo
    const tipoCultivo = fk_id_tipo_cultivo ?? id_tipo_cultivo;

    try {
        const query = `
            INSERT INTO especie (nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [nombre_comun, nombre_cientifico, descripcion, tipoCultivo];
        const result = await configuracionBD.query(query, values);
        res.status(201).json({ msg: 'Especie registrada con éxito', especie: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar la especie' });
    }
};


// Obtener todas las especies con su tipo de cultivo
export const getEspecie = async (req, res) => {
    try {
        const query = `
            SELECT 
                e.id_especie, 
                e.nombre_comun, 
                e.nombre_cientifico, 
                e.descripcion AS descripcion_especie,
                t.id_tipo_cultivo, 
                t.nombre AS nombre_tipo, 
                t.descripcion AS descripcion_tipo
            FROM especie e
            LEFT JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo;
        `;
        const result = await configuracionBD.query(query);

        const especies = result.rows.map(row => ({
            id_especie: row.id_especie,
            nombre_comun: row.nombre_comun,
            nombre_cientifico: row.nombre_cientifico,
            descripcion: row.descripcion_especie,
            tipo_cultivo: row.id_tipo_cultivo ? {
                id_tipo_cultivo: row.id_tipo_cultivo,
                nombre: row.nombre_tipo,
                descripcion: row.descripcion_tipo
            } : null
        }));

        res.status(200).json(especies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las especies' });
    }
};

// Obtener especie por ID con su tipo de cultivo


// Actualizar especie
export const getEspecieById = async (req, res) => {
    const { id_especie } = req.params;
    try {
        const query = `
            SELECT 
                e.id_especie, 
                e.nombre_comun, 
                e.nombre_cientifico, 
                e.descripcion AS descripcion_especie,
                t.id_tipo_cultivo, 
                t.nombre AS nombre_tipo, 
                t.descripcion AS descripcion_tipo
            FROM especie e
            LEFT JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
            WHERE e.id_especie = $1
        `;
        const result = await configuracionBD.query(query, [id_especie]);

        if (result.rows.length > 0) {
            const row = result.rows[0];
            const especie = {
                id_especie: row.id_especie,
                nombre_comun: row.nombre_comun,
                nombre_cientifico: row.nombre_cientifico,
                descripcion: row.descripcion_especie,
                tipo_cultivo: row.id_tipo_cultivo ? {
                    id_tipo_cultivo: row.id_tipo_cultivo,
                    nombre: row.nombre_tipo,
                    descripcion: row.descripcion_tipo
                } : null
            };
            res.status(200).json(especie);
        } else {
            res.status(404).json({ msg: 'Especie no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la especie' });
    }
};

// Actualizar especie (requiere autenticación)
export const updateEspecie = async (req, res) => {
    const { id_especie } = req.params;
    const { nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo } = req.body;
    try {
        const query = `
            UPDATE especie
            SET nombre_comun = $1, 
                nombre_cientifico = $2, 
                descripcion = $3, 
                fk_id_tipo_cultivo = $4
            WHERE id_especie = $5 RETURNING *
        `;
        const values = [nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo, id_especie];
        const result = await configuracionBD.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json({ msg: 'Especie actualizada con éxito', especie: result.rows[0] });
        } else {
            res.status(404).json({ msg: 'Especie no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la especie' });
    }
};

// Reporte: cantidad de especies por tipo de cultivo
export const getReporteEspeciesPorTipoCultivo = async (req, res) => {
    try {
        const sql = `
            SELECT 
                tc.id_tipo_cultivo,
                tc.nombre AS tipo_cultivo,
                COUNT(e.id_especie) AS total_especies
            FROM tipo_cultivo tc
            LEFT JOIN especie e ON tc.id_tipo_cultivo = e.fk_id_tipo_cultivo
            GROUP BY tc.id_tipo_cultivo, tc.nombre
            ORDER BY total_especies DESC;
        `;
        const result = await configuracionBD.query(sql);
        res.status(200).json({ reporte: result.rows });
    } catch (error) {
        console.error('Error en getReporteEspeciesPorTipoCultivo:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
