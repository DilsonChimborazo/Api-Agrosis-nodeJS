import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const useActualizarControlFitosanitario = () => {
    return useMutation({
        mutationFn: async (control: {
            id_control_fitosanitario: number;
            fecha_control: string;
            descripcion: string;
            fk_id_desarrollan: number | null;
        }) => {
            const { id_control_fitosanitario, ...datosActualizados } = control;
            const { data } = await axios.put(`${apiUrl}controlfitosanitario/${id_control_fitosanitario}`, datosActualizados);
            return data;
        },
    });
};
