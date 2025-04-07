import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Residuos {
    id_residuo: number;
    nombre: string;
    fecha: Date;
    descripcion: string;
    fk_id_cultivo: Cultivos;
    fk_id_tipo_residuo: TipoResiduos;
}

export interface Cultivos {
    id: number;
    nombre_cultivo: string;
    fecha_plantacion: Date;
    descripcion: string;
    fk_id_especie: Especie;
    fk_id_semillero: Semillero;
}

export interface Semillero {
    id: number;
    nombre_semillero: string;
    fecha_siembra: Date;
    fecha_estimada: Date;
    cantidad: number;
}

export interface TipoCultivo {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Especie {
    id_especie: number;
    nombre_comun: string;
    nombre_cientifico: string;
    descripcion: string;
    fk_id_tipo_cultivo: TipoCultivo;
}

export interface TipoResiduos {
    id_tipo_residuo: number;
    nombre_residuo: string;
    descripcion: string;
}

// ✅ Función que incluye el token en el encabezado
const fetchAsignacion = async (): Promise<Residuos[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error("No hay token disponible. Por favor inicia sesión.");
    }

    try {
        const response = await axios.get(`${apiUrl}residuos/`, {
            headers: {
                Authorization: `Bearer ${token}`, // o `Token ${token}` si usas DRF TokenAuth
            },
        });

        console.log("Respuesta completa de la API:", response.data);
        return response.data.residuos;
    } catch (error) {
        console.error("Error al obtener residuos:", error);
        throw new Error("No se pudo obtener la lista de los residuos");
    }
};

// Hook de React Query
export const useResiduos = () => {
    return useQuery<Residuos[], Error>({
        queryKey: ['Residuos'],
        queryFn: fetchAsignacion,
        gcTime: 1000 * 60 * 10,
    });
};
