import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export interface Asignacion {
  id: number;
  fecha: string;
  fk_id_actividad: string;
  fk_identificacion: string;
}

export const useEditarAsignacion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (asignacionActualizada: Asignacion) => {
      const { id, ...datos } = asignacionActualizada;
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      if (!datos.fecha || !datos.fk_id_actividad || !datos.fk_identificacion) {
        throw new Error("⚠️ Datos inválidos. Por favor, revisa los campos.");
      }

      console.log("📝 Enviando datos para actualizar:", datos);

      try {
        const { data } = await axios.put(`${apiUrl}/asignacion_actividad/${id}`, datos, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return data;
      } catch (error: any) {
        console.error("Error detallado:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
          config: error.config,
        });
        throw error;
      }
    },
    onSuccess: () => {
      console.log("✅ Asignación actualizada con éxito");
      queryClient.invalidateQueries({ queryKey: ["asignaciones_actividades"] });
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || error.message || "Error desconocido";
      console.error("❌ Error al actualizar asignación:", msg);
      throw new Error(msg);
    },
  });
};