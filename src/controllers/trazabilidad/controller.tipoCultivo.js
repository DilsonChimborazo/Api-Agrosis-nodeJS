import {configuracionBD} from '../../config/conexion.js';

export const createTipoCultivo = async (req, res) => {
    try{
        const { nombre, descripcion} = req.body;
        const sql = 'INSERT INTO tipo_cultivo ( nombre, descripcion) VALUES($1, $2)';
        const values = [ nombre, descripcion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Tipo de cultivo registrado con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar Tipo de cultivo'});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const getTipoCultivo  = async (req, res)=>{
    try{
        const sql = ` SELECT tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre, tipo_cultivo.descripcion
        FROM tipo_cultivo`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const tipo_cultivo = result.rows.map(tipo_cultivo => ({
                id: tipo_cultivo.id_tipo_cultivo,
                nombre: tipo_cultivo.nombre,
                descripcion: tipo_cultivo.descripcion,
                    
            }));
            res.status(200).json({tipo_cultivo});
        } else{
            res.status(404).json({msg:'No hay tipo de cultivos registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getTipoCultivoById = async (req, res)=>{
    try{
        const {id_tipo_cultivo}=req.params;
        const sql= `SELECT tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre, tipo_cultivo.descripcion 
        FROM tipo_cultivo WHERE id_tipo_cultivo = $1`;


        const result = await configuracionBD.query(sql,[id_tipo_cultivo]);
        if (result.rows.length > 0) {
            const tipo_cultivo = result.rows.map(tipo_cultivo => ({
                id: tipo_cultivo.id_tipo_cultivo,
                nombre: tipo_cultivo.nombre,
                descripcion:tipo_cultivo.descripcion,
            }));
            res.status(200).json({tipo_cultivo});
        } else{
            res.status(404).json({msg:'No existe el tipo de cultivo'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updateTipoCultivo  = async (req, res) => {
    try{
        const { id_tipo_cultivo } = req.params;
        const { nombre, descripcion } = req.body;
        const sql = 'UPDATE tipo_cultivo SET nombre=$1, descripcion=$2 WHERE id_tipo_cultivo=$3';
        const values = [id_tipo_cultivo, nombre, descripcion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Tipo de cultivo actualizado con éxito'});
        }else{
            res.status(404).json({msg:'No se encontró el tipo de cultivo'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}