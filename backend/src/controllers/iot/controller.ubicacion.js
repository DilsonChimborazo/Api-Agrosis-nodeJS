import { configuracionBD } from "../../config/conexion.js";

export const createUbicacion = async (req, res) => {
    try{
        const {latitud, longitud} = req.body;
        const sql = 'INSERT INTO ubicacion (latitud, longitud) VALUES($1, $2)';
        const values = [latitud, longitud];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'ubicación creada con exito'});
        }else{
            res.status(400).json({msg:'ubicación no creada'})
        }
    }catch{
        res.status(500).json({msg: 'Error al crear la ubicación'});
    }
}

export const getUbicaciones = async (req, res) => {
    try{
        const sql = 'SELECT * FROM ubicacion';
        const result = await configuracionBD.query(sql);
        if(result.rowCount>0){
            res.status(200).json({msg:'Ubicaciones obtenidas con éxito', result: result.rows});
        }else{
            res.status(404).json({msg:'No hay ubicaciones registradas'})
        }
    }catch{
        res.status(500).json({msg: 'Error al obtener las ubicaciones'});
    }
}

export const getUbicacionById = async (req, res) => {
    try{
        const {id_ubicacion} = req.params;
        const sql = 'SELECT * FROM ubicacion WHERE id_ubicacion = $1';
        const values = [id_ubicacion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Ubicación obtenida con éxito', result: result.rows[0]});
        }else{
            res.status(404).json({msg:'Ubicación no encontrada'})
        }
    }catch{
        res.status(500).json({msg: 'Error al obtener la ubicación'});
    }
}

export const updateUbicacion = async (req, res) => {
    try{
        const {id_ubicacion} = req.params;
        const {latitud, longitud} = req.body;
        const sql = 'UPDATE ubicacion SET latitud = $1, longitud = $2 WHERE id_ubicacion = $3';
        const values = [latitud, longitud, id_ubicacion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Ubicación actualizada con éxito'});
        }else{
            res.status(404).json({msg:'Ubicación no encontrada para actualizar'})
        }
    }catch{
        res.status(500).json({msg: 'Error al actualizar la ubicación'});
    }
}
