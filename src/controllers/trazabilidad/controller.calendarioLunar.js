import {configuracionBD} from '../../config/conexion.js';

export const createCalendarioLunar = async (req, res) => {
    try{
        const {fecha, descripcion, evento} = req.body;
        const sql = 'INSERT INTO calendario_lunar (fecha, descripcion, evento) VALUES($1, $2, $3)';
        const values = [fecha, descripcion, evento];
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
        const sql = ` SELECT * from calendario_lunar`;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
           
            res.status(200).json(result);
        } else{
            res.status(404).json({msg:'No hay eventos en  calendario lunar registrados'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getCalendarioLunarById = async (req, res) => {
    try {
        const { id_calendario_lunar } = req.params;
        const sql = `SELECT * FROM calendario_lunar WHERE id_calendario_lunar = $1`;
        const result = await configuracionBD.query(sql, [id_calendario_lunar]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Devuelve solo el registro encontrado
        } else {
            res.status(404).json({ msg: 'No hay eventos registrados en el calendario lunar' });
        }
    } catch (err) {
        console.log('Error al obtener el calendario lunar:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
}


export const updateCalendarioLunar= async (req, res) => {
    try{
        const { id_calendario_lunar } = req.params;
        const { fecha, descripcion, evento } = req.body;
        const sql = 'UPDATE  calendario_lunar SET  fecha=$1, descripcion=$2 , evento=$3 WHERE id_calendario_lunar=$4';
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