import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface Semillero {
    id_semillero: number;
    nombre_semilla: string;
    fecha_siembra: string;
    fecha_estimada: string;
    cantidad: number;
}

export const useCrearSemillero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (nuevoSemillero: Semillero) => {
            const token = localStorage.getItem("token");

            const { data } = await axios.post(`${apiUrl}semilleros/`, nuevoSemillero, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        onSuccess: () => {
            console.log("✅ Semillero creado con éxito");
            queryClient.invalidateQueries({ queryKey: ["Semilleros"] });
        },
        onError: (error) => {
            console.error("❌ Error al crear semillero:", error);
        },
    });
};
