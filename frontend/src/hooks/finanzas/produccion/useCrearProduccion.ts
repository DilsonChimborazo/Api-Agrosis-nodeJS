import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface Produccion {
  fk_id_cultivo: number | null;
  nombre_produccion: string;
  cantidad_producida: number;
  fecha_produccion: string;
  fk_id_lote: number | null;
  descripcion_produccion: string;
  estado: string;
  fecha_cosecha: string;
}

export const useCrearProduccion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nuevaProduccion: Produccion) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se ha encontrado un token de autenticación");
      }

      const { data } = await axios.post(
        `${apiUrl}produccion/`,
        nuevaProduccion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produccion"] });
    },
    onError: (error: any) => {
      console.error("Error al crear la producción:", error.message);
    },
  });
};
