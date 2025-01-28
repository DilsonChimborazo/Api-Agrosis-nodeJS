import {configuracionBD} from '../../config/conexion.js';

export const createEspecie = async (req, res) => {
    try{
        const {id_especie, nombre_comun, nombre_cientifico,descripcion, fk_id_tipo_cultivo} = req.body;
        const sql = 'INSERT INTO especie (id_especie, nombre_comun, nombre_cientifico,descripcion, fk_id_tipo_cultivo) VALUES($1, $2, $3, $4, $5)';
        const values = [id_especie, nombre_comun, nombre_cientifico,descripcion, fk_id_tipo_cultivo];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Especie registrada con éxito'});
        }else{
            res.status(400).json({msg:'Error al registrar la Especie'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}

export const getEspecie= async (req, res)=>{
    try{
        const sql = ` SELECT especie.id_especie, especie.nombre_comun, especie.nombre_cientifico. especie.descripcion, especie.fk_id_tipo_cultivo,
        tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre, tipo_cultivo.descripcion,
        
    FROM especie
    JOIN tipo_cultivo ON especie.fk_id_tipo_cultivo = cultivo.id_tipo_cultivo
  `;
        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const especie = result.rows.map(especie => ({
                id: especie.id_especie,
                nombre_comun: especie.nombre_comun,
                nombre_cientifico: especie.nombre_cientifico,
                descripcion: especie.descripcion,
                fk_id_tipo_cultivo: {
                    id: especie.fk_id_tipo_cultivo,
                    nombre: especie.nombre,
                    descripcion: especie.descripcion,
                    
                },
            }));
            res.status(200).json({especie});
        } else{
            res.status(404).json({msg:'No hay especies registradas'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const getEspecieById = async (req, res)=>{
    try{
        const {id_especie}=req.params;
        const sql = ` SELECT especie.id_especie, especie.nombre_comun, especie.nombre_cientifico. especie.descripcion, especie.fk_id_tipo_cultivo,
        tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre, tipo_cultivo.descripcion,
        
    FROM especie
    JOIN tipo_cultivo ON especie.fk_id_tipo_cultivo = cultivo.id_tipo_cultivo
    WHERE especie = $1`;
    const result = await configuracionBD.query(sql);
    if (result.rows.length > 0) {
        const especie = result.rows.map(especie => ({
            id: especie.id_especie,
            nombre_comun: especie.nombre_comun,
            nombre_cientifico: especie.nombre_cientifico,
            descripcion: especie.descripcion,
            fk_id_tipo_cultivo: {
                id: especie.fk_id_tipo_cultivo,
                nombre: especie.nombre,
                descripcion: especie.descripcion,
                
            },
            }));
            res.status(200).json({especie});
        } else{
            res.status(404).json({msg:'No hay especies registradas'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Error en el servidor'});
    }
}

export const updateEspecie= async (req, res) => {
    try{
        const { id_especie } = req.params;
        const { nombre_comun, nombre_cientifico,descripcion, fk_id_tipo_cultivo} = req.body;
        const sql = 'UPDATE especie SET nombre_comun=$2, nombre_cientifico=$3 ,descripcion=$4 , fk_id_tipo_cultivo=$5 WHERE id_especie=$1';
        const values = [id_especie, nombre_comun, nombre_cientifico,descripcion, fk_id_tipo_cultivo];
        const result = await configuracionBD.query(sql, values);
        if(result.rowCount>0){
            res.status(200).json({msg:'Especie actualizada con éxito'});
        }else{
            res.status(404).json({msg:'No se encontró la Especie'});
        }
    }catch{
        res.status(500).json({msg: 'Error en el servidor'});
    }
}