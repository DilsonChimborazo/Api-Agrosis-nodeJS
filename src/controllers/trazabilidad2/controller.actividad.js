<<<<<<<< HEAD:backend/src/controllers/trazabilidad/controller.actividad.js

import {configuracionBD} from "../../config/conexion.js";

========
import {configuracionBD} from "../config/conexion.js";
>>>>>>>> 45f304b36b8df9b96b8911b4b7ec589ae34df3ac:src/controllers/trazabilidad2/controller.actividad.js

export const postActividad = async (req , res) => {
    try{
        const {nombre_actividad, descripcion } = req.body
        const sql = "INSERT INTO actividad(nombre_actividad, descripcion) VALUES($1, $2)"
        const rows = await configuracionBD.query(sql, [nombre_actividad, descripcion ]);

        if (rows.rowCount > 0) {
            return res.status(200).json({ "message": "Actividad registrado correctamente" });
        } else {
            return res.status(404).json({ "message": "No se pudo registrar el actividad" });
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({"message":"Error en el servidor"})
    }
};
 export const getActividad = async (req, res) => {
    try{
        const sql = `SELECT
                    id_actividad,
                    nombre_actividad,
                    descripcion
                FROM actividad`;
        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0){
            const actividad = result.rows.map(actividad => ({
                id_actividad: actividad.id_actividad,
                nombre_actividad: actividad.nombre_actividad,
                descripcion: actividad.descripcion
            }));
            res.status(200).json({actividad})
        }else{
            res.status(404).json({msd: "no hay actividades registradas"})
        }
    } catch(error){
        console.error(error)
        return res.status(500).json({"message":"Error en el servidor"});
    }
 };

 export const IdActividad = async (req, res) => {
    try {
        const { id_actividad } = req.params;

        console.log("Buscando PEA con ID:", id_actividad);

        const sql = `SELECT 
                    id_actividad, 
                    nombre_actividad, 
                    descripcion 
                FROM actividad
                WHERE id_actividad = $1`;

        const result = await configuracionBD.query(sql, [id_actividad]);

        if (result.rows.length > 0) {
            const actividad = result.rows.map(a => ({
                id_actividad: a.id_pea,
                nombre_actividad: a.nombre_actividad,
                descripcion: a.descripcion
            }));

            res.status(200).json({ actividad });
        } else {
            res.status(404).json({ msg: 'No se encontró la actividad' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error en el servidor." });
    }
};

export const actualizarActividad = async (req, res) => {
    try{
        const { nombre_actividad, descripcion } = req.body;
        const id = req.params.id_actividad;

        const sql = `UPDATE actividad SET nombre_actividad = $1, descripcion = $2 WHERE id_actividad = $3`;
        const { rowCount } = await configuracionBD.query(sql, [nombre_actividad, descripcion, id]);
        if (rowCount > 0) {
            return res.status(200).json({ "message": "Actividad editada correctamente." });
        } else {
            return res.status(404).json({ "message": "No se pudo editar la Actividad." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor." });
    }
    
};
