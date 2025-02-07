import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'requiere' con los datos relacionados de 'herramientas' y 'asignacion_actividades'
export const getRequiere = async (req, res) => {
  try {
    const [rows] = await configuracionBD.query(
      `SELECT r.*, h.nombre AS herramienta_nombre, h.descripcion AS herramienta_descripcion, 
              a.nombre AS asignacion_nombre, a.descripcion AS asignacion_descripcion
       FROM requiere r
       LEFT JOIN herramientas h ON r.fk_id_herramientas = h.id_herramientas
       LEFT JOIN asignacion_actividades a ON r.fk_id_asignacion_actividades = a.id_asignacion_actividades`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de requiere', error });
  }
};

// Agregar un nuevo registro a 'requiere' con claves foráneas
export const addRequiere = async (req, res) => {
  try {
    const { nombre, descripcion, fk_id_herramientas, fk_id_asignacion_actividades } = req.body;
    const [result] = await configuracionBD.query(
      'INSERT INTO requiere (nombre, descripcion, fk_id_herramientas, fk_id_asignacion_actividades) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, fk_id_herramientas, fk_id_asignacion_actividades]
    );
    res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

// Obtener un registro por ID de 'requiere' con los datos relacionados de 'herramientas' y 'asignacion_actividades'
export const IdRequiere = async (req, res) => {
  try {
    const { id_requiere } = req.params;
    const [rows] = await configuracionBD.query(
      `SELECT r.*, h.nombre AS herramienta_nombre, h.descripcion AS herramienta_descripcion, 
              a.nombre AS asignacion_nombre, a.descripcion AS asignacion_descripcion
       FROM requiere r
       LEFT JOIN herramientas h ON r.fk_id_herramientas = h.id_herramientas
       LEFT JOIN asignacion_actividades a ON r.fk_id_asignacion_actividades = a.id_asignacion_actividades
       WHERE r.id_requiere = ?`, [id_requiere]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_requiere}` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

// Actualizar un registro existente en 'requiere' con claves foráneas
export const actualizarRequiere = async (req, res) => {
  try {
    const { id_requiere } = req.params;
    const { nombre, descripcion, fk_id_herramientas, fk_id_asignacion_actividades } = req.body;
    const [result] = await configuracionBD.query(
      'UPDATE requiere SET nombre = ?, descripcion = ?, fk_id_herramientas = ?, fk_id_asignacion_actividades = ? WHERE id_requiere = ?',
      [nombre, descripcion, fk_id_herramientas, fk_id_asignacion_actividades, id_requiere]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_requiere}` });
    }
    res.status(200).json({ message: `Registro con id: ${id_requiere} actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};
