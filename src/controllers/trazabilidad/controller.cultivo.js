import { configuracionBD } from "../../config/conexion.js";

export const postCultivo = async (req, res) => {
    try {
        const { fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero } = req.body;
        const sql = "INSERT INTO cultivo(fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero) VALUES($1, $2, $3, $4, $5)";
        const rows = await configuracionBD.query(sql, [fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero]);

        if (rows.rowCount > 0) {
            return res.status(200).json({ "message": "Cultivo registrado correctamente" });
        } else {
            return res.status(404).json({ "message": "No se pudo registrar el cultivo" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor" });
    }
};


export const getCultivo = async (req, res) => {
    try {
        console.log("Buscando todos los cultivos...");

        const sql = `SELECT
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    t.id_tipo_cultivo,
                    t.nombre AS nombre_tipo_cultivo,
                    t.descripcion AS descripcion_tipo_cultivo,
                    s.id_semillero,
                    s.nombre_semilla,
                    s.fecha_siembra,
                    s.fecha_estimada,
                    s.cantidad
                FROM cultivo c
                LEFT JOIN especie e ON c.fk_id_especie = e.id_especie
                LEFT JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                LEFT JOIN semilleros s ON c.fk_id_semillero = s.id_semillero`;

        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            const cultivos = result.rows.map(cultivo => ({
                id_cultivo: cultivo.id_cultivo,
                fecha_plantacion: cultivo.fecha_plantacion,
                nombre_cultivo: cultivo.nombre_cultivo,
                descripcion: cultivo.descripcion_cultivo,
                fk_id_especie: cultivo.fk_id_especie
                    ? {
                        id_especie: cultivo.id_especie,
                        nombre_comun: cultivo.nombre_comun,
                        nombre_cientifico: cultivo.nombre_cientifico,
                        descripcion: cultivo.descripcion_especie,
                        fk_id_tipo_cultivo: {
                            id_tipo_cultivo: cultivo.id_tipo_cultivo,
                            nombre: cultivo.nombre_tipo_cultivo,
                            descripcion: cultivo.descripcion_tipo_cultivo
                        }
                    }
                    : null,
                fk_id_semillero: cultivo.fk_id_semillero
                    ? {
                        id_semillero: cultivo.id_semillero,
                        nombre_semilla: cultivo.nombre_semilla,
                        fecha_siembra: cultivo.fecha_siembra,
                        fecha_estimada: cultivo.fecha_estimada,
                        cantidad: cultivo.cantidad
                    }
                    : null
            }));

            res.status(200).json({ cultivos });
        } else {
            res.status(404).json({ msg: 'No hay cultivos registrados' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
export const actualizarCultivo = async (req, res) => {
    try {
        const { fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero } = req.body;
        const id = req.params.id_cultivo;
        const sql = "UPDATE cultivo SET fecha_plantacion=$1, nombre_cultivo=$2, descripcion=$3, fk_id_especie=$4, fk_id_semillero=$5 WHERE id_cultivo=$6";
        
        const { rowCount } = await configuracionBD.query(sql, [fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero, id]);
        
        if (rowCount > 0) {
            return res.status(200).json({ "message": "Cultivo editado correctamente." });
        } else {
            return res.status(404).json({ "message": "No se pudo editar el cultivo." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor." });
    }
};

export const IdCultivo = async (req, res) => {
    try {
        const { id_cultivo } = req.params;

        console.log("Buscando cultivo con ID:", id_cultivo);

        const sql = `SELECT 
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    t.id_tipo_cultivo,
                    t.nombre AS nombre_tipo_cultivo,
                    t.descripcion AS descripcion_tipo_cultivo,
                    s.id_semillero,
                    s.nombre_semilla,
                    s.fecha_siembra,
                    s.fecha_estimada,
                    s.cantidad
                FROM cultivo c
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
                WHERE c.id_cultivo = $1`;

        const result = await configuracionBD.query(sql, [id_cultivo]);

        if (result.rows.length > 0) {
            const cultivo = result.rows.map(plant => ({
                id_cultivo: plant.id_cultivo,
                fecha_plantacion: plant.fecha_plantacion,
                nombre_cultivo: plant.nombre_cultivo,
                descripcion: plant.descripcion_cultivo,
                fk_id_especie: {
                    id_especie: plant.id_especie,
                    nombre_comun: plant.nombre_comun,
                    nombre_cientifico: plant.nombre_cientifico,
                    descripcion: plant.descripcion_especie,
                    fk_id_tipo_cultivo: {
                        id_tipo_cultivo: plant.id_tipo_cultivo,
                        nombre: plant.nombre_tipo_cultivo,
                        descripcion: plant.descripcion_tipo_cultivo,
                    },
                },
                fk_id_semillero: {
                    id_semillero: plant.id_semillero,
                    nombre_semilla: plant.nombre_semilla,
                    fecha_siembra: plant.fecha_siembra,
                    fecha_estimada: plant.fecha_estimada,
                    cantidad: plant.cantidad,
                },
            }));

            res.status(200).json({ cultivo });
        } else {
            res.status(404).json({ msg: 'No se encontró el cultivo' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error en el servidor." });
    }
};

export const getReporteCultivosActivos = async (req, res) => {
  try {
    const sql = `
      SELECT 
          COUNT(c.id_cultivo) AS total_cultivos,
          STRING_AGG(DISTINCT c.nombre_cultivo, ', ') AS nombres_cultivos,
          STRING_AGG(DISTINCT tc.nombre, ', ') AS tipos_cultivo
      FROM cultivo c
      JOIN especie e ON c.fk_id_especie = e.id_especie
      JOIN tipo_cultivo tc ON e.fk_id_tipo_cultivo = tc.id_tipo_cultivo;
    `;

    const result = await configuracionBD.query(sql);

    res.status(200).json({ reporte: result.rows[0] });
  } catch (error) {
    console.error('Error en getReporteCultivosActivos:', error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
