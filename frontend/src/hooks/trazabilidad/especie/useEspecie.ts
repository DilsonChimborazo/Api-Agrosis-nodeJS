import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Especie {
  id_especie: number;
  nombre_comun: string;
  nombre_cientifico: string;
  descripcion: string;
  fk_id_tipo_cultivo: TipoCultivo | null ;
}

interface TipoCultivo {
  id_tipo_cultivo: number,
  nombre: string;
  descripcion: string;
}

const fetchEspecie = async (): Promise<Especie[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token de autenticación no encontrado");
    const { data } = await axios.get(`${apiUrl}especie/`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error al obtener las especies:", error);
    const errorMessage = error.response?.data?.message || "No se pudo obtener la lista de especies";
    throw new Error(errorMessage);
  }
};

export const useEspecie = () => {
  return useQuery<Especie[], Error>({
    queryKey: ['especies'],
    queryFn: fetchEspecie,
    staleTime: 1000 * 60 * 5,
  });
};
