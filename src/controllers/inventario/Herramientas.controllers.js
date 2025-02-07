import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'herramientas' con los datos relacionados
export const getHerramientas = async (req, res) => {
  try {
    const [rows] = await configuracionBD.query(
      `SELECT h.*, a.nombre AS asignacion_nombre, a.fecha_prestamo, a.estado
       FROM herramientas h
       LEFT JOIN asignaciones a ON h.fk_id_asignacion = a.id_asignacion`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de herramientas', error });
  }
};

// Agregar un nuevo registro a 'herramientas' con clave foránea
export const addHerramientas = async (req, res) => {
  try {
    const { nombre, descripcion, fk_id_asignacion } = req.body;
    const [result] = await configuracionBD.query(
      'INSERT INTO herramientas (nombre, descripcion, fk_id_asignacion) VALUES (?, ?, ?)',
      [nombre, descripcion, fk_id_asignacion]
    );
    res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

// Obtener un registro por ID de 'herramientas' con los datos relacionados
export const IdHerramientas = async (req, res) => {
  try {
    const { id_herramienta } = req.params;
    const [rows] = await configuracionBD.query(
      `SELECT h.*, a.nombre AS asignacion_nombre, a.fecha_prestamo, a.estado
       FROM herramientas h
       LEFT JOIN asignaciones a ON h.fk_id_asignacion = a.id_asignacion
       WHERE h.id_herramienta = ?`, [id_herramienta]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_herramienta}` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

// Actualizar un registro existente en 'herramientas' con claves foráneas
export const actualizarHerramientas = async (req, res) => {
  try {
    const { id_herramienta } = req.params;
    const { nombre, descripcion, fk_id_asignacion } = req.body;
    const [result] = await configuracionBD.query(
      'UPDATE herramientas SET nombre = ?, descripcion = ?, fk_id_asignacion = ? WHERE id_herramienta = ?',
      [nombre, descripcion, fk_id_asignacion, id_herramienta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_herramienta}` });
    }
    res.status(200).json({ message: `Registro con id: ${id_herramienta} actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};
