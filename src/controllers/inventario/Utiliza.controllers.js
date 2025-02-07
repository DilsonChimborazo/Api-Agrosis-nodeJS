import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'utiliza' con los datos relacionados de 'insumo' y 'asignacion_actividades'
export const getUtiliza = async (req, res) => {
  try {
    const [rows] = await configuracionBD.query(
      `SELECT u.*, i.nombre AS insumo_nombre, i.descripcion AS insumo_descripcion, 
              a.nombre AS asignacion_nombre, a.descripcion AS asignacion_descripcion
       FROM utiliza u
       LEFT JOIN insumo i ON u.fk_id_insumo = i.id_insumo
       LEFT JOIN asignacion_actividades a ON u.fk_id_asignacion_actividades = a.id_asignacion_actividades`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de utiliza', error });
  }
};

// Agregar un nuevo registro a 'utiliza' con claves foráneas
export const addUtiliza = async (req, res) => {
  try {
    const { nombre, descripcion, fk_id_insumo, fk_id_asignacion_actividades } = req.body; 
    const [result] = await configuracionBD.query(
      'INSERT INTO utiliza (nombre, descripcion, fk_id_insumo, fk_id_asignacion_actividades) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, fk_id_insumo, fk_id_asignacion_actividades]
    );
    res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

// Obtener un registro por ID de 'utiliza' con los datos relacionados de 'insumo' y 'asignacion_actividades'
export const IdUtiliza = async (req, res) => {
  try {
    const { id_utiliza } = req.params;
    const [rows] = await configuracionBD.query(
      `SELECT u.*, i.nombre AS insumo_nombre, i.descripcion AS insumo_descripcion, 
              a.nombre AS asignacion_nombre, a.descripcion AS asignacion_descripcion
       FROM utiliza u
       LEFT JOIN insumo i ON u.fk_id_insumo = i.id_insumo
       LEFT JOIN asignacion_actividades a ON u.fk_id_asignacion_actividades = a.id_asignacion_actividades
       WHERE u.id_utiliza = ?`, [id_utiliza]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_utiliza}` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

// Actualizar un registro existente en 'utiliza' con claves foráneas
export const actualizarUtiliza = async (req, res) => {
  try {
    const { id_utiliza } = req.params;
    const { nombre, descripcion, fk_id_insumo, fk_id_asignacion_actividades } = req.body; 
    const [result] = await configuracionBD.query(
      'UPDATE utiliza SET nombre = ?, descripcion = ?, fk_id_insumo = ?, fk_id_asignacion_actividades = ? WHERE id_utiliza = ?',
      [nombre, descripcion, fk_id_insumo, fk_id_asignacion_actividades, id_utiliza]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_utiliza}` });
    }
    res.status(200).json({ message: `Registro con id: ${id_utiliza} actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};



