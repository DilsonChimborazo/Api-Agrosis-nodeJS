import {configuracionBD} from '../../config/conexion.js';

export const createProgramacion = async (req, res) => {
    try{
        const {estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar} = req.body;
        const sql = 'INSERT INTO programacion (estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar) VALUES($1, $2, $3, $4, $5)';
        const values = [estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Programacion  registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar la programacion'});
        }
    }catch (error){
        console.log(error)
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const getProgramacion = async (req, res)=>{
    try{
        const sql = ` SELECT programacion.estado, programacion.fecha_programada, programacion.duracion,
       programacion.fk_id_asignacion_actividad, asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha,
       asignacion_actividad.fk_id_actividad, actividad.nombre_actividad, actividad.descripcion, usuarios.identificacion,
       usuarios.nombre, usuarios.email, usuarios.fk_id_rol, Rol.id_rol, Rol.nombre_rol, Rol.fecha_creacion,
       programacion.fk_id_calendario_lunar, calendario_lunar.id_calendario_lunar, calendario_lunar.fecha, calendario_lunar.descripcion_evento, calendario_lunar.evento
FROM programacion
JOIN asignacion_actividad ON programacion.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
JOIN Rol ON usuarios.fk_id_rol = rol.id_rol
JOIN calendario_lunar ON programacion.fk_id_calendario_lunar = calendario_lunar.id_calendario_lunar;

`;
const result = await configuracionBD.query(sql);
if (result.rows.length > 0) {
    const programacion = result.rows.map(programacion => ({
        id: programacion.id_asignacion_actividad,
        fecha: programacion.fecha,
        fk_id_actividad: {
            id: programacion.fk_id_actividad,
            nombre_actividad: programacion.nombre_actividad,
            descripcion: programacion.descripcion,
            fk_identificacion: {
                id: programacion.fk_identificacion,
                nombre: programacion.nombre,
                email: programacion.email,
                fk_id_rol: {
                    id: programacion.fk_id_rol,
                    nombre_rol: programacion.nombre_rol,
                    fecha_creacion: programacion.fecha_creacion,
                },
            },
        },
        fk_id_calendario_lunar: {
            id: programacion.id_calendario_lunar,
            fecha: programacion.fecha_calendario_lunar,
            descripcion: programacion.descripcion_calendario_lunar,
            evento: programacion.evento_calendario_lunar,
        },
    }));


            res.status(200).json({programacion});
        } else{
            res.status(404).json({msg:'No hay programaciones registradas'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getProgramacionById = async (req, res) => {
    try {
        const { id_programacion } = req.params;
        const sql = `SELECT programacion.estado, programacion.fecha_programada, programacion.duracion,
       programacion.fk_id_asignacion_actividad, asignacion_actividad.id_asignacion_actividad, asignacion_actividad.fecha,
       asignacion_actividad.fk_id_actividad, actividad.nombre_actividad, actividad.descripcion, usuarios.identificacion,
       usuarios.nombre, usuarios.email, usuarios.fk_id_rol, Rol.id_rol, Rol.nombre_rol, Rol.fecha_creacion,
       programacion.fk_id_calendario_lunar, calendario_lunar.id_calendario_lunar, calendario_lunar.fecha, calendario_lunar.descripcion_evento, calendario_lunar.evento
FROM programacion
JOIN asignacion_actividad ON programacion.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
JOIN actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
JOIN usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
JOIN Rol ON usuarios.fk_id_rol = Rol.id_rol
JOIN calendario_lunar ON programacion.fk_id_calendario_lunar = calendario_lunar.id_calendario_lunar
WHERE programacion.id_programacion = $1;`;

        const result = await configuracionBD.query(sql, [id_programacion]);

        if (result.rows.length > 0) {
            const programacion = result.rows.map(programacion => ({
                id: programacion.id_asignacion_actividad,
                fecha: programacion.fecha,
                fk_id_actividad: {
                    id: programacion.fk_id_actividad,
                    nombre_actividad: programacion.nombre_actividad,
                    descripcion: programacion.descripcion,
                    fk_identificacion: {
                        id: programacion.fk_identificacion,
                        nombre: programacion.nombre,
                        email: programacion.email,
                        fk_id_rol: {
                            id: programacion.fk_id_rol,
                            nombre_rol: programacion.nombre_rol,
                            fecha_creacion: programacion.fecha_creacion,
                        },
                    },
                },
                fk_id_calendario_lunar: {
                    id: programacion.id_calendario_lunar,
                    fecha: programacion.fecha_calendario_lunar,
                    descripcion: programacion.descripcion_calendario_lunar,
                    evento: programacion.evento_calendario_lunar,
                },
            }));

            res.status(200).json({ programacion });
        } else {
            res.status(404).json({ msg: 'No hay programaciones registradas' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


export const updateProgramacion = async (req, res) => {
    try {
        const { id_programacion } = req.params;
        const { estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar } = req.body;
        const sql = 'UPDATE programacion SET estado=$1, fecha_programada=$2, duracion=$3, fk_id_asignacion_actividad=$4, fk_id_calendario_lunar=$5 WHERE id_programacion=$6';
        const values = [estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar, id_programacion];
        const result = await configuracionBD.query(sql, values);
        
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Programación actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'No se encontró la programación' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
