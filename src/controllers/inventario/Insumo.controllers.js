import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'insumo' con los datos relacionados
export const getInsumo = async (req, res) => {
  try {
    // Se realiza un JOIN entre 'insumo' y las tablas relacionadas
    const [rows] = await configuracionBD.query(
      `SELECT i.*, h.nombre AS herramienta_nombre, h.tipo AS herramienta_tipo, 
              h.precio_unidad AS herramienta_precio_unidad, h.cantidad AS herramienta_cantidad, 
              h.unidad_medida AS herramienta_unidad_medida
       FROM insumo i
       LEFT JOIN herramientas h ON i.fk_id_herramienta = h.id_herramienta`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de insumos', error });
  }
};

// Agregar un nuevo registro a 'insumo' con claves foráneas
export const addInsumo = async (req, res) => {
  try {
    const { nombre, descripcion, fk_id_herramienta } = req.body;
    const [result] = await configuracionBD.query(
      'INSERT INTO insumo (nombre, descripcion, fk_id_herramienta) VALUES (?, ?, ?)',
      [nombre, descripcion, fk_id_herramienta]
    );
    res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

// Obtener un registro por ID de 'insumo' con los datos relacionados
export const IdInsumo = async (req, res) => {
  try {
    const { id_insumo } = req.params;
    const [rows] = await configuracionBD.query(
      `SELECT i.*, h.nombre AS herramienta_nombre, h.tipo AS herramienta_tipo, 
              h.precio_unidad AS herramienta_precio_unidad, h.cantidad AS herramienta_cantidad, 
              h.unidad_medida AS herramienta_unidad_medida
       FROM insumo i
       LEFT JOIN herramientas h ON i.fk_id_herramienta = h.id_herramienta
       WHERE i.id_insumo = ?`, [id_insumo]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_insumo}` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

// Actualizar un registro existente en 'insumo' con claves foráneas
export const actualizarInsumo = async (req, res) => {
  try {
    const { id_insumo } = req.params;
    const { nombre, descripcion, fk_id_herramienta } = req.body;
    const [result] = await configuracionBD.query(
      'UPDATE insumo SET nombre = ?, descripcion = ?, fk_id_herramienta = ? WHERE id_insumo = ?',
      [nombre, descripcion, fk_id_herramienta, id_insumo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_insumo}` });
    }
    res.status(200).json({ message: `Registro con id: ${id_insumo} actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};

