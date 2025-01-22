import { configuracionBD } from '../../config/conexion.js';

export const createGenera = async (req, res) => {
    try {
        const { fk_id_cultivo, fk_id_produccion } = req.body;

        if (!fk_id_cultivo || !fk_id_produccion) {
            return res.status(400).json({ msg: 'Datos incompletos' });
        }

        const sql = 'INSERT INTO genera (fk_id_cultivo, fk_id_produccion) VALUES($1, $2)';
        const values = [fk_id_cultivo, fk_id_produccion];
        const result = await configuracionBD.query(sql, values);

        res.status(200).json({ msg: 'Registro de genera exitoso' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getGeneras = async (req, res) => {
    try {
        const sql = `
        SELECT 
            g.id_genera,
            c.id_cultivo,
            c.fecha_plantacion,
            c.nombre_cultivo,
            c.descripcion AS descripcion_cultivo,
            c.fk_id_especie,
            c.fk_id_semillero,
            p.id_produccion,
            p.cantidad_producida,
            p.fecha_produccion,
            p.fk_id_lote,
            p.descripcion_produccion,
            p.estado,
            p.fecha_cosecha,
            e.id_especie,
            e.nombre_comun,
            e.nombre_cientifico,
            e.descripcion,
            e.fk_id_tipo_cultivo,
            t.id_tipo_cultivo,
            t.nombre,
            t.descripcion,
            s.id_semillero,
            s.nombre_semilla,
            s.fecha_siembra,
            s.fecha_estimada,
            s.cantidad,
            l.id_lote,
            l.dimension,
            l.nombre_lote,
            l.fk_id_ubicacion,
            l.estado,
            u.id_ubicacion,
            u.latitud,
            u.longitud
        FROM genera g
        JOIN cultivo c ON g.fk_id_cultivo = c.id_cultivo
        JOIN produccion p ON g.fk_id_produccion = p.id_produccion
        JOIN especie e ON c.fk_id_especie = e.id_especie
        JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
        JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion`;
         
        
        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            const generas = result.rows.map(genera => ({
                id_genera: genera.id_genera,
                fk_id_cultivo: {
                    id_cultivo: genera.id_cultivo,
                    fecha_plantacion : genera.fecha_plantacion,
                    nombre_cultivo: genera.nombre_cultivo,
                    descripcion: genera.descripcion_cultivo,
                    fk_id_especie : {
                        id_especie : genera.id_especie,
                        nombre_comun : genera.nombre_comun,
                        nombre_cientifico : genera.nombre_cientifico,
                        descripcion : genera.descripcion,
                        fk_id_tipo_cultivo : {
                            id_tipo_cultivo : genera.id_tipo_cultivo,
                            nombre : genera.nombre,
                            descripcion : genera.descripcion,
                        },
                    },
                    fk_id_semillero :{
                        id_semillero : genera.id_semillero,
                        nombre_semilla : genera.nombre_semilla,
                        fecha_siembra : genera.fecha_siembra,
                        fecha_estimada : genera.fecha_estimada,
                        cantidad : genera.cantidad,
                    },
                },
                fk_id_produccion: {
                    id_produccion: genera.id_produccion,
                    cantidad_producida: genera.cantidad_producida,
                    fecha_produccion: genera.fecha_produccion,
                    fk_id_lote : {
                        id_lote : genera.id_lote,
                        dimension : genera.dimension,
                        nombre_lote : genera.nombre_lote,
                        fk_id_ubicacion : {
                            id_ubicacion : genera.id_ubicacion,
                            latitud : genera.latitud,
                            longitud : genera.longitud,
                        }
                    },
                    descripcion_produccion : genera.descripcion_produccion,
                    estado : genera.estado,
                    fecha_cosecha : genera.fecha_cosecha,

                },
            }));
            res.status(200).json({ generas });
        } else {
            res.status(404).json({ msg: 'No hay registros de genera' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getGeneraById = async (req, res) => {
    try {
        const { id_genera } = req.params;
        const sql = `
        SELECT 
            g.id_genera,
            c.id_cultivo,
            c.fecha_plantacion,
            c.nombre_cultivo,
            c.descripcion AS descripcion_cultivo,
            c.fk_id_especie,
            c.fk_id_semillero,
            p.id_produccion,
            p.cantidad_producida,
            p.fecha_produccion,
            p.fk_id_lote,
            p.descripcion_produccion,
            p.estado,
            p.fecha_cosecha,
            e.id_especie,
            e.nombre_comun,
            e.nombre_cientifico,
            e.descripcion,
            e.fk_id_tipo_cultivo,
            t.id_tipo_cultivo,
            t.nombre,
            t.descripcion,
            s.id_semillero,
            s.nombre_semilla,
            s.fecha_siembra,
            s.fecha_estimada,
            s.cantidad,
            l.id_lote,
            l.dimension,
            l.nombre_lote,
            l.fk_id_ubicacion,
            l.estado,
            u.id_ubicacion,
            u.latitud,
            u.longitud
        FROM genera g
        JOIN cultivo c ON g.fk_id_cultivo = c.id_cultivo
        JOIN produccion p ON g.fk_id_produccion = p.id_produccion
        JOIN especie e ON c.fk_id_especie = e.id_especie
        JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
        JOIN semilleros s ON c.fk_id_semillero = s.id_semillero
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
        WHERE g.id_genera = $1`;
        const result = await configuracionBD.query(sql, [id_genera]);
        if (result.rows.length > 0) {
            const genera = result.rows.map(genera => ({
                id_genera: genera.id_genera,
                fk_id_cultivo: {
                    id_cultivo: genera.id_cultivo,
                    fecha_plantacion : genera.fecha_plantacion,
                    nombre_cultivo: genera.nombre_cultivo,
                    descripcion: genera.descripcion_cultivo,
                    fk_id_especie : {
                        id_especie : genera.id_especie,
                        nombre_comun : genera.nombre_comun,
                        nombre_cientifico : genera.nombre_cientifico,
                        descripcion : genera.descripcion,
                        fk_id_tipo_cultivo : {
                            id_tipo_cultivo : genera.id_tipo_cultivo,
                            nombre : genera.nombre,
                            descripcion : genera.descripcion,
                        },
                    },
                    fk_id_semillero :{
                        id_semillero : genera.id_semillero,
                        nombre_semilla : genera.nombre_semilla,
                        fecha_siembra : genera.fecha_siembra,
                        fecha_estimada : genera.fecha_estimada,
                        cantidad : genera.cantidad,
                    },
                },
                fk_id_produccion: {
                    id_produccion: genera.id_produccion,
                    cantidad_producida: genera.cantidad_producida,
                    fecha_produccion: genera.fecha_produccion,
                    fk_id_lote : {
                        id_lote : genera.id_lote,
                        dimension : genera.dimension,
                        nombre_lote : genera.nombre_lote,
                        fk_id_ubicacion : {
                            id_ubicacion : genera.id_ubicacion,
                            latitud : genera.latitud,
                            longitud : genera.longitud,
                        }
                    },
                    descripcion_produccion : genera.descripcion_produccion,
                    estado : genera.estado,
                    fecha_cosecha : genera.fecha_cosecha,

                },
            }));
            res.status(200).json({ genera });
        } else {
            res.status(404).json({ msg: 'No se encontró ese registro de genera' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const updateGenera = async (req, res) => {
    try {
        const { id_genera } = req.params;
        const { fk_id_cultivo, fk_id_produccion } = req.body;
        const sql = 'UPDATE genera SET fk_id_cultivo=$1, fk_id_produccion=$2 WHERE id_genera=$3';
        const values = [fk_id_cultivo, fk_id_produccion, id_genera];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Genera actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'No se encontró el registro de genera' });
        }
    } catch {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};