import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Lote {
    nombre_lote: string; 
}

export interface Eras { 
    id: number;
    descripcion: string;
    fk_id_lote: Lote | null;
}

const fetchEras = async (): Promise<Eras[]> => {
    try {
        const { data } = await axios.get(`${apiUrl}eras/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log("Eras recibidas:", data.eras);
        return data.eras; // ✅ Confirmado que el backend devuelve { eras: [...] }
    } catch (error) {
        console.error("Error al obtener las eras:", error);
        throw new Error("No se pudo obtener la lista de las eras");
    }
};

export const useEras = () => {
    return useQuery<Eras[], Error>({
        queryKey: ['eras'],
        queryFn: fetchEras,
        staleTime: 1000 * 60 * 10,
    });
};
