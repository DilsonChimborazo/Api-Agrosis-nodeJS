const conexion = require('../../config/conexion'); // Asegúrate de que la ruta sea correcta

// Obtener todos los registros de Control Usa Insumo
const getControlUsaInsumo = (req, res) => {
  const sql = 'SELECT * FROM control_usa_insumo'; // Asegúrate de que el nombre de la tabla sea correcto
  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al obtener los datos:', err.message);
      return res.status(500).json({ error: 'Error al obtener los datos.' });
    }
    res.json(resultados);
  });
};

// Agregar un nuevo registro de Control Usa Insumo
const addControlUsaInsumo = (req, res) => {
  const { fk_id_insumo, fk_id_actividad, cantidad } = req.body; // Asegúrate de que los campos sean correctos

  // Validación básica de entrada
  if (!fk_id_insumo || !fk_id_actividad || !cantidad) {
    return res.status(400).json({ error: 'Los campos fk_id_insumo, fk_id_actividad y cantidad son obligatorios.' });
  }

  const sql = 'INSERT INTO control_usa_insumo (fk_id_insumo, fk_id_actividad, cantidad) VALUES (?, ?, ?)';
  conexion.query(sql, [fk_id_insumo, fk_id_actividad, cantidad], (err, resultado) => {
    if (err) {
      console.error('Error al agregar el registro:', err.message);
      return res.status(500).json({ error: 'Error al agregar el registro.' });
    }
    res.status(201).json({ id: resultado.insertId });
  });
};

module.exports = {
  getControlUsaInsumo,
  addControlUsaInsumo,
};