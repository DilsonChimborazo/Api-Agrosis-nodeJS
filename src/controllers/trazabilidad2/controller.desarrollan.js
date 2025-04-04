<<<<<<<< HEAD:backend/src/controllers/trazabilidad/controller.desarrollan.js
import { configuracionBD } from "../../config/conexion.js";

========
import { configuracionBD } from "../config/conexion.js";
>>>>>>>> 45f304b36b8df9b96b8911b4b7ec589ae34df3ac:src/controllers/trazabilidad2/controller.desarrollan.js

export const postDesarrollan = async (req, res) => {
    try {
        const { fk_id_cultivo, fk_id_pea } = req.body;
        const sql = "INSERT INTO desarrollan (fk_id_cultivo, fk_id_pea) VALUES ($1, $2)";
<<<<<<<< HEAD:backend/src/controllers/trazabilidad/controller.desarrollan.js
        const rowCount  = await configuracionBD.query(sql, [fk_id_cultivo, fk_id_pea]);
========
        const { rowCount } = await configuracionBD.query(sql, [fk_id_cultivo, fk_id_pea]);
>>>>>>>> 45f304b36b8df9b96b8911b4b7ec589ae34df3ac:src/controllers/trazabilidad2/controller.desarrollan.js

        if (rowCount > 0) {
            return res.status(200).json({ "message": "Registro en desarrollan creado correctamente" });
        } else {
            return res.status(404).json({ "message": "No se pudo registrar en desarrollan" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor" });
    }
};

export const getDesarrollan = async (req, res) => {
    try {

        const sql = `SELECT 
                        d.id_desarrollan, 
                        d.fk_id_cultivo, 
                        c.nombre_cultivo, 
                        c.fecha_plantacion, 
                        d.fk_id_pea, 
                        p.nombre AS nombre_pea, 
                        p.descripcion AS descripcion_pea
                    FROM desarrollan d
                    JOIN cultivo c ON d.fk_id_cultivo = c.id_cultivo
                    JOIN pea p ON d.fk_id_pea = p.id_pea`;

        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            const desarrollan = result.rows.map(d => ({
                id_desarrollan: d.id_desarrollan,
                fk_id_cultivo: {
                    id_cultivo: d.fk_id_cultivo,
                    nombre_cultivo: d.nombre_cultivo,
                    fecha_plantacion: d.fecha_plantacion
                },
                fk_id_pea: {
                    id_pea: d.fk_id_pea,
                    nombre: d.nombre_pea,
                    descripcion: d.descripcion_pea
                }
            }));

            res.status(200).json({ desarrollan });
        } else {
            res.status(404).json({ msg: 'No hay registros en desarrollan' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const actualizarDesarrollan = async (req, res) => {
    try {
        const { fk_id_cultivo, fk_id_pea } = req.body;
        const id = req.params.id_desarrollan;
        const sql = "UPDATE desarrollan SET fk_id_cultivo=$1, fk_id_pea=$2 WHERE id_desarrollan=$3";

        const { rowCount } = await configuracionBD.query(sql, [fk_id_cultivo, fk_id_pea, id]);

        if (rowCount > 0) {
            return res.status(200).json({ "message": "Registro en desarrollan actualizado correctamente." });
        } else {
            return res.status(404).json({ "message": "No se pudo actualizar el registro en desarrollan." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor." });
    }
};

export const IdDesarrollan = async (req, res) => {
    try {
        const { id_desarrollan } = req.params;

        console.log("Buscando desarrollan con ID:", id_desarrollan);

        const sql = `SELECT 
                        d.id_desarrollan, 
                        d.fk_id_cultivo, 
                        c.id_cultivo,
                        c.nombre_cultivo, 
                        c.fecha_plantacion, 
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
                        s.cantidad,
                        d.fk_id_pea, 
                        p.id_pea,
                        p.nombre AS nombre_pea, 
                        p.descripcion AS descripcion_pea
                    FROM desarrollan d
                    JOIN cultivo c ON d.fk_id_cultivo = c.id_cultivo
                    JOIN especie e ON c.fk_id_especie = e.id_especie
                    JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                    JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
                    JOIN pea p ON d.fk_id_pea = p.id_pea
                    WHERE d.id_desarrollan = $1`;

        const result = await configuracionBD.query(sql, [id_desarrollan]);

        if (result.rows.length > 0) {
            const desarrollan = result.rows.map(d => ({
                id_desarrollan: d.id_desarrollan,
                fk_id_cultivo: {
                    id_cultivo: d.id_cultivo,
                    nombre_cultivo: d.nombre_cultivo,
                    fecha_plantacion: d.fecha_plantacion,
                    descripcion: d.descripcion_cultivo,
                    fk_id_especie: {
                        id_especie: d.id_especie,
                        nombre_comun: d.nombre_comun,
                        nombre_cientifico: d.nombre_cientifico,
                        descripcion: d.descripcion_especie,
                        fk_id_tipo_cultivo: {
                            id_tipo_cultivo: d.id_tipo_cultivo,
                            nombre: d.nombre_tipo_cultivo,
                            descripcion: d.descripcion_tipo_cultivo,
                        },
                    },
                    fk_id_semillero: {
                        id_semillero: d.id_semillero,
                        nombre_semilla: d.nombre_semilla,
                        fecha_siembra: d.fecha_siembra,
                        fecha_estimada: d.fecha_estimada,
                        cantidad: d.cantidad,
                    },
                },
                fk_id_pea: {
                    id_pea: d.id_pea,
                    nombre: d.nombre_pea,
                    descripcion: d.descripcion_pea
                }
            }));

            res.status(200).json({ desarrollan });
        } else {
            res.status(404).json({ msg: 'No se encontró el registro en desarrollan' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error en el servidor." });
    }
};


export const getReporteCultivosPEA = async (req, res) => {
    try {
      const sql = `
        SELECT 
            d.id_desarrollan,
            c.id_cultivo,
            c.nombre_cultivo,
            p.id_pea,
            p.nombre AS nombre_pea,
            p.descripcion AS descripcion_pea
        FROM desarrollan d
        JOIN cultivo c ON d.fk_id_cultivo = c.id_cultivo
        JOIN PEA p ON d.fk_id_pea = p.id_pea;
      `;
  
      const result = await configuracionBD.query(sql);
  
      res.status(200).json({ reporte: result.rows });
    } catch (error) {
      console.error('Error en getReporteCultivosPEA:', error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };
  