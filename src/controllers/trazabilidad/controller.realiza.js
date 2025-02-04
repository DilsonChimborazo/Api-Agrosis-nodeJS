import {configuracionBD} from '../../config/conexion.js';

export const createRealiza = async (req, res) => {
    try{
        const {id_realiza, fk_id_cultivo, fk_id_actividad} = req.body;
        const sql = 'INSERT INTO eras (id_realiza, fk_id_cultivo, fk_id_actividad) VALUES($1, $2, $3)';
        const values = [id_realiza, fk_id_cultivo, fk_id_actividad];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:' "Realiza" registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar "Realiza" '});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const getRealiza = async (req, res)=>{
    try{
        const sql = ` SELECT realiza.id_realiza, realiza.fk_id_cultivo, cultivo.id_cultivo,
        cultivo.nombre_cultivo, cultivo.descripcion, realiza.fk_id_actividad, actividad.id_actividad,
        actividad.nombre_actividad, actividad.descripcion
    FROM realiza
    JOIN cultivo ON realiza.fk_id_cultivo = cultivo.id_cultivo
    JOIN actividad ON realiza.fk_id_actividad = actividad.id_actividad;`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const realiza = result.rows.map(realiza => ({
                id: realiza.id_realiza,
                fk_id_cultivo: {
                    id: realiza.fk_id_cultivo,
                    nombre: realiza.nombre,
                    descripcion: realiza.descripcion
                },
                fk_id_actividad:{
                    id: realiza.fk_id_actividad,
                    nombre: realiza.nombre,
                    descripcion: realiza.descripcion
                    },
                
            }));
            res.status(200).json({realiza});
        } else{
            res.status(404).json({msg:'No hay "realiza" registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getRealizaById = async (req, res)=>{
    try{
        const { id_realiza } = req.params;
        const sql = ` SELECT realiza.id_realiza, realiza.fk_id_cultivo, cultivo.id_cultivo,
        cultivo.nombre, cultivo.descripcion, realiza.fk_id_actividad, actividad.id_actividad,
        actividad.nombre, actividad.descripcion
    FROM realiza
    JOIN cultivo ON realiza.fk_id_cultivo = cultivo.id_cultivo
    JOIN actividad ON realiza.fk_id_actividad = actividad.id_actividad
    WHERE id_realiza = $1 `;
        const result = await configuracionBD.query(sql,[id_realiza]);
        if (result.rows.length > 0) {
            const realiza = result.rows.map(realiza => ({
                id: realiza.id_realiza,
                fk_id_cultivo: {
                    id: realiza.fk_id_cultivo,
                    nombre: realiza.nombre,
                    descripcion: realiza.descripcion
                },
                fk_id_actividad:{
                    id: realiza.fk_id_actividad,
                    nombre: realiza.nombre,
                    descripcion: realiza.descripcion
                    },
                
            }));
            res.status(200).json({realiza});
        } else{
            res.status(404).json({msg:'No se encontro esa era'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const updateRealiza = async (req, res) => {
    try{
        const { id_realiza} = req.params;
        const { fk_id_cultivo, fk_id_actividad } = req.body;
        const sql = 'UPDATE realiza SET fk_id_cultivo=$1, fk_id_actividad=$2 WHERE id_realiza=$3';
        const values = [fk_id_cultivo, fk_id_actividad, id_realiza];
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