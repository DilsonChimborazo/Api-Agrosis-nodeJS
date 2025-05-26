import { useCrearEras, Eras } from '../../../hooks/iot/eras/useCrearEras';
import Formulario from '../../globales/Formulario';
import { useLotes } from '@/hooks/iot/lote/useLotes';
import { useState } from 'react';
import VentanaModal from '../../globales/VentanasModales';
import CrearLote from '../lotes/CrearLote';
import { showToast } from '@/components/globales/Toast';

interface CrearErasProps {
    onSuccess?: (nuevaEra: Eras) => void;
}

const CrearEras = ({ onSuccess }: CrearErasProps) => {
    const mutation = useCrearEras();
    const { data: lotes = [], isLoading: isLoadingLotes, refetch: refetchLotes } = useLotes();
    const [mostrarModalLote, setMostrarModalLote] = useState(false);

    const formFields = [
        {
            id: 'fk_id_lote',
            label: 'Lote',
            type: 'select',
            options: lotes.map(lote => ({ value: lote.id.toString(), label: lote.nombre_lote })),
            hasExtraButton: true,
            extraButtonText: 'Crear Lote',
            onExtraButtonClick: () => setMostrarModalLote(true),
            required: true,
        },
        { id: 'nombre', label: 'Nombre', type: 'text', required: true },
        { id: 'descripcion', label: 'Descripción', type: 'text', required: true },
        {
            id: 'estado',
            label: 'Estado',
            type: 'select',
            options: [
                { value: 'true', label: 'Activo' },
                { value: 'false', label: 'Inactivo' }
            ],
            required: true,
        },
        { id: 'latitud', label: 'Latitud', type: 'number', required: true },
        { id: 'longitud', label: 'Longitud', type: 'number', required: true },
    ];

    const handleSubmit = (formData: { [key: string]: string }) => {
        const requiredFields = ['nombre', 'descripcion', 'fk_id_lote', 'estado', 'latitud', 'longitud'];
        const hasEmpty = requiredFields.some(field => !formData[field]);

        if (hasEmpty) {
            showToast({
                title: 'Error',
                description: 'Todos los campos son obligatorios',
                variant: 'error',
            });
            return;
        }

        const nuevaEra: Eras = {
            id: 0, // El backend asignará el ID real
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            fk_id_lote: Number(formData.fk_id_lote),
            estado: formData.estado === 'true',
            latitud: Number(formData.latitud),
            longitud: Number(formData.longitud),
        };

        mutation.mutate(nuevaEra, {
            onSuccess: (response) => {
                showToast({
                    title: 'Éxito',
                    description: 'Era creada exitosamente',
                    variant: 'success',
                });
                if (onSuccess) {
                    onSuccess({
                        ...nuevaEra,
                        id: response?.data?.id || 0,
                    });
                }
            },
            onError: () => {
                showToast({
                    title: 'Error',
                    description: 'No se pudo crear la era',
                    variant: 'error',
                });
            }
        });
    };

    const cerrarYActualizar = async () => {
        setMostrarModalLote(false);
        await refetchLotes();
    };

    if (isLoadingLotes) {
        return <div className="text-center text-gray-500">Cargando lotes...</div>;
    }

    return (
        <div className="p-10">
            <Formulario 
                fields={formFields}
                onSubmit={handleSubmit}
                isError={mutation.isError}
                isSuccess={mutation.isSuccess}
                title="Crear Era"
            />
            <VentanaModal
                isOpen={mostrarModalLote}
                onClose={cerrarYActualizar}
                titulo=""
                contenido={
                    <CrearLote
                        onSuccess={cerrarYActualizar}
                    />
                }
            />
        </div>
    );
};

export default CrearEras;