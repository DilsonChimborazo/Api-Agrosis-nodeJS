import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Cultivos{
    id_cultivo: number;
    fecha_plantacion: Date;
    nombre_cultivo: string; 
    descripcion: string;
    fk_id_especie: Especie;
    fk_id_semillero: Semillero;
}

export interface Semillero {
    id_semillero: number;
    nombre_semillero: string;
    fecha_siembra: Date;
    fecha_estimada: Date;
    cantidad: number;
}

export interface TipoCultivo {
    id_tipo_cultivo: number;
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

// Función para obtener los usuarios con manejo de errores
const fetchAsignacion = async (): Promise<Cultivos[]> => {
  try {
    const { data } = await axios.get(`${apiUrl}cultivo/`);
    const cultivos = data.cultivos.map((cultivo: any) => ({
      id_cultivo: cultivo.id_cultivo,
      fecha_plantacion: cultivo.fecha_plantacion,
      nombre_cultivo: cultivo.nombre_cultivo,
      descripcion: cultivo.descripcion,
      fk_id_especie: cultivo.fk_id_especie && {
        id_especie: cultivo.fk_id_especie.id_especie,
        nombre_comun: cultivo.fk_id_especie.nombre_comun,
        nombre_cientifico: cultivo.fk_id_especie.nombre_cientifico,
        descripcion: cultivo.fk_id_especie.descripcion,
        fk_id_tipo_cultivo: cultivo.fk_id_especie.fk_id_tipo_cultivo && {
          id_tipo_cultivo: cultivo.fk_id_especie.fk_id_tipo_cultivo.id_tipo_cultivo,
          nombre: cultivo.fk_id_especie.fk_id_tipo_cultivo.nombre,
          descripcion: cultivo.fk_id_especie.fk_id_tipo_cultivo.descripcion,
        },
      },
      fk_id_semillero: cultivo.fk_id_semillero && {
        id_semillero: cultivo.fk_id_semillero.id_semillero,
        nombre_semillero: cultivo.fk_id_semillero.nombre_semilla,
        fecha_siembra: cultivo.fk_id_semillero.fecha_siembra,
        fecha_estimada: cultivo.fk_id_semillero.fecha_estimada,
        cantidad: cultivo.fk_id_semillero.cantidad,
      },
    }));

    return cultivos;
  } catch (error) {
    console.error("Error al obtener cultivos:", error);
    throw new Error("No se pudo obtener la lista de los cultivos");
  }
};


export const useCultivo = () => {
    return useQuery<Cultivos[], Error>({
        queryKey: ['Cultivos'],
        queryFn: fetchAsignacion,
        gcTime: 1000 * 60 * 10, 

    });
};


