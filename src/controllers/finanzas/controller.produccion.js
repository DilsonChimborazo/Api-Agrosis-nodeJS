import { configuracionBD } from '../../config/conexion.js';

export const createProduccion = async (req, res) => {
    try {
        const { fk_id_cultivo, cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha } = req.body;
        const sql = 'INSERT INTO produccion (fk_id_cultivo, cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha) VALUES($1, $2, $3, $4, $5, $6, $7)';
        const values = [fk_id_cultivo, cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Producción registrada con éxito' });
        } else {
            res.status(400).json({ msg: 'Error al registrar la producción' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getProducciones = async (req, res) => {
    try {
        const sql = `
        SELECT 
            p.id_produccion,
            c.id_cultivo,
            c.fecha_plantacion,
            c.nombre_cultivo,
            c.descripcion AS descripcion_cultivo,
            c.fk_id_especie,
            c.fk_id_semillero,
            p.cantidad_producida,
            p.fecha_produccion,
            l.id_lote,
            l.dimension,
            l.nombre_lote,
            l.fk_id_ubicacion,
            l.estado,
            p.descripcion_produccion,
            p.estado,
            p.fecha_cosecha,  -- Aquí faltaba una coma
            e.id_especie,
            e.nombre_comun,
            e.nombre_cientifico,
            e.descripcion,
            e.fk_id_tipo_cultivo,
            t.id_tipo_cultivo,
            t.nombre,
            t.descripcion,
            u.id_ubicacion,
            u.latitud,
            u.longitud
        FROM produccion p
        JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN especie e ON c.fk_id_especie = e.id_especie
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
        JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
    `;

        const result = await configuracionBD.query(sql);

        if (result.rows.length > 0) {
            const producciones = result.rows.map(produccion => ({
                id: produccion.id_produccion,
                fk_id_cultivo: {
                    id: produccion.id_cultivo,
                    fecha_plantacion : produccion.fecha_plantacion,
                    nombre_cultivo: produccion.nombre_cultivo,
                    descripcion : produccion.descripcion,
                    fk_id_especie : {
                        id_especie : produccion.id_especie,
                        nombre_comun : produccion.nombre_comun,
                        nombre_cientifico : produccion.nombre_cientifico,
                        descripcion : produccion.descripcion,
                        fk_id_tipo_cultivo : {
                            id_tipo_cultivo : produccion.id_tipo_cultivo,
                            nombre : produccion.nombre,
                            descripcion : produccion.descripcion,
                        }
                    }
                },
                cantidad_producida: produccion.cantidad_producida,
                fecha_produccion: produccion.fecha_produccion,
                fk_id_lote: {
                    id: produccion.id_lote,
                    dimension : produccion.dimension,
                    nombre_lote: produccion.nombre_lote,
                    fk_id_ubicacion : {
                        id_ubicacion : produccion.fk_id_ubicacion,
                        latitud : produccion.latitud,
                        longitud : produccion.longitud
                    },
                    estado : produccion.estado
                },
                descripcion_produccion: produccion.descripcion_produccion,
                estado: produccion.estado,
                fecha_cosecha: produccion.fecha_cosecha
            }));

            res.status(200).json({ producciones });
        } else {
            res.status(404).json({ msg: 'No hay producciones registradas' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


export const getProduccionById = async (req, res) => {
    try {
        const { id_produccion } = req.params;
        const sql = `
        SELECT 
            p.id_produccion,
            c.id_cultivo,
            c.fecha_plantacion,
            c.nombre_cultivo,
            c.descripcion AS descripcion_cultivo,
            c.fk_id_especie,
            c.fk_id_semillero,
            p.cantidad_producida,
            p.fecha_produccion,
            l.id_lote,
            l.dimension,
            l.nombre_lote,
            l.fk_id_ubicacion,
            l.estado,
            p.descripcion_produccion,
            p.estado,
            p.fecha_cosecha,  -- Aquí faltaba una coma
            e.id_especie,
            e.nombre_comun,
            e.nombre_cientifico,
            e.descripcion,
            e.fk_id_tipo_cultivo,
            t.id_tipo_cultivo,
            t.nombre,
            t.descripcion,
            u.id_ubicacion,
            u.latitud,
            u.longitud
        FROM produccion p
        JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
        JOIN lote l ON p.fk_id_lote = l.id_lote
        JOIN especie e ON c.fk_id_especie = e.id_especie
        JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
        JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
        WHERE id_produccion = $1`;
        const result = await configuracionBD.query(sql, [id_produccion]);
        if (result.rows.length > 0) {
            const produccion = result.rows.map(produccion => ({
                id: produccion.id_produccion,
                fk_id_cultivo: {
                    id: produccion.id_cultivo,
                    fecha_plantacion : produccion.fecha_plantacion,
                    nombre_cultivo: produccion.nombre_cultivo,
                    descripcion : produccion.descripcion,
                    fk_id_especie : {
                        id_especie : produccion.id_especie,
                        nombre_comun : produccion.nombre_comun,
                        nombre_cientifico : produccion.nombre_cientifico,
                        descripcion : produccion.descripcion,
                        fk_id_tipo_cultivo : {
                            id_tipo_cultivo : produccion.id_tipo_cultivo,
                            nombre : produccion.nombre,
                            descripcion : produccion.descripcion,
                        }
                    }
                },
                cantidad_producida: produccion.cantidad_producida,
                fecha_produccion: produccion.fecha_produccion,
                fk_id_lote: {
                    id: produccion.id_lote,
                    dimension : produccion.dimension,
                    nombre_lote: produccion.nombre_lote,
                    fk_id_ubicacion : {
                        id_ubicacion : produccion.fk_id_ubicacion,
                        latitud : produccion.latitud,
                        longitud : produccion.longitud
                    },
                    estado : produccion.estado
                },
                descripcion_produccion: produccion.descripcion_produccion,
                estado: produccion.estado,
                fecha_cosecha: produccion.fecha_cosecha
            }));
            res.status(200).json({ produccion });
        } else {
            res.status(404).json({ msg: 'No se encontró la producción' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export const updateProduccion = async (req, res) => {
    try {
        const { id_produccion } = req.params;
        const { fk_id_cultivo, cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha } = req.body;
        const sql = 'UPDATE produccion SET fk_id_cultivo=$1, cantidad_producida=$2, fecha_produccion=$3, fk_id_lote=$4, descripcion_produccion=$5, estado=$6, fecha_cosecha=$7 WHERE id_produccion=$8';
        const values = [fk_id_cultivo, cantidad_producida, fecha_produccion, fk_id_lote, descripcion_produccion, estado, fecha_cosecha, id_produccion];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Producción actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'No se encontró la producción' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

