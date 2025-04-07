import { useState, useEffect } from "react";
import { useActualizarProduccion } from "../../../hooks/finanzas/produccion/useActualizarProduccion";
import { useNavigate, useParams } from "react-router-dom";
import { useProduccionId } from "../../../hooks/finanzas/produccion/useProduccionId";
import Formulario from "../../globales/Formulario";

const ActualizarProduccion = () => {
    const { id_produccion } = useParams();
    const { data: produccion, isLoading, error } = useProduccionId(id_produccion);
    const actualizarProduccion = useActualizarProduccion();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      fk_id_cultivo: "",
      nombre_produccion: "",
      cantidad_producida: "",
      fecha_produccion: "",
      fk_id_lote: "",
      descripcion_produccion: "",
      estado: "",
      fecha_cosecha: "",
    });
  
    useEffect(() => {
      if (produccion) {
        setFormData({
          fk_id_cultivo: produccion.cultivo?.id ? String(produccion.cultivo.id) : "",
          nombre_produccion: produccion.nombre_produccion || "",
          cantidad_producida: produccion.cantidad_producida?.toString() || "",
          fecha_produccion: produccion.fecha_produccion || "",
          fk_id_lote: produccion.lote?.id?.toString() || "",
          descripcion_produccion: produccion.descripcion_produccion || "",
          estado: produccion.estado || "",
          fecha_cosecha: produccion.fecha_cosecha || "",
        });
      }
    }, [produccion, actualizarProduccion.isSuccess]);
    
  
    const handleSubmit = (data: { [key: string]: string }) => {
      if (!id_produccion) return;
  
      const produccionActualizada = {
        id_produccion: Number(id_produccion),
        nombre_produccion: data.nombre_produccion,
        fk_id_cultivo: parseInt(data.fk_id_cultivo, 10),
        cantidad_producida: parseFloat(data.cantidad_producida),
        fecha_produccion: data.fecha_produccion,
        fk_id_lote: parseInt(data.fk_id_lote, 10),
        descripcion_produccion: data.descripcion_produccion,
        estado: data.estado,
        fecha_cosecha: data.fecha_cosecha,
      };
  
      actualizarProduccion.mutate(produccionActualizada, {
        onSuccess: () => {
          setTimeout(() => navigate("/produccion"), 500);
        },
        onError: (error) => {
          console.error("❌ Error al actualizar producción:", error);
        },
      });
    };
  
    if (isLoading) return <div className="text-gray-500">Cargando datos...</div>;
    if (error) return <div className="text-red-500">Error al cargar la producción</div>;
  
    return (
      <div className="max-w-4xl mx-auto p-4">
        {produccion && (
          <Formulario
            fields={[
              { id: 'nombre_produccion', label: 'Nombre', type: 'text' },
              { id: 'fk_id_cultivo', label: 'ID Cultivo', type: 'number' },
              { id: 'cantidad_producida', label: 'Cantidad Producción', type: 'number' },
              { id: 'fecha_produccion', label: 'Fecha Producción', type: 'date' },
              { id: 'fk_id_lote', label: 'ID Lote', type: 'number' },
              { id: 'descripcion_produccion', label: 'Descripción', type: 'text' },
              { id: 'estado', label: 'Estado', type: 'text' },
              { id: 'fecha_cosecha', label: 'Fecha Cosecha', type: 'date' },
            ]}
            onSubmit={handleSubmit}
            isError={actualizarProduccion.isError}
            isSuccess={actualizarProduccion.isSuccess}
            title="Actualizar Producción"
            initialValues={formData}
          />
        )}
      </div>
    );
  };
  
  export default ActualizarProduccion;