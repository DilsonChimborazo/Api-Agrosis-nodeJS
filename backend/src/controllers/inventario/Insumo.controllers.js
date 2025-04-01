import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'insumo' con los datos relacionados
export const getInsumo = async (req, res) => {
  try {
    const sql = 'select * from insumos';
    const result = await configuracionBD.query(sql);
    if(result.rows.length > 0){
      res.status(200).json(result.rows)
    }else{
      res.status(400).json({msg: 'Error al obtener el insumo'});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al obtener la lista de insumos', error });
  } 
};

// Agregar un nuevo registro a 'insumo' con claves foráneas
export const addInsumo = async (req, res) => {
  try {
    const { nombre, tipo, precio_unidad, cantidad, unidad_medida } = req.body;

    // Verificar que todos los campos están presentes
    if (!nombre || !tipo || !precio_unidad || !cantidad || !unidad_medida) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const sql = `INSERT INTO insumos (nombre, tipo, precio_unidad, cantidad, unidad_medida) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [nombre, tipo, precio_unidad, cantidad, unidad_medida];
    
    const result = await configuracionBD.query(sql, values);

    if (result.rowCount > 0) {
      res.status(201).json({ msg: "Insumo registrado con éxito" });
    } else {
      res.status(400).json({ msg: "Error al registrar insumo" });
    }
  } catch (error) {
    console.error("Error en addInsumo:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};


// Obtener un registro por ID de 'insumo' con los datos relacionados
export const IdInsumo = async (req, res) => {
  try {
    const {id_insumo} = req.params;
    const sql = `SELECT * FROM insumos WHERE id_insumo = $1`;
    const result = await configuracionBD.query(sql, [id_insumo]);
    if(result.rows.length > 0){
      res.status(200).json(result.rows)
    }else{
      res.status(400).json({msg:'Error al obtener insumo'})
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

// Actualizar un registro existente en 'insumo' con claves foráneas
export const actualizarInsumo = async (req, res) => {
  try {
    const { id_insumo } = req.params;
    const {nombre, tipo, precio_unidad, cantidad, unidad_medida} = req.body;
    const sql = `UPDATE insumos set nombre = $1, tipo = $2, precio_unidad = $3, cantidad = $4, unidad_medida = $5 WHERE id_insumo = $6`;
    const result = await configuracionBD.query(sql, [nombre, tipo, precio_unidad, cantidad, unidad_medida, id_insumo]);
    if (result.rowCount > 0) {
      res.status(200).json("Insumo actualizado con exito")
    }else{
      res.status(400).json({msg:'Error al actualizar insumo'})
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor'});
  }
};



export const getTotalInsumosPorTipo = async (req, res) => {
  try {
    const sql = `SELECT 
        tipo, 
        nombre, 
        SUM(cantidad) AS total_cantidad
      FROM insumos
      GROUP BY tipo, nombre
      ORDER BY tipo, total_cantidad DESC;`;

    const result = await configuracionBD.query(sql);

    if (result.rows.length > 0) {
      const totalInsumosPorTipo = result.rows.map(insumo => ({
        tipo: insumo.tipo,
        nombre: insumo.nombre,
        total_cantidad: insumo.total_cantidad
      }));

      res.status(200).json({ totalInsumosPorTipo });
    } else {
      res.status(400).json({ msg: 'No hay registros de insumos' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
