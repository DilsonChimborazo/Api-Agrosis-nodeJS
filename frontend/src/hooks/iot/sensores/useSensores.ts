import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Sensor {
  id_sensor: number;
  nombre_sensor: string;
  tipo_sensor: string;
  unidad_medida: string;
  descripcion: string;
  medida_minima: number;
  medida_maxima: number;
  evapotranspiracion?: number;
}

const fetchSensores = async (): Promise<Sensor[]> => {
  try {
    const { data } = await axios.get(`${apiUrl}sensores/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log("respuesta sensores:", data);

    // si data ya es un array de sensores, simplemente lo retornamos
    if (Array.isArray(data)) {
      return data;
    }

    // si data.sensores existe y es un array, retornamos eso
    if (Array.isArray(data.sensores)) {
      return data.sensores;
    }

    // en cualquier otro caso, retornamos un array vacío
    return [];
  } catch (error) {
    console.error("Error al obtener sensores:", error);
    throw new Error("No se pudo obtener la lista de sensores");
  }
};

export const useSensores = () => {
  return useQuery<Sensor[], Error>({
    queryKey: ['sensores'],
    queryFn: fetchSensores,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};
