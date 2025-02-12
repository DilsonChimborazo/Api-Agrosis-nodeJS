import { configuracionBD } from "../../config/conexion.js";

export const addHerramientas = async (req, res) => {
  try {
    const { nombre_h, fecha_prestamo, estado } = req.body;

    if (!nombre_h || !fecha_prestamo || !estado) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const sql = `INSERT INTO herramientas (nombre_h, fecha_prestamo, estado) VALUES ($1, $2, $3) RETURNING *`;
    const values = [nombre_h, fecha_prestamo, estado];
    const result = await configuracionBD.query(sql, values);

    res.status(201).json({ msg: "Herramienta registrada con éxito"});
  } catch (error) {
    console.error("Error al registrar herramienta:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

export const getHerramientas = async (req, res) => {
  try {
    const sql = `SELECT * FROM herramientas`;
    const result = await configuracionBD.query(sql);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ msg: "No hay herramientas registradas" });
    }
  } catch (error) {
    console.error("Error al obtener herramientas:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

export const IdHerramientas = async (req, res) => {
  try {
    const { id_herramienta } = req.params;
    const sql = `SELECT * FROM herramientas WHERE id_herramienta = $1`;
    const values = [id_herramienta];
    const result = await configuracionBD.query(sql, values);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ msg: "Herramienta no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener herramienta por ID:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

export const actualizarHerramientas = async (req, res) => {
  try {
    const { id_herramienta } = req.params;
    const { nombre_h, fecha_prestamo, estado } = req.body;

    if (!nombre_h || !fecha_prestamo || !estado) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios para actualizar" });
    }

    const sql = `UPDATE herramientas SET nombre_h = $1, fecha_prestamo = $2, estado = $3 WHERE id_herramienta = $4 RETURNING *`;
    const values = [nombre_h, fecha_prestamo, estado, id_herramienta];
    const result = await configuracionBD.query(sql, values);

    if (result.rowCount > 0) {
      res.status(200).json({ msg: "Herramienta actualizada con éxito", herramienta: result.rows[0] });
    } else {
      res.status(404).json({ msg: "Herramienta no encontrada para actualizar" });
    }
  } catch (error) {
    console.error("Error al actualizar herramienta:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};
