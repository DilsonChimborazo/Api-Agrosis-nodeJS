import { configuracionBD } from "../config/conexion.js";


export const postplantacion = async (req,res) =>{
    try{
        const {fk_id_cultivo, fk_id_era}=req.body
        const sql="INSERT INTO plantacion(fk_id_cultivo,fk_id_era)VALUES($1,$2)";
        const rows = await configuracionBD.query(sql,[fk_id_cultivo, fk_id_era]);
        if (rows.rowCount> 0)
            return res.status(200).json({"message":"plantacion registrado correctamente"});
        else{
            res.status(404).json({"message":"No se pudo registra una plantacion"});
    }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({"message":"Error en el servidor"});
    }
};

export const getPlantacion = async (req, res) => {
    try {
        console.log("Buscando todas las plantaciones...");

        const sql = `SELECT 
                    p.id_plantacion,
                    p.fk_id_cultivo,
                    p.fk_id_era,
                    er.id_eras,
                    er.descripcion AS descripcion_era,
                    er.fk_id_lote,
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    t.id_tipo_cultivo,
                    t.nombre AS nombre_tipo_cultivo,
                    t.descripcion AS descripcion_tipo_cultivo,
                    s.id_semillero,
                    s.nombre_semilla,
                    s.fecha_siembra,
                    s.fecha_estimada,
                    s.cantidad,
                    l.id_lote,
                    l.dimension,
                    l.nombre_lote,
                    l.fk_id_ubicacion,
                    l.estado AS estado_lote,
                    u.id_ubicacion,
                    u.latitud,
                    u.longitud
                FROM plantacion p
                JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
                JOIN eras er ON p.fk_id_era = er.id_eras  
                JOIN lote l ON er.fk_id_lote = l.id_lote  
                JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion`;

        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            const plantaciones = result.rows.map(plant => ({
                id_plantacion: plant.id_plantacion,
                fk_id_cultivo: {
                    id_cultivo: plant.id_cultivo,
                    fecha_plantacion: plant.fecha_plantacion,
                    nombre_cultivo: plant.nombre_cultivo,
                    descripcion: plant.descripcion_cultivo,
                    fk_id_especie: {
                        id_especie: plant.id_especie,
                        nombre_comun: plant.nombre_comun,
                        nombre_cientifico: plant.nombre_cientifico,
                        descripcion: plant.descripcion_especie,
                        fk_id_tipo_cultivo: {
                            id_tipo_cultivo: plant.id_tipo_cultivo,
                            nombre: plant.nombre_tipo_cultivo,
                            descripcion: plant.descripcion_tipo_cultivo,
                        },
                    },
                    fk_id_semillero: {
                        id_semillero: plant.id_semillero,
                        nombre_semilla: plant.nombre_semilla,
                        fecha_siembra: plant.fecha_siembra,
                        fecha_estimada: plant.fecha_estimada,
                        cantidad: plant.cantidad,
                    },
                },
                fk_id_era: {
                    id_eras: plant.id_eras,
                    descripcion: plant.descripcion_era,  
                    fk_id_lote: plant.fk_id_lote,
                },
                fk_id_lote: {
                    id_lote: plant.id_lote,
                    dimension: plant.dimension,
                    nombre_lote: plant.nombre_lote,
                    fk_id_ubicacion: {
                        id_ubicacion: plant.id_ubicacion,
                        latitud: plant.latitud,
                        longitud: plant.longitud,
                    }
                },
            }));

            res.status(200).json({ plantaciones });
        } else {
            res.status(404).json({ msg: 'No hay plantaciones registradas' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const actualizarPlantacion = async (req, res) => {
    try {
        const { fk_id_cultivo, fk_id_era } = req.body;
        const id = req.params.id_plantacion;
        const sql = "UPDATE plantacion SET fk_id_cultivo=$1, fk_id_era=$2 WHERE id_plantacion=$3";
        
        const { rowCount } = await configuracionBD.query(sql, [fk_id_cultivo, fk_id_era, id]);
        
        if (rowCount > 0) {
            return res.status(200).json({ "message": "Plantación editada correctamente." });
        } else {
            return res.status(404).json({ "message": "No se pudo editar la plantación." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error en el servidor." });
    }
};

export const IdPlantacion = async (req, res) => {
    try {
        const { id_plantacion } = req.params;

        console.log("Buscando plantación con ID:", id_plantacion);

        const sql = `SELECT 
                    p.id_plantacion,
                    p.fk_id_cultivo,
                    p.fk_id_era,
                    er.id_eras,
                    er.descripcion,
                    er.fk_id_lote,
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    t.id_tipo_cultivo,
                    t.nombre AS nombre_tipo_cultivo,
                    t.descripcion AS descripcion_tipo_cultivo,
                    s.id_semillero,
                    s.nombre_semilla,
                    s.fecha_siembra,
                    s.fecha_estimada,
                    s.cantidad,
                    l.id_lote,
                    l.dimension,
                    l.nombre_lote,
                    l.fk_id_ubicacion,
                    l.estado AS estado_lote,
                    u.id_ubicacion,
                    u.latitud,
                    u.longitud
                FROM plantacion p
                JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
                JOIN eras er ON p.fk_id_era = er.id_eras  -- Se agregó el JOIN correcto
                JOIN lote l ON er.fk_id_lote = l.id_lote  -- Se cambió la relación para que use eras.fk_id_lote
                JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
                WHERE p.id_plantacion = $1`;

        const result = await configuracionBD.query(sql, [id_plantacion]);

        if (result.rows.length > 0) {
            const plantacion = result.rows.map(plant => ({
                id_plantacion: plant.id_plantacion,
                fk_id_cultivo: {
                    id_cultivo: plant.id_cultivo,
                    fecha_plantacion: plant.fecha_plantacion,
                    nombre_cultivo: plant.nombre_cultivo,
                    descripcion: plant.descripcion_cultivo,
                    fk_id_especie: {
                        id_especie: plant.id_especie,
                        nombre_comun: plant.nombre_comun,
                        nombre_cientifico: plant.nombre_cientifico,
                        descripcion: plant.descripcion_especie,
                        fk_id_tipo_cultivo: {
                            id_tipo_cultivo: plant.id_tipo_cultivo,
                            nombre: plant.nombre_tipo_cultivo,
                            descripcion: plant.descripcion_tipo_cultivo,
                        },
                    },
                    fk_id_semillero: {
                        id_semillero: plant.id_semillero,
                        nombre_semilla: plant.nombre_semilla,
                        fecha_siembra: plant.fecha_siembra,
                        fecha_estimada: plant.fecha_estimada,
                        cantidad: plant.cantidad,
                    },
                },
                fk_id_era: {
                    id_eras: plant.id_eras,
                    descripcion: plant.descripcion,
                    fk_id_lote: plant.fk_id_lote,
                },
                fk_id_lote: {
                    id_lote: plant.id_lote,
                    dimension: plant.dimension,
                    nombre_lote: plant.nombre_lote,
                    fk_id_ubicacion: {
                        id_ubicacion: plant.id_ubicacion,
                        latitud: plant.latitud,
                        longitud: plant.longitud,
                    }
                },
            }));

            res.status(200).json({ plantacion });
        } else {
            res.status(404).json({ msg: 'No se encontró la plantación' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error en el servidor." });
    }
};
