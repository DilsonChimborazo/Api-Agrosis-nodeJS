<<<<<<<< HEAD:backend/src/controllers/trazabilidad/controller.pea.js
import {configuracionBD} from "../../config/conexion.js"

========
import {configuracionBD} from "../config/conexion.js"
>>>>>>>> 45f304b36b8df9b96b8911b4b7ec589ae34df3ac:src/controllers/trazabilidad2/controller.pea.js

export const postPea = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const sql = "INSERT INTO pea(nombre, descripcion) VALUES($1, $2)";
        const rows = await configuracionBD.query(sql, [nombre, descripcion]);

        if (rows.rowCount > 0) {
            return res.status(200).json({ "message": "PEA registrado correctamente" });
        } else {
            return res.status(404).json({ "message": "No se pudo registrar el PEA" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor" });
    }
};

export const getPea = async (req, res) => {
    try {

        const sql = `SELECT 
                    id_pea, 
                    nombre, 
                    descripcion 
                FROM pea`;

        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            const peas = result.rows.map(pea => ({
                id_pea: pea.id_pea,
                nombre: pea.nombre,
                descripcion: pea.descripcion
            }));

            res.status(200).json({ peas });
        } else {
            res.status(404).json({ msg: 'No hay PEA registrados' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const actualizarPea= async (req, res) => {
    try{
        const { nombre, descripcion } = req.body;
        const id = req.params.id_pea;

        const sql = `UPDATE pea SET nombre = $1, descripcion = $2 WHERE id_pea = $3`;
        const { rowCount } = await configuracionBD.query(sql, [nombre, descripcion, id]);
        if (rowCount > 0) {
            return res.status(200).json({ "message": "PEA editada correctamente." });
        } else {
            return res.status(404).json({ "message": "No se pudo editar la PEA." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor." });
    }
    
};
export const IdPea = async (req, res) => {
    try {
        const { id_pea } = req.params;

        console.log("Buscando PEA con ID:", id_pea);

        const sql = `SELECT 
                    id_pea, 
                    nombre, 
                    descripcion 
                FROM pea 
                WHERE id_pea = $1`;

        const result = await configuracionBD.query(sql, [id_pea]);

        if (result.rows.length > 0) {
            const pea = result.rows.map(p => ({
                id_pea: p.id_pea,
                nombre: p.nombre,
                descripcion: p.descripcion
            }));

            res.status(200).json({ pea });
        } else {
            res.status(404).json({ msg: 'No se encontró el PEA' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error en el servidor." });
    }
};
