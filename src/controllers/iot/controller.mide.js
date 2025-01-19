import {configuracionBD} from '../../config/conexion.js';

export const createMide = async (req, res) =>{
    try{
        const {fk_id_sensor, fk_id_era} = req.body;
        const sql = 'INSERT INTO mide (fk_id_sensor, fk_id_era) VALUES($1, $2)';
        const values = [fk_id_sensor, fk_id_era];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Medicion registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar el medicion'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}
export const getMide = async (req, res) => {
    try{
        const sql = ` SELECT mide.fk_id_sensor, mide.fk_id_era,
        eras.descripcion, eras.fk_id_lote,
        lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud,
        sensores.nombre_sensor, sensores.tipo_sensor, sensores.unidad_medida, sensores.descripcion, sensores.medida_minima, sensores.medida_maxima
        FROM mide
        JOIN eras ON mide.fk_id_era = eras.id_eras
        JOIN sensores ON mide.fk_id_sensor = sensores.id_sensor
        JOIN lote ON eras.fk_id_lote = lote.id_lote
        JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const mide = result.rows.map(mide => ({
                id: mide.id_mide,
                fk_id_sensor: {
                    id: mide.fk_id_sensor,
                    nombre_sensor: mide.nombre_sensor,
                    tipo_sensor: mide.tipo_sensor,
                    unidad_medida: mide.unidad_medida,
                    descripcion: mide.descripcion,
                    medida_minima: mide.medida_minima,
                    medida_maxima: mide.medida_maxima
                },
                fk_id_era: {
                    id: mide.fk_id_era,
                    descripcion: mide.descripcion,
                    fk_id_lote: {
                        id: mide.fk_id_lote,
                        dimension: mide.dimension,
                        nombre_lote: mide.nombre_lote,
                        fk_id_ubicacion:{
                            id: mide.fk_id_ubicacion,
                            latitud: mide.latitud,
                            longitud: mide.longitud
                        },
                        estado: mide.estado
                    }
                }
            }));
            res.status(200).json({mide});
        } else{
            res.status(404).json({msg:'No hay mediciones registradas'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getMideById = async(req, res) =>{
    try{
        const {id_mide} = req.params;
        const sql = ` SELECT mide.fk_id_sensor, mide.fk_id_era,
        eras.descripcion, eras.fk_id_lote,
        lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud,
        sensores.nombre_sensor, sensores.tipo_sensor, sensores.unidad_medida, sensores.descripcion, sensores.medida_minima, sensores.medida_maxima
        FROM mide
        JOIN eras ON mide.fk_id_era = eras.id_eras
        JOIN sensores ON mide.fk_id_sensor = sensores.id_sensor
        JOIN lote ON eras.fk_id_lote = lote.id_lote
        JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
        WHERE id_mide = $1`;
        const result = await configuracionBD.query(sql, [id_mide]);
        if (result.rows.length > 0) {
            const mide = result.rows.map(mide => ({
                id: mide.id_mide,
                fk_id_sensor: {
                    id: mide.fk_id_sensor,
                    nombre_sensor: mide.nombre_sensor,
                    tipo_sensor: mide.tipo_sensor,
                    unidad_medida: mide.unidad_medida,
                    descripcion: mide.descripcion,
                    medida_minima: mide.medida_minima,
                    medida_maxima: mide.medida_maxima
                },
                fk_id_era: {
                    id: mide.fk_id_era,
                    descripcion: mide.descripcion,
                    fk_id_lote: {
                        id: mide.fk_id_lote,
                        dimension: mide.dimension,
                        nombre_lote: mide.nombre_lote,
                        fk_id_ubicacion:{
                            id: mide.fk_id_ubicacion,
                            latitud: mide.latitud,
                            longitud: mide.longitud
                        },
                        estado: mide.estado
                    }
                }
            }));
            res.status(200).json({mide});
        } else{
            res.status(404).json({msg:'No se encontro esa medicion'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updateMide = async(req, res) => {
    try{
        const {id_mide} = req.params;
        const {fk_id_sensor, fk_id_era} = req.body;
        const sql = 'UPDATE mide SET fk_id_sensor=$1, fk_id_era=$2 WHERE id_mide=$3';
        const values = [fk_id_sensor, fk_id_era, id_mide];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Medicion actualizada con éxito'});
        } else{
            res.status(404).json({msg:'No se encontró la medicion'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}