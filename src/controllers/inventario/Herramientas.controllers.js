import { configuracionBD } from "../../config/conexion.js";


export const addHerramientas = async (req, res) => {
  try {
    const { nombre_h, fecha_prestamo, estado } = req.body;
    const sql = 'INSERT INTO herramientas (nombre_h, fecha_prestamo, estado) VALUES ($1, $2, $3)'
    const values = {nombre_h, fecha_prestamo, estado}
    const result = await configuracionBD.query(sql, values);
    if(result.rowCount>0){
      res.status(200).json({msg:'Herramienta registrada con éxito'});
    }else{
      res.status(400).json({msg:'Error al registrar la herramienta'});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al crear el registro' });
  }
};

export const getHerramientas = async (req, res) => {
  try{
    const sql = 'SELECT * FROM herramientas';
    const result = await configuracionBD.query(sql);
    if(result.rowCount>0){
        res.status(200).json(result);
    }else{
        res.status(404).json({msg:'herramienta no encontrada'})
    }
  }catch{
      res.status(500).json({msg: 'Error al obtener la herramienta'});
  }
};

export const IdHerramientas = async (req, res) => {
  try{
    const {id_herramienta} = req.params;
    const sql = 'SELECT * FROM herramientas WHERE id_herramienta = $1';
    const values = [id_herramienta];
    const result = await configuracionBD.query(sql, values);
    if(result.rowCount>0){
        res.status(200).json(result);
    }else{
        res.status(404).json({msg:'herramienta no encontrada'})
    }
}catch{
    res.status(500).json({msg: 'Error en el servidor'});
}
};

export const actualizarHerramientas = async (req, res) => {
  try {
    const { id_herramienta } = req.params;
    const { nombre_h, fecha_prestamo, estado } = req.body;
    const sql = 'UPDATE herramientas SET nombre_h = $1, fecha_prestamo = $2, estado = $3  WHERE id_herramienta = $4'
    const values = [nombre_h, fecha_prestamo, estado, id_herramienta ];
    const result = await configuracionBD.query(sql, values);
    if(result.rowCount>0){
        res.status(200).json({msg:'Herramienta actualizada con éxito'});
    }else{
        res.status(404).json({msg:'Herramienta no encontrada para actualizar'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al actualizar la herramienta'});
  }
};
