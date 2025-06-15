import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface Asignacion {
  id: number;
  fecha: string; // Cambiado a string para consistencia con el formulario
  fk_id_actividad: number;
  fk_identificacion: number;
}

export const useEditarAsignacion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (asignacionActualizada: Asignacion) => {
      const { id, ...datos } = asignacionActualizada;

      // Validación corregida
      if (
        !datos.fecha ||
        datos.fk_id_actividad === undefined ||
        datos.fk_identificacion === undefined ||
        datos.fk_id_actividad <= 0 ||
        datos.fk_identificacion <= 0
      ) {
        throw new Error("⚠️ Datos inválidos. Por favor, revisa los campos.");
      }

      console.log("📝 Enviando datos para actualizar:", datos);

      try {
        const { data } = await axios.put(`${apiUrl}asignacion_actividad/${id}`, datos, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Añadir token si es necesario
          },
        });
        return data;
      } catch (error: any) {
        console.error("❌ Error en la solicitud:", error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("✅ Asignación actualizada con éxito");
      queryClient.invalidateQueries({ queryKey: ["asignaciones"] }); // Cambiado a "asignaciones"
    },
    onError: (error) => {
      console.error("❌ Error al actualizar la asignación:", error.message || error);
    },
  });
};