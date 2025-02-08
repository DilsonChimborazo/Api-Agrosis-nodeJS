import { configuracionBD } from "../../config/conexion.js";

// Obtener todos los registros de 'control_usa_insumo' psd esto estaba mal :p
export const getControlUsaInsumo = async (req, res) =>{
  try{
    const sql = `SELECT control_usa_insumo.fk_id_insumo, control_usa_insumo.fk_id_control_fitosanitario, control_usa_insumo.cantidad,
    insumos.id_insumo, insumos.nombre, insumos.tipo, insumos.precio_unidad, insumos.cantidad, insumos.unidad_medida,
    control_fitosanitario.id_control_fitosanitario, control_fitosanitario.fecha_control, control_fitosanitario.descripcion, control_fitosanitario.fk_id_desarrollan,
    desarrollan.id_desarrollan, desarrollan.fk_id_cultivo, desarrollan.fk_id_pea,
    cultivo.id_cultivo, cultivo.fecha_plantacion, cultivo.nombre_cultivo, cultivo.descripcion, cultivo.fk_id_especie, cultivo.fk_id_semillero,
    especie.id_especie, especie.nombre_comun, especie.nombre_cientifico, especie.descripcion, especie.fk_id_tipo_cultivo,
    tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre, tipo_cultivo.descripcion,
    semilleros.id_semilleros, semilleros.nombre_semilla, semilleros.fecha_siembra, semilleros.fecha_estimada, semilleros.cantidad,
    pea.id_pea, pea.nombre, pea.descripcion
    FROM control_usa_insumo
    JOIN insumos ON control_usa_insumo.fk_id_insumo = insumos.id_insumo
    JOIN control_fitosanitario ON control_usa_insumo.fk_id_control_fitosanitario = control_fitosanitario.id_control_fitosanitario
    JOIN desarrollan ON control_fitosanitario.fk_id_desarrollan = desarrollan.id_desarrollan
    JOIN cultivo ON desarrollan.fk_id_cultivo = cultivo.id_cultivo
    JOIN especie ON cultivo.fk_id_especie = especie.id_especie
    JOIN tipo_cultivo ON especie.fk_id_tipo_cultivo = tipo_cultivo.id_tipo_cultivo
    JOIN semilleros ON cultivo.fk_id_semillero = semilleros.id_semilleros
    JOIN pea ON desarrollan.fk_id_pea = pea.id_pea`;

    const result = await configuracionBD.query(sql);
    if(result.rows.length > 0){
      const control_usa_insumo = result.rowCount.map(control_usa_insumo => ({
        id: control_usa_insumo.id_control_usa_insumo,
        cantidad: control_usa_insumo.cantidad,
        fk_id_insumo:{
          id: control_usa_insumo.id_insumo,
          nombre: control_usa_insumo.nombre,
          tipo: control_usa_insumo.tipo,
          precio_unidad: control_usa_insumo.precio_unidad,
          cantidad: control_usa_insumo.cantidad,
          unidad_medida: control_usa_insumo.unidad_medida
        },
        fk_id_control_fitosanitario:{
          id: control_usa_insumo.id_control_fitosanitario,
          fecha_control: control_usa_insumo.fecha_control,
          descripcion: control_usa_insumo.descripcion,
          fk_id_desarrollan:{
            id: control_usa_insumo.id_desarrollan,
            fk_id_cultivo:{
              id: cultivo.id_cultivo,
              fecha_plantacion: control_usa_insumo.fecha_plantacion,
              nombre: control_usa_insumo.nombre,
              descripcion: control_usa_insumo.descripcion,
              fk_id_especie:{
                id: control_usa_insumo.id_especie,
                nombre_comun: control_usa_insumo.nombre_comun,
                nombre_cientifico: control_usa_insumo.nombre_cientifico,
                descripcion: control_usa_insumo.descripcion,
                fk_id_tipo_cultivo:{
                  id: control_usa_insumo.id_tipo_cultivo,
                  nombre: control_usa_insumo.nombre,
                  descripcion: control_usa_insumo.descripcion
                },
              },
              fk_id_semillero:{
                id: control_usa_insumo.id_semillero,
                nombre_semilla: control_usa_insumo.nombre_semilla,
                fecha_siembra: control_usa_insumo.fecha_siembra,
                fecha_estimada: control_usa_insumo.fecha_estimada,
                cantidad: control_usa_insumo.cantidad
              },
            },
            fk_id_pea:{
              id: control_usa_insumo.id_pea,
              nombre: control_usa_insumo.nombre,
              descripcion: control_usa_insumo.descripcion
            },
          },
        },
      }));
      res.status(200).json({control_usa_insumo})
    }else{
      res.status(400).json({msg:'No hay un control de uso de insumos registrado'})
    }
  } catch(error){
    console.log(error)
    res.status(500).json({msg:'Error en el servidor'})
  }
};
 

