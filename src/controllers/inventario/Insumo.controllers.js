import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'insumo' con los datos relacionados
export const getInsumo = async (req, res) => {
  try {
    const sql = 'select * from insumos';
    const result = await configuracionBD.query(sql);
    if(result.rows.length > 0){
      res.status(200).json(result)
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
   const {nombre, tipo, precio_unidad, cantidad, unidad_medida} = req.body;
   const sql = 'INSERT INTO insumos (nombre, tipo, precio_unidad, cantidad, unidad_medida) VALUES ($1, $2, $3, $4, $5)';
   const values = [nombre, tipo, precio_unidad, cantidad, unidad_medida];
   const result = await configuracionBD.query(sql);
   if(result.rows.length > 0){
    res.status(200).json(result)
   }else{
    res.status(400).json({msg:'Error al registrar insumo'});
   }
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
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
      res.status(200).json(result)
    }else{
      res.status(400).json({msg:'Error al actualizar insumo'})
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};

