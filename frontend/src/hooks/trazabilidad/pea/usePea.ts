import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Pea {
  id_pea: number;
  nombre: string;
  descripcion: string;
}

const fetchPeas = async (): Promise<Pea[]> => {
  try {
    const { data } = await axios.get(`${apiUrl}pea/`);
    console.log("Respuesta del backend (PEAs):", data.peas);
    
    return data.peas.map((pea: any) => ({
      id_pea: pea.id_pea,
      nombre: pea.nombre, 
      descripcion: pea.descripcion,
    }));
  } catch (error) {
    console.error("Error al obtener la lista de Peas:", error);
    throw new Error("No se pudo obtener la lista de Peas");
  }
};


export const usePea = () => {
  return useQuery<Pea[], Error>({
    queryKey: ['Pea'],
    queryFn: fetchPeas,
    gcTime: 1000 * 60 * 10,
  });
};

