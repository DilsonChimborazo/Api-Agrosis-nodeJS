import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const useProduccionId = (id_produccion: string | undefined) => {
    return useQuery({
        queryKey: ["Produccion", id_produccion],
        queryFn: async () => {
            if (!id_produccion) throw new Error("ID no proporcionado");

            // Obtener token del localStorage
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token no encontrado");
            }

            // Solicitud con encabezado de autorización
            const { data } = await axios.get(`${apiUrl}produccion/${id_produccion}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("🌱 Datos obtenidos del backend:", data);
            return data;
        },
        enabled: !!id_produccion,
    });
};
