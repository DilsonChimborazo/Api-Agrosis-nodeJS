import {configuracionBD} from '../../config/conexion.js';

export const createAsignacionActividad = async (req, res) => {
  try {
    const { fecha, fk_id_actividad, fk_identificacion } = req.body;
    if (!fecha || !fk_id_actividad || !fk_identificacion) {
      return res.status(400).json({ msg: 'Todos los campos son requeridos' });
    }

    const fkIdActividad = parseInt(fk_id_actividad);
    if (isNaN(fkIdActividad)) {
      return res.status(400).json({ msg: 'fk_id_actividad debe ser un número válido' });
    }

    const sql = 'INSERT INTO asignacion_actividad (fecha, fk_id_actividad, fk_identificacion) VALUES ($1, $2, $3)';
    const values = [fecha, fkIdActividad, fk_identificacion];
    const result = await configuracionBD.query(sql, values);
    if (result.rowCount > 0) {
      res.status(200).json({ msg: 'asignacion de actividad registrada con éxito' });
    } else {
      res.status(400).json({ msg: 'Error al registrar la asignacion de actividad' });
    }
  } catch (erro) {
    console.error('Error detallado al crear asignación:', erro);
    if (erro.code === '23503') { // Violación de clave foránea
      res.status(400).json({ msg: 'Error: fk_id_actividad o fk_identificacion no existen en las tablas relacionadas' });
    } else if (erro.code === '23502') { // Violación de NOT NULL
      res.status(400).json({ msg: 'Error: Campos requeridos están vacíos' });
    } else {
      res.status(500).json({ msg: 'Error interno del servidor', error: erro.message });
    }
  }
};
export const getAsignacionActividad = async (req, res)=>{
    try{
        const sql = ` SELECT asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha, asignacion_actividad.fk_id_actividad,
        actividad.id_actividad, actividad.nombre_actividad, actividad.descripcion, asignacion_actividad.fk_identificacion,
        usuarios.identificacion, usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol, rol.id_rol, rol.nombre_rol, rol.fecha_creacion
    FROM asignacion_actividad
    JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
    JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
    JOIN rol ON usuarios.fk_id_rol = rol.id_rol`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const asignacion_actividad = result.rows.map(asignacion_actividad => ({
                id: asignacion_actividad.id_asignacion_actividad,
                fecha: asignacion_actividad.fecha,
                fk_id_actividad: {
                    id: asignacion_actividad.fk_id_actividad,
                    nombre_actividad: asignacion_actividad.nombre_actividad,
                    descripcion: asignacion_actividad.descripcion,
                    fk_identificacion:{
                        id: asignacion_actividad.fk_identificacion,
                        nombre: asignacion_actividad.nombre,
                        email: asignacion_actividad.email,
                            fk_id_rol:{
                                id: asignacion_actividad.fk_id_rol,
                                nombre_rol: asignacion_actividad.nombre_rol,
                                fecha_creacion: asignacion_actividad.fecha_creacion,

                            },
                    },
                },
            }));
            res.status(200).json({asignacion_actividad});
        } else{
            res.status(404).json({msg:'No hay asignaciones de actividades registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getAsignacionActividadById = async (req, res)=>{
    try{
        const {id_asignacion_actividad}=req.params;
        const sql = ` SELECT asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha, asignacion_actividad.fk_id_actividad,
        actividad.id_actividad, actividad.nombre_actividad, actividad.descripcion, asignacion_actividad.fk_identificacion,
        usuarios.identificacion, usuarios.nombre, usuarios.contrasena, usuarios.email, usuarios.fk_id_rol, rol.id_rol, rol.nombre_rol, rol.fecha_creacion
    FROM asignacion_actividad
    JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
    JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
    JOIN rol ON usuarios.fk_id_rol = rol.id_rol
    WHERE id_asignacion_actividad = $1  `;
    
        const result = await configuracionBD.query(sql,[id_asignacion_actividad]);
        if (result.rows.length > 0) {
            const asignacion_actividad = result.rows.map(asignacion_actividad => ({
                id: asignacion_actividad.id_asignacion_actividad,
                fecha: asignacion_actividad.fecha,
                fk_id_actividad: {
                    id: asignacion_actividad.fk_id_actividad,
                    nombre_actividad: asignacion_actividad.nombre_actividad,
                    descripcion: asignacion_actividad.descripcion,
                    fk_identificacion:{
                        id: asignacion_actividad.fk_identificacion,
                        nombre: asignacion_actividad.nombre,
                        email: asignacion_actividad.email,
                            fk_id_rol:{
                                id: asignacion_actividad.fk_id_rol,
                                nombre_rol: asignacion_actividad.nombre_rol,
                                fecha_creacion: asignacion_actividad.fecha_creacion,

                            },
                    },
                },
            }));
            res.status(200).json({asignacion_actividad});
        } else{
            res.status(404).json({msg:'No hay asignaciones de actividades registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updateAsignacionActividad = async (req, res) => {
    try{
        const { id_asignacion_actividad } = req.params;
        const { fecha, fk_id_actividad, fk_identificacion } = req.body;
        const sql = 'UPDATE asignacion_actividad SET fecha=$1, fk_id_actividad=$2 , fk_identificacion=$3 WHERE id_asignacion_actividad=$4';
        const values = [fecha, fk_id_actividad,fk_identificacion, id_asignacion_actividad];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'asignacion de actividad actualizada con éxito'});
        }else{
            res.status(404).json({msg:'No se encontró la asignacion de actividad'});
        }
    }catch(erro){
        console.log(erro)
        res.status(500).json({msg: 'Error en el servidor'});
    }
}


export const getReporteAsignaciones = async (req, res) => {
  try {
    const sql = `
      SELECT 
          usuarios.identificacion,
          usuarios.nombre AS nombre_usuario,
          rol.nombre_rol AS rol,  -- Cambio aquí
          COUNT(asignacion_actividad.id_asignacion_actividad) AS total_actividades,
          STRING_AGG(actividad.nombre_actividad, ' | ') AS actividades_asignadas
      FROM asignacion_actividad
      JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
      JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
      JOIN rol ON usuarios.fk_id_rol = rol.id_rol
      GROUP BY usuarios.identificacion, usuarios.nombre, usuarios.email, rol.nombre_rol  -- Cambio aquí
      ORDER BY total_actividades DESC;
    `;

    const result = await configuracionBD.query(sql);

    if (result.rows.length > 0) {
      const reporteAsignaciones = result.rows.map(asignacion => ({
        identificacion: asignacion.identificacion,
        nombre_usuario: asignacion.nombre_usuario,
        email: asignacion.email,
        rol: asignacion.rol,
        total_actividades: asignacion.total_actividades,
        actividades_asignadas: asignacion.actividades_asignadas
      }));

      res.status(200).json({ reporteAsignaciones });
    } else {
      res.status(400).json({ msg: 'No hay asignaciones de actividades registradas' });
    }
  } catch (error) {
    console.error('Error en getReporteAsignaciones:', error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
