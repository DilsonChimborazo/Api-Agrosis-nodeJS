INSERT INTO rol (nombre_rol, fecha_creacion) VALUES
('Administrador', '2025-06-14'),
('Aprendiz', '2025-06-14');

INSERT INTO ubicacion (latitud, longitud) VALUES
(1.892258, -76.090629),
(1.892317, -76.090518);

INSERT INTO lote (dimension, nombre_lote, fk_id_ubicacion, estado) VALUES
(100.50, 'Lote Norte', 1, 'Activo'),
(200.75, 'Lote Sur', 2, 'Activo');

INSERT INTO eras (descripcion, fk_id_lote) VALUES
('Era para cultivo de maíz', 1),
('Era para cultivo de tomate', 2);

INSERT INTO tipo_cultivo (nombre, descripcion) VALUES
('Cereal', 'Cultivos de granos como maíz o trigo'),
('Hortaliza', 'Cultivos de vegetales como tomate o lechuga');

INSERT INTO especie (nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo) VALUES
('Maíz', 'Zea mays', 'Planta de grano ampliamente cultivada', 1),
('Tomate', 'Solanum lycopersicum', 'Planta de fruto comestible', 2);

INSERT INTO semilleros (nombre_semilla, fecha_siembra, fecha_estimada, cantidad) VALUES
('Semilla de Maíz', '2025-06-01', '2025-09-01', 1000),
('Semilla de Tomate', '2025-06-01', '2025-08-15', 500);

INSERT INTO cultivo (fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero) VALUES
('2025-06-10', 'Cultivo de Maíz', 'Cultivo de maíz en lote norte', 1, 1),
('2025-06-12', 'Cultivo de Tomate', 'Cultivo de tomate en lote sur', 2, 2);

INSERT INTO plantacion (fk_id_cultivo, fk_id_era) VALUES
(1, 1),
(2, 2);

INSERT INTO produccion (cantidad_producida, nombre_produccion, fecha_produccion, fk_id_lote, fk_id_cultivo, descripcion_produccion, estado, fecha_cosecha) VALUES
(500.25, 'Producción Maíz', '2025-09-01', 1, 1, 'Cosecha de maíz', 'Completada', '2025-09-01'),
(300.50, 'Producción Tomate', '2025-08-15', 2, 2, 'Cosecha de tomate', 'Completada', '2025-08-15');

INSERT INTO venta (fk_id_produccion, cantidad, precio_unitario, total_venta, fecha_venta) VALUES
(1, 200.00, 2.50, 500.00, '2025-09-02'),
(2, 150.00, 3.00, 450.00, '2025-08-16');

INSERT INTO actividad (nombre_actividad, descripcion) VALUES
('Siembra', 'Actividad de siembra de cultivos'),
('Riego', 'Actividad de riego de cultivos');

INSERT INTO asignacion_actividad (fecha, fk_id_actividad, fk_identificacion) VALUES
('2025-06-10', 1, '1004268551'),
('2025-06-12', 2, '1004268551');

INSERT INTO herramientas (nombre_h, fecha_prestamo, estado) VALUES
('Pala', '2025-06-10', 'En uso'),
('Asadon', '2025-06-12', 'En uso');

INSERT INTO requiere (fk_id_herramienta, fk_id_asignacion_actividad) VALUES
(1, 1),
(2, 2);

INSERT INTO insumos (nombre, tipo, precio_unidad, cantidad, unidad_medida) VALUES
('Fertilizante', 'Químico', 10.00, 50.00, 'Kilogramos'),
('Semillas de Maíz', 'Orgánico', 5.00, 100.00, 'Unidades');

INSERT INTO utiliza (fk_id_insumo, fk_id_asignacion_actividad) VALUES
(1, 1),
(2, 2);

INSERT INTO pea (nombre, descripcion) VALUES
('Plaga A', 'Plaga que afecta maíz'),
('Plaga B', 'Plaga que afecta tomate');

INSERT INTO desarrollan (fk_id_cultivo, fk_id_pea) VALUES
(1, 1),
(2, 2);

INSERT INTO control_fitosanitario (fecha_control, descripcion, fk_id_desarrollan) VALUES
('2025-06-15', 'Aplicación de pesticida para maíz', 1),
('2025-06-16', 'Aplicación de pesticida para tomate', 2);

INSERT INTO control_usa_insumo (fk_id_control_fitosanitario, fk_id_insumo, cantidad) VALUES
(1, 1, 10.00),
(2, 1, 5.00);

INSERT INTO calendario_lunar (fecha, descripcion_evento, evento) VALUES
('2025-06-14', 'Luna llena favorable para siembra', 'Luna Llena'),
('2025-06-15', 'Cuarto creciente para riego', 'Cuarto Creciente');

INSERT INTO programacion (estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar) VALUES
('Pendiente', '2025-06-14', 2, 1, 1),
('Completada', '2025-06-15', 1, 2, 2);

INSERT INTO notificacion (titulo, mensaje, fk_id_programacion) VALUES
('Recordatorio Siembra', 'Recordatorio para actividad de siembra', 1),
('Recordatorio Riego', 'Recordatorio para actividad de riego', 2);

INSERT INTO sensores (nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima) VALUES
('Sensor Humedad', 'Humedad', 'Porcentaje', 'Mide humedad del suelo', 0.00, 100.00),
('Sensor Temperatura', 'Temperatura', 'Celsius', 'Mide temperatura ambiental', -10.00, 50.00);

INSERT INTO mide (fk_id_sensor, fk_id_era) VALUES
(1, 1),
(2, 2);

INSERT INTO tipo_residuos (nombre_residuo, descripcion) VALUES
('Orgánico', 'Residuos de origen vegetal'),
('Químico', 'Residuos de fertilizantes o pesticidas');

INSERT INTO residuos (nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo) VALUES
('Residuo Maíz', '2025-09-01', 'Residuos de cosecha de maíz', 1, 1),
('Residuo Tomate', '2025-08-15', 'Residuos de cosecha de tomate', 1, 2);

INSERT INTO realiza (fk_id_cultivo, fk_id_actividad) VALUES
(1, 1),
(2, 2);