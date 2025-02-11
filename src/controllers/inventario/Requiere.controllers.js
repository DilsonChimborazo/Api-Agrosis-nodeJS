import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'requiere' con los datos relacionados de 'herramientas' y 'asignacion_actividades'
export const getRequiere = async (req, res) => {
  try {
    const sql = `SELECT requiere.id_requiere, requiere.fk_id_herramienta, requiere.fk_id_asignacion_actividad,
    herramientas.id_herramienta, herramientas.nombre_h, herramientas.fecha_prestamo, herramientas.estado,
    asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha, asignacion_actividad.fk_id_actividad, asignacion_actividad.fk_identificacion,
    actividad.id_actividad, actividad.nombre_actividad, actividad.descripcion,
    usuarios.identificacion, usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol,
    rol.id_rol, rol.nombre_rol, rol.fecha_creacion
    FROM requiere 
    JOIN herramientas ON requiere.fk_id_herramienta = herramientas.id_herramienta
    JOIN asignacion_actividad ON requiere.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
    JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
    JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
    JOIN rol ON usuarios.fk_id_rol = rol.id_rol`
    const result = await configuracionBD.query(sql);
    if (result.rows.length > 0) {
        const requiere = result.rows.map(requiere => ({
            id: requiere.id_requiere,
            fk_id_insumo:{
              id: requiere.id_insumo,
              nombre: requiere.nombre,
              tipo: requiere.tipo,
              precio_unidad: requiere.precio_unidad,
              cantidad: requiere.cantidad,
              unidad_medida: requiere.unidad_medida
            },
          fk_id_asignacion_actividad:{
            id: requiere.id_asignacion_actividad,
            fecha: requiere.fecha,
            fk_id_actividad:{
              id: requiere.id_actividad,
              nombre: requiere.nombre,
              descripcion: requiere.descripcion
            },
            fk_identificacion:{
              identificacion: requiere.identificacion,
              nombre: requiere.nombre,
              contraseña: requiere.contraseña,
              email: requiere.email,
              fk_id_rol:{
                id: utiliza.id_rol,
                nombre_rol: requiere.nombre_rol,
                fecha_creacion: requiere.fecha_creacion
              }
            }
      }}
    ));
        res.status(200).json(requiere);
    } else{
        res.status(404).json({msg:'No hay datos registrados'})
    }
}catch(err){
    console.log(err);
    res.status(500).json({msg:'Error en el servidor'});
}
}


// Agregar un nuevo registro a 'requiere' con claves foráneas
export const addRequiere = async (req, res) =>{
  try{
      const {fk_id_herramienta, fk_id_asignacion_actividad} = req.body;
      const sql = 'INSERT INTO requiere (fk_id_herramienta, fk_id_asignacion_actividad) VALUES($1, $2)';
      const values = [fk_id_herramienta, fk_id_asignacion_actividad];
      const result = await configuracionBD.query(sql, values);
      if(result.rowCount>0){
          res.status(200).json({msg:'requiere registrada con éxito'});
      }else{
          res.status(400).json({msg:'Error al registrar requiere'});
      }
  }catch(err){
      console.log(err);
      res.status(500).json({msg:'Error en el servidor'});
  }
}

// Obtener un registro por ID de 'requiere' con los datos relacionados de 'herramientas' y 'asignacion_actividades'
export const IdRequiere= async(req, res) =>{
  try{
      const {id_requiere} = req.params;
      const sql = `SELECT requiere.id_requiere, requiere.fk_id_herramienta, requiere.fk_id_asignacion_actividad,
    herramientas.id_herramienta, herramientas.nombre_h, herramientas.fecha_prestamo, herramientas.estado,
    asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha, asignacion_actividad.fk_id_actividad, asignacion_actividad.fk_identificacion,
    actividad.id_actividad, actividad.nombre_actividad, actividad.descripcion,
    usuarios.identificacion, usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol,
    rol.id_rol, rol.nombre_rol, rol.fecha_creacion
    FROM requiere 
    JOIN herramientas ON requiere.fk_id_herramienta = herramientas.id_herramienta
    JOIN asignacion_actividad ON requiere.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
    JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
    JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
    JOIN rol ON usuarios.fk_id_rol = rol.id_rol
      WHERE requiere.id_requiere = $1`;
      const result = await configuracionBD.query(sql, [id_requiere]);
      if (result.rows.length > 0) {
        const requiere = result.rows.map(requiere => ({
            id: requiere.id_requiere,
            fk_id_insumo:{
              id: requiere.id_insumo,
              nombre: requiere.nombre,
              tipo: requiere.tipo,
              precio_unidad: requiere.precio_unidad,
              cantidad: requiere.cantidad,
              unidad_medida: requiere.unidad_medida
            },
          fk_id_asignacion_actividad:{
            id: requiere.id_asignacion_actividad,
            fecha: requiere.fecha,
            fk_id_actividad:{
              id: requiere.id_actividad,
              nombre: requiere.nombre,
              descripcion: requiere.descripcion
            },
            fk_identificacion:{
              identificacion: requiere.identificacion,
              nombre: requiere.nombre,
              contraseña: requiere.contraseña,
              email: requiere.email,
              fk_id_rol:{
                id: utiliza.id_rol,
                nombre_rol: requiere.nombre_rol,
                fecha_creacion: requiere.fecha_creacion
              }
            }
      }}
    ));
        res.status(200).json(requiere);
    } else{
        res.status(404).json({msg:'No hay utilizaciones registradas'})
    }
}catch(err){
    console.log(err);
    res.status(500).json({msg:'Error en el servidor'});
}
};

// Actualizar un registro existente en 'requiere' con claves foráneas
export const actualizarRequiere = async(req, res) => {
  try{
    const {id_requiere} = req.params;
    const {fk_id_herramienta, fk_id_asignacion_actividad} = req.body;
    const sql = 'UPDATE requiere SET fk_id_herramienta=$1, fk_id_asignacion_actividad=$2 WHERE id_requiere=$3';
    const values = [fk_id_herramienta, fk_id_asignacion_actividad, id_requiere];
    const result = await configuracionBD.query(sql, values);
    if(result.rowCount>0){
      res.status(200).json({msg:'Utilización actualizada con éxito'});
    } else{
      res.status(400).json({msg:'Error al actualizar utilización'});
    }
  }catch(error){
    console.log(error);
    res.status(500).json({msg:'Error en el servidor'});
  }
}
