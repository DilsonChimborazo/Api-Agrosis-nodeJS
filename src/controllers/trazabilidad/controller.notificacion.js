import {configuracionBD} from '../../config/conexion.js';

export const createNotificacion = async (req, res) => {
    try{
        const {titulo, mensaje, fk_id_programacion} = req.body;
        const sql = 'INSERT INTO notificacion (titulo, mensaje, fk_id_programacion) VALUES($1, $2, $3)';
        const values = [titulo, mensaje, fk_id_programacion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'notificacion registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar la notificacion'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const getNotificacion = async (req, res) => {
    try {
        const sql = `
            SELECT 
                notificacion.id_notificacion, 
                notificacion.titulo,
                notificacion.mensaje, 
                notificacion.fk_id_programacion, 
                programacion.id_programacion,
                programacion.estado, 
                programacion.fecha_programada, 
                programacion.duracion, 
                programacion.fk_id_asignacion_actividad, 
                asignacion_actividad.id_asignacion_actividad, 
                asignacion_actividad.fecha, 
                asignacion_actividad.fk_id_actividad, 
                actividad.id_actividad,
                actividad.nombre_actividad, 
                actividad.descripcion, 
                asignacion_actividad.fk_identificacion, 
                usuarios.identificacion, 
                usuarios.nombre,
                usuarios.contrasena, 
                usuarios.email, 
                usuarios.fk_id_rol, 
                Rol.id_rol, 
                Rol.nombre_rol,
                programacion.fk_id_calendario_lunar, 
                calendario_lunar.id_calendario_lunar,
                calendario_lunar.fecha, 
                calendario_lunar.descripcion_evento, 
                calendario_lunar.evento
            FROM 
                notificacion
            JOIN 
                programacion ON notificacion.fk_id_programacion = programacion.id_programacion
            JOIN 
                asignacion_actividad ON programacion.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
            JOIN 
                actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
            JOIN 
                usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
            JOIN 
                Rol ON usuarios.fk_id_rol = Rol.id_rol
            JOIN 
                calendario_lunar ON programacion.fk_id_calendario_lunar = calendario_lunar.id_calendario_lunar
        `;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const notificaciones = result.rows.map(notificacion => ({
                id: notificacion.id_notificacion,
                titulo: notificacion.titulo,
                mensaje: notificacion.mensaje,
                programacion: {
                    id: notificacion.id_programacion,
                    estado: notificacion.estado,
                    fecha_programada: notificacion.fecha_programada,
                    duracion: notificacion.duracion,
                    asignacion_actividad: {
                        id: notificacion.id_asignacion_actividad,
                        fecha: notificacion.fecha,
                        actividad: {
                            id: notificacion.id_actividad,
                            nombre: notificacion.nombre_actividad,
                            descripcion: notificacion.descripcion,
                        },
                        usuario: {
                            identificacion: notificacion.identificacion,
                            nombre: notificacion.nombre,
                            contrasena: notificacion.contrasena,
                            email: notificacion.email,
                            rol: {
                                id: notificacion.id_rol,
                                nombre: notificacion.nombre_rol,
                            }
                        }
                    },
                    calendario_lunar: {
                        id: notificacion.id_calendario_lunar,
                        fecha: notificacion.fecha,
                        descripcion: notificacion.descripcion,
                        evento: notificacion.evento,
                    }
                }
            }));
            res.status(200).json({ notificaciones });
        } else {
            res.status(404).json({ msg: 'No hay notificaciones registradas' });
        }
    } catch (err) {
        console.log('Error al obtener notificaciones:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
}


export const getNotificacionById = async (req, res) => {
    try {
        const { id_notificacion } = req.params;
        const sql = `
            SELECT 
                notificacion.id_notificacion, 
                notificacion.titulo,
                notificacion.mensaje, 
                notificacion.fk_id_programacion, 
                programacion.id_programacion,
                programacion.estado, 
                programacion.fecha_programada, 
                programacion.duracion, 
                programacion.fk_id_asignacion_actividad, 
                asignacion_actividad.id_asignacion_actividad, 
                asignacion_actividad.fecha, 
                asignacion_actividad.fk_id_actividad, 
                actividad.id_actividad,
                actividad.nombre_actividad, 
                actividad.descripcion, 
                asignacion_actividad.fk_identificacion, 
                usuarios.identificacion, 
                usuarios.nombre,
                usuarios.contrasena, 
                usuarios.email, 
                usuarios.fk_id_rol, 
                Rol.id_rol, 
                Rol.nombre_rol,
                programacion.fk_id_calendario_lunar, 
                calendario_lunar.id_calendario_lunar,
                calendario_lunar.fecha, 
                calendario_lunar.descripcion_evento, 
                calendario_lunar.evento
            FROM 
                notificacion
            JOIN 
                programacion ON notificacion.fk_id_programacion = programacion.id_programacion
            JOIN 
                asignacion_actividad ON programacion.fk_id_asignacion_actividad = asignacion_actividad.id_asignacion_actividad
            JOIN 
                actividad ON asignacion_actividad.fk_id_actividad = actividad.id_actividad
            JOIN 
                usuarios ON asignacion_actividad.fk_identificacion = usuarios.identificacion
            JOIN 
                Rol ON usuarios.fk_id_rol = Rol.id_rol
            JOIN 
                calendario_lunar ON programacion.fk_id_calendario_lunar = calendario_lunar.id_calendario_lunar
            WHERE 
                notificacion.id_notificacion = $1
        `;
        const result = await configuracionBD.query(sql, [id_notificacion]);
        if (result.rows.length > 0) {
            const notificacion = result.rows[0];
            res.status(200).json({
                id: notificacion.id_notificacion,
                titulo: notificacion.titulo,
                mensaje: notificacion.mensaje,
                programacion: {
                    id: notificacion.id_programacion,
                    estado: notificacion.estado,
                    fecha_programada: notificacion.fecha_programada,
                    duracion: notificacion.duracion,
                    asignacion_actividad: {
                        id: notificacion.id_asignacion_actividad,
                        fecha: notificacion.fecha,
                        actividad: {
                            id: notificacion.id_actividad,
                            nombre: notificacion.nombre_actividad,
                            descripcion: notificacion.descripcion,
                        },
                        usuario: {
                            identificacion: notificacion.identificacion,
                            nombre: notificacion.nombre,
                            contrasena: notificacion.contrasena,
                            email: notificacion.email,
                            rol: {
                                id: notificacion.id_rol,
                                nombre: notificacion.nombre_rol,
                            }
                        }
                    },
                    calendario_lunar: {
                        id: notificacion.id_calendario_lunar,
                        fecha: notificacion.fecha,
                        descripcion: notificacion.descripcion_evento,
                        evento: notificacion.evento,
                    }
                }
            });
        } else {
            res.status(404).json({ msg: 'Notificación no encontrada' });
        }
    } catch (err) {
        console.log('Error al obtener la notificación:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
}

export const updateNotificacion = async (req, res) => {
    try{
        const { id_notificacion } = req.params;
        const {titulo, mensaje, fk_id_programacion} = req.body;
        const sql = 'UPDATE notificacion SET titulo=$1, mensaje=$2, fk_id_programacion=$3 WHERE id_notificacion=$4';
        const values = [titulo, mensaje, fk_id_programacion, id_notificacion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Era actualizada con éxito'});
        }else{
            res.status(404).json({msg:'No se encontró la era'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}