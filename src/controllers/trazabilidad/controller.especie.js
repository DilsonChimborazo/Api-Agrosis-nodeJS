import {configuracionBD} from '../../config/conexion.js';



export const createEspecie = async (req, res) => {
    const { nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo } = req.body;
    try {
        const query = `INSERT INTO especies (nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo)
                       VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo];
        const result = await configuracionBD.query(query, values);
        res.status(201).json({ msg: 'Especie registrada con éxito', especie: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar la especie' });
    }
};

export const getEspecie = async (req, res) => {
    try {
        const query = `SELECT e.id_especie, e.nombre_comun, e.nombre_cientifico, e.descripcion, 
                              t.id_tipo_cultivo, t.nombre, t.descripcion
                       FROM especie e
                       JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo`;
        const result = await configuracionBD.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las especies' });
    }
};

export const getEspecieById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT e.id_especie, e.nombre_comun, e.nombre_cientifico, e.descripcion, 
                              t.id_tipo_cultivo, t.nombre, t.descripcion
                       FROM especie e
                       JOIN tipo_cultivo t ON e.fk_id_tipo_cultivo = t.id_tipo_cultivo
                       WHERE e.id_especie = $1`;
        const result = await configuracionBD.query(query, [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ msg: 'Especie no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la especie' });
    }
};

export const updateEspecie = async (req, res) => {
    const { id } = req.params;
    const { nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo } = req.body;
    try {
        const query = `UPDATE especie
                       SET nombre_comun = $1, nombre_cientifico = $2, descripcion = $3, fk_id_tipo_cultivo = $4
                       WHERE id_especie = $5 RETURNING *`;
        const values = [nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo, id];
        const result = await configuracionBD.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json({ msg: 'Especie actualizada con éxito', especie: result.rows[0] });
        } else {
            res.status(404).json({ msg: 'Especie no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la especie' });
    }
};