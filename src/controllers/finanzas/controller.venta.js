import { configuracionBD } from '../../config/conexion.js';

export const createVenta = async (req, res) => {
    try {
        const { fk_id_produccion, cantidad, precio_unitario, fecha_venta } = req.body;
        const sql = 'INSERT INTO venta (fk_id_produccion, cantidad, precio_unitario, fecha_venta) VALUES($1, $2, $3, $4)';
        const values = [fk_id_produccion, cantidad, precio_unitario, fecha_venta];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Venta registrada con éxito' });
        } else {
            res.status(400).json({ msg: 'Error al registrar la venta' });
        }
    } catch {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getVentas = async (req, res) => {
    try {
        const sql = `SELECT
                    v.id_venta,
                    v.fk_id_produccion,
                    v.cantidad,
                    v.precio_unitario,
                    v.total_venta,
                    v.fecha_venta,
                    p.id_produccion, 
                    p.fk_id_cultivo,
                    p.cantidad_producida,
                    p.fecha_produccion,
                    p.fk_id_lote,
                    p.descripcion_produccion,
                    p.estado,
                    p.fecha_cosecha,
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    l.id_lote,
                    l.dimension,
                    l.nombre_lote,
                    l.fk_id_ubicacion,
                    l.estado AS estado_lote,
                    u.id_ubicacion,
                    u.latitud,
                    u.longitud,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    t.id_tipo_cultivo,
                    t.nombre,
                    t.descripcion AS descripcion_tipo_cultivo
                FROM venta v
                JOIN produccion p ON v.fk_id_produccion = p.id_produccion
                JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                JOIN lote l ON p.fk_id_lote = l.id_lote
                JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion`;


        const result = await configuracionBD.query(sql);
        if (result.rows.length > 0) {
            const ventas = result.rows.map(venta => ({
                id_venta: venta.id_venta,
                fk_id_produccion: {
                    id_produccion: venta.id_produccion,
                    fk_id_cultivo: {
                        id_cultivo: venta.id_cultivo,
                        fecha_plantacion : venta.fecha_plantacion,
                        nombre_cultivo: venta.nombre_cultivo,
                        descripcion: venta.descripcion_cultivo,
                        fk_id_especie : {
                            id_especie : venta.id_especie,
                            nombre_comun : venta.nombre_comun,
                            nombre_cientifico : venta.nombre_cientifico,
                            descripcion : venta.descripcion,
                            fk_id_tipo_cultivo : {
                                id_tipo_cultivo : venta.id_tipo_cultivo,
                                nombre : venta.nombre,
                                descripcion : venta.descripcion,
                            },
                        },
                    },
                    cantidad_producida: venta.cantidad_producida,
                    fecha_produccion: venta.fecha_produccion,
                    fk_id_lote : {
                        id_lote : venta.id_lote,
                        dimension : venta.dimension,
                        nombre_lote : venta.nombre_lote,
                        fk_id_ubicacion : {
                            id_ubicacion : venta.id_ubicacion,
                            latitud : venta.latitud,
                            longitud : venta.longitud,
                        }
                    },
                },
                cantidad: venta.cantidad,
                precio_unitario: venta.precio_unitario,
                total_venta: venta.total_venta,
                fecha_venta: venta.fecha_venta
            }));
            res.status(200).json({ ventas });
        } else {
            res.status(404).json({ msg: 'No hay ventas registradas' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getVentaById = async (req, res) => {
    try {
        const { id_venta } = req.params;
        const sql = `SELECT
                    v.id_venta,
                    v.fk_id_produccion,
                    v.cantidad,
                    v.precio_unitario,
                    v.total_venta,
                    v.fecha_venta,
                    p.id_produccion, 
                    p.fk_id_cultivo,
                    p.cantidad_producida,
                    p.fecha_produccion,
                    p.fk_id_lote,
                    p.descripcion_produccion,
                    p.estado,
                    p.fecha_cosecha,
                    c.id_cultivo,
                    c.fecha_plantacion,
                    c.nombre_cultivo,
                    c.descripcion AS descripcion_cultivo,
                    c.fk_id_especie,
                    c.fk_id_semillero,
                    l.id_lote,
                    l.dimension,
                    l.nombre_lote,
                    l.fk_id_ubicacion,
                    l.estado AS estado_lote,
                    u.id_ubicacion,
                    u.latitud,
                    u.longitud,
                    e.id_especie,
                    e.nombre_comun,
                    e.nombre_cientifico,
                    e.descripcion AS descripcion_especie,
                    e.fk_id_tipo_cultivo,
                    t.id_tipo_cultivo,
                    t.nombre,
                    t.descripcion AS descripcion_tipo_cultivo
                FROM venta v
                JOIN produccion p ON v.fk_id_produccion = p.id_produccion
                JOIN cultivo c ON p.fk_id_cultivo = c.id_cultivo
                JOIN especie e ON c.fk_id_especie = e.id_especie
                JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                JOIN lote l ON p.fk_id_lote = l.id_lote
                JOIN ubicacion u ON l.fk_id_ubicacion = u.id_ubicacion
                WHERE v.id_venta = $1`;
        const result = await configuracionBD.query(sql, [id_venta]);
        if (result.rows.length > 0) {
            const ventas = result.rows.map(venta => ({
                id_venta: venta.id_venta,
                fk_id_produccion: {
                    id_produccion: venta.id_produccion,
                    fk_id_cultivo: {
                        id_cultivo: venta.id_cultivo,
                        fecha_plantacion : venta.fecha_plantacion,
                        nombre_cultivo: venta.nombre_cultivo,
                        descripcion: venta.descripcion_cultivo,
                        fk_id_especie : {
                            id_especie : venta.id_especie,
                            nombre_comun : venta.nombre_comun,
                            nombre_cientifico : venta.nombre_cientifico,
                            descripcion : venta.descripcion,
                            fk_id_tipo_cultivo : {
                                id_tipo_cultivo : venta.id_tipo_cultivo,
                                nombre : venta.nombre,
                                descripcion : venta.descripcion,
                            },
                        },
                    },
                    cantidad_producida: venta.cantidad_producida,
                    fecha_produccion: venta.fecha_produccion,
                    fk_id_lote : {
                        id_lote : venta.id_lote,
                        dimension : venta.dimension,
                        nombre_lote : venta.nombre_lote,
                        fk_id_ubicacion : {
                            id_ubicacion : venta.id_ubicacion,
                            latitud : venta.latitud,
                            longitud : venta.longitud,
                        }
                    },
                },
                cantidad: venta.cantidad,
                precio_unitario: venta.precio_unitario,
                total_venta: venta.total_venta,
                fecha_venta: venta.fecha_venta
            }));
            res.status(200).json({ ventas });
        } else {
            res.status(404).json({ msg: 'No se encontró esa venta' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const updateVenta = async (req, res) => {
    try {
        const { id_venta } = req.params;
        const { fk_id_produccion, cantidad, precio_unitario, fecha_venta } = req.body;
        const sql = 'UPDATE venta SET fk_id_produccion=$1, cantidad=$2, precio_unitario=$3, fecha_venta=$4 WHERE id_venta=$5';
        const values = [fk_id_produccion, cantidad, precio_unitario, fecha_venta, id_venta];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Venta actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'No se encontró la venta' });
        }
    } catch {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
