import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface Produccion {
  id_produccion: number;
  nombre_produccion: string;
  fk_id_cultivo: number | null;
  cantidad_producida: number;
  fecha_produccion: string;
  fk_id_lote: number | null;
  descripcion_produccion: string;
  estado: string;
  fecha_cosecha: string;
}

export const useActualizarProduccion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (produccionActualizada: Produccion) => {
      const { id_produccion, ...datos } = produccionActualizada;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se ha encontrado un token de autenticación");
        }

        const { data } = await axios.put(
          `${apiUrl}produccion/${id_produccion}`,
          datos,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return data;
      } catch (error: any) {
        console.error("❌ Error al actualizar la producción:", error?.response?.data || error.message);
        throw error;
      }
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["produccion"] }); // Lista general
      queryClient.invalidateQueries({ queryKey: ["produccion", variables.id_produccion] }); // Detalle específico
    },

    onError: (error: any) => {
      console.error("❌ Error en la mutación de actualización:", error.message);
    },
  });
};
