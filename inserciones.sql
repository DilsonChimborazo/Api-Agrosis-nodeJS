INSERT INTO rol (nombre_rol, fecha_creacion) VALUES
('Administrador', '2025-01-01'),
('Aprendiz', '2025-01-01');

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios (identificacion, nombre, contrasena, email, fk_id_rol) VALUES
('1004419465', 'Juan Bolaños', crypt('1234567', gen_salt('bf')), 'juan@gmail.com', 2),
('1004268551', 'Dilson Chimborazo', crypt('1234567', gen_salt('bf')), 'dilson@gmail.com', 1),
('1081728782', 'Wilson Samboni', crypt('1234567', gen_salt('bf')), 'wilson@gmail.com', 2);

INSERT INTO ubicacion (latitud, longitud) VALUES
(1.892315, -76.090659),
(1.892367, -76.090538),
(1.892408, -76.090428);

INSERT INTO lote (dimension, nombre_lote, fk_id_ubicacion, estado) VALUES
(100.50, 'Lote Norte', 1, 'Activo'),
(75.25, 'Lote Sur', 2, 'Activo'),
(50.00, 'Lote Este', 3, 'Inactivo');

INSERT INTO eras (descripcion, fk_id_lote) VALUES
('Era principal para cultivo intensivo', 1),
('Era secundaria para rotación', 2),
('Era experimental', 3);

INSERT INTO tipo_cultivo (nombre, descripcion) VALUES
('Hortalizas', 'Cultivos de ciclo corto'),
('Frutales', 'Árboles frutales perennes'),
('Cereales', 'Cultivos de grano');

INSERT INTO especie (nombre_comun, nombre_cientifico, descripcion, fk_id_tipo_cultivo) VALUES
('Tomate', 'Solanum lycopersicum', 'Planta anual de fruto rojo', 1),
('Manzano', 'Malus domestica', 'Árbol frutal de clima templado', 2),
('Maíz', 'Zea mays', 'Cereal de alto rendimiento', 3);

INSERT INTO semilleros (nombre_semilla, fecha_siembra, fecha_estimada, cantidad) VALUES
('Semilla Tomate', '2025-02-01', '2025-03-01', 1000),
('Semilla Maíz', '2025-02-15', '2025-03-15', 500),
('Semilla Manzano', '2025-01-15', '2025-04-15', 200);

INSERT INTO cultivo (fecha_plantacion, nombre_cultivo, descripcion, fk_id_especie, fk_id_semillero) VALUES
('2025-03-01', 'Cultivo Tomate', 'Tomate de mesa', 1, 1),
('2025-03-15', 'Cultivo Maíz', 'Maíz amarillo', 3, 2),
('2025-04-01', 'Cultivo Manzano', 'Manzano rojo', 2, 3);

INSERT INTO plantacion (fk_id_cultivo, fk_id_era) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO produccion (cantidad_producida, nombre_produccion, fecha_produccion, fk_id_lote, fk_id_cultivo, descripcion_produccion, estado, fecha_cosecha) VALUES
(500.00, 'Producción Tomate', '2025-06-01', 1, 1, 'Cosecha de tomate', 'Completado', '2025-05-30'),
(1000.00, 'Producción Maíz', '2025-06-15', 2, 2, 'Cosecha de maíz', 'Completado', '2025-06-10'),
(200.00, 'Producción Manzano', '2025-07-01', 3, 3, 'Cosecha de manzanas', 'Pendiente', NULL);

INSERT INTO venta (fk_id_produccion, cantidad, precio_unitario, total_venta, fecha_venta) VALUES
(1, 400.00, 2.50, 1000.00, '2025-06-05'),
(2, 800.00, 1.20, 960.00, '2025-06-20');

INSERT INTO actividad (nombre_actividad, descripcion) VALUES
('Siembra', 'Plantación de semillas'),
('Riego', 'Aplicación de agua'),
('Cosecha', 'Recolección de frutos');

INSERT INTO asignacion_actividad (fecha, fk_id_actividad, fk_identificacion) VALUES
('2025-03-01', 1, '1004268551'),
('2025-03-15', 2, '1004419465'),
('2025-06-01', 3, '1081728782');

INSERT INTO herramientas (nombre_h, fecha_prestamo, estado) VALUES
('Azada', '2025-03-01', 'Prestado'),
('Regadera', '2025-03-15', 'Disponible'),
('Tijeras de podar', '2025-06-01', 'Prestado');

INSERT INTO requiere (fk_id_herramienta, fk_id_asignacion_actividad) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO insumos (nombre, tipo, precio_unidad, cantidad, unidad_medida) VALUES
('Fertilizante', 'Químico', 10.00, 100.00, 'kg'),
('Semilla Tomate', 'Orgánico', 5.00, 500.00, 'unidades'),
('Pesticida', 'Químico', 15.00, 50.00, 'litros');

INSERT INTO utiliza (fk_id_insumo, fk_id_asignacion_actividad) VALUES
(1, 1),
(2, 1),
(3, 2);

INSERT INTO pea (nombre, descripcion) VALUES
('Plaga A', 'Insecto que afecta hojas'),
('Enfermedad B', 'Hongo en raíces');

INSERT INTO desarrollan (fk_id_cultivo, fk_id_pea) VALUES
(1, 1),
(2, 2);

INSERT INTO control_fitosanitario (fecha_control, descripcion, fk_id_desarrollan) VALUES
('2025-04-01', 'Aplicación de pesticida contra Plaga A', 1),
('2025-04-15', 'Tratamiento antifúngico', 2);

INSERT INTO control_usa_insumo (fk_id_control_fitosanitario, fk_id_insumo, cantidad) VALUES
(1, 3, 10.00),
(2, 3, 5.00);

INSERT INTO calendario_lunar (fecha, descripcion_evento, evento) VALUES
('2025-03-01', 'Luna llena favorable para siembra', 'Luna Llena'),
('2025-03-15', 'Cuarto menguante para poda', 'Cuarto Menguante');

INSERT INTO programacion (estado, fecha_programada, duracion, fk_id_asignacion_actividad, fk_id_calendario_lunar) VALUES
('Pendiente', '2025-03-01', 2, 1, 1),
('Completado', '2025-03-15', 1, 2, 2);

INSERT INTO notificacion (titulo, mensaje, fk_id_programacion) VALUES
('Recordatorio Siembra', 'Programación de siembra para el 1 de marzo', 1),
('Recordatorio Riego', 'Programación de riego completada', 2);

INSERT INTO sensores (nombre_sensor, tipo_sensor, unidad_medida, descripcion, medida_minima, medida_maxima) VALUES
('Sensor Humedad', 'Humedad', 'Porcentaje', 'Mide humedad del suelo', 10.00, 90.00),
('Sensor Temperatura', 'Temperatura', 'Celsius', 'Mide temperatura ambiente', 0.00, 50.00);

INSERT INTO mide (fk_id_sensor, fk_id_era) VALUES
(1, 1),
(2, 2);

INSERT INTO tipo_residuos (nombre_residuo, descripcion) VALUES
('Orgánico', 'Residuos biodegradables de cultivos'),
('Químico', 'Residuos de pesticidas y fertilizantes');

INSERT INTO residuos (nombre, fecha, descripcion, fk_id_tipo_residuo, fk_id_cultivo) VALUES
('Restos Tomate', '2025-06-01', 'Hojas y tallos de tomate', 1, 1),
('Residuos Pesticida', '2025-06-15', 'Envases de pesticida', 2, 2);

INSERT INTO realiza (fk_id_cultivo, fk_id_actividad) VALUES
(1, 1),
(2, 2),
(3, 3);