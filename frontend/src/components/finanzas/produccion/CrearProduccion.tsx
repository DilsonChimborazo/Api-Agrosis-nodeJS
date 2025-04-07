import { Produccion } from '@/hooks/finanzas/produccion/useCrearProduccion';
import { useCrearProduccion } from '../../../hooks/finanzas/produccion/useCrearProduccion';
import Formulario from '../../globales/Formulario';
import { useNavigate } from 'react-router-dom';

const CrearProduccion = () => {
  const mutation = useCrearProduccion();
  const navigate = useNavigate();

  const formFields = [
    { id: 'fk_id_cultivo', label: 'ID Cultivo', type: 'number' },
    { id: 'nombre_produccion', label: 'Nombre', type: 'text' },
    { id: 'cantidad_producida', label: 'Cantidad de Producción', type: 'number' },
    { id: 'fecha_produccion', label: 'Fecha de Producción', type: 'date' },
    { id: 'fk_id_lote', label: 'ID del Lote', type: 'number' },
    { id: 'descripcion_produccion', label: 'Descripción', type: 'text' },
    { id: 'estado', label: 'Estado', type: 'text' },
    { id: 'fecha_cosecha', label: 'Fecha de Cosecha', type: 'date' },
  ];

  const handleSubmit = (formData: { [key: string]: string }) => {
    const nuevaProduccion: Produccion = {
      fk_id_cultivo: formData.fk_id_cultivo ? parseInt(formData.fk_id_cultivo, 10) : null,
      nombre_produccion: formData.nombre_produccion,
      cantidad_producida: parseFloat(formData.cantidad_producida),
      fecha_produccion: formData.fecha_produccion,
      fk_id_lote: formData.fk_id_lote ? parseInt(formData.fk_id_lote, 10) : null,
      descripcion_produccion: formData.descripcion_produccion,
      estado: formData.estado,
      fecha_cosecha: formData.fecha_cosecha,
    };

    mutation.mutate(nuevaProduccion, {
      onSuccess: () => {
        navigate("/produccion");
      },
      onError: (error: any) => {
        console.error("❌ Error en creación de producción:", error.response?.data || error.message);
      },
    });
  };

  return (
    <div className="p-10">
      <Formulario
        fields={formFields}
        onSubmit={handleSubmit}
        isError={mutation.isError}
        isSuccess={mutation.isSuccess}
        title="Registrar Producción"
      />
    </div>
  );
};

export default CrearProduccion;
