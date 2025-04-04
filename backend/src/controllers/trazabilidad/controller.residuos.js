import {configuracionBD} from "../../config/conexion.js";


export const postResiduos = async (req, res) => {
    try {
        const { nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo } = req.body;

        const sql = "INSERT INTO residuos(nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo) VALUES ($1, $2, $3, $4, $5)";
        const result = await configuracionBD.query(sql, [nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo]);

        if (result.rowCount > 0) {
            return res.status(200).json({ "message": "Residuos registrados correctamente" });
        } else {
            return res.status(400).json({ "message": "No se registró el residuo" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor" });
    }
};


export const getResiduos = async (req, res) => {
    try{
        console.log("Buscando los residuos");
        const sql =`SELECT
                   r.id_residuo,
                   r.nombre,
                   r.fecha,
                   r.descripcion,
                   r.fk_id_tipo_residuo,
                   r.fk_id_cultivo,
                   tr.id_tipo_residuo,
                   tr.nombre_residuo,
                   tr.descripcion AS descripcion_tipo_residuo,
                   c.id_cultivo,
                   c.fecha_plantacion,
                   c.nombre_cultivo,
                   c.descripcion AS descripcion_cultivo,
                   c.fk_id_especie,
                   c.fk_id_semillero,
                   e.id_especie,
                   e.nombre_comun,
                   e.nombre_cientifico,
                   e.descripcion,
                   e.fk_id_tipo_cultivo,
                   tc.id_tipo_cultivo,
                   tc.nombre AS nombre_tipo_cultivo,
                   tc.descripcion AS descripcion_tipo_cultivo,
                   s.id_semillero,
                   s.nombre_semilla,
                   s.fecha_siembra,
                   s.fecha_estimada,
                   s.cantidad
                FROM residuos r
                JOIN cultivo c ON r.fk_id_cultivo = c.id_cultivo
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo tc ON e.fk_id_tipo_cultivo = tc.id_tipo_cultivo
                JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
         
                JOIN tipo_residuos tr ON r.fk_id_tipo_residuo = tr.id_tipo_residuo`;

        const result = await configuracionBD.query(sql);

        if(result.rows.length > 0){
            const residuos = result.rows.map(r => ({
                id_residuo: r.id_residuo,
                nombre: r.nombre,
                fecha: r.fecha,
                descripcion: r.descripcion,
                fk_id_tipo_residuo: r.fk_id_tipo_residuo,
                fk_id_cultivo: r.fk_id_cultivo,
                fk_id_cultivo: {
                    id_cultivo: r.id_cultivo,
                    fecha_plantacion: r.fecha_plantacion,
                    nombre_cultivo: r.nombre_cultivo,
                    descripcion: r.descripcion,
                    fk_id_especie: {
                        id_especie: r.id_especie,
                        nombre_comun: r.nombre_comun,
                        nombre_cientifico: r.nombre_cientifico,
                        descripcion: r.descripcion,
                        fk_id_tipo_cultivo: {
                            id_tipo_cultivo: r.id_tipo_cultivo,
                            nombre: r.nombre_tipo_cultivo,
                            descripcion: r.descripcion_tipo_cultivo,
                        },
                    },
                    fk_id_semillero: {
                        id_semillero: r.id_semillero,
                        nombre_semilla: r.nombre_semilla,
                        fecha_siembra: r.fecha_siembra,
                        fecha_estimada: r.fecha_estimada,
                        cantidad: r.cantidad,
                    },
                }
            }));
            res.status(200).json({residuos})
        }else {
            res.status(404).json({msg: 'No hay residuos registrados'});
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({"message":"Error en el servidor"})
    }
};

export const IdResiduos = async (req, res) => {
    try{
        const {id_residuo} = req.params;
        console.log("Buscando residuos por ID:", id_residuo );
        const sql = `SELECT
        r.id_residuo,
        r.nombre,
        r.fecha,
        r.descripcion,
        r.fk_id_tipo_residuo,
        r.fk_id_cultivo,
        tr.id_tipo_residuo,
        tr.nombre_residuo,
        tr.descripcion AS descripcion_tipo_residuo,
        c.id_cultivo,
        c.fecha_plantacion,
        c.nombre_cultivo,
        c.descripcion AS descripcion_cultivo,
        c.fk_id_especie,
        c.fk_id_semillero,
        e.id_especie,
        e.nombre_comun,
        e.nombre_cientifico,
        e.descripcion,
        e.fk_id_tipo_cultivo,
        tc.id_tipo_cultivo,
        tc.nombre AS nombre_tipo_cultivo,
        tc.descripcion AS descripcion_tipo_cultivo,
        s.id_semillero,
        s.nombre_semilla,
        s.fecha_siembra,
        s.fecha_estimada,
        s.cantidad
     FROM residuos r
     JOIN cultivo c ON r.fk_id_cultivo = c.id_cultivo
     JOIN especie e ON c.fk_id_especie = e.id_especie
     JOIN tipo_cultivo tc ON e.fk_id_tipo_cultivo = tc.id_tipo_cultivo
     JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
     JOIN tipo_residuos tr ON r.fk_id_tipo_residuo = tr.id_tipo_residuo
     WHERE r.id_residuo =$1`;

const result = await configuracionBD.query(sql,[id_residuo]);

if(result.rows.length > 0){
 const residuos = result.rows.map(r => ({
     id_residuo: r.id_residuo,
     nombre: r.nombre,
     fecha: r.fecha,
     descripcion: r.descripcion,
     fk_id_tipo_residuo: r.fk_id_tipo_residuo,
     fk_id_cultivo: r.fk_id_cultivo,
     fk_id_cultivo: {
         id_cultivo: r.id_cultivo,
         fecha_plantacion: r.fecha_plantacion,
         nombre_cultivo: r.nombre_cultivo,
         descripcion: r.descripcion,
         fk_id_especie: {
             id_especie: r.id_especie,
             nombre_comun: r.nombre_comun,
             nombre_cientifico: r.nombre_cientifico,
             descripcion: r.descripcion,
             fk_id_tipo_cultivo: {
                 id_tipo_cultivo: r.id_tipo_cultivo,
                 nombre: r.nombre_tipo_cultivo,
                 descripcion: r.descripcion_tipo_cultivo,
             },
         },
         fk_id_semillero: {
             id_semillero: r.id_semillero,
             nombre_semilla: r.nombre_semilla,
             fecha_siembra: r.fecha_siembra,
             fecha_estimada: r.fecha_estimada,
             cantidad: r.cantidad,
         },
     }
 }));
 res.status(200).json({residuos})
}else {
 res.status(404).json({msg: 'No hay residuos registrados'});
}
                    
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"Error en el servidor"})
    }
};

export const actualizarResiduos = async (req, res) => {
    try{
        const {nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo}=req.body;
        const id =req.params.id_residuo;
        const sql = "UPDATE residuos SET nombre = $1, fecha = $2, descripcion = $3, fk_id_tipo_residuo = $4, fk_id_cultivo = $5 WHERE id_residuo = $6";
        const { rowCount } = await configuracionBD.query(sql, [nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo, id])

        if (rowCount > 0) {
            return res.status(200).json({"message": "Residuos editado correctamente"});
        }else{
            return res.status(404),json({"message":"No se puedo editar residuos"});
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"error en el servidor"})
    }
};