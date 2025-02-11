import { configuracionBD } from "../../config/conexion.js";

export const postTipoResiduo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const sql = "INSERT INTO tipo_residuos (nombre, descripcion) VALUES ($1, $2)";
        
        const result = await configuracionBD.query(sql, [nombre, descripcion]);

        if (result.rowCount > 0) {
            res.status(201).json({ message: "Tipo de residuo registrado correctamente" });
        } else {
            res.status(400).json({ message: "No se pudo registrar el tipo de residuo" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


export const getTipoResiduo = async (req, res) => {
    try {
        const sql = "SELECT * FROM tipo_residuos";
        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No hay tipos de cultivo registrados" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};



export const actualizarTipoResiduo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const { id_tipo_residuo} = req.params;
        const sql = "UPDATE tipo_residuos SET nombre = $1, descripcion = $2 WHERE id_tipo_residuo = $3";

        const result = await configuracionBD.query(sql, [nombre, descripcion, id_tipo_residuo]);

        if (result.rowCount > 0) {
            res.status(200).json({ message: "Tipo de cultivo actualizado correctamente" });
        } else {
            res.status(404).json({ message: "No se encontró el tipo de cultivo para actualizar" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


export const IdTipoCultivo = async (req, res) => {
    try {
        const { id_tipo_residuo } = req.params;
        const sql = "SELECT * FROM tipo_residuos WHERE id_tipo_residuo = $1";

        const result = await configuracionBD.query(sql, [id_tipo_residuo]);

        if (result.rows.length > 0) {
            res.status(200).json({ tiposResiduos: result.rows[0] });
        } else {
            res.status(404).json({ message: "No se encontró el tipo de cultivo" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
