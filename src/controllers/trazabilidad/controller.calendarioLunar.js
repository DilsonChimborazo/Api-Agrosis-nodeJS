import {configuracionBD} from '../../config/conexion.js';

export const createCalendarioLunar = async (req, res) => {
    try{
        const {id_calendario_lunar, fecha, descripcion, evento} = req.body;
        const sql = 'INSERT INTO calendario_lunar (id_calendario_lunar, fecha, descripcion, evento) VALUES($1, $2, $3, $4)';
        const values = [id_calendario_lunar,fecha, descripcion, evento];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Evento en calendario lunar registrado con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar un evento en el calendario lunar'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const getCalendarioLunar = async (req, res)=>{
    try{
        const sql = ` SELECT calendario_lunar.id_calendario_lunar, calendario_lunar.fecha, calendario_lunar.descripcion, calendario_lunar.evento,
    FROM  calendario_lunar`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const  calendario_lunar = result.rows.map( calendario_lunar => ({
                id: calendario_lunar.id_calendario_lunar,
                fecha:  calendario_lunar.fecha,
                descripcion:  calendario_lunar.descripcion,
                evento:  calendario_lunar.evento,
                
            }));
            res.status(200).json({ calendario_lunar});
        } else{
            res.status(404).json({msg:'No hay eventos en  calendario lunar registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getCalendarioLunarById = async (req, res)=>{
    try{
        const {id_calendario_lunar}=req.params;
        const sql = ` SELECT  calendario_lunar.id_calendario_lunar, calendario_lunar.fecha, calendario_lunar.descripcion, calendario_lunar.evento,
        
    FROM  calendario_lunar,
    WHERE  calendario_lunar = $1  `;
        const result = await configuracionBD.query(sql,[id_calendario_lunar]);
        if (result.rows.length > 0) {
            const  calendario_lunar = result.rows.map( calendario_lunar => ({
                id:  calendario_lunar.id_calendario_lunar,
                fecha:  calendario_lunar.fecha,
                descripcion:  calendario_lunar.descripcion,
                evento: calendario_lunar.evento,
                
            }));
            res.status(200).json({calendario_lunar});
        } else{
            res.status(404).json({msg:'No hay eventos registrados en el  calendario lunar'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updateCalendarioLunar= async (req, res) => {
    try{
        const { id_calendario_lunar } = req.params;
        const { fecha, descripcion, evento } = req.body;
        const sql = 'UPDATE  calendario_lunar SET  fecha=$2, descripcion=$3 , evento=$4 WHERE id_calendario_lunar=$1';
        const values = [id_calendario_lunar,fecha,descripcion, evento];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'asignacion de actividad actualizada con éxito'});
        }else{
            res.status(404).json({msg:'No se encontró la asignacion de actividad'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}