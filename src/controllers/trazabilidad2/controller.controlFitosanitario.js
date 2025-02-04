import {pool} from "../config/conexion.js";

export const postControlFitosanitario = async (req, res) => {
    try{
        const {fecha_control, descripcion, fk_id_desarrollan}= req.body;
        const sql ="INSERT INTO control_fitosanitario(fecha_control, descripcion, fk_id_desarrollan)VALUES ($1, $2, $3)";
        const rows = await pool.query(sql,[fecha_control, descripcion, fk_id_desarrollan]);
        if (rows.rowCount >0)
            return res.status(200).json({"message":"Control fitosanitrio registrados correctamente"});
        else{
            res.status(404).json({"message":"No se registro control fitosanitario"})
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({"message":"error en el servidor"})
    }
};

export const getControlFitosanitario = async (req, res) => {
    try {
        console.log("Buscando los controles fitosanitarios");

        const sql = `SELECT
                    cf.id_control_fitosanitario,
                    cf.fecha_control,
                    cf.descripcion,
                    cf.fk_id_desarrollan,
                    d.id_desarrollan,
                    d.fk_id_cultivo,
                    d.fk_id_pea,
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    p.id_pea,
                    p.nombre AS nombre_pea,
                    p.descripcion AS descripcion_pea,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    tc.id_tipo_cultivo,
                    tc.nombre AS nombre_tipo_cultivo,
                    tc.descripcion AS descripcion_tipo_cultivo,
                    s.id_semillero,
                    s.nombre_semilla,
                    s.fecha_siembra,
                    s.fecha_estimada,
                    s.cantidad
                FROM control_fitosanitario cf
                JOIN desarrollan d ON cf.fk_id_desarrollan = d.id_desarrollan
                JOIN cultivo c ON d.fk_id_cultivo = c.id_cultivo
                JOIN pea p ON d.fk_id_pea = p.id_pea
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo tc ON e.fk_id_tipo_cultivo = tc.id_tipo_cultivo
                JOIN semilleros s ON c.fk_id_semillero = s.id_semillero`;

        const result = await pool.query(sql);

        if (result.rows.length > 0) {
            const controles = result.rows.map(cf => ({
                id_control_fitosanitario: cf.id_control_fitosanitario,
                fecha_control: cf.fecha_control,
                descripcion: cf.descripcion,
                fk_id_desarrollan: cf.fk_id_desarrollan,
                desarrollan: {
                    id_desarrollan: cf.id_desarrollan,
                    cultivo: {
                        id_cultivo: cf.id_cultivo,
                        fecha_plantacion: cf.fecha_plantacion,
                        nombre_cultivo: cf.nombre_cultivo,
                        descripcion: cf.descripcion_cultivo,
                        especie: {
                            id_especie: cf.id_especie,
                            nombre_comun: cf.nombre_comun,
                            nombre_cientifico: cf.nombre_cientifico,
                            descripcion: cf.descripcion_especie,
                            tipo_cultivo: {
                                id_tipo_cultivo: cf.id_tipo_cultivo,
                                nombre: cf.nombre_tipo_cultivo,
                                descripcion: cf.descripcion_tipo_cultivo,
                            }
                        },
                        semillero: {
                            id_semillero: cf.id_semillero,
                            nombre_semilla: cf.nombre_semilla,
                            fecha_siembra: cf.fecha_siembra,
                            fecha_estimada: cf.fecha_estimada,
                            cantidad: cf.cantidad,
                        }
                    },
                    pea: {
                        id_pea: cf.id_pea,
                        nombre: cf.nombre_pea,
                        descripcion: cf.descripcion_pea,
                    }
                }
            }));

            res.status(200).json({ controles });
        } else  {
            res.status(404).json({ message: "No hay controles fitosanitarios registrados"
                
             });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

export const IdControlFitosanitario = async (req, res) => {
    try {
        const {id_control_fitosanitario} = req.params;
        console.log("Buscando los controles fitosanitarios por ID:", id_control_fitosanitario);

        const sql = `SELECT
                    cf.id_control_fitosanitario,
                    cf.fecha_control,
                    cf.descripcion,
                    cf.fk_id_desarrollan,
                    d.id_desarrollan,
                    d.fk_id_cultivo,
                    d.fk_id_pea,
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    p.id_pea,
                    p.nombre AS nombre_pea,
                    p.descripcion AS descripcion_pea,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    tc.id_tipo_cultivo,
                    tc.nombre AS nombre_tipo_cultivo,
                    tc.descripcion AS descripcion_tipo_cultivo,
                    s.id_semillero,
                    s.nombre_semilla,
                    s.fecha_siembra,
                    s.fecha_estimada,
                    s.cantidad
                FROM control_fitosanitario cf
                JOIN desarrollan d ON cf.fk_id_desarrollan = d.id_desarrollan
                JOIN cultivo c ON d.fk_id_cultivo = c.id_cultivo
                JOIN pea p ON d.fk_id_pea = p.id_pea
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo tc ON e.fk_id_tipo_cultivo = tc.id_tipo_cultivo
                JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
                WHERE cf.id_control_fitosanitario = $1`;

        const result = await pool.query(sql, [id_control_fitosanitario]);

        if (result.rows.length > 0) {
            const controles = result.rows.map(cf => ({
                id_control_fitosanitario: cf.id_control_fitosanitario,
                fecha_control: cf.fecha_control,
                descripcion: cf.descripcion,
                fk_id_desarrollan: cf.fk_id_desarrollan,
                desarrollan: {
                    id_desarrollan: cf.id_desarrollan,
                    cultivo: {
                        id_cultivo: cf.id_cultivo,
                        fecha_plantacion: cf.fecha_plantacion,
                        nombre_cultivo: cf.nombre_cultivo,
                        descripcion: cf.descripcion_cultivo,
                        especie: {
                            id_especie: cf.id_especie,
                            nombre_comun: cf.nombre_comun,
                            nombre_cientifico: cf.nombre_cientifico,
                            descripcion: cf.descripcion_especie,
                            tipo_cultivo: {
                                id_tipo_cultivo: cf.id_tipo_cultivo,
                                nombre: cf.nombre_tipo_cultivo,
                                descripcion: cf.descripcion_tipo_cultivo,
                            }
                        },
                        semillero: {
                            id_semillero: cf.id_semillero,
                            nombre_semilla: cf.nombre_semilla,
                            fecha_siembra: cf.fecha_siembra,
                            fecha_estimada: cf.fecha_estimada,
                            cantidad: cf.cantidad,
                        }
                    },
                    pea: {
                        id_pea: cf.id_pea,
                        nombre: cf.nombre_pea,
                        descripcion: cf.descripcion_pea,
                    }
                }
            }));

            res.status(200).json({ controles });
        } else  {
            res.status(404).json({ message: "No se encotro controles fitosanitarios"
                
             });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

export const actualizarControlFitosanitario = async (req, res) => {
    try{
        const {fecha_control, descripcion, fk_id_desarrollan}= req.body;
        const id = req.params.id_control_fitosanitario;
        const sql = "UPDATE control_fitosanitario SET fecha_control = $1, descripcion = $2, fk_id_desarrollan = $3 WHERE id_control_fitosanitario = $4";
        const { rowCount } = await pool.query(sql, [fecha_control, descripcion, fk_id_desarrollan, id]);
        if (rowCount > 0) {
            return res.status(200).json({"message": "Control fitosanitario editado correctamente"});
        }else{
            return res.status(404),json({"message":"No se puedo editar Control fitosanitario"});
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({"message":"error en el servidor"})
    }
}