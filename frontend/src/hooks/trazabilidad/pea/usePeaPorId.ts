import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const usePeaPorId = (id: string | undefined) => {
    return useQuery({
        queryKey: ["Pea", id],
        queryFn: async () => {
            if (!id) throw new Error("ID no proporcionado");
            const { data } = await axios.get(`${apiUrl}pea/${id}`);
            console.log("📋 Datos de la Pea obtenidos del backend:", data);
            return data.pea; // 👈 Asegúrate de acceder al objeto correctamente
        },
        enabled: !!id,
    });
};