// Agregar un nuevo registro a 'control_usa_insumo'
export const addControlUsaInsumo = async (req, res) => {
  try {
    const { id_control, id_insumo, cantidad, fecha_uso } = req.body; 
    const [result] = await configuracionBD.query(
      'INSERT INTO control_usa_insumo (id_control, id_insumo, cantidad, fecha_uso) VALUES ($1, $2, $3, $4)',
      [id_control, id_insumo, cantidad, fecha_uso]
    );
    res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

// Obtener un registro por ID de 'control_usa_insumo'
export const IdControlUsaInsumo = async (req, res) => {
  try {
    const { id_control_usa_insumo } = req.params;
    const sql =  `SELECT control_usa_insumo.fk_id_insumo, control_usa_insumo.fk_id_control_fitosanitario, control_usa_insumo.cantidad,
    insumos.id_insumo, insumos.nombre, insumos.tipo, insumos.precio_unidad, insumos.cantidad, insumos.unidad_medida,
    control_fitosanitario.id_control_fitosanitario, control_fitosanitario.fecha_control, control_fitosanitario.descripcion, control_fitosanitario.fk_id_desarrollan,
    desarrollan.id_desarrollan, desarrollan.fk_id_cultivo, desarrollan.fk_id_pea,
    cultivo.id_cultivo, cultivo.fecha_plantacion, cultivo.nombre_cultivo, cultivo.descripcion, cultivo.fk_id_especie, cultivo.fk_id_semillero,
    especie.id_especie, especie.nombre_comun, especie.nombre_cientifico, especie.descripcion, especie.fk_id_tipo_cultivo,
    tipo_cultivo.id_tipo_cultivo, tipo_cultivo.nombre, tipo_cultivo.descripcion,
    semilleros.id_semilleros, semilleros.nombre_semilla, semilleros.fecha_siembra, semilleros.fecha_estimada, semilleros.cantidad,
    pea.id_pea, pea.nombre, pea.descripcion
    FROM control_usa_insumo
    JOIN insumos ON control_usa_insumo.fk_id_insumo = insumos.id_insumo
    JOIN control_fitosanitario ON control_usa_insumo.fk_id_control_fitosanitario = control_fitosanitario.id_control_fitosanitario
    JOIN desarrollan ON control_fitosanitario.fk_id_desarrollan = desarrollan.id_desarrollan
    JOIN cultivo ON desarrollan.fk_id_cultivo = cultivo.id_cultivo
    JOIN especie ON cultivo.fk_id_especie = especie.id_especie
    JOIN tipo_cultivo ON especie.fk_id_tipo_cultivo = tipo_cultivo.id_tipo_cultivo
    JOIN semilleros ON cultivo.fk_id_semillero = semilleros.id_semilleros
    JOIN pea ON desarrollan.fk_id_pea = pea.id_pea
    WHERE control_fitosanitario.id_control_fitosanitario = $1`;
    const result = await configuracionBD.query(sql, [id_control_usa_insumo]);
    if(result.rows.length > 0){
      const control_usa_insumo = result.rowCount.map(control_usa_insumo => ({
        id: control_usa_insumo.id_control_usa_insumo,
        cantidad: control_usa_insumo.cantidad,
        fk_id_insumo:{
          id: control_usa_insumo.id_insumo,
          nombre: control_usa_insumo.nombre,
          tipo: control_usa_insumo.tipo,
          precio_unidad: control_usa_insumo.precio_unidad,
          cantidad: control_usa_insumo.cantidad,
          unidad_medida: control_usa_insumo.unidad_medida
        },
        fk_id_control_fitosanitario:{
          id: control_usa_insumo.id_control_fitosanitario,
          fecha_control: control_usa_insumo.fecha_control,
          descripcion: control_usa_insumo.descripcion,
          fk_id_desarrollan:{
            id: control_usa_insumo.id_desarrollan,
            fk_id_cultivo:{
              id: cultivo.id_cultivo,
              fecha_plantacion: control_usa_insumo.fecha_plantacion,
              nombre: control_usa_insumo.nombre,
              descripcion: control_usa_insumo.descripcion,
              fk_id_especie:{
                id: control_usa_insumo.id_especie,
                nombre_comun: control_usa_insumo.nombre_comun,
                nombre_cientifico: control_usa_insumo.nombre_cientifico,
                descripcion: control_usa_insumo.descripcion,
                fk_id_tipo_cultivo:{
                  id: control_usa_insumo.id_tipo_cultivo,
                  nombre: control_usa_insumo.nombre,
                  descripcion: control_usa_insumo.descripcion
                },
              },
              fk_id_semillero:{
                id: control_usa_insumo.id_semillero,
                nombre_semilla: control_usa_insumo.nombre_semilla,
                fecha_siembra: control_usa_insumo.fecha_siembra,
                fecha_estimada: control_usa_insumo.fecha_estimada,
                cantidad: control_usa_insumo.cantidad
              },
            },
            fk_id_pea:{
              id: control_usa_insumo.id_pea,
              nombre: control_usa_insumo.nombre,
              descripcion: control_usa_insumo.descripcion
            },
          },
        },
      }));
      res.status(200).json({control_usa_insumo})
    }else{
      res.status(400).json({msg:'No hay un control de uso de insumos registrado'})
    }
  } catch(error){
    console.log(error)
    res.status(500).json({msg:'Error en el servidor'})
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
      return res.status(404).json({ message: `No se encontró el registro con id: ${result}` });
    }
    res.status(200).json({ message: `Registro con id: ${result} actualizado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};
