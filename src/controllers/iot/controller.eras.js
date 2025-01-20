import {configuracionBD} from '../../config/conexion.js';

export const createEras = async (req, res) => {
    try{
        const {descripcion, fk_id_lote} = req.body;
        const sql = 'INSERT INTO eras (descripcion, fk_id_lote) VALUES($1, $2)';
        const values = [descripcion, fk_id_lote];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Era registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar la era'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}


export const getEras = async (req, res)=>{
    try{
        const sql = ` SELECT eras.descripcion, eras.fk_id_lote,
        lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud
    FROM eras
    JOIN lote ON eras.fk_id_lote = lote.id_lote
    JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion;`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const eras = result.rows.map(eras => ({
                id: eras.id_eras,
                descripcion: eras.descripcion,
                fk_id_lote: {
                    id: eras.fk_id_lote,
                    dimension: eras.dimension,
                    nombre_lote: eras.nombre_lote,
                    fk_id_ubicacion:{
                        id: eras.fk_id_ubicacion,
                        latitud: eras.latitud,
                        longitud: eras.longitud
                    },
                    estado: eras.estado
                }
            }));
            res.status(200).json({eras});
        } else{
            res.status(404).json({msg:'No hay eras registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getEraById = async (req, res)=>{
    try{
        const { id_eras } = req.params;
        const sql = ` SELECT eras.descripcion, eras.fk_id_lote,
        lote.id_lote, lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud
    FROM eras
    JOIN lote ON eras.fk_id_lote = lote.id_lote
    JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
    WHERE id_eras = $1 `;
        const result = await configuracionBD.query(sql,[id_eras]);
        if (result.rows.length > 0) {
            const era = result.rows.map(eras => ({
                id: eras.id_eras,
                descripcion: eras.descripcion,
                fk_id_lote: {
                    id: eras.fk_id_lote,
                    dimension: eras.dimension,
                    nombre_lote: eras.nombre_lote,
                    fk_id_ubicacion:{
                        id: eras.fk_id_ubicacion,
                        latitud: eras.latitud,
                        longitud: eras.longitud
                    },
                    estado: eras.estado
                }
            }));
            res.status(200).json({era});
        } else{
            res.status(404).json({msg:'No se encontro esa era'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const updateEra = async (req, res) => {
    try{
        const { id_eras } = req.params;
        const { descripcion, fk_id_lote } = req.body;
        const sql = 'UPDATE eras SET descripcion=$1, fk_id_lote=$2 WHERE id_eras=$3';
        const values = [descripcion, fk_id_lote, id_eras];
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