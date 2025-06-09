CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL,
    fecha_creacion DATE NOT NULL
);

CREATE TABLE usuarios (
    identificacion VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fk_id_rol INTEGER REFERENCES rol(id_rol) NOT NULL
);

CREATE TABLE ubicacion (
    id_ubicacion SERIAL PRIMARY KEY,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL
);

CREATE TABLE lote (
    id_lote SERIAL PRIMARY KEY,
    dimension DECIMAL(10, 2) NOT NULL,
    nombre_lote VARCHAR(50) NOT NULL,
    fk_id_ubicacion INTEGER REFERENCES ubicacion(id_ubicacion) NOT NULL,
    estado VARCHAR(20) NOT NULL
);

CREATE TABLE eras (
    id_era SERIAL PRIMARY KEY,
    descripcion TEXT,
    fk_id_lote INTEGER REFERENCES lote(id_lote) NOT NULL
);

CREATE TABLE tipo_cultivo (
    id_tipo_cultivo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE especie (
    id_especie SERIAL PRIMARY KEY,
    nombre_comun VARCHAR(50) NOT NULL,
    nombre_cientifico VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fk_id_tipo_cultivo INTEGER REFERENCES tipo_cultivo(id_tipo_cultivo) NOT NULL
);

CREATE TABLE semilleros (
    id_semillero SERIAL PRIMARY KEY,
    nombre_semilla VARCHAR(50) NOT NULL,
    fecha_siembra DATE NOT NULL,
    fecha_estimada DATE NOT NULL,
    cantidad INTEGER NOT NULL
);

CREATE TABLE cultivo (
    id_cultivo SERIAL PRIMARY KEY,
    fecha_plantacion DATE NOT NULL,
    nombre_cultivo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fk_id_especie INTEGER REFERENCES especie(id_especie) NOT NULL,
    fk_id_semillero INTEGER REFERENCES semilleros(id_semillero) NOT NULL
);

CREATE TABLE plantacion (
    id_plantacion SERIAL PRIMARY KEY,
    fk_id_cultivo INTEGER REFERENCES cultivo(id_cultivo) NOT NULL,
    fk_id_era INTEGER REFERENCES eras(id_era) NOT NULL
);

CREATE TABLE produccion (
    id_produccion SERIAL PRIMARY KEY,
    cantidad_producida DECIMAL(10, 2) NOT NULL,
    nombre_produccion VARCHAR(50) NOT NULL,
    fecha_produccion DATE NOT NULL,
    fk_id_lote INTEGER REFERENCES lote(id_lote) NOT NULL,
    fk_id_cultivo INTEGER REFERENCES cultivo(id_cultivo) NOT NULL,
    descripcion_produccion TEXT,
    estado VARCHAR(20) NOT NULL,
    fecha_cosecha DATE
);

CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    fk_id_produccion INTEGER REFERENCES produccion(id_produccion) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    total_venta DECIMAL(10, 2) NOT NULL,
    fecha_venta DATE NOT NULL
);

CREATE TABLE actividad (
    id_actividad SERIAL PRIMARY KEY,
    nombre_actividad VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE asignacion_actividad (
    id_asignacion_actividad SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    fk_id_actividad INTEGER REFERENCES actividad(id_actividad) NOT NULL,
    fk_identificacion VARCHAR(20) REFERENCES usuarios(identificacion) NOT NULL
);

CREATE TABLE herramientas (
    id_herramienta SERIAL PRIMARY KEY,
    nombre_h VARCHAR(50) NOT NULL,
    fecha_prestamo DATE NOT NULL,
    estado VARCHAR(20) NOT NULL
);

CREATE TABLE requiere (
    id_requiere SERIAL PRIMARY KEY,
    fk_id_herramienta INTEGER REFERENCES herramientas(id_herramienta) NOT NULL,
    fk_id_asignacion_actividad INTEGER REFERENCES asignacion_actividad(id_asignacion_actividad) NOT NULL
);

CREATE TABLE insumos (
    id_insumo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio_unidad DECIMAL(10, 2) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL
);

CREATE TABLE utiliza (
    id_utiliza SERIAL PRIMARY KEY,
    fk_id_insumo INTEGER REFERENCES insumos(id_insumo) NOT NULL,
    fk_id_asignacion_actividad INTEGER REFERENCES asignacion_actividad(id_asignacion_actividad) NOT NULL
);

CREATE TABLE pea (
    id_pea SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE desarrollan (
    id_desarrollan SERIAL PRIMARY KEY,
    fk_id_cultivo INTEGER REFERENCES cultivo(id_cultivo) NOT NULL,
    fk_id_pea INTEGER REFERENCES pea(id_pea) NOT NULL
);

CREATE TABLE control_fitosanitario (
    id_control_fitosanitario SERIAL PRIMARY KEY,
    fecha_control DATE NOT NULL,
    descripcion TEXT,
    fk_id_desarrollan INTEGER REFERENCES desarrollan(id_desarrollan) NOT NULL
);

CREATE TABLE control_usa_insumo (
    id_control_usa_insumo SERIAL PRIMARY KEY,
    fk_id_control_fitosanitario INTEGER REFERENCES control_fitosanitario(id_control_fitosanitario) NOT NULL,
    fk_id_insumo INTEGER REFERENCES insumos(id_insumo) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL
);

CREATE TABLE calendario_lunar (
    id_calendario_lunar SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion_evento TEXT,
    evento VARCHAR(50) NOT NULL
);

CREATE TABLE programacion (
    id_programacion SERIAL PRIMARY KEY,
    estado VARCHAR(20) NOT NULL,
    fecha_programada DATE NOT NULL,
    duracion INTEGER NOT NULL,
    fk_id_asignacion_actividad INTEGER REFERENCES asignacion_actividad(id_asignacion_actividad) NOT NULL,
    fk_id_calendario_lunar INTEGER REFERENCES calendario_lunar(id_calendario_lunar) NOT NULL
);

CREATE TABLE notificacion (
    id_notificacion SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fk_id_programacion INTEGER REFERENCES programacion(id_programacion) NOT NULL
);

CREATE TABLE sensores (
    id_sensor SERIAL PRIMARY KEY,
    nombre_sensor VARCHAR(50) NOT NULL,
    tipo_sensor VARCHAR(50) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL,
    descripcion TEXT,
    medida_minima DECIMAL(10, 2) NOT NULL,
    medida_maxima DECIMAL(10, 2) NOT NULL
);

CREATE TABLE mide (
    id_mide SERIAL PRIMARY KEY,
    fk_id_sensor INTEGER REFERENCES sensores(id_sensor) NOT NULL,
    fk_id_era INTEGER REFERENCES eras(id_era) NOT NULL
);

CREATE TABLE tipo_residuos (
    id_tipo_residuo SERIAL PRIMARY KEY,
    nombre_residuo VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE residuos (
    id_residuo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT,
    fk_id_tipo_residuo INTEGER REFERENCES tipo_residuos(id_tipo_residuo) NOT NULL,
    fk_id_cultivo INTEGER REFERENCES cultivo(id_cultivo) NOT NULL
);

CREATE TABLE realiza (
    id_realiza SERIAL PRIMARY KEY,
    fk_id_cultivo INTEGER REFERENCES cultivo(id_cultivo) NOT NULL,
    fk_id_actividad INTEGER REFERENCES actividad(id_actividad) NOT NULL
);