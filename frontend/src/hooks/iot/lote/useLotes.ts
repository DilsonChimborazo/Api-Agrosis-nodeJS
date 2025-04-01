import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Ubicacion{
    id_ubicacion: number;
    latitud: number;
    longitud: number;
}

export interface Lotes {
    id_lote: number;
    dimension: string;
    nombre_lote: string;
    fk_id_ubicacion: Ubicacion;
    estado: string;
}

const fetchLotes = async (): Promise<Lotes[]> => {
    try {
        const { data } = await axios.get(`${apiUrl}lotes/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log("aver si sale el lote", data.lote);
        return data.lote;
    } catch (error) {
        console.error("Error al obtener los lotes:", error);
        throw new Error("No se pudo obtener la lista de lotes");
    }
};

export const useLotes = () => {
    return useQuery<Lotes[], Error>({
        queryKey: ['lotes'],
        queryFn: fetchLotes,
        staleTime: 1000 * 60 * 10,
    });
};
