import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Ajustar la interfaz Era para incluir los campos de Lote anidados
interface Lote {
    id: number;
    nombre_lote: string;
    dimencion: string;
    estado: boolean;
}

interface Era {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
    fk_id_lote: number | null;
    latitud: number | null;
    longitud: number | null;
    lote?: Lote; // Campo relacionado de Lote (opcional, dependiendo de la serialización)
}

interface MapaProps {
    nuevaEra?: Era;
}

const MapUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 15);
    }, [center, map]);
    return null;
};

const Mapa: React.FC<MapaProps> = ({ nuevaEra }) => {
    const [eras, setEras] = useState<Era[]>([]);
    const [selectedEra, setSelectedEra] = useState<Era | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [mapCenter, setMapCenter] = useState<LatLngExpression>([1.8667, -76.0145]);

    // Cargar eras desde la API al montar el componente
    useEffect(() => {
        axios
            .get<Era[]>("http://127.0.0.1:8000/api/eras")
            .then((response) => {
                setEras(response.data);
            })
            .catch((error) => {
                console.error("Error cargando eras:", error);
            });
    }, []);

    // Manejar la nueva era recibida desde CrearEras
    useEffect(() => {
        if (nuevaEra) {
            setEras((prevEras) => {
                if (!prevEras.some(era => era.id === nuevaEra.id)) {
                    return [...prevEras, nuevaEra];
                }
                return prevEras;
            });
            setSelectedEra(nuevaEra);
            setMapCenter([nuevaEra.latitud || 1.8667, nuevaEra.longitud || -76.0145]); // Usar valores por defecto si son null
            setShowModal(true);
        }
    }, [nuevaEra]);

    const handleMarkerClick = (era: Era) => {
        setSelectedEra(era);
        setShowModal(true);
        setMapCenter([era.latitud || 1.8667, era.longitud || -76.0145]); // Usar valores por defecto si son null
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEra(null);
    };

    return (
        <div className="pt-10" style={{ height: "850px", width: "100%", position: "relative" }}>
            <MapContainer
                center={mapCenter}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {eras.map((era) => (
                    era.latitud && era.longitud && ( // Solo renderizar marcadores si hay coordenadas
                        <Marker
                            key={era.id}
                            position={[era.latitud, era.longitud]}
                            eventHandlers={{
                                click: () => handleMarkerClick(era),
                            }}
                        />
                    )
                ))}

                <MapUpdater center={mapCenter} />
            </MapContainer>

            {showModal && selectedEra && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "10%", // Ajustado para dejar más espacio en la parte superior
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "white",
                            padding: "40px", // Aumentado para más espacio interno
                            boxShadow: "0 0 15px rgba(0,0,0,0.5)", // Sombra más pronunciada
                            zIndex: 1000,
                            maxWidth: "800px", // Aumentado a 800px para un modal más ancho
                            minWidth: "600px", // Mínimo ancho para asegurar visibilidad
                            borderRadius: "12px", // Borde más redondeado
                            overflowY: "auto", // Permitir desplazamiento si el contenido es largo
                            maxHeight: "80vh", // Limitar altura al 80% de la ventana
                        }}
                    >
                        <button
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: 15,
                                right: 15,
                                background: "transparent",
                                border: "none",
                                fontSize: "1.5rem", // Botón de cerrar más grande
                                cursor: "pointer",
                                color: "#666",
                            }}
                            aria-label="Cerrar modal"
                        >
                            ×
                        </button>

                        <h3 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>{selectedEra.nombre}</h3>
                        <p><strong>Descripción:</strong> {selectedEra.descripcion}</p>
                        <p><strong>Lote:</strong> {selectedEra.fk_id_lote?.nombre_lote || 'Sin Lote'}</p>
                        <p><strong>Estado Era:</strong> {selectedEra.estado ? "Activo" : "Inactivo"}</p>
                        <p><strong>Latitud:</strong> {selectedEra.latitud || 'No definida'}</p>
                        <p><strong>Longitud:</strong> {selectedEra.longitud || 'No definida'}</p>
                    </div>

                    <div
                        onClick={closeModal}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.5)", // Opacidad ligeramente mayor
                            zIndex: 999,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default Mapa;