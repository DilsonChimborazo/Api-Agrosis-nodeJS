import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface ControlFitosanitario {
    id_control_fitosanitario: number;
    fecha_control: string;
    descripcion: string;
    fk_id_desarrollan: number;
    desarrollan: Desarrollan;
}
    
export interface Desarrollan {
    id_desarrollan: number;
    cultivo: Cultivo;
    pea: Pea;
  }

export interface Cultivo {
    id_cultivo: number;
    nombre_cultivo: string;
    fecha_plantacion: string;
    descripcion: string;
    // Puedes agregar más si necesitas (especie, semillero, etc.)
}

export interface Pea {
    id_pea: number;
    nombre: string;
    descripcion: string;
}

const fetchControlFitosanitario = async (): Promise<any[]> => {
    try {
        const { data } = await axios.get(`${apiUrl}controlfitosanitario`);
        return data.controles; // 👈 Extrae correctamente el arreglo
    } catch (error) {
        console.error("Error al obtener Control Fitosanitario:", error);
        throw new Error("No se pudo obtener la lista de los Controles Fitosanitarios");
    }
};

  
export const useControlFitosanitario = () => {
    return useQuery<ControlFitosanitario[], Error>({
        queryKey: ['ControlFitosanitario'],
        queryFn: fetchControlFitosanitario,
        gcTime: 1000 * 60 * 10,
      });
      
};
