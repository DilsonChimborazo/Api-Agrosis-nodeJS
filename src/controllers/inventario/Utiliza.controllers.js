import {configuracionBD} from '../../config/conexion.js';

export const addUtiliza = async (req, res) =>{
    try{
        const {fk_id_insumo, fk_id_asignacion_actividad} = req.body;
        const sql = 'INSERT INTO utiliza (fk_id_insumo, fk_id_asignacion_actividad) VALUES($1, $2)';
        const values = [fk_id_insumo, fk_id_asignacion_actividad];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'utilizacion registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar utiliza'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getUtiliza = async (req, res) => {
    try{
        const sql = ` SELECT utiliza.fk_id_insumo, utiliza.fk_id_asignacion_actividad,
        insumos.id_insumo, insumos.nombre, insumos.tipo, insumos.precio_unidad, insumos.cantidad, insumos.unidad_medida
        asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha, asignacion_actividad.fk_id_actividad, asignacion_actividad.fk_identificacion
        actividad.id_actividad, actividad.nombre, actividad.descripcion,
        usuarios.identificacion, usuarios.nombre, usuarios.contraseña, usuarios.email, usuarios.fk_id_rol
        rol.id_rol, rol.nombre_rol, rol.fecha_creacion
        FROM utiliza
        JOIN insumos ON utiliza.fk_id_insumo = insumos.id_insumo
        JOIN asignacion_actividad ON utiliza.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
        JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
        JOIN usuarios ON asignacion_actividad.fk_identificaacion = usuarios.identificacion
        JOIN rol ON usuarios.fk_id_rol = rol.id_rol`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const utiliza = result.rows.map(utiliza => ({
                id: utiliza.id_utiliza,
                fk_id_insumo:{
                  id: utiliza.id_insumo,
                  nombre: utiliza.nombre,
                  tipo: utiliza.tipo,
                  precio_unidad: utiliza.precio_unidad,
                  cantidad: utiliza.cantidad,
                  unidad_medida: utiliza.unidad_medida
                },
              fk_id_asignacion_actividad:{
                id: utiliza.id_asignacion_actividad,
                fecha: utiliza.fecha,
                fk_id_actividad:{
                  id: utiliza.id_actividad,
                  nombre: utiliza.nombre,
                  descripcion: utiliza.descripcion
                },
                fk_identificacion:{
                  identificacion: utiliza.identificacion,
                  nombre: utiliza.nombre,
                  contraseña: utiliza.contraseña,
                  email: utiliza.email,
                  fk_id_rol:{
                    id: utiliza.id_rol,
                    nombre_rol: utiliza.nombre_rol,
                    fecha_creacion: utiliza.fecha_creacion
                  }
                }
          }}
        ));
            res.status(200).json(utiliza);
        } else{
            res.status(404).json({msg:'No hay utilizaciones registradas'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
};

export const IdUtiliza= async(req, res) =>{
    try{
        const {id_utiliza} = req.params;
        const sql = `SELECT utiliza.fk_id_insumo, utiliza.fk_id_asignacion_actividad,
        insumos.id_insumo, insumos.nombre, insumos.tipo, insumos.precio_unidad, insumos.cantidad, insumos.unidad_medida
        asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha, asignacion_actividad.fk_id_actividad, asignacion_actividad.fk_identificacion
        actividad.id_actividad, actividad.nombre, actividad.descripcion,
        usuarios.identificacion, usuarios.nombre, usuarios.contraseña, usuarios.email, usuarios.fk_id_rol
        rol.id_rol, rol.nombre_rol, rol.fecha_creacion
        FROM utiliza
        JOIN insumos ON utiliza.fk_id_insumo = insumos.id_insumo
        JOIN asignacion_actividad ON utiliza.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
        JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
        JOIN usuarios ON asignacion_actividad.fk_identificaacion = usuarios.identificacion
        JOIN rol ON usuarios.fk_id_rol = rol.id_rol
        WHERE id_mide = $1`;
        const result = await configuracionBD.query(sql, [id_utiliza]);
        if (result.rows.length > 0) {
            const utiliza = result.rows.map(utiliza => ({
                id: utiliza.id_utiliza,
                fk_id_insumo:{
                  id: utiliza.id_insumo,
                  nombre: utiliza.nombre,
                  tipo: utiliza.tipo,
                  precio_unidad: utiliza.precio_unidad,
                  cantidad: utiliza.cantidad,
                  unidad_medida: utiliza.unidad_medida
                },
              fk_id_asignacion_actividad:{
                id: utiliza.id_asignacion_actividad,
                fecha: utiliza.fecha,
                fk_id_actividad:{
                  id: utiliza.id_actividad,
                  nombre: utiliza.nombre,
                  descripcion: utiliza.descripcion
                },
                fk_identificacion:{
                  identificacion: utiliza.identificacion,
                  nombre: utiliza.nombre,
                  contraseña: utiliza.contraseña,
                  email: utiliza.email,
                  fk_id_rol:{
                    id: utiliza.id_rol,
                    nombre_rol: utiliza.nombre_rol,
                    fecha_creacion: utiliza.fecha_creacion
                  }
                }
          }}
        ));
            res.status(200).json(utiliza);
        } else{
            res.status(404).json({msg:'No hay utilizaciones registradas'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
};

export const actualizarUtiliza = async(req, res) => {
  try{
    const {id_utiliza} = req.params;
    const {fk_id_insumo, fk_id_asignacion_actividad} = req.body;
    const sql = 'UPDATE utiliza SET fk_id_insumo=$1, fk_id_asignacion_actividad=$2 WHERE id_utiliza=$3';
    const values = [fk_id_insumo, fk_id_asignacion_actividad, id_utiliza];
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