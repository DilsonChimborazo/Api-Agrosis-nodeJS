import { configuracionBD } from '../../config/conexion.js';

export const createSemilleros = async (req, res) => {
    try {
        const { nombre_semilla, fecha_siembra, fecha_estimada, cantidad } = req.body;
        const sql = 'INSERT INTO semilleros (nombre_semilla, fecha_siembra, fecha_estimada, cantidad) VALUES($1, $2, $3, $4)';
        const values = [nombre_semilla, fecha_siembra, fecha_estimada, cantidad];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Semillero registrado con éxito' });
        } else {
            res.status(400).json({ msg: 'Error al registrar semillero' });
        }
    } catch {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const getSemilleros = async (req, res) => {
    try {
        const sql = `SELECT * from  semilleros`;
        const result = await configuracionBD.query(sql)
        if(result.rows.length >0){
            res.status(200).json(result);
        } else {
            res.status(404).json({ msg: 'No hay semilleros registrados' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export const getSemillerosById = async (req, res) => {
    try {
        const { id_semillero } = req.params;
        const sql = `SELECT * FROM semilleros WHERE id_semillero = $1`;
        const result = await configuracionBD.query(sql, [id_semillero]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Devuelve solo el registro encontrado
        } else {
            res.status(404).json({ msg: 'Semillero no encontrado' });
        }
    } catch (err) {
        console.log('Error al obtener semillero por ID:', err);
        res.status(500).json({ msg: 'Error en el servidor', error: err.message });
    }
}

export const updateSemilleros = async (req, res) => {
    try {
        const { id_semillero } = req.params;
        const { nombre_semilla, fecha_siembra, fecha_estimada, cantidad } = req.body;
        const sql = 'UPDATE semilleros SET nombre_semilla=$1, fecha_siembra=$2, fecha_estimada=$3, cantidad=$4 WHERE id_semillero=$5';
        const values = [nombre_semilla, fecha_siembra, fecha_estimada, cantidad, id_semillero];
        const result = await configuracionBD.query(sql, values);
        if (result.rowCount > 0) {
            res.status(200).json({ msg: 'Semillero actualizado con éxito' });
        } else {
            res.status(404).json({ msg: 'No se encontró el semillero' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}
