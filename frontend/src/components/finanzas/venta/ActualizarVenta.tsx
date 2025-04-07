import { useState, useEffect } from "react";
import { useActualizarVenta } from "../../../hooks/finanzas/venta/UseActualizarVenta";
import { useNavigate, useParams } from "react-router-dom";
import { useVentaId } from "../../../hooks/finanzas/venta/UseVentaId";
import { useProduccion } from "@/hooks/finanzas/produccion/useProduccion";
import Formulario from "../../globales/Formulario";

const ActualizarVenta = () => {
  const { id_venta } = useParams();
  const { data: venta, isLoading, error } = useVentaId(id_venta);
  const { data: producciones = [] } = useProduccion();
  const actualizarVenta = useActualizarVenta();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fk_id_produccion: "",
    cantidad: "",
    precio_unitario: "",
    fecha: "",
  });

  useEffect(() => {
    if (venta) {
      setFormData({
        fk_id_produccion: venta.fk_id_produccion?.id_produccion
          ? String(venta.fk_id_produccion.id_produccion)
          : "",
        cantidad: venta.cantidad?.toString() || "",
        precio_unitario: venta.precio_unitario?.toString() || "",
        fecha: venta.fecha_venta?.substring(0, 10) || "", // Recorta a yyyy-mm-dd
      });
    }
  }, [venta]);

  const handleSubmit = (data: { [key: string]: string }) => {
    if (!id_venta) return;

    const ventaActualizada = {
      id_venta: parseInt(id_venta),
      fk_id_produccion: parseInt(data.fk_id_produccion),
      cantidad: parseFloat(data.cantidad),
      precio_unitario: parseFloat(data.precio_unitario),
      total_venta: parseFloat(data.cantidad) * parseFloat(data.precio_unitario),
      fecha_venta: data.fecha,
    };

    actualizarVenta.mutate(ventaActualizada, {
      onSuccess: () => setTimeout(() => navigate("/ventas"), 500),
      onError: (error) => console.error("❌ Error al actualizar venta:", error),
    });
  };

  if (isLoading) return <div className="text-gray-500">Cargando datos...</div>;
  if (error) return <div className="text-red-500">Error al cargar la venta</div>;

  const fields = [
    {
      id: "fk_id_produccion",
      label: "Producción",
      type: "select",
      options: producciones.map((prod) => ({
        value: prod.id_produccion,
        label: prod.fk_id_cultivo
          ? `${prod.fk_id_cultivo.nombre_cultivo} - ${new Date(prod.fecha_produccion).toLocaleDateString()}`
          : "Cultivo no disponible",

      })),
    },
    { id: "cantidad", label: "Cantidad", type: "number" },
    { id: "precio_unitario", label: "Precio por Unidad", type: "number" },
    { id: "fecha", label: "Fecha", type: "date" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formulario
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={formData}
        isError={actualizarVenta.isError}
        isSuccess={actualizarVenta.isSuccess}
        title="Actualizar Venta"
      />
    </div>
  );
};

export default ActualizarVenta;
