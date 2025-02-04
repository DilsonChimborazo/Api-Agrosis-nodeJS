import { configuracionBD } from "../../config/conexion.js";

export const createRol = async (req, res) => {
    try{
        const {nombre_rol, fecha_creacion} = req.body;
        const sql = 'INSERT INTO rol (nombre_rol, fecha_creacion) VALUES ($1, $2)';
        const values = [nombre_rol, fecha_creacion];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Rol registrado con exito'});
        }else{
            res.status(400).json({msg:'Error al registrar rol'});
        }
    } catch(error){
        console.log(error)
        res.status(500).json({msg:'Error en el servidor'});
    }
};

export const getRol = async (req, res) =>{
    try{
        const sql = "select * from rol";
        const result = await configuracionBD.query(sql);
        if(result.rows.length > 0) {
            res.status(200).json(result)
        }else{
            res.status(400).json({msg:'Error al listar rol'});
        }
    } catch{
        res.status(500).json({msg:'Error en el servidor'});
    }
};

export const getRolById = async (req, res) =>{
    try{
        const {id_rol} = req.params;
        const sql = ` SELECT * from rol where id_rol = $1`;
        const result = await configuracionBD.query(sql, [id_rol]);
        if(result.rows.length > 0){
            res.status(200).json(result.rows)
        }else{
            res.status(400).json({msg:'Error al listar rol'})
        }
    } catch(error){
        console.log(error)
        res.status(500).json({msg:'Error en el servidor'})
    }
};

export const updateRol = async (req, res)=>{
    try{
        const {nombre_rol, fecha_creacion} = req.body;
        const {id_rol} = req.params;
        const sql = `UPDATE rol set nombre_rol = $1 , fecha_creacion = $2 where id_rol =$3`;
        const result = await configuracionBD.query(sql, [nombre_rol,fecha_creacion, id_rol]);
        if(result.rowCount > 0){
            res.status(200).json(result)
        }else{
            res.status(400).json({msg:'Error al actualizar rol'})
        }
    } catch(error){
            console.log(error)
            res.status(500).json({msg:'Error en el servidor'})        
    }   
};