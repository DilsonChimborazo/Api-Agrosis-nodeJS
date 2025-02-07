import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'control_usa_insumo'
export const getControlUsaInsumo = async (req, res) => {
  try {
    const [rows] = await configuracionBD.query('SELECT * FROM control_usa_insumo');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de control_usa_insumo', error });
  }
};

// Agregar un nuevo registro a 'control_usa_insumo'
export const addControlUsaInsumo = async (req, res) => {
  try {
    const { id_control, id_insumo, cantidad, fecha_uso } = req.body; 
    const [result] = await configuracionBD.query(
      'INSERT INTO control_usa_insumo (id_control, id_insumo, cantidad, fecha_uso) VALUES (?, ?, ?, ?)',
      [id_control, id_insumo, cantidad, fecha_uso]
    );
    res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

// Obtener un registro por ID de 'control_usa_insumo'
export const IdControlUsaInsumo = async (req, res) => {
  try {
    const { id_control_usa_insumo } = req.params;
    const [rows] = await configuracionBD.query('SELECT * FROM control_usa_insumo WHERE id_control_usa_insumo = ?', [id_control_usa_insumo]);
    if (rows.length === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_control_usa_insumo}` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

// Actualizar un registro existente en 'control_usa_insumo'
export const actualizarControlUsaInsumo = async (req, res) => {
  try {
    const { id_control_usa_insumo } = req.params;
    const { id_control, id_insumo, cantidad, fecha_uso } = req.body; 
    const [result] = await configuracionBD.query(
      'UPDATE control_usa_insumo SET id_control = ?, id_insumo = ?, cantidad = ?, fecha_uso = ? WHERE id_control_usa_insumo = ?',
      [id_control, id_insumo, cantidad, fecha_uso, id_control_usa_insumo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id: ${id_control_usa_insumo}` });
    }
    res.status(200).json({ message: `Registro con id: ${id_control_usa_insumo} actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};
