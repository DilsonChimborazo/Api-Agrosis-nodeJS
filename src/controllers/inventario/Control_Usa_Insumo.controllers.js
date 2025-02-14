import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'control_usa_insumo' psd esto estaba mal :p
export const getControlUsaInsumo = async (req, res) => {
  try {
    const sql = `SELECT 
        control_usa_insumo.id_control_usa_insumo, control_usa_insumo.fk_id_insumo, control_usa_insumo.fk_id_control_fitosanitario, control_usa_insumo.cantidad,
        insumos.id_insumo, insumos.nombre, insumos.tipo, insumos.precio_unidad, insumos.cantidad AS insumo_cantidad, insumos.unidad_medida,
        control_fitosanitario.id_control_fitosanitario, control_fitosanitario.fecha_control, control_fitosanitario.descripcion, control_fitosanitario.fk_id_desarrollan,
        desarrollan.id_desarrollan, desarrollan.fk_id_cultivo, desarrollan.fk_id_pea,
        cultivo.id_cultivo, cultivo.fecha_plantacion, cultivo.nombre_cultivo, cultivo.descripcion AS descripcion_cultivo, cultivo.fk_id_especie, cultivo.fk_id_semillero,
        especie.id_especie, especie.nombre_comun, especie.nombre_cientifico, especie.descripcion AS descripcion_especie, especie.fk_id_tipo_cultivo,
        tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre AS nombre_tipo_cultivo, tipo_cultivo.descripcion AS descripcion_tipo_cultivo,
        semilleros.id_semillero, semilleros.nombre_semilla, semilleros.fecha_siembra, semilleros.fecha_estimada, semilleros.cantidad AS cantidad_semillero,
        pea.id_pea, pea.nombre AS nombre_pea, pea.descripcion AS descripcion_pea
      FROM control_usa_insumo
      JOIN insumos ON control_usa_insumo.fk_id_insumo = insumos.id_insumo
      JOIN control_fitosanitario ON control_usa_insumo.fk_id_control_fitosanitario = control_fitosanitario.id_control_fitosanitario
      JOIN desarrollan ON control_fitosanitario.fk_id_desarrollan = desarrollan.id_desarrollan
      JOIN cultivo ON desarrollan.fk_id_cultivo = cultivo.id_cultivo
      JOIN especie ON cultivo.fk_id_especie = especie.id_especie
      JOIN tipo_cultivo ON especie.fk_id_tipo_cultivo = tipo_cultivo.id_tipo_cultivo
      JOIN semilleros ON cultivo.fk_id_semillero = semilleros.id_semillero
      JOIN pea ON desarrollan.fk_id_pea = pea.id_pea`;

    const result = await configuracionBD.query(sql);
    
    if (result.rows.length > 0) {
      const control_usa_insumo = result.rows.map(control => ({
        id_control_usa_insumo: control.id_control_usa_insumo,
        cantidad: control.cantidad,
        fk_id_insumo: {
          id: control.id_insumo,
          nombre: control.nombre,
          tipo: control.tipo,
          precio_unidad: control.precio_unidad,
          cantidad: control.insumo_cantidad,
          unidad_medida: control.unidad_medida
        },
        fk_id_control_fitosanitario: {
          id: control.id_control_fitosanitario,
          fecha_control: control.fecha_control,
          descripcion: control.descripcion,
          fk_id_desarrollan: {
            id: control.id_desarrollan,
            fk_id_cultivo: {
              id: control.id_cultivo,
              fecha_plantacion: control.fecha_plantacion,
              nombre: control.nombre_cultivo,
              descripcion: control.descripcion_cultivo,
              fk_id_especie: {
                id: control.id_especie,
                nombre_comun: control.nombre_comun,
                nombre_cientifico: control.nombre_cientifico,
                descripcion: control.descripcion_especie,
                fk_id_tipo_cultivo: {
                  id: control.id_tipo_cultivo,
                  nombre: control.nombre_tipo_cultivo,
                  descripcion: control.descripcion_tipo_cultivo
                }
              },
              fk_id_semillero: {
                id: control.id_semillero,
                nombre_semilla: control.nombre_semilla,
                fecha_siembra: control.fecha_siembra,
                fecha_estimada: control.fecha_estimada,
                cantidad: control.cantidad_semillero
              }
            },
            fk_id_pea: {
              id: control.id_pea,
              nombre: control.nombre_pea,
              descripcion: control.descripcion_pea
            }
          }
        }
      }));
      
      res.status(200).json({ control_usa_insumo });
    } else {
      res.status(400).json({ msg: 'No hay un control de uso de insumos registrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};


// Agregar un nuevo registro a 'control_usa_insumo'
export const addControlUsaInsumo = async (req, res) => {
  try {
    const { fk_id_control_fitosanitario, fk_id_insumo, cantidad } = req.body; 
    const [result] = await configuracionBD.query(
      'INSERT INTO control_usa_insumo (fk_id_control_fitosanitario, fk_id_insumo, cantidad) VALUES ($1, $2, $3)',
      [fk_id_control_fitosanitario, fk_id_insumo, cantidad]
    );
    res.status(200).json({ message: 'Registro creado exitosamente'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor'});
  }
};

// Obtener un registro por ID de 'control_usa_insumo'
export const IdControlUsaInsumo = async (req, res) => {
  try {
    const { id_control_usa_insumo } = req.params;
    const sql = `SELECT 
        control_usa_insumo.id_control_usa_insumo, control_usa_insumo.fk_id_insumo, control_usa_insumo.fk_id_control_fitosanitario, control_usa_insumo.cantidad,
        insumos.id_insumo, insumos.nombre, insumos.tipo, insumos.precio_unidad, insumos.cantidad AS insumo_cantidad, insumos.unidad_medida,
        control_fitosanitario.id_control_fitosanitario, control_fitosanitario.fecha_control, control_fitosanitario.descripcion, control_fitosanitario.fk_id_desarrollan,
        desarrollan.id_desarrollan, desarrollan.fk_id_cultivo, desarrollan.fk_id_pea,
        cultivo.id_cultivo, cultivo.fecha_plantacion, cultivo.nombre AS nombre_cultivo, cultivo.descripcion AS descripcion_cultivo, cultivo.fk_id_especie, cultivo.fk_id_semillero,
        especie.id_especie, especie.nombre_comun, especie.nombre_cientifico, especie.descripcion AS descripcion_especie, especie.fk_id_tipo_cultivo,
        tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre AS nombre_tipo_cultivo, tipo_cultivo.descripcion AS descripcion_tipo_cultivo,
        semilleros.id_semillero, semilleros.nombre_semilla, semilleros.fecha_siembra, semilleros.fecha_estimada, semilleros.cantidad AS cantidad_semillero,
        pea.id_pea, pea.nombre AS nombre_pea, pea.descripcion AS descripcion_pea
      FROM control_usa_insumo
      JOIN insumos ON control_usa_insumo.fk_id_insumo = insumos.id_insumo
      JOIN control_fitosanitario ON control_usa_insumo.fk_id_control_fitosanitario = control_fitosanitario.id_control_fitosanitario
      JOIN desarrollan ON control_fitosanitario.fk_id_desarrollan = desarrollan.id_desarrollan
      JOIN cultivo ON desarrollan.fk_id_cultivo = cultivo.id_cultivo
      JOIN especie ON cultivo.fk_id_especie = especie.id_especie
      JOIN tipo_cultivo ON especie.fk_id_tipo_cultivo = tipo_cultivo.id_tipo_cultivo
      JOIN semilleros ON cultivo.fk_id_semillero = semilleros.id_semillero
      JOIN pea ON desarrollan.fk_id_pea = pea.id_pea`;

    const result = await configuracionBD.query(sql,[id_control_usa_insumo]);
    
    if (result.rows.length > 0) {
      const control_usa_insumo = result.rows.map(control => ({
        id_control_usa_insumo: control.id_control_usa_insumo,
        cantidad: control.cantidad,
        fk_id_insumo: {
          id: control.id_insumo,
          nombre: control.nombre,
          tipo: control.tipo,
          precio_unidad: control.precio_unidad,
          cantidad: control.insumo_cantidad,
          unidad_medida: control.unidad_medida
        },
        fk_id_control_fitosanitario: {
          id: control.id_control_fitosanitario,
          fecha_control: control.fecha_control,
          descripcion: control.descripcion,
          fk_id_desarrollan: {
            id: control.id_desarrollan,
            fk_id_cultivo: {
              id: control.id_cultivo,
              fecha_plantacion: control.fecha_plantacion,
              nombre: control.nombre_cultivo,
              descripcion: control.descripcion_cultivo,
              fk_id_especie: {
                id: control.id_especie,
                nombre_comun: control.nombre_comun,
                nombre_cientifico: control.nombre_cientifico,
                descripcion: control.descripcion_especie,
                fk_id_tipo_cultivo: {
                  id: control.id_tipo_cultivo,
                  nombre: control.nombre_tipo_cultivo,
                  descripcion: control.descripcion_tipo_cultivo
                }
              },
              fk_id_semillero: {
                id: control.id_semillero,
                nombre_semilla: control.nombre_semilla,
                fecha_siembra: control.fecha_siembra,
                fecha_estimada: control.fecha_estimada,
                cantidad: control.cantidad_semillero
              }
            },
            fk_id_pea: {
              id: control.id_pea,
              nombre: control.nombre_pea,
              descripcion: control.descripcion_pea
            }
          }
        }
      }));
      
      res.status(200).json({ control_usa_insumo });
    } else {
      res.status(400).json({ msg: 'No hay un control de uso de insumos registrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// Actualizar un registro existente en 'control_usa_insumo'
export const actualizarControlUsaInsumo = async (req, res) => {
  try {
    const { id_control_usa_insumo } = req.params;
    const { fk_id_control_fitosanitario, fk_id_insumo, cantidad} = req.body; 
    const [result] = await configuracionBD.query(
      'UPDATE control_usa_insumo SET fk_id_insumo = $1, fk_id_control_fitosanitario = $2 , cantidad = $3, WHERE id_control_usa_insumo = $4',
      [fk_id_control_fitosanitario, fk_id_insumo, cantidad, id_control_usa_insumo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No se encontró el registro con id:` });
    }
    res.status(200).json({ message: `Registro actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};



export const getTotalInsumosPorControl = async (req, res) => {
  try {
    const sql = `SELECT 
        control_fitosanitario.id_control_fitosanitario, 
        control_fitosanitario.fecha_control, 
        control_fitosanitario.descripcion,
        SUM(control_usa_insumo.cantidad) AS total_insumos_usados
      FROM control_usa_insumo
      JOIN control_fitosanitario ON control_usa_insumo.fk_id_control_fitosanitario = control_fitosanitario.id_control_fitosanitario
      GROUP BY control_fitosanitario.id_control_fitosanitario, control_fitosanitario.fecha_control, control_fitosanitario.descripcion
      ORDER BY total_insumos_usados DESC;`;

    const result = await configuracionBD.query(sql);

    if (result.rows.length > 0) {
      const totalInsumosPorControl = result.rows.map(control => ({
        id_control_fitosanitario: control.id_control_fitosanitario,
        fecha_control: control.fecha_control,
        descripcion: control.descripcion,
        total_insumos_usados: control.total_insumos_usados
      }));

      res.status(200).json({ totalInsumosPorControl });
    } else {
      res.status(400).json({ msg: 'No hay registros de insumos usados en controles fitosanitarios' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
