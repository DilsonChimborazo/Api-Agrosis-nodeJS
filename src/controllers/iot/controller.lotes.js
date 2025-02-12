import {configuracionBD} from '../../config/conexion.js';

export const createLotes = async(req, res)=>{
    try{
        const { dimension,nombre_lote, fk_id_ubicacion, estado } = req.body;
        const sql = 'INSERT INTO lote (dimension,nombre_lote, fk_id_ubicacion, estado ) VALUES($1, $2, $3, $4)';
        const values = [dimension,nombre_lote, fk_id_ubicacion, estado ];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Lote registrado con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar el lote'});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({msg:'Error en el servidor '})
    }
}

export const getLotes = async (req, res)=>{
    try{
        const sql = ` SELECT lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud
    FROM lote
    JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const lote = result.rows.map(lote => ({
                id: lote.id_lote,
                dimension: lote.dimension,
                nombre_lote: lote.nombre_lote,
                fk_id_ubicacion: {
                    id: lote.fk_id_ubicacion,
                    latitud: lote.latitud,
                    longitud: lote.longitud,
                },
                estado: lote.estado,
            }));
            res.status(200).json({lote});
        } else{
            res.status(404).json({msg:'No hay lotes registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}


export const getLoteById = async (req, res) => {
    try{
        const { id_lote } = req.params;
        const sql = (` SELECT lote.dimension, lote.nombre_lote, lote.fk_id_ubicacion, lote.estado,
        ubicacion.id_ubicacion, ubicacion.latitud, ubicacion.longitud
        FROM lote 
        JOIN ubicacion ON lote.fk_id_ubicacion = ubicacion.id_ubicacion
        WHERE id_lote = $1 `)
        const result = await configuracionBD.query(sql, [id_lote]);
        if (result.rows.length > 0) {
            const lote = result.rows.map(lote => ({
                id: lote.id_lote,
                dimension: lote.dimension,
                nombre_lote: lote.nombre_lote,
                fk_id_ubicacion: {
                    id: lote.fk_id_ubicacion,
                    latitud: lote.latitud,
                    longitud: lote.longitud,
                },
                estado: lote.estado,
            }));
            res.status(200).json({lote});
        }else{
            res.status(404).json({msg:'Lote no encontrado'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updateLote = async (req, res) => {
    try{
        const { id_lote } = req.params;
        const { dimension, nombre_lote, fk_id_ubicacion, estado } = req.body;
        const sql = 'UPDATE lote SET dimension=$1, nombre_lote=$2, fk_id_ubicacion=$3, estado=$4 WHERE id_lote=$5'
        const values= [dimension, nombre_lote, fk_id_ubicacion, estado,id_lote]
        const result = await configuracionBD.query(sql,values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Lote actualizado con éxito'});
        }else{
            res.status(404).json({msg:'Lote no encontrado'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

